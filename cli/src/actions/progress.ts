import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { getAllSystems, getSystemMeta } from '../reader/system-reader.js';
import { readProjectConfig } from '../scaffold/index.js';
import type { ProgressData, ProgressEntry } from '../reader/index.js';

const PROGRESS_DIR = () => path.resolve(process.env.HOME || process.env.USERPROFILE || '~', '.100x');
const PROGRESS_FILE = () => path.join(PROGRESS_DIR(), 'progress.json');

// ─── Command ────────────────────────────────────────────────────────

/**
 * `100x progress` — Show progress across all systems
 * `100x progress <system>` — Show progress for a specific system
 */
export async function progressCommand(systemSlug?: string): Promise<void> {
  if (systemSlug) {
    await showSystemProgress(systemSlug);
  } else {
    await showAllProgress();
  }
}

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

  // Walk up directories looking for .100x.json files
  // Simple approach: check common locations
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

function showAllProgress(): void {
  detectInProgressProjects();
  const progress = loadProgress();
  const allSystems = getAllSystems();

  const completed = Object.entries(progress.systems)
    .filter(([_, entry]) => entry.status === 'completed')
    .map(([slug]) => slug);

  const inProgress = Object.entries(progress.systems)
    .filter(([_, entry]) => entry.status === 'in-progress')
    .map(([slug]) => slug);

  const notStarted = allSystems
    .map((s) => s.slug)
    .filter((slug) => !completed.includes(slug) && !inProgress.includes(slug));

  console.log(chalk.bold('\n  100xSystems — Your Progress\n'));

  // Completed
  if (completed.length > 0) {
    console.log(`  ${chalk.green('✓ Completed')}`);
    for (const slug of completed) {
      const system = getSystemMeta(slug);
      const entry = progress.systems[slug];
      const date = entry?.completedAt
        ? new Date(entry.completedAt).toLocaleDateString()
        : '';
      console.log(`    ${chalk.green('●')} ${chalk.bold(system?.title || slug)} ${chalk.dim(`(${date})`)}`);
    }
    console.log();
  }

  // In Progress
  if (inProgress.length > 0) {
    console.log(`  ${chalk.yellow('⟳ In Progress')}`);
    for (const slug of inProgress) {
      const system = getSystemMeta(slug);
      const entry = progress.systems[slug];
      console.log(`    ${chalk.yellow('●')} ${chalk.bold(system?.title || slug)}`);
      if (entry?.projectDir) {
        console.log(`       ${chalk.dim(entry.projectDir)}`);
      }
      if (entry?.language) {
        console.log(`       ${chalk.dim(`Language: ${entry.language}`)}`);
      }
    }
    console.log();
  }

  // Not Started
  if (notStarted.length > 0) {
    console.log(`  ${chalk.dim('○ Not Started')}`);
    for (const slug of notStarted) {
      const system = getSystemMeta(slug);
      console.log(`    ${chalk.dim('○')} ${chalk.dim(system?.title || slug)}`);
      console.log(`       ${chalk.dim(`100x init ${slug}  → start building`)}`);
    }
    console.log();
  }

  // Stats
  const total = allSystems.length;
  const pct = total > 0 ? Math.round((completed.length / total) * 100) : 0;
  console.log(`  ${chalk.bold('─'.repeat(40))}`);
  console.log(`  ${chalk.bold('Progress:')} ${completed.length}/${total} systems completed (${pct}%)`);

  // Show next suggested system
  if (notStarted.length > 0) {
    const next = notStarted[0];
    const system = getSystemMeta(next);
    console.log(`  ${chalk.dim('Next:')} ${chalk.cyan(`100x init ${next}`)} ${chalk.dim(`— ${system?.title || ''}`)}`);
  }
  console.log();
}

function showSystemProgress(slug: string): void {
  const system = getSystemMeta(slug);
  if (!system) {
    console.log(chalk.red(`\n  System "${slug}" not found.`));
    return;
  }

  detectInProgressProjects();
  const progress = loadProgress();
  const entry = progress.systems[slug];

  console.log(chalk.bold(`\n  100xSystems — ${system.title}\n`));

  if (!entry || entry.status === 'not-started') {
    console.log(`  ${chalk.dim('Status:')} ○ Not started`);
    console.log();
    console.log(`  ${chalk.cyan(`100x init ${slug}`)}  ${chalk.dim('→ start building')}`);
    console.log(`  ${chalk.cyan(`100x quiz ${slug}`)}  ${chalk.dim('→ take quizzes')}`);
    console.log(`  ${chalk.cyan(`100x resources ${slug}`)}  ${chalk.dim('→ view resources')}`);
    console.log();
    return;
  }

  const statusIcon = entry.status === 'completed' ? chalk.green('✓') : chalk.yellow('⟳');
  console.log(`  ${chalk.dim('Status:')} ${statusIcon} ${entry.status}`);
  if (entry.startedAt) {
    console.log(`  ${chalk.dim('Started:')} ${new Date(entry.startedAt).toLocaleDateString()}`);
  }
  if (entry.completedAt) {
    console.log(`  ${chalk.dim('Completed:')} ${new Date(entry.completedAt).toLocaleDateString()}`);
  }
  if (entry.projectDir) {
    console.log(`  ${chalk.dim('Project:')} ${entry.projectDir}`);
  }
  if (entry.language) {
    console.log(`  ${chalk.dim('Language:')} ${entry.language}`);
  }

  console.log();
  console.log(`  ${chalk.cyan(`100x validate`)}  ${chalk.dim('→ check document completeness')}`);
  console.log(`  ${chalk.cyan(`100x verify`)}  ${chalk.dim('→ verify against specification')}`);
  if (entry.status !== 'completed') {
    console.log(`  ${chalk.cyan(`100x submit ${slug}`)}  ${chalk.dim('→ submit for review')}`);
  }
  console.log();
}

function loadProgress(): ProgressData {
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
