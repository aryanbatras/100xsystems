import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { filePath } = req.body;

  if (!filePath || typeof filePath !== 'string') {
    return res.status(400).json({ error: 'FilePath parameter is required' });
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;
    const githubOwner = process.env.GITHUB_OWNER;

    if (!githubToken || !githubRepo || !githubOwner) {
      return res.status(500).json({ error: 'GitHub configuration missing' });
    }

    const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`;

    const getResponse = await fetch(url, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (getResponse.status === 404) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!getResponse.ok) {
      const errorData = await getResponse.json();
      return res.status(500).json({ error: `GitHub API error: ${errorData.message}` });
    }

    const fileData = await getResponse.json();

    const deleteResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Delete file: ${filePath}`,
        sha: fileData.sha,
      }),
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      return res.status(500).json({ error: `GitHub API error: ${errorData.message}` });
    }

    const deleteResult = await deleteResponse.json();

    return res.status(200).json({
      message: 'File deleted successfully',
      url: deleteResult.content?.download_url,
      commit: deleteResult.commit
    });

  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to delete file' 
    });
  }
}
