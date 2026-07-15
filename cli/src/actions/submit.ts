import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { ensureAuthenticated } from '../auth/index.js';
import { getSystemMeta } from '../reader/system-reader.js';
import { readProjectConfig } from '../scaffold/index.js';
import { SUBMISSIONS_DIR } from '../reader/index.js';
import { runValidation } from './validate.js';
import type { ValidationResult } from './validate.js';
export type { ValidationResult };

// ─── Types ──────────────────────────────────────────────────────────

export interface SubmitAnswers {
  repositoryUrl: string;
  language: string;
  difficulty: string;
}

export interface BuildResult {
  slug: string;
  reviewDirName: string;
  user: string;
  metadata: Record<string, any>;
  projectDir: string;
  systemTitle: string;
}

export interface ProjectConfig {
  config: Record<string, any>;
  slug: string;
  projectDir: string;
}

// ─── Exported functions (no I/O — the Pastel command handles display) ─

/**
 * Read and validate the project config.
 * Returns null if no config found.
 */
export function readSubmitConfig(projectDir: string, systemSlug?: string): ProjectConfig | null {
  const config = readProjectConfig(projectDir);
  if (!config) return null;

  const slug = systemSlug || (config.system as string);
  return { config, slug, projectDir };
}

/**
 * Run validation checks on the project.
 * Returns validation results for the Pastel command to display.
 */
export async function validateProject(
  projectDir: string,
  config: Record<string, any>
): Promise<ValidationResult[]> {
  return await runValidation(projectDir, config);
}

/**
 * Authenticate with GitHub and return the username.
 */
export async function authenticateGitHub(): Promise<string> {
  const auth = await ensureAuthenticated();
  return auth.user;
}

/**
 * Detect the git remote URL for the project.
 */
export function detectGitRemote(projectDir: string): string | null {
  try {
    const remote = execSync('git remote get-url origin 2>/dev/null', {
      cwd: projectDir,
      stdio: 'pipe',
      timeout: 5000,
    }).toString().trim();
    if (remote) {
      if (remote.startsWith('git@')) {
        return remote.replace('git@', 'https://').replace('.com:', '.com/').replace(/\.git$/, '');
      }
      return remote.replace(/\.git$/, '');
    }
  } catch {
    // No git remote
  }
  return null;
}

/**
 * Generate a review directory name.
 */
export function reviewDirName(user: string, language: string): string {
  const timestamp = Date.now();
  return `${user}-${language}-${timestamp}`;
}

/**
 * Build the review package: create directory, copy docs, write metadata.
 */
export function buildReviewPackage(
  projectDir: string,
  slug: string,
  user: string,
  answers: SubmitAnswers
): BuildResult {
  const systemMeta = getSystemMeta(slug);
  const config = readProjectConfig(projectDir);
  const systemTitle = config?.systemTitle || systemMeta?.title || slug;

  const timestamp = Date.now();
  const rDirName = `${user}-${answers.language}-${timestamp}`;
  const reviewDir = path.join(SUBMISSIONS_DIR(), slug, rDirName);
  fs.mkdirSync(reviewDir, { recursive: true });

  // Copy documentation files
  const docFiles = [
    { src: 'README.md', dest: 'README.md' },
    { src: 'design/decisions.md', dest: 'design/decisions.md' },
    { src: 'design/architecture.md', dest: 'design/architecture.md' },
    { src: 'design/tradeoffs.md', dest: 'design/tradeoffs.md' },
    { src: 'verification/checklist.md', dest: 'verification/checklist.md' },
    { src: 'SPECIFICATION.md', dest: 'specification/SPECIFICATION.md' },
  ];

  for (const file of docFiles) {
    const srcPath = path.join(projectDir, file.src);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(reviewDir, file.dest);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }

  // Generate metadata
  const metadata = {
    system: slug,
    systemTitle,
    author: user,
    language: answers.language,
    repositoryUrl: answers.repositoryUrl,
    difficulty: answers.difficulty,
    tags: systemMeta?.tags || [],
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  fs.writeFileSync(
    path.join(reviewDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2) + '\n',
  );

  return { slug, reviewDirName: rDirName, user, metadata, projectDir, systemTitle };
}

/**
 * Update the submissions index file.
 */
export function updateSubmissionsIndex(slug: string, metadata: Record<string, any>): void {
  const indexFile = path.join(SUBMISSIONS_DIR(), 'submissions.json');

  let index: Record<string, any[]> = {};
  if (fs.existsSync(indexFile)) {
    try {
      index = JSON.parse(fs.readFileSync(indexFile, 'utf-8'));
    } catch {
      index = {};
    }
  }

  if (!index[slug]) {
    index[slug] = [];
  }

  index[slug].push({
    ...metadata,
    submittedAt: new Date().toISOString(),
  });

  fs.mkdirSync(path.dirname(indexFile), { recursive: true });
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2) + '\n');
}

/**
 * Mark the system as completed in local progress.
 */
export function markProjectCompleted(slug: string): void {
  try {
    // Use already-imported fs and path (synchronous, no circular dep)
    const progressDir = process.env.HOME || process.env.USERPROFILE || '~';
    const progressFile = path.join(progressDir, '.100x', 'progress.json');
    let data: Record<string, any> = { systems: {} };
    if (fs.existsSync(progressFile)) {
      data = JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
    }
    if (!data.systems) data.systems = {};
    data.systems[slug] = { ...data.systems[slug], status: 'completed', completedAt: new Date().toISOString() };
    fs.mkdirSync(path.dirname(progressFile), { recursive: true });
    fs.writeFileSync(progressFile, JSON.stringify(data, null, 2));
  } catch {
    // Silently fail — non-critical
  }
}

/**
 * Check if we're inside the 100xsystems monorepo.
 */
export function isInsideMonorepo(): boolean {
  return fs.existsSync(path.join(process.cwd(), '..', 'curriculum')) ||
    fs.existsSync(path.join(process.cwd(), '..', '..', 'curriculum'));
}
