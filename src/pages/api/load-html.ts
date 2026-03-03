import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug parameter is required' });
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;
    const githubOwner = process.env.GITHUB_USERNAME; // Use USERNAME instead of missing OWNER

    // Debug logging
    console.log('🔍 Load HTML API Debug:', {
      slug,
      hasToken: !!githubToken,
      hasRepo: !!githubRepo,
      hasOwner: !!githubOwner,
      tokenLength: githubToken?.length
    });

    if (!githubToken || !githubRepo || !githubOwner) {
      console.error('❌ Missing GitHub environment variables:', {
        GITHUB_TOKEN: !!githubToken,
        GITHUB_REPO: !!githubRepo,
         GITHUB_OWNER: !!githubOwner
      });
      return res.status(500).json({ error: 'GitHub configuration missing' });
    }

    const filePath = `articles/${slug}.html`;
    const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`;

    console.log('🔍 Fetching from URL:', url);

    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (response.status === 404) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      return res.status(500).json({ error: `GitHub API error: ${response.status} - ${errorData}` });
    }

    const fileData = await response.json();
    
    if (fileData.type !== 'file') {
      return res.status(404).json({ error: 'Article file not found' });
    }

    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');

    return res.status(200).json({
      html: content,
      sha: fileData.sha,
      download_url: fileData.download_url
    });

  } catch (error) {
    console.error('Error loading HTML:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to load article' 
    });
  }
}
