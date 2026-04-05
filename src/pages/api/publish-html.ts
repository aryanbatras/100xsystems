import { NextApiRequest, NextApiResponse } from 'next';

interface PublishRequest {
  slug: string;
  html: string;
}

interface PublishResponse {
  success: boolean;
  url?: string;
  size?: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublishResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { slug, html }: PublishRequest = req.body;

    if (!slug || !html) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing slug or html content' 
      });
    }


    // GitHub API configuration
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.GITHUB_BRANCH || 'main';

    if (!githubToken || !githubUsername || !githubRepo) {
      throw new Error('GitHub credentials not configured');
    }

    // Create the file path
    const filePath = `articles/${slug}/index.html`;
    const githubApiUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`;

    // Check if file already exists
    let sha: string | undefined;
    try {
      const existingFileResponse = await fetch(githubApiUrl, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (existingFileResponse.ok) {
        const existingFile = await existingFileResponse.json();
        sha = existingFile.sha;
      }
    } catch (error) {
    }

    // Encode HTML content to base64
    const contentBase64 = Buffer.from(html, 'utf8').toString('base64');

    // Create or update the file
    const response = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Publish article: ${slug}`,
        content: contentBase64,
        branch: githubBranch,
        sha: sha, // Include SHA if updating existing file
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const publicUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/${githubBranch}/${filePath}`;


    return res.status(200).json({
      success: true,
      url: publicUrl,
      size: html.length,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
