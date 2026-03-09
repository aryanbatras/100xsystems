import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

interface TranscribeResponse {
  text: string;
  language?: string;
  duration?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranscribeResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body as any;
    
    // Handle multipart form data
    if (req.headers['content-type']?.includes('multipart/form-data')) {
      const file = formData.file;
      const model = formData.model || 'whisper-large-v3-turbo';
      
      if (!file) {
        return res.status(400).json({ error: 'No audio file provided' });
      }

      // Create a buffer from the file
      let audioBuffer: Buffer;
      
      if (Buffer.isBuffer(file)) {
        audioBuffer = file;
      } else if (file.buffer) {
        audioBuffer = Buffer.from(file.buffer);
      } else {
        return res.status(400).json({ error: 'Invalid file format' });
      }

      // Create a Uint8Array from Buffer to ensure compatibility with Blob
      const audioUint8Array = new Uint8Array(audioBuffer);
      const audioBlob = new Blob([audioUint8Array], { type: 'audio/wav' });
      
      // Convert to File-like object that Groq SDK accepts
      const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });
      
      const transcription = await groq.audio.transcriptions.create({
        file: audioFile,
        model: model as any,
        language: 'en',
        response_format: 'json',
        temperature: 0.0
      });

      return res.status(200).json({
        text: transcription.text,
        language: 'en'
      });

    } else {
      // Handle JSON request with base64 audio
      const { audioData, model = 'whisper-large-v3-turbo' } = req.body;
      
      if (!audioData) {
        return res.status(400).json({ error: 'No audio data provided' });
      }

      // Convert base64 to buffer
      const base64Audio = audioData.replace(/^data:audio\/\w+;base64,/, '');
      const audioBuffer = Buffer.from(base64Audio, 'base64');
      
      // Create a Uint8Array from Buffer to ensure compatibility with Blob
      const audioUint8Array = new Uint8Array(audioBuffer);
      const audioBlob = new Blob([audioUint8Array], { type: 'audio/wav' });
      
      // Convert to File-like object that Groq SDK accepts
      const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });
      
      const transcription = await groq.audio.transcriptions.create({
        file: audioFile,
        model: model as any,
        language: 'en',
        response_format: 'json',
        temperature: 0.0
      });

      return res.status(200).json({
        text: transcription.text,
        language: 'en'
      });
    }

  } catch (error) {
    console.error('Voice transcription error:', error);
    
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Transcription failed' });
  }
}
