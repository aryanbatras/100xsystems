import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const { githubToken, githubUsername, githubRepo, githubBranch } = getGitHubConfig();
  if (!githubToken || !githubUsername || !githubRepo) {
    return NextResponse.json({ error: 'GitHub credentials not configured' }, { status: 500 });
  }

  try {
    const metaDirUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/meta`;

    const response = await fetch(metaDirUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch meta directory' }, { status: 500 });
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
        // Skip file
      }
    }

    return NextResponse.json(roadmaps);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch roadmaps' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { githubToken, githubUsername, githubRepo, githubBranch } = getGitHubConfig();
  if (!githubToken || !githubUsername || !githubRepo) {
    return NextResponse.json({ error: 'GitHub credentials not configured' }, { status: 500 });
  }

  try {
    const roadmapData = await req.json();

    if (!roadmapData.slug || !roadmapData.title || !roadmapData.description || !roadmapData.sections?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fileName = `${roadmapData.slug}.json`;
    const filePath = `meta/${fileName}`;

    const existingFile = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (existingFile) {
      return NextResponse.json({ error: 'Roadmap already exists' }, { status: 409 });
    }

    const content = buildRoadmapContent(roadmapData);
    await createOrUpdateFile(githubUsername, githubRepo, filePath, content, githubBranch, githubToken, 'Create roadmap');

    return NextResponse.json({ message: 'Roadmap created successfully', slug: roadmapData.slug }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create roadmap', details: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { githubToken, githubUsername, githubRepo, githubBranch } = getGitHubConfig();
  if (!githubToken || !githubUsername || !githubRepo) {
    return NextResponse.json({ error: 'GitHub credentials not configured' }, { status: 500 });
  }

  try {
    const roadmapData = await req.json();

    if (!roadmapData.slug || !roadmapData.title || !roadmapData.description || !roadmapData.sections?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fileName = `${roadmapData.slug}.json`;
    const filePath = `meta/${fileName}`;

    const existingFile = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (!existingFile) {
      return NextResponse.json({ error: 'Roadmap not found' }, { status: 404 });
    }

    const content = buildRoadmapContent(roadmapData);
    await createOrUpdateFile(githubUsername, githubRepo, filePath, content, githubBranch, githubToken, 'Update roadmap');

    return NextResponse.json({ message: 'Roadmap updated successfully', slug: roadmapData.slug });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update roadmap' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { githubToken, githubUsername, githubRepo, githubBranch } = getGitHubConfig();
  if (!githubToken || !githubUsername || !githubRepo) {
    return NextResponse.json({ error: 'GitHub credentials not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Roadmap slug is required' }, { status: 400 });
  }

  try {
    const fileName = `${slug}.json`;
    const filePath = `meta/${fileName}`;

    const existingFile = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (!existingFile) {
      return NextResponse.json({ error: 'Roadmap not found' }, { status: 404 });
    }

    await deleteFile(githubUsername, githubRepo, filePath, githubBranch, githubToken, 'Delete roadmap');

    return NextResponse.json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete roadmap' }, { status: 500 });
  }
}

function getGitHubConfig() {
  return {
    githubToken: process.env.GITHUB_TOKEN,
    githubUsername: process.env.GITHUB_USERNAME,
    githubRepo: process.env.GITHUB_REPO,
    githubBranch: process.env.GITHUB_BRANCH || 'main',
  };
}

function buildRoadmapContent(data: any): string {
  return JSON.stringify({
    title: data.title,
    description: data.description,
    longDescription: data.longDescription,
    sections: data.sections,
    estimatedTime: data.estimatedTime,
    difficulty: data.difficulty,
    category: data.category,
    level: data.level,
    prerequisites: data.prerequisites || [],
    outcomes: data.outcomes || [],
    skills: data.skills || [],
    technologies: data.technologies || [],
    learningObjectives: data.learningObjectives || [],
    keyProjects: data.keyProjects || [],
    assessmentCriteria: data.assessmentCriteria || [],
    author: data.author,
    tags: data.tags || [],
    lastUpdated: new Date().toISOString(),
    version: data.version || '1.0.0',
    totalArticles: data.totalArticles || 0,
    estimatedHours: data.estimatedHours || 0,
    difficultyScore: data.difficultyScore || 30,
    discussionEnabled: data.discussionEnabled ?? true,
    mentorshipAvailable: data.mentorshipAvailable ?? false,
    communityResources: data.communityResources || [],
    certificateAvailable: data.certificateAvailable ?? false,
    certificateRequirements: data.certificateRequirements || [],
  }, null, 2);
}

async function getFileContent(username: string, repo: string, path: string, branch: string, token: string): Promise<string | null> {
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
    return null;
  }
}

async function createOrUpdateFile(username: string, repo: string, path: string, content: string, branch: string, token: string, message: string) {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
  const contentBase64 = Buffer.from(content).toString('base64');

  const existingFile = await getFileContent(username, repo, path, branch, token);

  const body: any = { message, content: contentBase64, branch };

  if (existingFile) {
    const getFileUrl = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`;
    const fileResponse = await fetch(getFileUrl, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
    });
    if (fileResponse.ok) {
      const fileData = await fileResponse.json();
      body.sha = fileData.sha;
    }
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`GitHub API error: ${response.status} - ${(errorData as any).message}`);
  }

  return response.json();
}

async function deleteFile(username: string, repo: string, path: string, branch: string, token: string, message: string) {
  const getFileUrl = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`;
  const fileResponse = await fetch(getFileUrl, {
    headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
  });

  if (!fileResponse.ok) {
    throw new Error('File not found');
  }

  const fileData = await fileResponse.json();

  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, branch, sha: fileData.sha }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
  }

  return response.json();
}
