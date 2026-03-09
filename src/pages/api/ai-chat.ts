// File: src/pages/api/ai-chat.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface ChatRequest {
  question: string;
  selectedText?: string;
}

interface ChatResponse {
  success: boolean;
  answer?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { question, selectedText }: ChatRequest = req.body;

    if (!question) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing question' 
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          {
            role: 'system',
            content: `You are a system engineering tutor helping students understand technical articles. Answer questions accurately and concisely based on your knowledge of system design, software engineering, and computer science concepts. ${selectedText ? selectedText : " "}`
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 5000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`Groq API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    return res.status(200).json({
      success: true,
      answer
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}