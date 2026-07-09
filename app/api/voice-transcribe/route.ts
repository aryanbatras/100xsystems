import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

let _groq: Groq | null = null;
function getGroq(): Groq {
  if (!_groq) {
    _groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return _groq;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const model = (formData.get('model') as string) || 'whisper-large-v3-turbo';

    if (!file) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'GROQ_API_KEY is not configured' }, { status: 500 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const audioBlob = new Blob([fileBuffer], { type: file.type || 'audio/webm' });
    const audioFile = new File([audioBlob], file.name || 'recording.webm', { type: audioBlob.type });

    const transcription = await getGroq().audio.transcriptions.create({
      file: audioFile,
      model: model as any,
      language: 'en',
      response_format: 'json',
      temperature: 0.0,
    });

    return NextResponse.json({
      text: transcription.text,
      language: 'en',
    });
  } catch (error) {
    if ((error as any)?.status === 401) {
      return NextResponse.json({ error: 'GROQ API authentication failed. Check API key.' }, { status: 500 });
    }
    if ((error as any)?.status === 429) {
      return NextResponse.json({ error: 'GROQ API rate limit exceeded. Please try again later.' }, { status: 429 });
    }
    if ((error as any)?.status === 400) {
      return NextResponse.json({ error: `Bad request: ${(error as any)?.message || 'Invalid audio format'}` }, { status: 400 });
    }
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Transcription failed',
    }, { status: 500 });
  }
}
