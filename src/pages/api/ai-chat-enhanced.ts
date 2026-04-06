import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';
import { AI_SYSTEM_PROMPT, DIAGRAM_KEYWORDS } from '../../core/ai/diagramConfig';

interface ChatRequest {
  question: string;
  selectedText?: string;
  model?: string;
  stream?: boolean;
  imageUrl?: string; // Deprecated, kept for backward compatibility
  images?: string[]; // New field for multiple base64 images
  memoryContext?: string;
  feedbackData?: Array<{
    messageId: string;
    liked: boolean;
    disliked: boolean;
    replied: boolean;
  }>;
  responseFeedbackData?: Array<{
    messageId: string;
    responseContent: string;
    feedback: 'liked' | 'disliked';
    timestamp: string;
  }>;
  diagramMode?: boolean; // New field for diagram generation
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
    const { question, selectedText, model = 'llama-3.3-70b-versatile', stream = false, imageUrl, images, memoryContext, feedbackData, responseFeedbackData, diagramMode }: ChatRequest = req.body;

    if (!question) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing question' 
      });
    }

    // Check if user is requesting a diagram
    const isDiagramRequest = diagramMode || DIAGRAM_KEYWORDS.some(keyword => 
      question.toLowerCase().includes(keyword)
    );

    // Process response feedback for AI learning
    let feedbackContext = '';
    if (responseFeedbackData && responseFeedbackData.length > 0) {
      console.log(' AI Learning from Response Feedback:', responseFeedbackData);
      feedbackContext = responseFeedbackData.map((item: any) => 
        `User ${item.feedback}: ${item.responseContent?.substring(0, 100)}... (Message ID: ${item.messageId})`
      ).join('\n');
    }

    // Build messages array with enhanced system prompt for diagrams
    const messages: any[] = [
      {
        role: 'system',
        content: `${AI_SYSTEM_PROMPT}${
          selectedText ? `\n\nContext from article:\n"${selectedText}"` : ''
        }${
          memoryContext ? `\n\nRelevant memories from past conversations:\n${memoryContext}` : ''
        }${
          feedbackContext ? `\n\nRecent Response Feedback:\n${feedbackContext}` : ''
        }${
          isDiagramRequest ? `\n\nIMPORTANT: The user is requesting a diagram. Please generate a valid JSON response with diagram data following the ExcalidrawElementSkeleton specification.` : ''
        }`
      }
    ];

    // Handle image input if using multimodal model
    const hasImages = (images && images.length > 0) || imageUrl;
    const imageUrls = images || (imageUrl ? [imageUrl] : []);
    
    if (hasImages && model.includes('llama-4-scout')) {
      const content: any[] = [
        {
          type: 'text',
          text: question
        }
      ];
      
      // Add all images to the content array
      imageUrls.forEach((imgUrl: string) => {
        content.push({
          type: 'image_url',
          image_url: {
            url: imgUrl
          }
        });
      });
      
      messages.push({
        role: 'user',
        content
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
    
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}
