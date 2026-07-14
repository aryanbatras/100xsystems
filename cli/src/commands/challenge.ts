import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { parseFrontmatter } from '../reader/index.js';
import { systemExists, getSystemMeta, readFileContent, getChallengesDir } from '../reader/system-reader.js';

/**
 * `100x challenge <system>` — List and start challenges for a system
 */
export async function challengeCommand(systemSlug: string): Promise<void> {
  if (!systemExists(systemSlug)) {
    console.log(chalk.red(`\n  System "${systemSlug}" not found.`));
    console.log(chalk.dim('  Run `100x list` to see all available systems.'));
    return;
  }

  const system = getSystemMeta(systemSlug)!;
  const challengesDir = getChallengesDir(systemSlug);

  if (!fs.existsSync(challengesDir)) {
    console.log(chalk.yellow(`\n  No challenges found for "${system.title}".`));
    console.log(chalk.dim('  Challenges should be in the challenges/ folder of the system.'));
    return;
  }

  const files = fs.readdirSync(challengesDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  if (files.length === 0) {
    console.log(chalk.yellow(`\n  No challenges found for "${system.title}".`));
    return;
  }

  console.log(chalk.bold(`\n  100xSystems — ${system.title} Challenges\n`));

  const challenges: { slug: string; title: string; difficulty: string; description: string }[] = [];

  for (const filename of files) {
    const content = readFileContent(path.join(challengesDir, filename));
    if (!content) continue;

    const { data } = parseFrontmatter(content);
    const fm = data as any;

    const slug = filename.replace(/\.md$/, '').replace(/^\d+[-_]/, '');
    challenges.push({
      slug,
      title: fm.title || slug,
      difficulty: fm.difficulty || 'Intermediate',
      description: fm.description || content.slice(0, 150).replace(/[#*`]/g, '').trim() + '...',
    });
  }

  if (challenges.length === 0) {
    console.log(chalk.yellow('  No valid challenges found.\n'));
    return;
  }

  for (const challenge of challenges) {
    const diffColor = challenge.difficulty === 'Advanced' ? 'red' :
      challenge.difficulty === 'Intermediate' ? 'yellow' : 'green';

    console.log(`  ${chalk.bold(challenge.title)}`);
    console.log(`  ${chalk.dim(challenge.description)}`);
    console.log(`  ${chalk[diffColor as 'red' | 'yellow' | 'green'](challenge.difficulty)}`);

    // Show command to scaffold
    console.log(`  ${chalk.cyan(`100x init ${systemSlug}`)}  ${chalk.dim('→ get a full project scaffold with this challenge')}`);
    console.log();
  }

  console.log(chalk.dim('  Complete the challenge implementation using the specification.'));
  console.log(chalk.dim('  Then use `100x verify` to check your work.\n'));
}
