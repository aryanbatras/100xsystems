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

    console.log('📂 Listing articles from GitHub...');
    console.log(`🔍 Repository: ${githubUsername}/${githubRepo}`);

    if (!githubToken || !githubUsername || !githubRepo) {
      console.error('❌ GitHub credentials not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'GitHub credentials not configured' 
      });
    }

    // Get contents of articles directory
    const articlesDirUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/articles`;
    
    console.log('🔍 Fetching articles directory:', articlesDirUrl);

    const response = await fetch(articlesDirUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log('⚠️ Articles directory not found');
        return res.status(200).json({ success: true, articles: [] });
      }
      
      const errorData = await response.text();
      console.error('❌ GitHub API error:', errorData);
      return res.status(500).json({ 
        success: false, 
        error: `GitHub API error: ${response.status} ${response.statusText}` 
      });
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('❌ Unexpected response format:', data);
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

    console.log(`✅ Found ${articles.length} articles:`, articles);

    return res.status(200).json({
      success: true,
      articles
    });

  } catch (error) {
    console.error('❌ Error listing articles:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
