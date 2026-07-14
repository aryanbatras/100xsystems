import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { readProjectConfig } from '../scaffold/index.js';
import { getSpec } from '../reader/spec-reader.js';
import type { SpecCheck } from '../reader/index.js';

/**
 * `100x verify` — Verify the current project against its system specification
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

  if (!spec || spec.checks.length === 0) {
    console.log(chalk.yellow(`\n  No specification checks found for "${config.systemTitle || systemSlug}".`));
    console.log(chalk.dim('  Add specification files to curriculum/systems/[slug]/specification/.'));
    return;
  }

  console.log(chalk.bold(`\n  100xSystems — Verifying "${config.systemTitle || systemSlug}"\n`));
  console.log(`  ${chalk.dim('Specification:')} ${spec.title} (v${spec.version})`);
  console.log(`  ${chalk.dim('Project:')}      ${projectDir}`);
  console.log();

  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const check of spec.checks) {
    const result = await runCheck(check, projectDir);
    if (result === 'pass') {
      passed++;
      console.log(`  ${chalk.green('✓')} ${chalk.dim(check.type)}${check.path ? ' ' + check.path : ''}${check.name ? ' ' + check.name : ''}`);
    } else if (result === 'fail') {
      failed++;
      console.log(`  ${chalk.red('✗')} ${chalk.dim(check.type)}${check.path ? ' ' + check.path : ''}${check.name ? ' ' + check.name : ''} — ${chalk.red('failed')}`);
    } else {
      skipped++;
      console.log(`  ${chalk.dim('○')} ${chalk.dim(check.type)} — skipped (unsupported check type)`);
    }
  }

  // Summary
  console.log();
  console.log(`  ${chalk.bold('─'.repeat(40))}`);
  console.log(`  ${chalk.bold('Results:')} ` +
    `${chalk.green(`${passed} passed`)}` +
    (failed > 0 ? `, ${chalk.red(`${failed} failed`)}` : '') +
    (skipped > 0 ? `, ${chalk.dim(`${skipped} skipped`)}` : '')
  );

  if (failed === 0) {
    console.log(chalk.green('  All checks passed! Your implementation looks good.\n'));
  } else {
    console.log(chalk.red(`  ${failed} check(s) failed. Review the specification and try again.\n`));
  }
}

async function runCheck(check: SpecCheck, projectDir: string): Promise<'pass' | 'fail' | 'skip'> {
  switch (check.type) {
    case 'file-exists':
      return checkFileExists(check, projectDir);

    case 'has-export':
      return checkHasExport(check, projectDir);

    case 'contains-function':
      return checkContainsFunction(check, projectDir);

    case 'test-passes':
      return checkTestPasses(check, projectDir);

    case 'docker-build':
      return checkDockerBuild(check, projectDir);

    case 'custom-script':
      return checkCustomScript(check, projectDir);

    default:
      return 'skip';
  }
}

function checkFileExists(check: SpecCheck, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!check.path) return 'skip';
  const fullPath = path.join(projectDir, check.path);
  return fs.existsSync(fullPath) ? 'pass' : 'fail';
}

function checkHasExport(check: SpecCheck, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!check.file || !check.name) return 'skip';
  const fullPath = path.join(projectDir, check.file);
  if (!fs.existsSync(fullPath)) return 'fail';
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    // Check for export patterns
    const patterns = [
      `export ${check.name}`,
      `export function ${check.name}`,
      `export class ${check.name}`,
      `export const ${check.name}`,
      `export interface ${check.name}`,
      `export type ${check.name}`,
      `public ${check.name}`,
      `public static ${check.name}`,
    ];
    return patterns.some(p => content.includes(p)) ? 'pass' : 'fail';
  } catch {
    return 'fail';
  }
}

function checkContainsFunction(check: SpecCheck, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!check.file || !check.name) return 'skip';
  const fullPath = path.join(projectDir, check.file);
  if (!fs.existsSync(fullPath)) return 'fail';
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    // Check for function/method definitions
    const patterns = [
      `function ${check.name}`,
      `def ${check.name}`,
      `public ${check.name}`,
      `fn ${check.name}`,
      `def ${check.name}`,
      `${check.name}(`,
      `=> ${check.name}`,
    ];
    return patterns.some(p => content.includes(p)) ? 'pass' : 'fail';
  } catch {
    return 'fail';
  }
}

function checkTestPasses(check: SpecCheck, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!check.command) return 'skip';
  try {
    execSync(check.command, { cwd: projectDir, stdio: 'pipe', timeout: 60000 });
    return 'pass';
  } catch {
    return 'fail';
  }
}

function checkDockerBuild(check: SpecCheck, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!check.dockerfile) return 'skip';
  try {
    execSync(`docker build -f ${check.dockerfile} .`, { cwd: projectDir, stdio: 'pipe', timeout: 120000 });
    return 'pass';
  } catch {
    return 'fail';
  }
}

function checkCustomScript(check: SpecCheck, projectDir: string): 'pass' | 'fail' | 'skip' {
  if (!check.command) return 'skip';
  try {
    execSync(check.command, { cwd: projectDir, stdio: 'pipe', timeout: 60000 });
    return 'pass';
  } catch {
    return 'fail';
  }
}
