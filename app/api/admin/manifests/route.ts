import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const { githubToken, githubUsername, githubRepo, githubBranch } = getGitHubConfig();
  if (!githubToken || !githubUsername || !githubRepo) {
    return NextResponse.json({ error: 'GitHub credentials not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/articles`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch articles directory' }, { status: 500 });
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
          // Silently ignore
        }
      }
    }

    return NextResponse.json(manifests);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch manifests' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { githubToken, githubUsername, githubRepo, githubBranch } = getGitHubConfig();
  if (!githubToken || !githubUsername || !githubRepo) {
    return NextResponse.json({ error: 'GitHub credentials not configured' }, { status: 500 });
  }

  try {
    const manifestData = await req.json();

    if (!manifestData.slug || !manifestData.roadmaps?.length || !manifestData.section) {
      return NextResponse.json({ error: 'Missing required fields: slug, roadmaps, section' }, { status: 400 });
    }

    const fileName = 'manifest.json';
    const filePath = `articles/${manifestData.slug}/${fileName}`;

    const articleFolder = await getFolderContent(githubUsername, githubRepo, `articles/${manifestData.slug}`, githubBranch, githubToken);
    if (!articleFolder) {
      return NextResponse.json({ error: 'Article folder not found' }, { status: 404 });
    }

    const existingManifest = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (existingManifest) {
      return NextResponse.json({ error: 'Manifest already exists' }, { status: 409 });
    }

    const content = buildManifestContent(manifestData);
    await createOrUpdateFile(githubUsername, githubRepo, filePath, content, githubBranch, githubToken, 'Create article manifest');

    return NextResponse.json({ message: 'Manifest created successfully', slug: manifestData.slug }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create manifest', details: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { githubToken, githubUsername, githubRepo, githubBranch } = getGitHubConfig();
  if (!githubToken || !githubUsername || !githubRepo) {
    return NextResponse.json({ error: 'GitHub credentials not configured' }, { status: 500 });
  }

  try {
    const manifestData = await req.json();

    if (!manifestData.slug || !manifestData.roadmaps?.length || !manifestData.section) {
      return NextResponse.json({ error: 'Missing required fields: slug, roadmaps, section' }, { status: 400 });
    }

    const fileName = 'manifest.json';
    const filePath = `articles/${manifestData.slug}/${fileName}`;

    const existingManifest = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (!existingManifest) {
      return NextResponse.json({ error: 'Manifest not found' }, { status: 404 });
    }

    const content = buildManifestContent(manifestData);
    await createOrUpdateFile(githubUsername, githubRepo, filePath, content, githubBranch, githubToken, 'Update article manifest');

    return NextResponse.json({ message: 'Manifest updated successfully', slug: manifestData.slug });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update manifest' }, { status: 500 });
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
    return NextResponse.json({ error: 'Article slug is required' }, { status: 400 });
  }

  try {
    const fileName = 'manifest.json';
    const filePath = `articles/${slug}/${fileName}`;

    const existingManifest = await getFileContent(githubUsername, githubRepo, filePath, githubBranch, githubToken);
    if (!existingManifest) {
      return NextResponse.json({ error: 'Manifest not found' }, { status: 404 });
    }

    await deleteFile(githubUsername, githubRepo, filePath, githubBranch, githubToken, 'Delete article manifest');

    return NextResponse.json({ message: 'Manifest deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete manifest' }, { status: 500 });
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

function buildManifestContent(data: any): string {
  return JSON.stringify({
    roadmaps: data.roadmaps,
    section: data.section,
    order: data.order,
    difficulty: data.difficulty,
    author: data.author,
    tags: data.tags,
    podcast: data.podcast,
    discussion: data.discussion,
    resources: data.resources,
  }, null, 2);
}

async function getFolderContent(username: string, repo: string, path: string, branch: string, token: string): Promise<boolean> {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`;
  try {
    const response = await fetch(url, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function getFileContent(username: string, repo: string, path: string, branch: string, token: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`;
  try {
    const response = await fetch(url, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
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

  if (!fileResponse.ok) throw new Error('File not found');
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
