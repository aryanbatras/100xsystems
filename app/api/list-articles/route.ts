import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME;
    const githubRepo = process.env.GITHUB_REPO;

    if (!githubToken || !githubUsername || !githubRepo) {
      return NextResponse.json({ success: false, error: 'GitHub credentials not configured' }, { status: 500 });
    }

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
      if (response.status === 404) {
        return NextResponse.json({ success: true, articles: [] });
      }
      return NextResponse.json({ success: false, error: `GitHub API error: ${response.status}` }, { status: 500 });
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      return NextResponse.json({ success: false, error: 'Unexpected response format' }, { status: 500 });
    }

    const articles = data
      .filter((item: any) => item.type === 'dir')
      .map((item: any) => item.name)
      .sort((a: string, b: string) => a.localeCompare(b));

    return NextResponse.json({ success: true, articles });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}
