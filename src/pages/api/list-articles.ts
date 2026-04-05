import { NextApiRequest, NextApiResponse } from 'next';

interface ListArticlesResponse {
  success: boolean;
  articles?: string[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListArticlesResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.GITHUB_BRANCH || 'main';


    if (!githubToken || !githubUsername || !githubRepo) {
      return res.status(500).json({ 
        success: false, 
        error: 'GitHub credentials not configured' 
      });
    }

    // Get contents of articles directory
    const articlesDirUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/articles`;
    

    const response = await fetch(articlesDirUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(200).json({ success: true, articles: [] });
      }
      
      const errorData = await response.text();
      return res.status(500).json({ 
        success: false, 
        error: `GitHub API error: ${response.status} ${response.statusText}` 
      });
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      return res.status(500).json({ 
        success: false, 
        error: 'Unexpected response format from GitHub API' 
      });
    }

    // Filter only directories (article folders)
    const articles = data
      .filter((item: any) => item.type === 'dir')
      .map((item: any) => item.name)
      .sort((a: string, b: string) => a.localeCompare(b));


    return res.status(200).json({
      success: true,
      articles
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
