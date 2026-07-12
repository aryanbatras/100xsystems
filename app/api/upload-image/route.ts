import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { filename, content } = await req.json();

    if (!filename || !content) {
      return NextResponse.json({ error: 'Filename and content are required' }, { status: 400 });
    }

    if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_USERNAME || !process.env.GITHUB_REPO) {
      return NextResponse.json({ error: 'GitHub configuration missing' }, { status: 500 });
    }

    let sha: string | undefined;
    try {
      const existingFileResponse = await fetch(
        `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/contents/${filename}`,
        {
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      if (existingFileResponse.ok) {
        const existingFile = await existingFileResponse.json();
        sha = existingFile.sha;
      }
    } catch (error) {
      // File doesn't exist yet
    }

    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/contents/${filename}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add image ${filename}`,
          content,
          sha,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`GitHub API error: ${response.status} - ${errorData}`);
    }

    const publicUrl = `https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/main/${filename}`;

    return NextResponse.json({ success: true, publicUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
