import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { systemExists, getSystemMeta, readFileContent, getSpecDir } from '../reader/system-reader.js';
import { scaffoldProject } from '../scaffold/index.js';
import { getSpec } from '../reader/spec-reader.js';

/**
 * `100x init <system>` — Scaffold a new implementation project
 * `100x init <system> --lang java` — Scaffold with Java template
 * `100x init <system> --lang typescript` — Scaffold with TypeScript template
 */
export async function initCommand(
  systemSlug: string,
  options: { lang?: string; output?: string }
): Promise<void> {
  // Validate system exists
  if (!systemExists(systemSlug)) {
    console.log(chalk.red(`\n  System "${systemSlug}" not found.`));
    console.log(chalk.dim('  Run `100x list` to see all available systems.'));
    process.exit(1);
  }

  const system = getSystemMeta(systemSlug)!;

  // Determine output directory
  const outputDir = options.output || `./${systemSlug}-implementation`;
  const targetDir = path.resolve(process.cwd(), outputDir);

  // Check if directory already exists
  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    console.log(chalk.yellow(`\n  Directory "${outputDir}" already exists and is not empty.`));
    console.log(chalk.dim('  Use --output to specify a different path, or remove the existing directory.'));
    process.exit(1);
  }

  // Read specification
  const spec = getSpec(systemSlug);
  let specContent = '';
  if (spec) {
    specContent = `# ${spec.title}\n\nVersion: ${spec.version}\n\n`;
    if (spec.checks.length > 0) {
      specContent += '## Verification Checks\n\n';
      for (const check of spec.checks) {
        specContent += `- ${check.type}: ${check.path || check.name || check.command || '(see spec details)'}\n`;
      }
    }
  }

  const lang = options.lang || 'typescript';

  console.log(chalk.bold(`\n  100xSystems — Initializing "${system.title}"\n`));
  console.log(`  ${chalk.dim('System:')}   ${system.title}`);
  console.log(`  ${chalk.dim('Output:')}   ${outputDir}`);
  console.log(`  ${chalk.dim('Language:')} ${lang}`);
  console.log();

  // Scaffold the project
  try {
    const created = scaffoldProject({
      targetDir,
      systemSlug,
      systemTitle: system.title,
      language: lang as 'typescript' | 'java',
      specification: specContent,
    });

    console.log(chalk.green('  Project created successfully!\n'));
    console.log(`  ${chalk.dim('Created files:')}`);
    for (const file of created) {
      console.log(`    ${file.endsWith('/') ? '📁' : '📄'} ${file}`);
    }

    console.log();
    console.log(`  ${chalk.cyan(`cd ${outputDir}`)}`);
    console.log(`  ${chalk.cyan('100x verify')}  ${chalk.dim('→ check your implementation')}`);
    console.log();

    // Print next steps based on available sections
    const quizDir = path.join(process.cwd(), '..', 'curriculum', 'systems', systemSlug, 'quizzes');
    const challengeDir = path.join(process.cwd(), '..', 'curriculum', 'systems', systemSlug, 'challenges');

    console.log(`  ${chalk.dim('Also try:')}`);
    if (fs.existsSync(quizDir)) {
      console.log(`  ${chalk.cyan(`100x quiz ${systemSlug}`)}  ${chalk.dim('→ take quizzes')}`);
    }
    if (fs.existsSync(challengeDir)) {
      console.log(`  ${chalk.cyan(`100x challenge ${systemSlug}`)}  ${chalk.dim('→ start a challenge')}`);
    }
    console.log();

  } catch (err: any) {
    console.log(chalk.red(`\n  Failed to create project: ${err.message}`));
    process.exit(1);
  }
}
