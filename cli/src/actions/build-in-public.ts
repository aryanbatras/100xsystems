/**
 * ## Build in Public Action
 *
 * Creates and updates a public GitHub Gist showing the user's learning
 * progress across 100xSystems. The gist can be pinned to the user's
 * GitHub profile or shared on social media.
 *
 * @packageDocumentation
 */

import fs from 'fs';
import path from 'path';
import { ensureAuthenticated } from '../auth/index.js';
import { loadProgress } from './progress.js';
import { getAllSystems, getSystemMeta } from '../reader/system-reader.js';
import type { ProgressData } from '../reader/index.js';

// ─── Types ──────────────────────────────────────────────────────────

export interface BuildInPublicStatus {
  gistId: string | null;
  gistUrl: string | null;
  lastUpdated: string | null;
  isActive: boolean;
}

export interface GistConfig {
  gistId: string;
  gistUrl: string;
  createdAt: string;
  lastUpdated: string;
}

// ─── Config Storage ─────────────────────────────────────────────────

const CONFIG_PATH = () => path.resolve(
  process.env.HOME || process.env.USERPROFILE || '~',
  '.100x',
  'public-gist.json',
);

function loadConfig(): GistConfig | null {
  try {
    const f = CONFIG_PATH();
    if (!fs.existsSync(f)) return null;
    return JSON.parse(fs.readFileSync(f, 'utf-8'));
  } catch {
    return null;
  }
}

function saveConfig(config: GistConfig): void {
  try {
    const f = CONFIG_PATH();
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, JSON.stringify(config, null, 2), 'utf-8');
  } catch {
    // Best effort
  }
}

// ─── Gist Content Generator ─────────────────────────────────────────

function generateGistContent(): string {
  const progress = loadProgress();
  const allSystems = getAllSystems();

  const completed: string[] = [];
  const inProgress: string[] = [];
  const notStarted: string[] = [];

  for (const sys of allSystems) {
    const entry = progress.systems[sys.slug];
    if (!entry || entry.status === 'not-started') {
      notStarted.push(sys.slug);
    } else if (entry.status === 'completed') {
      completed.push(sys.slug);
    } else {
      inProgress.push(sys.slug);
    }
  }

  const total = allSystems.length;
  const pct = total > 0 ? Math.round((completed.length / total) * 100) : 0;

  // Progress bar: 20 characters wide = 5% per character (100 / 20)
  const barWidth = 20;
  const filledChars = Math.round(pct / (100 / barWidth));
  const progressBar = '█'.repeat(filledChars) + '░'.repeat(barWidth - filledChars);

  let markdown = `# 100xSystems — Build in Public\n\n`;
  markdown += `> Learning systems engineering by building real projects.\n\n`;
  markdown += `## Progress\n\n`;
  markdown += `**${completed.length}/${total}** systems completed (${pct}%)\n\n`;
  markdown += `${progressBar}\n\n`;
  markdown += `[100xSystems](https://100xsystems.dev) is an open-source platform for learning how real systems work.\n\n`;

  if (completed.length > 0) {
    markdown += `## ✅ Completed\n\n`;
    for (const slug of completed) {
      const info = getSystemMeta(slug);
      markdown += `- [x] **${info?.title || slug}** ${info?.difficulty ? `(${info.difficulty})` : ''}\n`;
    }
    markdown += `\n`;
  }

  if (inProgress.length > 0) {
    markdown += `## 🔄 In Progress\n\n`;
    for (const slug of inProgress) {
      const info = getSystemMeta(slug);
      const entry = progress.systems[slug];
      markdown += `- [ ] **${info?.title || slug}** — started ${entry?.startedAt ? new Date(entry.startedAt).toLocaleDateString() : 'recently'}\n`;
    }
    markdown += `\n`;
  }

  if (notStarted.length > 0) {
    markdown += `## 📋 Up Next\n\n`;
    for (const slug of notStarted.slice(0, 5)) {
      const info = getSystemMeta(slug);
      markdown += `- ${info?.title || slug}\n`;
    }
    if (notStarted.length > 5) {
      markdown += `- … and ${notStarted.length - 5} more\n`;
    }
    markdown += `\n`;
  }

  markdown += `---\n\n`;
  markdown += `_Automatically updated by [100xSystems CLI](https://github.com/100xsystems/100xsystems)_\n`;
  markdown += `<!-- generated at ${new Date().toISOString()} -->\n`;

  return markdown;
}

// ─── GitHub Gist API ────────────────────────────────────────────────

const GITHUB_API = 'https://api.github.com';

/**
 * Initialize a new public gist with progress data.
 * Returns the gist URL.
 */
export async function initGist(): Promise<BuildInPublicStatus> {
  const auth = await ensureAuthenticated();
  const token = auth.token;
  const content = generateGistContent();

  const response = await fetch(`${GITHUB_API}/gists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': '100xsystems-cli/0.1.0',
    },
    body: JSON.stringify({
      description: '100xSystems — Build in Public progress tracker',
      public: true,
      files: {
        '100xsystems-progress.md': {
          content,
        },
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => '');
    throw new Error(`Failed to create gist: ${response.status}\n${err}`);
  }

  const data = await response.json();

  const config: GistConfig = {
    gistId: data.id,
    gistUrl: data.html_url,
    createdAt: data.created_at,
    lastUpdated: new Date().toISOString(),
  };

  saveConfig(config);

  return {
    gistId: config.gistId,
    gistUrl: config.gistUrl,
    lastUpdated: config.lastUpdated,
    isActive: true,
  };
}

/**
 * Update an existing gist with the latest progress data.
 */
export async function updateGist(): Promise<BuildInPublicStatus> {
  const config = loadConfig();
  if (!config) {
    throw new Error(
      'No gist configured. Run `100x public init` first to create one.'
    );
  }

  const auth = await ensureAuthenticated();
  const token = auth.token;
  const content = generateGistContent();

  const response = await fetch(`${GITHUB_API}/gists/${config.gistId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': '100xsystems-cli/0.1.0',
    },
    body: JSON.stringify({
      description: '100xSystems — Build in Public progress tracker',
      files: {
        '100xsystems-progress.md': {
          content,
        },
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => '');
    throw new Error(`Failed to update gist: ${response.status}\n${err}`);
  }

  const data = await response.json();
  config.lastUpdated = new Date().toISOString();
  saveConfig(config);

  return {
    gistId: config.gistId,
    gistUrl: data.html_url || config.gistUrl,
    lastUpdated: config.lastUpdated,
    isActive: true,
  };
}

/**
 * Get the current build-in-public status.
 */
export function getStatus(): BuildInPublicStatus {
  const config = loadConfig();
  if (!config) {
    return {
      gistId: null,
      gistUrl: null,
      lastUpdated: null,
      isActive: false,
    };
  }

  return {
    gistId: config.gistId,
    gistUrl: config.gistUrl,
    lastUpdated: config.lastUpdated,
    isActive: true,
  };
}

/**
 * Delete the gist config (stop tracking).
 */
export function stopGist(): void {
  try {
    const f = CONFIG_PATH();
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
    }
  } catch {
    // Best effort
  }
}
