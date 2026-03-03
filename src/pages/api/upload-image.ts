import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, content } = req.body;

    // Debug logging
    console.log('🔍 Upload API Debug:', {
      filename,
      contentLength: content?.length,
      hasToken: !!process.env.GITHUB_TOKEN,
      hasUsername: !!process.env.GITHUB_USERNAME,
      hasRepo: !!process.env.GITHUB_REPO,
      tokenLength: process.env.GITHUB_TOKEN?.length
    });

    if (!filename || !content) {
      return res.status(400).json({ error: 'Filename and content are required' });
    }

    if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_USERNAME || !process.env.GITHUB_REPO) {
      console.error('❌ Missing GitHub environment variables:', {
        GITHUB_TOKEN: !!process.env.GITHUB_TOKEN,
        GITHUB_USERNAME: !!process.env.GITHUB_USERNAME,
        GITHUB_REPO: !!process.env.GITHUB_REPO
      });
      return res.status(500).json({ error: 'GitHub configuration missing' });
    }

    // Check if file already exists to get SHA
    let sha: string | undefined;
    try {
      const existingFileResponse = await fetch(`https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/contents/${filename}`, {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (existingFileResponse.ok) {
        const existingFile = await existingFileResponse.json();
        sha = existingFile.sha;
        console.log('📝 Updating existing image file');
      }
    } catch (error) {
      console.log('📝 Creating new image file');
    }

    const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/contents/${filename}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add image ${filename}`,
        content: content,
        sha: sha, // Include SHA if updating existing file
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`GitHub API error: ${response.status} - ${errorData}`);
    }

    const result = await response.json();
    const publicUrl = `https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/main/${filename}`;

    res.status(200).json({ success: true, publicUrl });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
}
