import fs from 'fs';
import path from 'path';
import { getAllSystems, getSystemMeta } from '../reader/system-reader.js';
import type { ProgressData, ProgressEntry } from '../reader/index.js';

const PROGRESS_DIR = () => path.resolve(process.env.HOME || process.env.USERPROFILE || '~', '.100x');
const PROGRESS_FILE = () => path.join(PROGRESS_DIR(), 'progress.json');

// ─── Public API (data-only — Pastel commands handle Ink display) ───

/**
 * Mark a system as in-progress.
 * Called by `100x init` automatically.
 */
export function markInProgress(systemSlug: string, projectDir: string, language?: string): void {
  const progress = loadProgress();
  const existing = progress.systems[systemSlug];

  progress.systems[systemSlug] = {
    status: existing?.status === 'completed' ? existing.status : 'in-progress',
    startedAt: existing?.startedAt || new Date().toISOString(),
    completedAt: existing?.completedAt,
    projectDir,
    language: language || existing?.language,
  };

  saveProgress(progress);
}

/**
 * Mark a system as completed.
 * Called by `100x submit` after successful PR.
 */
export function markCompleted(systemSlug: string): void {
  const progress = loadProgress();
  const existing = progress.systems[systemSlug] || { status: 'not-started' as const };

  progress.systems[systemSlug] = {
    ...existing,
    status: 'completed',
    completedAt: new Date().toISOString(),
  };

  saveProgress(progress);
}

/**
 * Detect in-progress projects by scanning the file system for .100x.json files.
 */
export function detectInProgressProjects(): void {
  const progress = loadProgress();

  const home = process.env.HOME || process.env.USERPROFILE || '~';
  const commonDirs = [
    process.cwd(),
    path.join(home, 'projects'),
    path.join(home, 'code'),
    path.join(home, 'Documents'),
  ];

  for (const dir of commonDirs) {
    try {
      findProjectsInDir(dir, progress, 3);
    } catch {
      // Skip directories we can't access
    }
  }

  saveProgress(progress);
}

// ─── Internal ───────────────────────────────────────────────────────

export function loadProgress(): ProgressData {
  try {
    if (!fs.existsSync(PROGRESS_FILE())) {
      return { systems: {} };
    }
    return JSON.parse(fs.readFileSync(PROGRESS_FILE(), 'utf-8')) as ProgressData;
  } catch {
    return { systems: {} };
  }
}

function saveProgress(data: ProgressData): void {
  try {
    if (!fs.existsSync(PROGRESS_DIR())) {
      fs.mkdirSync(PROGRESS_DIR(), { recursive: true });
    }
    fs.writeFileSync(PROGRESS_FILE(), JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Silently fail — progress tracking is non-critical
  }
}

function findProjectsInDir(dir: string, progress: ProgressData, maxDepth: number): void {
  if (maxDepth <= 0) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'node_modules') continue;

    const fullPath = path.join(dir, entry.name);
    const configPath = path.join(fullPath, '.100x.json');

    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        const slug = config.system;
        if (slug && !progress.systems[slug]) {
          progress.systems[slug] = {
            status: 'in-progress',
            startedAt: config.createdAt || new Date().toISOString(),
            projectDir: fullPath,
            language: config.language,
          };
        }
      } catch {
        // Invalid config — skip
      }
    } else {
      findProjectsInDir(fullPath, progress, maxDepth - 1);
    }
  }
}
