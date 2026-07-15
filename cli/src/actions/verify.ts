import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { readProjectConfig } from '../scaffold/index.js';
import { getSpec } from '../reader/spec-reader.js';
import type { SpecCheck } from '../reader/index.js';

/**
 * `100x verify` — Verify the current project against its system specification.
 *
 * Supports two kinds of checks:
 *   1. Spec-defined checks: file-exists, custom-command, test-passes, doc-section
 *   2. Built-in checks: project-structure, documentation-completeness
 */
export async function verifyCommand(): Promise<void> {
  const projectDir = process.cwd();
  const config = readProjectConfig(projectDir);

  if (!config) {
    console.log(chalk.yellow('\n  No .100x.json found in the current directory.'));
    console.log(chalk.dim('  Run `100x init <system>` first to scaffold a project.'));
    return;
  }

  const systemSlug = config.system as string;
  const spec = getSpec(systemSlug);

  console.log(chalk.bold(`\n  100xSystems — Verifying "${config.systemTitle || systemSlug}"\n`));
  if (spec) {
    console.log(`  ${chalk.dim('Specification:')} ${spec.title} (v${spec.version})`);
  }
  console.log(`  ${chalk.dim('Project:')}      ${projectDir}`);
  console.log();

  let passed = 0;
  let failed = 0;
  let skipped = 0;

  // ─── Run spec-defined checks ────────────────────────────────────

  if (spec && spec.checks.length > 0) {
    console.log(`  ${chalk.bold('Specification Checks')}`);

    for (const check of spec.checks) {
      const result = await runSpecCheck(check, projectDir);
      if (result === 'pass') {
        passed++;
        console.log(`  ${chalk.green('✓')} ${chalk.dim(check.type)}${getCheckDetail(check)}`);
      } else if (result === 'fail') {
        failed++;
        console.log(`  ${chalk.red('✗')} ${chalk.dim(check.type)}${getCheckDetail(check)}`);
        console.log(`     ${chalk.red(getFailureHint(check))}`);
      } else {
        skipped++;
        console.log(`  ${chalk.dim('○')} ${chalk.dim(check.type)} — skipped (unsupported)`);
      }
    }
    console.log();
  }

  // ─── Built-in checks ────────────────────────────────────────────

  console.log(`  ${chalk.bold('Documentation Completeness')}`);
  const docResults = checkDocumentation(projectDir);
  for (const result of docResults) {
    if (result.ok) {
      passed++;
      console.log(`  ${chalk.green('✓')} ${result.message}`);
    } else {
      failed++;
      console.log(`  ${chalk.red('✗')} ${result.message}`);
    }
  }
  console.log();

  console.log(`  ${chalk.bold('Project Structure')}`);
  const structResults = checkStructure(projectDir);
  for (const result of structResults) {
    if (result.ok) {
      passed++;
      console.log(`  ${chalk.green('✓')} ${result.message}`);
    } else {
      failed++;
      console.log(`  ${chalk.red('✗')} ${result.message}`);
    }
  }
  console.log();

  // ─── Summary ────────────────────────────────────────────────────

  console.log(`  ${chalk.bold('─'.repeat(40))}`);
  console.log(`  ${chalk.bold('Results:')} ` +
    `${chalk.green(`${passed} passed`)}` +
    (failed > 0 ? `, ${chalk.red(`${failed} failed`)}` : '') +
    (skipped > 0 ? `, ${chalk.dim(`${skipped} skipped`)}` : '')
  );

  if (failed === 0) {
    console.log(chalk.green('\n  All checks passed! Your implementation looks good.'));
    console.log(chalk.dim('  Run `100x submit` to submit for review.\n'));
  } else {
    console.log(chalk.yellow(`\n  ${failed} check(s) failed. Review the issues above.`));
    console.log(chalk.dim('  Fix the issues and run `100x verify` again.\n'));
  }
}

// ─── Spec Check Runner ──────────────────────────────────────────────

async function runSpecCheck(check: SpecCheck, projectDir: string): Promise<'pass' | 'fail' | 'skip'> {
  switch (check.type) {
    case 'file-exists':
      return checkFileExists(check.path, projectDir);

    case 'doc-section':
      return checkDocSection(check.path, check.name, projectDir);

    case 'doc-contains':
      return checkDocContains(check.path, check.name, projectDir);

    case 'file-count-min':
      return checkFileCountMin(check.path, check.name ? parseInt(check.name, 10) : undefined, projectDir);

    case 'test-passes':
      return checkTestPasses(check.command, projectDir);

    case 'custom-command':
      return checkCustomCommand(check.command, projectDir);

    default:
      return 'skip';
  }
}

function getCheckDetail(check: SpecCheck): string {
  const parts = [check.path, check.name, check.command].filter(Boolean);
  return parts.length > 0 ? ' ' + parts.join(' ') : '';
}

function getFailureHint(check: SpecCheck): string {
  switch (check.type) {
    case 'file-exists':
      return `Create the file at: ${check.path}`;
    case 'doc-section':
      return `Add section "${check.name}" to ${check.path}`;
    case 'doc-contains':
      return `Ensure "${check.name}" is mentioned in ${check.path}`;
    case 'file-count-min':
      return `Expected at least ${check.name} file(s) in ${check.path}`;
    case 'test-passes':
      return `Run: ${check.command}`;
    case 'custom-command':
      return `Run: ${check.command}`;
    default:
      return '';
  }
}

