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
  console.log('🎤 Voice transcription API called');
  console.log('📋 Request details:', {
    method: req.method,
    contentType: req.headers['content-type'],
    contentLength: req.headers['content-length'],
    userAgent: req.headers['user-agent']
  });

  if (req.method !== 'POST') {
    console.error('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Checking GROQ_API_KEY...');
    if (!process.env.GROQ_API_KEY) {
      console.error('❌ GROQ_API_KEY is missing');
      return res.status(500).json({ error: 'GROQ_API_KEY is not configured' });
    }
    console.log('✅ GROQ_API_KEY is present');

    // Parse multipart form data
    const form = formidable({
      maxFileSize: 25 * 1024 * 1024, // 25MB
      keepExtensions: true
    });

    console.log('📋 Parsing multipart form data...');
    const [fields, files] = await form.parse(req);
    
    console.log('� Formidable parsing results:', {
      fields: Object.keys(fields),
      files: Object.keys(files)
    });

    const file = files.file?.[0];
    const model = fields.model?.[0] || 'whisper-large-v3-turbo';
    
    console.log('📁 File details:', {
      file: !!file,
      fileName: file?.originalFilename || 'unknown',
      fileSize: file?.size || 'unknown',
      fileType: file?.mimetype || 'unknown',
      filepath: file?.filepath || 'none',
      model: model
    });
    
    if (!file) {
      console.error('❌ No audio file provided in FormData');
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Read file from temporary location
    console.log('📖 Reading file from disk:', file.filepath);
    const fileBuffer = fs.readFileSync(file.filepath);
    console.log('✅ File read successfully:', {
      size: fileBuffer.length,
      isBuffer: Buffer.isBuffer(fileBuffer)
    });

    // Create a blob from the file buffer
    const audioBlob = new Blob([fileBuffer], { type: file.mimetype || 'audio/webm' });
    
    console.log('🎵 Audio blob created:', {
      size: audioBlob.size,
      type: audioBlob.type,
      originalFileType: file.mimetype
    });
    
    // Convert to File-like object that Groq SDK accepts
    const audioFile = new File([audioBlob], file.originalFilename || 'recording.webm', { type: audioBlob.type });
    
    console.log('📞 Calling Groq API...');
    console.log('📞 Groq request details:', {
      model: model,
      language: 'en',
      response_format: 'json',
      temperature: 0.0,
      fileSize: audioFile.size
    });
    
    const startTime = Date.now();
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: model as any,
      language: 'en',
      response_format: 'json',
      temperature: 0.0
    });
    const endTime = Date.now();
    
    console.log('✅ Groq API response received:', {
      duration: `${endTime - startTime}ms`,
      text: transcription.text,
      transcription: transcription
    });

    // Clean up temporary file
    try {
      fs.unlinkSync(file.filepath);
      console.log('🧹 Temporary file cleaned up');
    } catch (cleanupError) {
      console.warn('⚠️ Could not clean up temporary file:', cleanupError);
    }

    return res.status(200).json({
      text: transcription.text,
      language: 'en'
    });

  } catch (error) {
    console.error('❌ Voice transcription error:', error);
    console.error('❌ Error details:', {
      error: error,
      name: (error as any)?.name,
      message: (error as any)?.message,
      stack: (error as any)?.stack,
      status: (error as any)?.status,
      statusText: (error as any)?.statusText
    });
    
    // Check for specific Groq API errors
    if ((error as any)?.status === 401) {
      console.error('❌ GROQ API authentication failed');
      return res.status(500).json({ error: 'GROQ API authentication failed. Check API key.' });
    }
    
    if ((error as any)?.status === 429) {
      console.error('❌ GROQ API rate limit exceeded');
      return res.status(429).json({ error: 'GROQ API rate limit exceeded. Please try again later.' });
    }
    
    if ((error as any)?.status === 400) {
      console.error('❌ Bad request to GROQ API');
      return res.status(400).json({ error: `Bad request: ${(error as any)?.message || 'Invalid audio format'}` });
    }
    
    if (error instanceof Error) {
      console.error('❌ Returning error message:', error.message);
      return res.status(500).json({ error: error.message });
    }
    
    console.error('❌ Unknown error occurred');
    return res.status(500).json({ error: 'Transcription failed' });
  }
}
