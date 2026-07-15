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
import { readProjectConfig } from '../scaffold/index.js';
import { registry, runLessonValidators } from '../executors/index.js';
import type { ExecutorResult } from '../executors/index.js';
import { CURRICULUM_DIR } from '../reader/index.js';

// ─── Exported Types ─────────────────────────────────────────────────

export interface ValidationResult {
  check: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  category: 'documentation' | 'structure' | 'code' | 'git' | 'validation' | 'test' | 'build' | 'lesson';
  details?: string;
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Run validation checks and return results.
 * Integrates with the executor plugin system to run lesson-specific validators.
 */
export async function runValidation(
  projectDir: string,
  config: Record<string, any>
): Promise<ValidationResult[]> {
  if (!config) {
    throw new Error('Config is required to run validation. Run `100x init <system>` first.');
  }

  const results: ValidationResult[] = [];

  // Run standard documentation & structure checks
  results.push(...checkDocumentation(projectDir));
  results.push(...checkStructure(projectDir));

  try {
    results.push(...checkGitHistory(projectDir));
  } catch {
    // git not available — skip
  }

  // Run executor-based validators from the curriculum
  const systemSlug = (config.system as string) || '';
  const language = (config.language as string) || '';
  if (systemSlug) {
    try {
      const lessonResults = await runLessonValidatorsFromCurriculum(projectDir, systemSlug, language);
      results.push(...lessonResults);
    } catch (err: any) {
      results.push({
        check: 'executors',
        status: 'warn',
        message: `Could not run lesson validators: ${err.message}`,
        category: 'lesson',
      });
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
 * Execute all validators defined in the system's lesson frontmatter.
 * Walks the matching track directory looking for lesson.md files with
 * frontmatter validation configs. Filters by the user's language.
 */
async function runLessonValidatorsFromCurriculum(
  projectDir: string,
  systemSlug: string,
  language: string
): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  const systemDir = path.join(CURRICULUM_DIR(), 'systems', systemSlug);
  if (!fs.existsSync(systemDir)) return results;

  // Only run validators from the track matching the user's language
  const trackPrefix = `track-${language.toLowerCase()}`;
  const tracks = fs.readdirSync(systemDir).filter((name) => {
    if (!name.startsWith('track-')) return false;
    const stat = fs.statSync(path.join(systemDir, name));
    if (!stat.isDirectory()) return false;
    return name.toLowerCase() === trackPrefix.toLowerCase();
  });

  for (const track of tracks) {
    const trackDir = path.join(systemDir, track);
    const lessons = findLessonsWithValidators(trackDir);

    for (const lesson of lessons) {
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
  }

  return results;
}

/**
 * Walk a track directory recursively to find lessons with frontmatter validation configs.
 */
function findLessonsWithValidators(trackDir: string): Array<{ dir: string; validators: any[] }> {
  const lessons: Array<{ dir: string; validators: any[] }> = [];

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
                lessons.push({ dir, validators });
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

// ─── Standard Checks ────────────────────────────────────────────────

export function checkDocumentation(projectDir: string): ValidationResult[] {
  const results: ValidationResult[] = [];

  // README.md
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

  // design/decisions.md — Engineering Decision Log
  const decisionsPath = path.join(projectDir, 'design', 'decisions.md');
  if (fs.existsSync(decisionsPath)) {
    const content = fs.readFileSync(decisionsPath, 'utf-8');
    const hasContext = content.includes('Context') || content.includes('context');
    const hasDecision = content.includes('Decision') || content.includes('decision') || content.includes('chose');
    if (hasContext && hasDecision) {
      results.push({ check: 'decisions', status: 'pass', message: 'design/decisions.md has proper decision log format', category: 'documentation' });
    } else {
      results.push({ check: 'decisions', status: 'warn', message: 'design/decisions.md exists but may be incomplete. Add Context, Options, and Decision sections.', category: 'documentation' });
    }
  } else {
    results.push({ check: 'decisions', status: 'fail', message: 'design/decisions.md (Engineering Decision Log) is missing.', category: 'documentation' });
  }

  // design/architecture.md
  const archPath = path.join(projectDir, 'design', 'architecture.md');
  if (fs.existsSync(archPath)) {
    const content = fs.readFileSync(archPath, 'utf-8');
    const hasComponents = content.includes('Component') || content.includes('component');
    if (hasComponents && content.length >= 100) {
      results.push({ check: 'architecture', status: 'pass', message: 'design/architecture.md describes system architecture', category: 'documentation' });
    } else {
      results.push({ check: 'architecture', status: 'warn', message: 'design/architecture.md exists but may be incomplete', category: 'documentation' });
    }
  } else {
    results.push({ check: 'architecture', status: 'fail', message: 'design/architecture.md is missing.', category: 'documentation' });
  }

  // design/tradeoffs.md
  const tradeoffsPath = path.join(projectDir, 'design', 'tradeoffs.md');
  if (fs.existsSync(tradeoffsPath)) {
    const content = fs.readFileSync(tradeoffsPath, 'utf-8');
    const hasTradeoff = content.includes('Trade') || content.includes('Sacrificed') || content.includes('Weakness');
    if (hasTradeoff && content.length >= 100) {
      results.push({ check: 'tradeoffs', status: 'pass', message: 'design/tradeoffs.md acknowledges trade-offs', category: 'documentation' });
    } else {
      results.push({ check: 'tradeoffs', status: 'warn', message: 'design/tradeoffs.md exists but may be incomplete', category: 'documentation' });
    }
  } else {
    results.push({ check: 'tradeoffs', status: 'warn', message: 'design/tradeoffs.md is missing. Consider adding trade-off analysis.', category: 'documentation' });
  }

  // verification/checklist.md
  const checklistPath = path.join(projectDir, 'verification', 'checklist.md');
  if (fs.existsSync(checklistPath)) {
    results.push({ check: 'checklist', status: 'pass', message: 'verification/checklist.md exists', category: 'documentation' });
  } else {
    results.push({ check: 'checklist', status: 'warn', message: 'verification/checklist.md is missing. Self-assessment helps reviewers.', category: 'documentation' });
  }

  return results;
}

export function checkStructure(projectDir: string): ValidationResult[] {
  const results: ValidationResult[] = [];

  // .100x.json
  const configPath = path.join(projectDir, '.100x.json');
  if (fs.existsSync(configPath)) {
    results.push({ check: 'config', status: 'pass', message: '.100x.json project config found', category: 'structure' });
  }

  // Check for source code directory
  const srcDir = path.join(projectDir, 'src');
  if (fs.existsSync(srcDir)) {
    const srcFiles = fs.readdirSync(srcDir).filter((f: string) => {
      const fullPath = path.join(srcDir, f);
      return fs.statSync(fullPath).isFile() && !f.startsWith('.');
    });
    if (srcFiles.length > 0) {
      results.push({ check: 'source', status: 'pass', message: `Source code directory with ${srcFiles.length} file(s)`, category: 'structure' });
    } else {
      results.push({ check: 'source', status: 'warn', message: 'src/ directory is empty', category: 'structure' });
    }
  } else {
    // Maybe Java structure
    const javaDir = path.join(projectDir, 'src', 'main', 'java');
    if (fs.existsSync(javaDir)) {
      const javaFiles = fs.readdirSync(javaDir, { recursive: true } as any)
        .filter((f: any): f is string => typeof f === 'string' && (f as string).endsWith('.java'));
      if (javaFiles.length > 0) {
        results.push({ check: 'source', status: 'pass', message: `Java source files found (${javaFiles.length})`, category: 'structure' });
      } else {
        results.push({ check: 'source', status: 'warn', message: 'Java source directory exists but is empty', category: 'structure' });
      }
    } else {
      results.push({ check: 'source', status: 'warn', message: 'No source code directory found (src/ or src/main/java/)', category: 'structure' });
    }
  }

  // Check for design/ directory
  const designDir = path.join(projectDir, 'design');
  if (fs.existsSync(designDir)) {
    const designFiles = fs.readdirSync(designDir).filter((f: string) => f.endsWith('.md'));
    results.push({ check: 'design-dir', status: 'pass', message: `design/ directory with ${designFiles.length} file(s)`, category: 'structure' });
  }

  return results;
}

function checkGitHistory(projectDir: string): ValidationResult[] {
  const results: ValidationResult[] = [];
  const gitDir = path.join(projectDir, '.git');

  if (!fs.existsSync(gitDir)) {
    results.push({ check: 'git', status: 'warn', message: 'Not a git repository. Version control is recommended.', category: 'git' });
    return results;
  }

  // Check for recent commits
  try {
    const commitCount = execSync('git rev-list --count HEAD', {
      cwd: projectDir,
      stdio: 'pipe',
      timeout: 5000,
    }).toString().trim();

    if (parseInt(commitCount, 10) > 0) {
      results.push({ check: 'git-commits', status: 'pass', message: `Git repository with ${commitCount} commit(s)`, category: 'git' });
    }
  } catch {
    results.push({ check: 'git-commits', status: 'warn', message: 'No commits yet. Make your first commit.', category: 'git' });
  }

  // Check if documentation is up-to-date with code changes
  try {
    const lastDocUpdate = execSync(
      'git log -1 --format="%at" -- design/ README.md 2>/dev/null || echo "0"',
      { cwd: projectDir, stdio: 'pipe', timeout: 5000 }
    ).toString().trim();

    const lastCodeUpdate = execSync(
      'git log -1 --format="%at" -- src/ 2>/dev/null || echo "0"',
      { cwd: projectDir, stdio: 'pipe', timeout: 5000 }
    ).toString().trim();

    if (lastDocUpdate && lastCodeUpdate && parseInt(lastCodeUpdate) > parseInt(lastDocUpdate)) {
      results.push({ check: 'doc-sync', status: 'warn', message: 'Source code was updated more recently than documentation. Consider updating docs.', category: 'git' });
    }
  } catch {
    // Ignore — git might not be available
  }

  return results;
}
