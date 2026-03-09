import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface TTSRequest {
  text: string;
  model?: string;
  voice?: string;
  response_format?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      text, 
      model = 'canopylabs/orpheus-v1-english',
      voice = 'Fritz-PlayAI',
      response_format = 'wav'
    }: TTSRequest = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing text input' });
    }

    if (text.length > 10000) {
      return res.status(400).json({ error: 'Text too long (max 10000 characters)' });
    }

    const speech = await groq.audio.speech.create({
      model: model as any,
      voice: voice as any,
      input: text,
      response_format: response_format as any,
    });

    // Set appropriate headers for audio response
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Cache-Control', 'no-cache');
    
    // Convert the response to buffer and send
    const buffer = Buffer.from(await speech.arrayBuffer());
    res.send(buffer);

  } catch (error) {
    console.error('TTS Error:', error);
    
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Text-to-speech failed' });
  }
}
