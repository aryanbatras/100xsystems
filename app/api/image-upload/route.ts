import { NextRequest, NextResponse } from 'next/server';
import { readFile, unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

async function compressBase64Image(base64String: string): Promise<string> {
  try {
    const imageBuffer = Buffer.from(base64String, 'base64');
    const compressedBuffer = await sharp(imageBuffer)
      .resize(640, 480, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 20, progressive: true })
      .toBuffer();
    return compressedBuffer.toString('base64');
  } catch (error) {
    throw error;
  }
}

const GITHUB_OWNER = process.env.GITHUB_USERNAME || '100xsystems';
const GITHUB_REPO = process.env.GITHUB_REPO || '100x-storage';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(req: NextRequest) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({
      success: false,
      error: 'GitHub storage not configured. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables.',
    }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const fileExtension = file.name.split('.').pop() || 'jpg';
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const filePath = `chat-images/${uniqueFilename}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const originalBase64 = fileBuffer.toString('base64');

    let compressedBase64: string;
    try {
      compressedBase64 = await compressBase64Image(originalBase64);
    } catch (compressionError) {
      compressedBase64 = originalBase64;
    }

    const githubResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Upload chat image: ${uniqueFilename}`,
          content: compressedBase64,
          branch: 'main',
        }),
      }
    );

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();
      throw new Error(`GitHub upload failed: ${errorData.message || 'Unknown error'}`);
    }

    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${filePath}`;

    return NextResponse.json({
      success: true,
      url: rawUrl,
      filename: uniqueFilename,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Image upload failed',
    }, { status: 500 });
  }
}
