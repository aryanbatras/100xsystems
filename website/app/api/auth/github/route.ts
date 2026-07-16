import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub OAuth Proxy — Vercel Serverless Function
 *
 * Acts as a secure intermediary between the 100xsystems CLI and GitHub's OAuth.
 * The CLI never sees the client_secret — only this proxy handles it.
 *
 * Flow:
 *   1. CLI calls GET /api/auth/github?redirect_uri=http://localhost:PORT/callback
 *   2. This function redirects to GitHub's authorize URL
 *   3. User authorizes on GitHub
 *   4. GitHub redirects back to /api/auth/github/callback?code=...
 *   5. This function exchanges the code for a token (using client_secret)
 *   6. Redirects back to the CLI's localhost redirect_uri with the token
 */

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';
const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API_URL = 'https://api.github.com';

// ─── GET /api/auth/github — Initiate OAuth flow ─────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'authorize';

  if (action === 'callback') {
    return handleCallback(request);
  }

  // Default: redirect to GitHub authorize
  const redirectUri = searchParams.get('redirect_uri');
  const state = searchParams.get('state');
  const codeChallenge = searchParams.get('code_challenge');

  if (!redirectUri) {
    return NextResponse.json(
      { error: 'Missing redirect_uri parameter. CLI must provide the local callback URL.' },
      { status: 400 }
    );
  }

  // Build the GitHub authorize URL with PKCE
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set('redirect_uri', `${request.nextUrl.origin}/api/auth/github?action=callback&redirect_uri=${encodeURIComponent(redirectUri)}`);
  authorizeUrl.searchParams.set('scope', 'repo,user:email');
  authorizeUrl.searchParams.set('response_type', 'code');
  if (state) authorizeUrl.searchParams.set('state', state);
  if (codeChallenge) {
    authorizeUrl.searchParams.set('code_challenge', codeChallenge);
    authorizeUrl.searchParams.set('code_challenge_method', 'S256');
  }

  return NextResponse.redirect(authorizeUrl);
}

// ─── Handle callback from GitHub ────────────────────────────────────

async function handleCallback(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const redirectUri = searchParams.get('redirect_uri');
  const error = searchParams.get('error');

  if (error) {
    const redirectErrorUrl = new URL(redirectUri || 'http://localhost');
    redirectErrorUrl.searchParams.set('error', `GitHub authorization denied: ${error}`);
    return NextResponse.redirect(redirectErrorUrl);
  }

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code from GitHub.' },
      { status: 400 }
    );
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${request.nextUrl.origin}/api/auth/github?action=callback${redirectUri ? `&redirect_uri=${encodeURIComponent(redirectUri)}` : ''}`,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      const errorUrl = new URL(redirectUri || 'http://localhost');
      errorUrl.searchParams.set('error', `Token exchange failed: ${tokenResponse.status}`);
      return NextResponse.redirect(errorUrl);
    }

    const tokenData: any = await tokenResponse.json();

    if (tokenData.error) {
      const errorUrl = new URL(redirectUri || 'http://localhost');
      errorUrl.searchParams.set('error', tokenData.error_description || tokenData.error);
      return NextResponse.redirect(errorUrl);
    }

    // Fetch user info
    const userResponse = await fetch(`${GITHUB_API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': '100xsystems-cli',
      },
    });

    let userName = '';
    if (userResponse.ok) {
      const userData: any = await userResponse.json();
      userName = userData.login;
    }

    // Redirect back to the CLI's localhost server with the token
    const successUrl = new URL(redirectUri || 'http://localhost');
    successUrl.searchParams.set('token', tokenData.access_token);
    successUrl.searchParams.set('user', userName);
    successUrl.searchParams.set('token_type', tokenData.token_type || 'bearer');
    successUrl.searchParams.set('scope', tokenData.scope || '');

    return NextResponse.redirect(successUrl);
  } catch (err: any) {
    const errorUrl = new URL(redirectUri || 'http://localhost');
    errorUrl.searchParams.set('error', `Auth proxy error: ${err.message}`);
    return NextResponse.redirect(errorUrl);
  }
}
