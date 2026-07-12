import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { slug, html } = await req.json();

    if (!slug || !html) {
      return NextResponse.json({ success: false, error: 'Missing slug or html content' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.GITHUB_BRANCH || 'main';

    if (!githubToken || !githubUsername || !githubRepo) {
      throw new Error('GitHub credentials not configured');
    }

    const filePath = `articles/${slug}/index.html`;
    const githubApiUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${filePath}`;

    let sha: string | undefined;
    try {
      const existingFileResponse = await fetch(githubApiUrl, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      if (existingFileResponse.ok) {
        const existingFile = await existingFileResponse.json();
        sha = existingFile.sha;
      }
    } catch (error) {
      // File doesn't exist yet
    }

    const contentBase64 = Buffer.from(html, 'utf8').toString('base64');

    const response = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Publish article: ${slug}`,
        content: contentBase64,
        branch: githubBranch,
        sha,
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const publicUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/${githubBranch}/${filePath}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      size: html.length,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
