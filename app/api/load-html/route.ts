import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;
    const githubOwner = process.env.GITHUB_USERNAME;

    if (!githubToken || !githubRepo || !githubOwner) {
      return NextResponse.json({ error: 'GitHub configuration missing' }, { status: 500 });
    }

    const filePath = `articles/${slug}/index.html`;
    const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (response.status === 404) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    if (!response.ok) {
      return NextResponse.json({ error: `GitHub API error: ${response.status}` }, { status: 500 });
    }

    const fileData = await response.json();

    if (fileData.type !== 'file') {
      return NextResponse.json({ error: 'Article file not found' }, { status: 404 });
    }

    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');

    return NextResponse.json({
      html: content,
      sha: fileData.sha,
      download_url: fileData.download_url,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to load article',
    }, { status: 500 });
  }
}
