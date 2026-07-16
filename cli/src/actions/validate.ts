/**
 * ## Validate Action
 *
 * Runs validation checks against a user's project.
 * Integrates with the executor plugin system for lesson-specific validation.
 *
 * @packageDocumentation
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { readProjectConfig, PROJECT_CONFIG } from '../scaffold/index.js';
import { runLessonValidators } from '../executors/index.js';
import type { ExecutorResult } from '../executors/index.js';
import { CURRICULUM_DIR } from '../reader/index.js';
import type { SpecCheck } from '../reader/index.js';
import { getSpec } from '../reader/spec-reader.js';

// ─── Exported Types ─────────────────────────────────────────────────

export interface ValidationResult {
  check: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  category: 'documentation' | 'structure' | 'code' | 'git' | 'validation' | 'test' | 'build' | 'lesson' | 'spec';
  details?: string;
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Run validation checks and return results.
 * Integrates with the executor plugin system to run lesson-specific validators.
 *
 * @param projectDir - Absolute path to the project
 * @param config - Project config from 100xsystems.json
 * @param lessonSlug - Optional: only run validators for this specific lesson.
 *                     If not provided, uses currentLesson from progress tracking.
 */
export async function runValidation(
  projectDir: string,
  config: Record<string, any>,
  lessonSlug?: string,
): Promise<ValidationResult[]> {
  if (!config) {
    throw new Error('Config is required to run validation. Run `100x init <system>` first.');
  }

  const results: ValidationResult[] = [];
  const systemSlug = (config.system as string) || '';
  const trackSlug = (config.track as string) || '';

  // Determine which lesson to validate
  let targetLesson = lessonSlug;
  if (!targetLesson && systemSlug) {
    // Read from 100xsystems.json progress, not from global progress file
    const configProgress = config.progress || {};
    targetLesson = configProgress.currentLesson || '';
  }

  // Minimal project checks — only README.md is required by convention
  results.push(...checkMinimal(projectDir));

  if (systemSlug) {
    // Run executor-based validators — only for the target lesson
    try {
      const lessonResults = await runLessonValidatorsFromCurriculum(projectDir, systemSlug, trackSlug, targetLesson);
      results.push(...lessonResults);
    } catch (err: any) {
      results.push({
        check: 'executors',
        status: 'warn',
        message: `Could not run lesson validators: ${err.message}`,
        category: 'lesson',
      });
    }

    // Run spec-defined checks from SPECIFICATION.md
    try {
      const specResults = await runSpecChecksFromCurriculum(projectDir, systemSlug);
      results.push(...specResults);
    } catch {
      // Spec checks are optional — skip gracefully
    }
  }

  results.sort((a, b) => {
    const order: Record<string, number> = { fail: 0, warn: 1, pass: 2 };
    return (order[a.status] ?? 0) - (order[b.status] ?? 0);
  });

  return results;
}

// ─── Lesson Validator Integration ───────────────────────────────────

/**
 * Execute validators for a specific lesson in the system's curriculum.
 * Uses the track slug from 100xsystems.json to find the track directory.
 * Only runs validators from that single lesson — not all lessons.
 */
async function runLessonValidatorsFromCurriculum(
  projectDir: string,
  systemSlug: string,
  trackSlug: string,
  lessonSlug?: string
): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  const systemDir = path.join(CURRICULUM_DIR(), 'systems', systemSlug);
  if (!fs.existsSync(systemDir)) return results;

  // Find the track directory by slug
  const trackDir = path.join(systemDir, trackSlug);
  if (!fs.existsSync(trackDir)) return results;

  // Find all lessons with validators and locate the target
  const lessonsWithValidators = findLessonsWithValidators(trackDir);

  // If a specific lesson slug is given, only run that lesson's validators
  const targetLesson = lessonSlug
    ? lessonsWithValidators.find(l => l.slug === lessonSlug)
    : null;

  const lessonsToRun = targetLesson ? [targetLesson] : [];

  if (lessonsToRun.length === 0 && lessonSlug) {
    // Lesson slug specified but no validators found for it — try finding by filename
    const allLessons = findAllLessonFiles(trackDir);
    const matchingLesson = allLessons.find(l => l.slug === lessonSlug);
    if (matchingLesson) {
      results.push({
        check: 'lesson-lookup',
        status: 'warn',
        message: `Lesson "${lessonSlug}" found but has no validators defined in its frontmatter.`,
        category: 'lesson',
      });
    } else {
      results.push({
        check: 'lesson-lookup',
        status: 'warn',
        message: `Lesson "${lessonSlug}" not found in track ${trackSlug}.`,
        category: 'lesson',
      });
    }
  }

  // Run validators for the target lesson(s)
  for (const lesson of lessonsToRun) {
    const ctx = {
      projectDir,
      lessonDir: lesson.dir,
      workspace: systemSlug,
    };

    const executorResults = await runLessonValidators(lesson.validators, ctx);

    for (const er of executorResults) {
      results.push({
        check: er.check,
        status: er.status as 'pass' | 'warn' | 'fail',
        message: er.message,
        category: er.category as any,
        details: er.details,
      });
    }
  }

  return results;
}

