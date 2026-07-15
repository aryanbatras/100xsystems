import fs from 'fs';
import path from 'path';
import { createHash, randomBytes } from 'crypto';

// ─── OAuth Configuration ────────────────────────────────────────────
// For now, we use a built-in client_id that's registered for 100xSystems CLI.
// Users can override via env var or by creating their own OAuth app.
//
// To set up your own:
//   1. Go to https://github.com/settings/developers
//   2. Create a new OAuth App
//   3. Set Authorization callback URL to any valid URL (device flow doesn't use it)
//   4. Copy the Client ID
//   5. Export CLIENT_ID in your env, or the CLI will use the default
//
// Scopes needed: "repo" (to create PRs against reviews repo), "user:email"

const GITHUB_DEVICE_CODE_URL = 'https://github.com/login/device/code';
const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API_URL = 'https://api.github.com';
// ═══════════════════════════════════════════════════════════════
// Register your own OAuth App so users can authenticate with GitHub.
//
// 1. Go to https://github.com/settings/developers
// 2. Click OAuth Apps → New OAuth App
// 3. Fill in:
//    - Application name: "100xSystems CLI"
//    - Homepage URL: https://github.com/aryanbatras/100xsystems
//    - Authorization callback URL: http://localhost
//    - ✅ Enable Device Flow (must be checked)
// 4. Click Register application
// 5. Copy the Client ID shown on the next page
// 6. Replace the value below with your real Client ID
//
// Then run: export GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxx
// Or hardcode it below.
// ═══════════════════════════════════════════════════════════════
// Allow override via env var (useful for contributors who want to use their own OAuth App)
const DEFAULT_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23li0E1qp01QZyjXX3';

const AUTH_DIR = () => path.resolve(process.env.HOME || process.env.USERPROFILE || '~', '.100x');
const AUTH_FILE = () => path.join(AUTH_DIR(), 'auth.json');

interface AuthToken {
  accessToken: string;
  tokenType: string;
  scope: string;
  expiresAt?: number;
  createdAt: string;
  user?: {
    login: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Ensure the user is authenticated with GitHub.
 * Returns the access token and user info.
 * Caches the token locally so re-auth is not needed every time.
 */
export async function ensureAuthenticated(): Promise<{ token: string; user: string }> {
  const cached = loadCachedToken();
  if (cached && cached.accessToken) {
    // Check if token is expired (if we have an expiry)
    if (cached.expiresAt && cached.expiresAt < Date.now()) {
      console.log('  Token expired. Re-authenticating...');
      return authenticate();
    }
    return { token: cached.accessToken, user: cached.user?.login || 'unknown' };
  }

  return authenticate();
}

/**
 * Authenticate using GitHub OAuth Device Flow.
 * Device flow is designed for CLIs — no redirect URI needed.
 */
async function authenticate(): Promise<{ token: string; user: string }> {
  const clientId = process.env.GITHUB_CLIENT_ID || DEFAULT_CLIENT_ID;
  const scope = 'repo,user:email';

  console.log('\n  ' + '─'.repeat(40));
  console.log('  GitHub Authentication Required');
  console.log('  ' + '─'.repeat(40) + '\n');

  // Step 1: Request device and user codes
  const deviceCodeResponse = await fetch(GITHUB_DEVICE_CODE_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      scope,
    }),
  });

  if (!deviceCodeResponse.ok) {
    const error = await deviceCodeResponse.text();
    throw new Error(`Failed to start device auth: ${error}`);
  }

  const deviceData = await deviceCodeResponse.json();

  if (deviceData.error) {
    throw new Error(`Device auth error: ${deviceData.error_description || deviceData.error}`);
  }

  // Step 2: Display user code to user
  console.log(`  ${'→'.padEnd(3)} Go to: ${deviceData.verification_uri}`);
  console.log(`  ${'→'.padEnd(3)} Enter code: ${chalkBold(deviceData.user_code)}`);
  console.log();

  // For headless environments, also show the direct URL
  if (deviceData.verification_uri === 'https://github.com/login/device') {
    console.log(`  ${'→'.padEnd(3)} Or open: https://github.com/login/device?user_code=${deviceData.user_code}`);
    console.log();
  }

  console.log(`  ${'→'.padEnd(3)} Waiting for authorization...`);

  // Step 3: Poll for access token
  let accessToken: string | null = null;
  const interval = (deviceData.interval || 5) * 1000;
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes max

  while (!accessToken && attempts < maxAttempts) {
    await sleep(interval);
    attempts++;

    const tokenResponse = await fetch(GITHUB_ACCESS_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        device_code: deviceData.device_code,
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      }),
    });

    if (!tokenResponse.ok) continue;

    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      accessToken = tokenData.access_token;
    } else if (tokenData.error === 'authorization_pending') {
      // Still waiting — show progress
      if (attempts % 6 === 0) {
        process.stdout.write('  Still waiting...\n');
      }
    } else if (tokenData.error === 'slow_down') {
      // GitHub asks us to slow down — wait extra
      await sleep(interval);
    } else if (tokenData.error === 'expired_token') {
      throw new Error('Device code expired. Please try again.');
    } else if (tokenData.error === 'access_denied') {
      throw new Error('Authorization denied by user.');
    }
  }

  if (!accessToken) {
    throw new Error('Authentication timed out. Please try again.');
  }

  console.log('  ✓ Authorization granted!\n');

  // Step 4: Fetch user info
  const userInfo = await fetchGitHubUser(accessToken);

  // Step 5: Cache token
  const authToken: AuthToken = {
    accessToken,
    tokenType: 'bearer',
    scope,
    createdAt: new Date().toISOString(),
    user: {
      login: userInfo.login,
      name: userInfo.name || userInfo.login,
      email: userInfo.email || '',
      avatarUrl: userInfo.avatar_url || '',
    },
  };
  saveToken(authToken);

  console.log(`  ${chalkBold(`Authenticated as: ${authToken.user!.login}`)}\n`);

  return { token: accessToken, user: userInfo.login };
}

