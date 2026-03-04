import { NextApiRequest, NextApiResponse } from 'next';

interface ArticleManifest {
  slug: string;
  roadmaps: string[];
  section: string;
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  tags: string[];
  podcast?: {
    enabled: boolean;
    url?: string;
  };
  discussion?: {
    enabled: boolean;
    provider: 'giscus' | 'github';
  };
  resources?: {
    externalLinks?: string[];
    codeExamples?: string[];
  };
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
    console.error('Manifest API error:', error);
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
    const articlesDirUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/articles`;
    
    const response = await fetch(articlesDirUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch articles directory' });
    }

    const folders = await response.json();
    const manifests: Record<string, any> = {};
    
    for (const folder of folders) {
      if (folder.type === 'dir') {
        try {
          const manifestUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/${githubBranch}/articles/${folder.name}/manifest.json`;
          const manifestResponse = await fetch(manifestUrl);
          
          if (manifestResponse.ok) {
            const manifest = await manifestResponse.json();
            manifests[folder.name] = { ...manifest, slug: folder.name };
          }
        } catch (error) {
          // Silently ignore folders without manifests
        }
      }
    }
    
    return res.status(200).json(manifests);
  } catch (error) {
    console.error('Error fetching manifests:', error);
    return res.status(500).json({ error: 'Failed to fetch manifests' });
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
  const manifestData: ArticleManifest = req.body;
  
  console.log('🔍 Manifest Create Request:', JSON.stringify(manifestData, null, 2));
  
  // Validate required fields
  if (!manifestData.slug || !manifestData.roadmaps.length || !manifestData.section) {
    console.error('❌ Validation failed:', { slug: manifestData.slug, roadmaps: manifestData.roadmaps, section: manifestData.section });
    return res.status(400).json({ error: 'Missing required fields: slug, roadmaps, section' });
  }

  const fileName = 'manifest.json';
  const filePath = `articles/${manifestData.slug}/${fileName}`;
  const content = JSON.stringify({
    roadmaps: manifestData.roadmaps,
    section: manifestData.section,
    order: manifestData.order,
    difficulty: manifestData.difficulty,
    author: manifestData.author,
    tags: manifestData.tags,
    podcast: manifestData.podcast,
    discussion: manifestData.discussion,
    resources: manifestData.resources
  }, null, 2);

  console.log('📁 File path:', filePath);
  console.log('📄 Content length:', content.length);

  try {
    // Check if article folder exists
    const articleFolder = await getFolderContent(githubUsername, githubRepo, `articles/${manifestData.slug}`, githubBranch, githubToken);
    if (!articleFolder) {
      console.error('❌ Article folder not found:', manifestData.slug);
      return res.status(404).json({ error: 'Article folder not found' });
    }

    // Check if manifest already exists
    const existingManifest = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (existingManifest) {
      console.error('❌ Manifest already exists:', manifestData.slug);
      return res.status(409).json({ error: 'Manifest already exists' });
    }

    // Create the manifest file
    console.log('🚀 Creating manifest file...');
    await createOrUpdateFile(githubUsername, githubRepo, filePath, content, githubBranch, githubToken, 'Create article manifest');
    console.log('✅ Manifest created successfully!');
    
    return res.status(201).json({ message: 'Manifest created successfully', slug: manifestData.slug });
  } catch (error) {
    console.error('💥 Error creating manifest:', error);
    return res.status(500).json({ error: 'Failed to create manifest', details: (error as Error).message });
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
  const manifestData: ArticleManifest = req.body;
  
  // Validate required fields
  if (!manifestData.slug || !manifestData.roadmaps.length || !manifestData.section) {
    return res.status(400).json({ error: 'Missing required fields: slug, roadmaps, section' });
  }

  const fileName = 'manifest.json';
  const filePath = `articles/${manifestData.slug}/${fileName}`;
  const content = JSON.stringify({
    roadmaps: manifestData.roadmaps,
    section: manifestData.section,
    order: manifestData.order,
    difficulty: manifestData.difficulty,
    author: manifestData.author,
    tags: manifestData.tags,
    podcast: manifestData.podcast,
    discussion: manifestData.discussion,
    resources: manifestData.resources
  }, null, 2);

  try {
    // Check if manifest exists
    const existingManifest = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (!existingManifest) {
      return res.status(404).json({ error: 'Manifest not found' });
    }

    // Update the manifest file
    await createOrUpdateFile(githubUsername, githubRepo, filePath, content, githubBranch, githubToken, 'Update article manifest');
    
    return res.status(200).json({ message: 'Manifest updated successfully', slug: manifestData.slug });
  } catch (error) {
    console.error('Error updating manifest:', error);
    return res.status(500).json({ error: 'Failed to update manifest' });
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
    return res.status(400).json({ error: 'Article slug is required' });
  }

  const fileName = 'manifest.json';
  const filePath = `articles/${slug}/${fileName}`;

  try {
    // Check if manifest exists
    const existingManifest = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (!existingManifest) {
      return res.status(404).json({ error: 'Manifest not found' });
    }

    // Delete the manifest file
    await deleteFile(githubUsername, githubRepo, filePath, githubBranch, githubToken, 'Delete article manifest');
    
    return res.status(200).json({ message: 'Manifest deleted successfully' });
  } catch (error) {
    console.error('Error deleting manifest:', error);
    return res.status(500).json({ error: 'Failed to delete manifest' });
  }
}

async function getFolderContent(
  username: string, 
  repo: string, 
  path: string, 
  branch: string, 
  token: string
): Promise<boolean> {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error checking folder:', error);
    return false;
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