/**
 * Find ALL lesson files in a track directory (flat list with slugs).
 */
function findAllLessonFiles(trackDir: string): Array<{ slug: string; dir: string }> {
  const lessons: Array<{ slug: string; dir: string }> = [];
  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('.')) {
          const slug = entry.name.replace(/\.md$/, '').replace(/^\d+[-_]/, '');
          lessons.push({ slug, dir });
        }
      }
    } catch {}
  }
  walk(trackDir);
  return lessons;
}

/**
 * Get the name of the current lesson from the directory path.
 * Returns "Module / Lesson" formatted string, or null if no lesson context.
 */
export function getCurrentLessonInfo(lessonDir: string): { moduleName: string; lessonName: string } | null {
  try {
    const parts = lessonDir.split(path.sep);
    const moduleDir = parts[parts.length - 2];
    const lessonDirName = parts[parts.length - 1];
    if (!moduleDir || !lessonDirName) return null;

    const moduleName = moduleDir.replace(/^module-\d+-?/, '').replace(/[-_]/g, ' ').trim();
    const lessonName = lessonDirName.replace(/^\d+-?/, '').replace(/[-_]/g, ' ').trim();
    return {
      moduleName: moduleName.charAt(0).toUpperCase() + moduleName.slice(1),
      lessonName: lessonName.charAt(0).toUpperCase() + lessonName.slice(1),
    };
  } catch {
    return null;
  }
}

/**
 * Walk a track directory recursively to find lessons with frontmatter validation configs.
 */
function findLessonsWithValidators(trackDir: string): Array<{ dir: string; slug: string; validators: any[] }> {
  const lessons: Array<{ dir: string; slug: string; validators: any[] }> = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      const mdFiles = entries.filter(
        (e) => e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('.')
      );

      for (const mdFile of mdFiles) {
        const mdPath = path.join(dir, mdFile.name);
        try {
          const content = fs.readFileSync(mdPath, 'utf-8');
          const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);

          if (frontmatterMatch) {
            const yamlBlock = frontmatterMatch[1];
            const validationMatch = yamlBlock.match(/validation:\s*\n([\s\S]*?)(?=\n\w+:|$)/);
            if (validationMatch) {
              const validators = parseValidationBlock(validationMatch[1]);
              if (validators.length > 0) {
                const slug = mdFile.name.replace(/\.md$/, '').replace(/^\d+[-_]/, '');
                lessons.push({ dir, slug, validators });
              }
            }
          }
        } catch { /* skip unreadable files */ }
      }

      const subdirs = entries.filter(
        (e) => e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules'
      );
      for (const subdir of subdirs) {
        walk(path.join(dir, subdir.name));
      }
    } catch { /* skip unreadable directories */ }
  }

  walk(trackDir);
  return lessons;
}

/**
 * Parse a YAML validation block from frontmatter.
 * Handles both flat and nested key-value pairs with proper indentation tracking.
 *
 * Handles formats like:
 * ```yaml
 * validation:
 *   - type: file-exists
 *     path: "src/main.ts"
 *   - type: http
 *     url: "http://localhost:3000/health"
 *     method: GET
 *     expect_status: 200
 *     headers:
 *       Authorization: "Bearer token"
 *   - type: docker
 *     check: compose-services
 *     services:
 *       - "api"
 *       - "db"
 * ```
 */
