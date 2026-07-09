import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const { filePath } = await req.json();

    if (!filePath || typeof filePath !== 'string') {
      return NextResponse.json({ error: 'FilePath parameter is required' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;
    const githubOwner = process.env.GITHUB_USERNAME;

    if (!githubToken || !githubRepo || !githubOwner) {
      return NextResponse.json({ error: 'GitHub configuration missing' }, { status: 500 });
    }

    const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`;

    const getResponse = await fetch(url, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (getResponse.status === 404) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    if (!getResponse.ok) {
      const errorData = await getResponse.json();
      return NextResponse.json({ error: `GitHub API error: ${errorData.message}` }, { status: 500 });
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
      return NextResponse.json({ error: `GitHub API error: ${errorData.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to delete file',
    }, { status: 500 });
  }
}
