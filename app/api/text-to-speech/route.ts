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
    const { text, model = 'canopylabs/orpheus-v1-english', voice = 'Fritz-PlayAI', response_format = 'wav' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Missing text input' }, { status: 400 });
    }

    if (text.length > 10000) {
      return NextResponse.json({ error: 'Text too long (max 10000 characters)' }, { status: 400 });
    }

    const speech = await getGroq().audio.speech.create({
      model: model as any,
      voice: voice as any,
      input: text,
      response_format: response_format as any,
    });

    const buffer = Buffer.from(await speech.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Text-to-speech failed',
    }, { status: 500 });
  }
}