function parseValidationBlock(yamlStr: string): Record<string, any>[] {
  const validators: Record<string, any>[] = [];
  const lines = yamlStr.split('\n');

  let currentValidator: Record<string, any> | null = null;
  let currentNestedKey: string | null = null;
  let currentArray: string[] | null = null;
  let inArray = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const indent = line.search(/\S/);

    // Start of a new validator (list item at top level)
    if (trimmed.startsWith('- ') && indent < 4) {
      if (currentValidator) {
        // Finalize any pending nested value
        if (currentNestedKey && currentArray) {
          currentValidator[currentNestedKey] = [...currentArray];
          currentArray = null;
          currentNestedKey = null;
          inArray = false;
        }
        validators.push(currentValidator);
      }
      currentValidator = {};
      currentNestedKey = null;
      currentArray = null;
      inArray = false;

      const afterDash = trimmed.slice(2).trim();
      const colonIdx = afterDash.indexOf(':');
      if (colonIdx !== -1) {
        const key = afterDash.slice(0, colonIdx).trim();
        const value = afterDash.slice(colonIdx + 1).trim();
        if (value) {
          currentValidator[key] = parseYamlValue(value);
        } else {
          // Value might be on next lines
          currentNestedKey = key;
        }
      }
      continue;
    }

    // Handle list items in arrays (like services list)
    if (trimmed.startsWith('- ') && inArray && currentArray) {
      currentArray.push(parseYamlValue(trimmed.slice(2).trim()) as string);
      continue;
    }

    // Handle key-value pairs
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) {
      // Could be continuation of a value
      if (currentNestedKey && currentValidator && typeof currentValidator[currentNestedKey] === 'string') {
        currentValidator[currentNestedKey] += ' ' + trimmed;
      }
      continue;
    }

    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    if (currentValidator) {
      // FINALIZE any pending array before processing new key-value pair
      if (currentNestedKey && currentArray && currentArray.length > 0 && !inArray) {
        currentValidator[currentNestedKey] = [...currentArray];
        currentArray = null;
        currentNestedKey = null;
      }

      if (!value) {
        // This could be the start of a nested block or array
        // Save previous array if exists
        if (currentNestedKey && currentArray && currentArray.length > 0) {
          currentValidator[currentNestedKey] = [...currentArray];
        }
        currentNestedKey = key;
        currentArray = [];
        inArray = true; // Assume array until proven otherwise
        continue;
      }

      // It's a simple key: value pair
      currentValidator[key] = parseYamlValue(value);
      // Reset array tracking since we're in a key: value pair, not an array
      if (inArray && currentNestedKey && currentArray && currentArray.length > 0) {
        currentValidator[currentNestedKey] = [...currentArray];
        currentArray = null;
        currentNestedKey = null;
      }
      inArray = false;
    }
  }

  // Finalize last validator
  if (currentValidator) {
    if (currentNestedKey && currentArray && currentArray.length > 0) {
      currentValidator[currentNestedKey] = [...currentArray];
    }
    validators.push(currentValidator);
  }

  return validators;
}

function parseYamlValue(value: string): any {
  const trimmed = value.trim();

  // Remove surrounding quotes
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  // Parse numbers
  const num = Number(trimmed);
  if (!isNaN(num) && trimmed !== '') return num;

  // Parse booleans
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;

  return trimmed;
}

// ─── Minimal Checks ────────────────────────────────────────────────

/**
 * Only checks what lessons define in their frontmatter `validation:`.
 * The only hardcoded convention is README.md — everything else (design/,
 * verification/, src/, git history) is not required.
 * Lesson-defined validators are the primary source of truth.
 */
export function checkMinimal(projectDir: string): ValidationResult[] {
  const results: ValidationResult[] = [];

  // .100x.json — project config (created by init)
  const configPath = path.join(projectDir, PROJECT_CONFIG);
  if (fs.existsSync(configPath)) {
    results.push({ check: 'config', status: 'pass', message: `${PROJECT_CONFIG} project config found`, category: 'structure' });
  }

  // README.md — minimal required documentation
  const readmePath = path.join(projectDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    const content = fs.readFileSync(readmePath, 'utf-8').trim();
    if (content.length >= 50) {
      results.push({ check: 'readme', status: 'pass', message: 'README.md exists with content', category: 'documentation' });
    } else {
      results.push({ check: 'readme', status: 'warn', message: 'README.md exists but is minimal. Add a project description.', category: 'documentation' });
    }
  } else {
    results.push({ check: 'readme', status: 'fail', message: 'README.md is missing. Every project needs a readme.', category: 'documentation' });
  }

  return results;
}

