import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { readProjectConfig } from '../scaffold/index.js';

// ─── Exported Types ─────────────────────────────────────────────────

export interface ValidationResult {
  check: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  category: 'documentation' | 'structure' | 'code' | 'git';
}

// ─── Command ────────────────────────────────────────────────────────

/**
 * `100x validate` — Check documentation and structure completeness
 * of the current implementation project.
 *
 * Returns the ValidationResult[] array so callers can inspect results.
 */
export async function validateCommand(): Promise<ValidationResult[]> {
  const projectDir = process.cwd();
  const config = readProjectConfig(projectDir);

  if (!config) {
    console.log(chalk.yellow('\n  No .100x.json found in the current directory.'));
    console.log(chalk.dim('  Run `100x init <system>` first to scaffold a project.'));
    return [];
  }

  return await runValidation(projectDir, config);
}

/**
 * Run validation checks and return results.
 * Callers can either:
 *   - Call `validateCommand()` directly (standalone use — prints output + returns results)
 *   - Call `runValidation()` and display results themselves (integrated use like submit)
 */
export async function runValidation(
  projectDir: string,
  config: Record<string, any>
): Promise<ValidationResult[]> {
  if (!config) {
    throw new Error('Config is required to run validation. Run `100x init <system>` first.');
  }

  const results: ValidationResult[] = [];

  results.push(...checkDocumentation(projectDir));
  results.push(...checkStructure(projectDir));

  try {
    results.push(...checkGitHistory(projectDir));
  } catch {
    // git not available — skip
  }

  results.sort((a, b) => {
    const order = { fail: 0, warn: 1, pass: 2 };
    return order[a.status] - order[b.status];
  });

  console.log(chalk.bold(`\n  100xSystems — Validating "${config.systemTitle || config.system}"\n`));

  // Print results grouped by category
  const categories = ['documentation', 'structure', 'git'] as const;
  for (const category of categories) {
    const catResults = results.filter((r) => r.category === category);
    if (catResults.length === 0) continue;

    const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
    console.log(`  ${chalk.bold(categoryLabel)}`);

    for (const result of catResults) {
      const icon = result.status === 'pass' ? chalk.green('✓') :
        result.status === 'warn' ? chalk.yellow('⚠') : chalk.red('✗');
      console.log(`  ${icon} ${result.message}`);
    }
    console.log();
  }

  // Summary
  const passCount = results.filter((r) => r.status === 'pass').length;
  const warnCount = results.filter((r) => r.status === 'warn').length;
  const failCount = results.filter((r) => r.status === 'fail').length;

  console.log(`  ${chalk.bold('─'.repeat(40))}`);
  console.log(`  ${chalk.bold('Validation Results:')}`);
  console.log(`  ${chalk.green(`${passCount} passed`)}` +
    (warnCount > 0 ? `, ${chalk.yellow(`${warnCount} warnings`)}` : '') +
    (failCount > 0 ? `, ${chalk.red(`${failCount} failed`)}` : '')
  );

  if (failCount === 0) {
    console.log(chalk.green('\n  Your project is ready for submission!\n'));
  } else if (failCount > 0) {
    console.log(chalk.yellow(`\n  ${failCount} check(s) failed. Complete the missing items before submitting.\n`));
  }

  return results;
}

// ─── Checks ─────────────────────────────────────────────────────────

function checkDocumentation(projectDir: string): ValidationResult[] {
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

function checkStructure(projectDir: string): ValidationResult[] {
  const results: ValidationResult[] = [];

  // .100x.json
  const configPath = path.join(projectDir, '.100x.json');
  if (fs.existsSync(configPath)) {
    results.push({ check: 'config', status: 'pass', message: '.100x.json project config found', category: 'structure' });
  }

  // Check for source code directory
  const srcDir = path.join(projectDir, 'src');
  if (fs.existsSync(srcDir)) {
    const srcFiles = fs.readdirSync(srcDir).filter((f) => {
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
      const javaFiles = fs.readdirSync(javaDir, { recursive: true })
        .filter((f): f is string => typeof f === 'string' && f.endsWith('.java'));
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
    const designFiles = fs.readdirSync(designDir).filter((f) => f.endsWith('.md'));
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
