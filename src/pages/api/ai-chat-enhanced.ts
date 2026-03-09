import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

interface ChatRequest {
  question: string;
  selectedText?: string;
  model?: string;
  stream?: boolean;
  imageUrl?: string;
  memoryContext?: string;
}

interface ChatResponse {
  success: boolean;
  answer?: string;
  error?: string;
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { question, selectedText, model = 'llama-3.3-70b-versatile', stream = false, imageUrl, memoryContext }: ChatRequest = req.body;

    if (!question) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing question' 
      });
    }

    // Build messages array
    const messages: any[] = [
      {
        role: 'system',
        content: `You are a system engineering tutor helping students understand technical articles. Answer questions accurately and concisely based on your knowledge of system design, software engineering, and computer science concepts.${
          selectedText ? `\n\nContext from the article:\n"${selectedText}"` : ''
        }${
          memoryContext ? `\n\nRelevant memories from past conversations:\n${memoryContext}` : ''
        }`
      }
    ];

    // Handle image input if using multimodal model
    if (imageUrl && model.includes('llama-4-scout')) {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: question
          },
          {
            type: 'image_url',
            image_url: {
              url: imageUrl
            }
          }
        ]
      });
    } else {
      messages.push({
        role: 'user',
        content: question
      });
    }

    if (stream) {
      // Streaming response
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
      });

      const stream = await groq.chat.completions.create({
        messages,
        model,
        max_tokens: 4000,
        temperature: 0.7,
        stream: true,
      });

      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta;
          
          if (delta?.content) {
            res.write(`data: ${JSON.stringify({
              choices: [{
                delta: {
                  content: delta.content
                }
              }]
            })}\n\n`);
          }
        }
        
        res.write('data: [DONE]\n\n');
        res.end();
      } catch (streamError) {
        console.error('Streaming error:', streamError);
        res.write(`data: ${JSON.stringify({
          error: 'Streaming interrupted'
        })}\n\n`);
        res.end();
      }
    } else {
      // Non-streaming response
      const response = await groq.chat.completions.create({
        messages,
        model,
        max_tokens: 4000,
        temperature: 0.7,
        stream: false,
      });

      const answer = response.choices[0]?.message?.content || 'Sorry, I could not process your request.';

      return res.status(200).json({
        success: true,
        answer
      });
    }

  } catch (error) {
    console.error('AI Chat Error:', error);
    
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}