// ─── Spec-Defined Checks (formerly in verify.ts) ──────────────────────

/**
 * Execute all spec-defined checks from the system's SPECIFICATION.md.
 * These check for file existence, doc sections, test passes, etc.
 */
async function runSpecChecksFromCurriculum(
  projectDir: string,
  systemSlug: string
): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  const spec = getSpec(systemSlug);
  if (!spec || spec.checks.length === 0) return results;

  for (const check of spec.checks) {
    const sr = await runSpecCheck(check, projectDir);
    const label = check.path || check.name || check.command || check.type;

    if (sr.result === 'pass') {
      results.push({
        check: `spec-${check.type}`,
        status: 'pass',
        message: `${check.type}: ${label}`,
        category: 'spec',
      });
    } else if (sr.result === 'fail') {
      results.push({
        check: `spec-${check.type}`,
        status: 'fail',
        message: `${check.type}: ${label} — ${sr.hint}`,
        category: 'spec',
      });
    }
  }

  return results;
}

function getFailureHint(check: SpecCheck): string {
  switch (check.type) {
    case 'file-exists': return `Create the file at: ${check.path}`;
    case 'doc-section': return `Add section "${check.name}" to ${check.path}`;
    case 'doc-contains': return `Ensure "${check.name}" is mentioned in ${check.path}`;
    case 'file-count-min': return `Expected at least ${check.name} file(s) in ${check.path}`;
    case 'test-passes': return `Run: ${check.command}`;
    case 'custom-command': return `Run: ${check.command}`;
    default: return '';
  }
}

async function runSpecCheck(check: SpecCheck, projectDir: string): Promise<{ result: 'pass' | 'fail' | 'skip'; hint: string }> {
  switch (check.type) {
    case 'file-exists': {
      if (!check.path) return { result: 'skip', hint: '' };
      const exists = fs.existsSync(path.join(projectDir, check.path));
      return exists
        ? { result: 'pass', hint: '' }
        : { result: 'fail', hint: getFailureHint(check) };
    }
    case 'doc-section': {
      if (!check.path || !check.name) return { result: 'skip', hint: '' };
      const fullPath = path.join(projectDir, check.path);
      if (!fs.existsSync(fullPath)) return { result: 'fail', hint: getFailureHint(check) };
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const pattern = new RegExp(`^##+\\s+${escapeRegex(check.name)}`, 'm');
        return pattern.test(content)
          ? { result: 'pass', hint: '' }
          : { result: 'fail', hint: getFailureHint(check) };
      } catch { return { result: 'fail', hint: '' }; }
    }
    case 'doc-contains': {
      if (!check.path || !check.name) return { result: 'skip', hint: '' };
      const fp = path.join(projectDir, check.path);
      if (!fs.existsSync(fp)) return { result: 'fail', hint: getFailureHint(check) };
      try {
        const lower = fs.readFileSync(fp, 'utf-8').toLowerCase();
        return lower.includes(check.name.toLowerCase())
          ? { result: 'pass', hint: '' }
          : { result: 'fail', hint: getFailureHint(check) };
      } catch { return { result: 'fail', hint: '' }; }
    }
    case 'file-count-min': {
      if (!check.path) return { result: 'skip', hint: '' };
      const fp2 = path.join(projectDir, check.path);
      if (!fs.existsSync(fp2)) return { result: 'fail', hint: getFailureHint(check) };
      try {
        const count = fs.readdirSync(fp2).filter((f) => !f.startsWith('.')).length;
        const min = parseInt(check.name || '1', 10) || 1;
        return count >= min
          ? { result: 'pass', hint: '' }
          : { result: 'fail', hint: getFailureHint(check) };
      } catch { return { result: 'fail', hint: '' }; }
    }
    case 'test-passes':
    case 'custom-command': {
      if (!check.command) return { result: 'skip', hint: '' };
      try {
        execSync(check.command, { cwd: projectDir, stdio: 'pipe', timeout: 60000 });
        return { result: 'pass', hint: '' };
      } catch { return { result: 'fail', hint: getFailureHint(check) }; }
    }
    default:
      return { result: 'skip', hint: '' };
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
