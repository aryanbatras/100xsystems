import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';
import formidable from 'formidable';
import fs from 'fs';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '25mb',
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
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY is not configured' });
    }

    // Parse multipart form data
    const form = formidable({
      maxFileSize: 25 * 1024 * 1024, // 25MB
      keepExtensions: true
    });

    const [fields, files] = await form.parse(req);

    const file = files.file?.[0];
    const model = fields.model?.[0] || 'whisper-large-v3-turbo';
    
    if (!file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Read file from temporary location
    const fileBuffer = fs.readFileSync(file.filepath);

    // Create a blob from the file buffer
    const audioBlob = new Blob([fileBuffer], { type: file.mimetype || 'audio/webm' });
    
    // Convert to File-like object that Groq SDK accepts
    const audioFile = new File([audioBlob], file.originalFilename || 'recording.webm', { type: audioBlob.type });
    
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: model as any,
      language: 'en',
      response_format: 'json',
      temperature: 0.0
    });

    // Clean up temporary file
    try {
      fs.unlinkSync(file.filepath);
    } catch (cleanupError) {
      // Ignore cleanup errors
    }

    return res.status(200).json({
      text: transcription.text,
      language: 'en'
    });

  } catch (error) {
    // Check for specific Groq API errors
    if ((error as any)?.status === 401) {
      return res.status(500).json({ error: 'GROQ API authentication failed. Check API key.' });
    }
    
    if ((error as any)?.status === 429) {
      return res.status(429).json({ error: 'GROQ API rate limit exceeded. Please try again later.' });
    }
    
    if ((error as any)?.status === 400) {
      return res.status(400).json({ error: `Bad request: ${(error as any)?.message || 'Invalid audio format'}` });
    }
    
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Transcription failed' });
  }
}