// ─── Spec Check Implementations ─────────────────────────────────────

function checkFileExists(pathArg: string | undefined, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!pathArg) return 'skip';
  const fullPath = path.join(projectDir, pathArg);
  return fs.existsSync(fullPath) ? 'pass' : 'fail';
}

function checkDocSection(pathArg: string | undefined, sectionName: string | undefined, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!pathArg || !sectionName) return 'skip';
  const fullPath = path.join(projectDir, pathArg);
  if (!fs.existsSync(fullPath)) return 'fail';
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    // Check for markdown headings matching the section name
    const headingPattern = new RegExp(`^##+\\s+${escapeRegex(sectionName)}`, 'm');
    return headingPattern.test(content) ? 'pass' : 'fail';
  } catch {
    return 'fail';
  }
}

function checkDocContains(pathArg: string | undefined, keyword: string | undefined, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!pathArg || !keyword) return 'skip';
  const fullPath = path.join(projectDir, pathArg);
  if (!fs.existsSync(fullPath)) return 'fail';
  try {
    const content = fs.readFileSync(fullPath, 'utf-8').toLowerCase();
    return content.includes(keyword.toLowerCase()) ? 'pass' : 'fail';
  } catch {
    return 'fail';
  }
}

function checkFileCountMin(pathArg: string | undefined, minCount: number | undefined, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!pathArg) return 'skip';
  const fullPath = path.join(projectDir, pathArg);
  if (!fs.existsSync(fullPath)) return 'fail';
  try {
    const count = fs.readdirSync(fullPath)
      .filter((f) => !f.startsWith('.'))
      .length;
    const min = minCount || 1;
    return count >= min ? 'pass' : 'fail';
  } catch {
    return 'fail';
  }
}

function checkTestPasses(command: string | undefined, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!command) return 'skip';
  try {
    execSync(command, { cwd: projectDir, stdio: 'pipe', timeout: 60000 });
    return 'pass';
  } catch {
    return 'fail';
  }
}

function checkCustomCommand(command: string | undefined, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!command) return 'skip';
  try {
    execSync(command, { cwd: projectDir, stdio: 'pipe', timeout: 60000 });
    return 'pass';
  } catch {
    return 'fail';
  }
}

// ─── Built-in Documentation Checks ──────────────────────────────────

interface CheckResult { ok: boolean; message: string; }

function checkDocumentation(projectDir: string): CheckResult[] {
  const results: CheckResult[] = [];

  // Core documentation files
  const docsToCheck = [
    { path: 'README.md', name: 'README.md', minLength: 50 },
    { path: 'design/decisions.md', name: 'Engineering Decision Log (design/decisions.md)', minLength: 50 },
    { path: 'design/architecture.md', name: 'Architecture Document (design/architecture.md)', minLength: 50 },
    { path: 'design/tradeoffs.md', name: 'Trade-offs Analysis (design/tradeoffs.md)', minLength: 50 },
    { path: 'verification/checklist.md', name: 'Self-Assessment (verification/checklist.md)', minLength: 30 },
  ];

  for (const doc of docsToCheck) {
    const fullPath = path.join(projectDir, doc.path);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8').trim();
      if (content.length >= doc.minLength) {
        results.push({ ok: true, message: `${doc.name} exists with sufficient content` });
      } else {
        results.push({ ok: false, message: `${doc.name} exists but is incomplete. Add more content.` });
      }
    } else {
      results.push({ ok: false, message: `${doc.name} is missing. Create this file.` });
    }
  }

  return results;
}

function checkStructure(projectDir: string): CheckResult[] {
  const results: CheckResult[] = [];

  // .100x.json
  const configPath = path.join(projectDir, '.100x.json');
  if (fs.existsSync(configPath)) {
    results.push({ ok: true, message: '.100x.json project config found' });
  } else {
    results.push({ ok: false, message: '.100x.json is missing. Run `100x init` again.' });
  }

  // design/ directory
  const designDir = path.join(projectDir, 'design');
  if (fs.existsSync(designDir) && fs.statSync(designDir).isDirectory()) {
    const designFiles = fs.readdirSync(designDir).filter(f => f.endsWith('.md'));
    if (designFiles.length >= 2) {
      results.push({ ok: true, message: `design/ directory with ${designFiles.length} documentation file(s)` });
    }
  }

  // Source code directory
  const srcDir = path.join(projectDir, 'src');
  const javaDir = path.join(projectDir, 'src', 'main', 'java');
  const hasSrc = fs.existsSync(srcDir) && fs.readdirSync(srcDir).some(f => !f.startsWith('.'));
  const hasJava = fs.existsSync(javaDir);

  if (hasSrc) {
    results.push({ ok: true, message: 'Source code directory (src/) found' });
  } else if (hasJava) {
    results.push({ ok: true, message: 'Java source code directory (src/main/java/) found' });
  } else {
    results.push({ ok: false, message: 'No source code directory found' });
  }

  return results;
}

// ─── Utility ────────────────────────────────────────────────────────

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
