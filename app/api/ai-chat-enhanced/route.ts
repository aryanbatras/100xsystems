import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { AI_SYSTEM_PROMPT, DIAGRAM_KEYWORDS } from '@/application/ai/diagramConfig';

let _groq: Groq | null = null;
function getGroq(): Groq {
  if (!_groq) {
    _groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return _groq;
}

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { question, selectedText, model = 'llama-3.3-70b-versatile', stream = false, imageUrl, images, memoryContext, responseFeedbackData, diagramMode } = await req.json();

    if (!question) {
      return NextResponse.json({ success: false, error: 'Missing question' }, { status: 400 });
    }

    const isDiagramRequest = diagramMode || DIAGRAM_KEYWORDS.some(keyword =>
      question.toLowerCase().includes(keyword)
    );

    let feedbackContext = '';
    if (responseFeedbackData && responseFeedbackData.length > 0) {
      feedbackContext = responseFeedbackData.map((item: any) =>
        `User ${item.feedback}: ${item.responseContent?.substring(0, 100)}... (Message ID: ${item.messageId})`
      ).join('\n');
    }

    const messages: any[] = [
      {
        role: 'system',
        content: `${AI_SYSTEM_PROMPT}${selectedText ? `\n\nContext from article:\n"${selectedText}"` : ''}${memoryContext ? `\n\nRelevant memories from past conversations:\n${memoryContext}` : ''}${feedbackContext ? `\n\nRecent Response Feedback:\n${feedbackContext}` : ''}${isDiagramRequest ? `\n\nIMPORTANT: The user is requesting a diagram. Please generate a valid JSON response with diagram data following the ExcalidrawElementSkeleton specification.` : ''}`
      }
    ];

    const hasImages = (images && images.length > 0) || imageUrl;
    const imageUrls = images || (imageUrl ? [imageUrl] : []);

    if (hasImages && model.includes('llama-4-scout')) {
      const content: any[] = [{ type: 'text', text: question }];
      imageUrls.forEach((imgUrl: string) => {
        content.push({ type: 'image_url', image_url: { url: imgUrl } });
      });
      messages.push({ role: 'user', content });
    } else {
      messages.push({ role: 'user', content: question });
    }

    if (stream) {
      const encoder = new TextEncoder();
      const stream_response = await getGroq().chat.completions.create({
        messages,
        model,
        max_tokens: 4000,
        temperature: 0.7,
        stream: true,
      });

      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream_response) {
              const delta = chunk.choices[0]?.delta;
              if (delta?.content) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: delta.content } }] })}\n\n`));
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (streamError) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Streaming interrupted' })}\n\n`));
            controller.close();
          }
        }
      });

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const response = await getGroq().chat.completions.create({
      messages,
      model,
      max_tokens: 4000,
      temperature: 0.7,
      stream: false,
    });

    const answer = response.choices[0]?.message?.content || 'Sorry, I could not process your request.';
    return NextResponse.json({ success: true, answer });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
