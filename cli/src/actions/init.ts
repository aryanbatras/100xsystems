import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { systemExists, getSystemMeta } from '../reader/system-reader.js';
import { SYSTEMS_DIR } from '../reader/index.js';
import { scaffoldProject } from '../scaffold/index.js';
import { getSpec } from '../reader/spec-reader.js';
import { getCachedUser } from '../auth/index.js';
import { markInProgress } from './progress.js';

/**
 * `100x init <system>` — Scaffold a new implementation project
 * Creates a complete project with:
 *   - Code templates (TypeScript or Java)
 *   - Engineering Decision Log template
 *   - Architecture documentation template
 *   - Trade-offs analysis template
 *   - Self-assessment checklist
 *   - System specification
 *
 * `100x init <system> --lang java` — With Java template
 * `100x init <system> --lang typescript` — With TypeScript template
 * `100x init <system> --author name` — Pre-fill author name
 */
export async function initCommand(
  systemSlug: string,
  options: { lang?: string; output?: string; author?: string }
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
  const cachedUser = getCachedUser();
  const author = options.author || cachedUser?.login || '';

  const systemTitle = system.title;

  console.log(chalk.bold(`\n  100xSystems — Initializing "${systemTitle}"\n`));
  console.log(`  ${chalk.dim('System:')}   ${systemTitle}`);
  console.log(`  ${chalk.dim('Output:')}   ${outputDir}`);
  console.log(`  ${chalk.dim('Language:')} ${lang}`);
  if (author) {
    console.log(`  ${chalk.dim('Author:')}   ${author}`);
  }
  console.log();

  // Scaffold the project
  try {
    const created = scaffoldProject({
      targetDir,
      systemSlug,
      systemTitle,
      language: lang as 'typescript' | 'java',
      author,
      specification: specContent,
    });

    console.log(chalk.green('  Project created successfully!\n'));

    // Created files grouped by category
    const docs = created.filter(f => f.startsWith('design/') || f.startsWith('verification/') || f.startsWith('specification/') || f === 'README.md');
    const code = created.filter(f => f.startsWith('src/') || f.startsWith('pom.xml') || f.startsWith('package.json') || f.startsWith('tsconfig.json'));
    const configs = created.filter(f => f.startsWith('.') || f.startsWith('build'));

    if (docs.length > 0) {
      console.log(`  ${chalk.dim('Documentation:')}`);
      for (const file of docs) {
        console.log(`    📝 ${file}`);
      }
      console.log();
    }

    if (code.length > 0) {
      console.log(`  ${chalk.dim('Code:')}`);
      for (const file of code) {
        console.log(`    📄 ${file}`);
      }
      console.log();
    }

    if (configs.length > 0) {
      console.log(`  ${chalk.dim('Config:')}`);
      for (const file of configs) {
        console.log(`    ⚙️  ${file}`);
      }
      console.log();
    }

    // Track progress
    markInProgress(systemSlug, targetDir, lang);

    console.log(`  ${chalk.bold('Next steps:')}`);
    console.log(`  ${chalk.cyan(`cd ${outputDir}`)}`);
    console.log(`  ${chalk.cyan('100x validate')}  ${chalk.dim('→ check document completeness')}`);
    console.log(`  ${chalk.cyan('100x verify')}    ${chalk.dim('→ check against specification')}`);
    console.log();

    // Check for quizzes/challenges
    const quizDir = path.join(SYSTEMS_DIR(), systemSlug, 'quizzes');
    const challengeDir = path.join(SYSTEMS_DIR(), systemSlug, 'challenges');

    const hasQuizzes = fs.existsSync(quizDir) && fs.readdirSync(quizDir).some(f => f.endsWith('.md'));
    const hasChallenges = fs.existsSync(challengeDir) && fs.readdirSync(challengeDir).some(f => f.endsWith('.md'));

    if (hasQuizzes || hasChallenges) {
      console.log(`  ${chalk.dim('Also try:')}`);
      if (hasQuizzes) {
        console.log(`  ${chalk.cyan(`100x quiz ${systemSlug}`)}  ${chalk.dim('→ take quizzes')}`);
      }
      if (hasChallenges) {
        console.log(`  ${chalk.cyan(`100x challenge ${systemSlug}`)}  ${chalk.dim('→ start a challenge')}`);
      }
      console.log();
    }

    console.log(`  ${chalk.dim('When you\'re ready to submit your implementation:')}`);
    console.log(`  ${chalk.dim('  → Run `100x submit` to prepare your review package')}`);
    console.log();

  } catch (err: any) {
    console.log(chalk.red(`\n  Failed to create project: ${err.message}`));
    process.exit(1);
  }
}