/**
 * Clear the cached authentication token.
 */
export function clearAuth(): void {
  try {
    if (fs.existsSync(AUTH_FILE())) {
      fs.unlinkSync(AUTH_FILE());
      console.log('  Authentication cleared.');
    }
  } catch {
    // Ignore
  }
}

/**
 * Check if the user is currently authenticated.
 */
export function isAuthenticated(): boolean {
  const cached = loadCachedToken();
  return cached !== null && !!cached.accessToken;
}

/**
 * Get cached user info without authenticating.
 */
export function getCachedUser(): { login: string; name: string } | null {
  const cached = loadCachedToken();
  if (!cached || !cached.user) return null;
  return { login: cached.user.login, name: cached.user.name };
}

// ─── Internal ───────────────────────────────────────────────────────

function loadCachedToken(): AuthToken | null {
  try {
    if (!fs.existsSync(AUTH_FILE())) return null;
    const raw = fs.readFileSync(AUTH_FILE(), 'utf-8');
    return JSON.parse(raw) as AuthToken;
  } catch {
    return null;
  }
}

function saveToken(token: AuthToken): void {
  try {
    if (!fs.existsSync(AUTH_DIR())) {
      fs.mkdirSync(AUTH_DIR(), { recursive: true });
    }
    fs.writeFileSync(AUTH_FILE(), JSON.stringify(token, null, 2), 'utf-8');
    // Set restrictive permissions
    fs.chmodSync(AUTH_FILE(), 0o600);
  } catch (err) {
    console.warn('  Warning: Could not cache auth token:', (err as Error).message);
  }
}

async function fetchGitHubUser(token: string): Promise<any> {
  const response = await fetch(`${GITHUB_API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'User-Agent': '100xsystems-cli',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user info: ${response.statusText}`);
  }

  return response.json();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function chalkBold(text: string): string {
  // Simple bold without chalk dependency in this module
  return `\x1b[1m${text}\x1b[22m`;
}
