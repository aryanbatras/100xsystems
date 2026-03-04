import { NextApiRequest, NextApiResponse } from 'next';

interface RoadmapData {
  slug: string;
  title: string;
  description: string;
  sections: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { githubToken, githubUsername, githubRepo, githubBranch } = getGitHubConfig();
  
  if (!githubToken || !githubUsername || !githubRepo) {
    return res.status(500).json({ error: 'GitHub credentials not configured' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return handleGet(req, res, githubToken, githubUsername, githubRepo, githubBranch);
      case 'POST':
        return handleCreate(req, res, githubToken, githubUsername, githubRepo, githubBranch);
      case 'PUT':
        return handleUpdate(req, res, githubToken, githubUsername, githubRepo, githubBranch);
      case 'DELETE':
        return handleDelete(req, res, githubToken, githubUsername, githubRepo, githubBranch);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Roadmap API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function getGitHubConfig() {
  return {
    githubToken: process.env.GITHUB_TOKEN,
    githubUsername: process.env.GITHUB_USERNAME,
    githubRepo: process.env.GITHUB_REPO,
    githubBranch: process.env.GITHUB_BRANCH || 'main'
  };
}

async function handleGet(
  req: NextApiRequest, 
  res: NextApiResponse, 
  githubToken: string, 
  githubUsername: string, 
  githubRepo: string, 
  githubBranch: string
) {
  try {
    const metaDirUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/meta`;
    
    const response = await fetch(metaDirUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch meta directory' });
    }

    const files = await response.json();
    const roadmaps: Record<string, any> = {};
    
    for (const file of files.filter((f: any) => f.name.endsWith('.json'))) {
      try {
        const fileUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/${githubBranch}/meta/${file.name}`;
        const contentResponse = await fetch(fileUrl);
        
        if (contentResponse.ok) {
          const content = await contentResponse.json();
          const slug = file.name.replace('.json', '');
          roadmaps[slug] = { ...content, slug };
        }
      } catch (error) {
        console.warn(`Failed to load roadmap: ${file.name}`, error);
      }
    }
    
    return res.status(200).json(roadmaps);
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return res.status(500).json({ error: 'Failed to fetch roadmaps' });
  }
}

async function handleCreate(
  req: NextApiRequest, 
  res: NextApiResponse, 
  githubToken: string, 
  githubUsername: string, 
  githubRepo: string, 
  githubBranch: string
) {
  const roadmapData: RoadmapData = req.body;
  
  console.log('🔍 Roadmap Create Request:', JSON.stringify(roadmapData, null, 2));
  
  // Validate required fields
  if (!roadmapData.slug || !roadmapData.title || !roadmapData.description || !roadmapData.sections.length) {
    console.error('❌ Validation failed:', { slug: roadmapData.slug, title: roadmapData.title, description: roadmapData.description, sections: roadmapData.sections });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const fileName = `${roadmapData.slug}.json`;
  const filePath = `meta/${fileName}`;
  const content = JSON.stringify({
    title: roadmapData.title,
    description: roadmapData.description,
    sections: roadmapData.sections,
    estimatedTime: roadmapData.estimatedTime,
    difficulty: roadmapData.difficulty
  }, null, 2);

  console.log('📁 File path:', filePath);
  console.log('📄 Content length:', content.length);

  try {
    // Check if file already exists
    const existingFile = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (existingFile) {
      console.error('❌ Roadmap already exists:', roadmapData.slug);
      return res.status(409).json({ error: 'Roadmap already exists' });
    }

    // Create the file
    console.log('🚀 Creating roadmap file...');
    await createOrUpdateFile(githubUsername, githubRepo, filePath, content, githubBranch, githubToken, 'Create roadmap');
    console.log('✅ Roadmap created successfully!');
    
    return res.status(201).json({ message: 'Roadmap created successfully', slug: roadmapData.slug });
  } catch (error) {
    console.error('💥 Error creating roadmap:', error);
    return res.status(500).json({ error: 'Failed to create roadmap', details: (error as Error).message });
  }
}

async function handleUpdate(
  req: NextApiRequest, 
  res: NextApiResponse, 
  githubToken: string, 
  githubUsername: string, 
  githubRepo: string, 
  githubBranch: string
) {
  const roadmapData: RoadmapData = req.body;
  
  // Validate required fields
  if (!roadmapData.slug || !roadmapData.title || !roadmapData.description || !roadmapData.sections.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const fileName = `${roadmapData.slug}.json`;
  const filePath = `meta/${fileName}`;
  const content = JSON.stringify({
    title: roadmapData.title,
    description: roadmapData.description,
    sections: roadmapData.sections,
    estimatedTime: roadmapData.estimatedTime,
    difficulty: roadmapData.difficulty
  }, null, 2);

  try {
    // Check if file exists
    const existingFile = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (!existingFile) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    // Update the file
    await createOrUpdateFile(githubUsername, githubRepo, filePath, content, githubBranch, githubToken, 'Update roadmap');
    
    return res.status(200).json({ message: 'Roadmap updated successfully', slug: roadmapData.slug });
  } catch (error) {
    console.error('Error updating roadmap:', error);
    return res.status(500).json({ error: 'Failed to update roadmap' });
  }
}

async function handleDelete(
  req: NextApiRequest, 
  res: NextApiResponse, 
  githubToken: string, 
  githubUsername: string, 
  githubRepo: string, 
  githubBranch: string
) {
  const { slug } = req.query;
  
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Roadmap slug is required' });
  }

  const fileName = `${slug}.json`;
  const filePath = `meta/${fileName}`;

  try {
    // Check if file exists
    const existingFile = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (!existingFile) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    // Delete the file
    await deleteFile(githubUsername, githubRepo, filePath, githubBranch, githubToken, 'Delete roadmap');
    
    return res.status(200).json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    console.error('Error deleting roadmap:', error);
    return res.status(500).json({ error: 'Failed to delete roadmap' });
  }
}

async function getFileContent(
  username: string, 
  repo: string, 
  path: string, 
  branch: string, 
  token: string
): Promise<string | null> {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    
    return null;
  } catch (error) {
    console.error('Error getting file content:', error);
    return null;
  }
}

async function createOrUpdateFile(
  username: string, 
  repo: string, 
  path: string, 
  content: string, 
  branch: string, 
  token: string, 
  message: string
) {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
  const contentBase64 = Buffer.from(content).toString('base64');
  
  console.log('🔗 GitHub API URL:', url);
  console.log('🔑 Token length:', token.length);
  console.log('📝 Message:', message);
  
  // First try to get existing file to get SHA if it exists
  const existingFile = await getFileContent(username, repo, path, branch, token);
  
  const body = {
    message,
    content: contentBase64,
    branch,
  };

  // Add SHA if file exists (for update)
  if (existingFile) {
    console.log('📄 File exists, getting SHA...');
    const getFileUrl = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`;
    const fileResponse = await fetch(getFileUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (fileResponse.ok) {
      const fileData = await fileResponse.json();
      (body as any).sha = fileData.sha;
      console.log('🔑 SHA found:', fileData.sha);
    }
  } else {
    console.log('📄 Creating new file (no SHA)');
  }

  console.log('📤 Sending request to GitHub...');
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  console.log('📊 GitHub Response Status:', response.status);
  console.log('📊 GitHub Response OK:', response.ok);

  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ GitHub API Error:', JSON.stringify(errorData, null, 2));
    throw new Error(`GitHub API error: ${response.status} - ${(errorData as any).message}`);
  }

  const result = await response.json();
  console.log('✅ GitHub Success:', result);
  return result;
}

async function deleteFile(
  username: string, 
  repo: string, 
  path: string, 
  branch: string, 
  token: string, 
  message: string
) {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
  
  // Get file SHA first
  const getFileUrl = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`;
  const fileResponse = await fetch(getFileUrl, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!fileResponse.ok) {
    throw new Error('File not found');
  }

  const fileData = await fileResponse.json();

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      branch,
      sha: fileData.sha,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
  }

  return response.json();
}
