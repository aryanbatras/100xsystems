import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Basic authentication check
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const githubUsername = process.env.GITHUB_USERNAME;
  const githubRepo = process.env.GITHUB_REPO;
  const githubBranch = process.env.GITHUB_BRANCH || 'main';
  
  
  if (!githubToken || !githubUsername || !githubRepo) {
    return res.status(500).json({ 
      error: 'GitHub credentials not configured',
      config: {
        hasToken: !!githubToken,
        hasUsername: !!githubUsername,
        hasRepo: !!githubRepo,
        hasBranch: !!githubBranch
      }
    });
  }

  try {
    // Test GitHub API access
    const testUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}`;
    const response = await fetch(testUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (response.ok) {
      const repoData = await response.json();
      return res.status(200).json({ 
        success: true,
        message: 'GitHub API working',
        repo: {
          name: repoData.name,
          default_branch: repoData.default_branch,
          owner: repoData.owner.login
        }
      });
    } else {
      const errorData = await response.json();
      return res.status(500).json({ 
        error: 'GitHub API failed',
        status: response.status,
        details: errorData
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      error: 'GitHub test failed',
      details: (error as Error).message
    });
  }
}
