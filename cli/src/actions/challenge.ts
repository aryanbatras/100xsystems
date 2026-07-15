import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { parseFrontmatter } from '../reader/index.js';
import { systemExists, getSystemMeta, readFileContent, getChallengesDir } from '../reader/system-reader.js';

interface ChallengeInfo {
  slug: string;
  title: string;
  difficulty: string;
  description: string;
  order: number;
  tasks?: string[];
  requirements?: string[];
}

/**
 * `100x challenge <system>` — List challenges for a system
 * `100x challenge <system> --start <slug>` — Start a specific challenge
 */
export async function challengeCommand(
  systemSlug: string,
  options?: { start?: string }
): Promise<void> {
  if (!systemExists(systemSlug)) {
    console.log(chalk.red(`\n  System "${systemSlug}" not found.`));
    console.log(chalk.dim('  Run `100x list` to see all available systems.'));
    return;
  }

  const system = getSystemMeta(systemSlug)!;

  if (options?.start) {
    await startChallenge(systemSlug, system.title, options.start);
    return;
  }

  await listChallenges(systemSlug, system.title);
}

async function listChallenges(systemSlug: string, systemTitle: string): Promise<void> {
  const challenges = readChallenges(systemSlug);

  if (challenges.length === 0) {
    console.log(chalk.yellow(`\n  No challenges found for "${systemTitle}".`));
    console.log(chalk.dim('  Challenges should be in the challenges/ folder of the system.'));
    return;
  }

  console.log(chalk.bold(`\n  100xSystems — ${systemTitle} Challenges\n`));

  for (const challenge of challenges) {
    const diffColor = challenge.difficulty === 'Advanced' ? 'red' :
      challenge.difficulty === 'Intermediate' ? 'yellow' : 'green';

    console.log(`  ${chalk.bold(`#${challenge.order}. ${challenge.title}`)}`);
    console.log(`  ${chalk.dim(challenge.description)}`);
    console.log(`  ${chalk[diffColor as 'red' | 'yellow' | 'green'](challenge.difficulty)}`);

    if (challenge.requirements && challenge.requirements.length > 0) {
      console.log(`  ${chalk.dim('Requirements:')}`);
      for (const req of challenge.requirements) {
        console.log(`    • ${req}`);
      }
    }

    console.log(`  ${chalk.cyan(`100x challenge ${systemSlug} --start ${challenge.slug}`)}  ${chalk.dim('→ start this challenge')}`);
    console.log();
  }

  console.log(chalk.dim('  Complete challenges as part of your implementation.'));
  console.log(chalk.dim('  Run `100x verify` to check your work, then `100x submit` to submit.'));
  console.log();
}

async function startChallenge(systemSlug: string, systemTitle: string, challengeSlug: string): Promise<void> {
  const challenges = readChallenges(systemSlug);
  const challenge = challenges.find((c) => c.slug === challengeSlug);

  if (!challenge) {
    console.log(chalk.red(`\n  Challenge "${challengeSlug}" not found for "${systemTitle}".`));
    console.log(chalk.dim('  Run `100x challenge` to see all available challenges.'));
    return;
  }

  console.log(chalk.bold(`\n  100xSystems — Starting Challenge: ${challenge.title}\n`));
  console.log(`  ${chalk.dim('System:')}     ${systemTitle}`);
  console.log(`  ${chalk.dim('Challenge:')}  ${challenge.title}`);
  console.log(`  ${chalk.dim('Difficulty:')} ${challenge.difficulty}`);
  console.log();

  console.log(`  ${chalk.bold('Description:')}`);
  console.log(`  ${challenge.description}`);
  console.log();

  if (challenge.requirements && challenge.requirements.length > 0) {
    console.log(`  ${chalk.bold('Requirements:')}`);
    for (let i = 0; i < challenge.requirements.length; i++) {
      console.log(`  ${i + 1}. ${challenge.requirements[i]}`);
    }
    console.log();
  }

  if (challenge.tasks && challenge.tasks.length > 0) {
    console.log(`  ${chalk.bold('Tasks:')}`);
    for (let i = 0; i < challenge.tasks.length; i++) {
      console.log(`  ${i + 1}. ${challenge.tasks[i]}`);
    }
    console.log();
  }

  console.log(`  ${chalk.bold('To get started:')}`);
  console.log(`  ${chalk.cyan(`100x init ${systemSlug}`)}  ${chalk.dim('→ scaffold the project')}`);
  console.log(`  ${chalk.cyan(`100x validate`)}  ${chalk.dim('→ check your progress')}`);
  console.log(`  ${chalk.cyan(`100x verify`)}  ${chalk.dim('→ verify your implementation')}`);
  console.log(`  ${chalk.cyan(`100x submit ${systemSlug}`)}  ${chalk.dim('→ submit for review')}`);
  console.log();
}

function readChallenges(systemSlug: string): ChallengeInfo[] {
  const challengesDir = getChallengesDir(systemSlug);
  if (!fs.existsSync(challengesDir)) return [];

  const files = fs.readdirSync(challengesDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  const challenges: ChallengeInfo[] = [];

  for (const filename of files) {
    const content = readFileContent(path.join(challengesDir, filename));
    if (!content) continue;

    const { data } = parseFrontmatter(content);
    const fm = data as any;

    const slug = filename.replace(/\.md$/, '').replace(/^\d+[-_]/, '');

    // Extract description from content if not in frontmatter
    let description = fm.description || '';
    if (!description) {
      const body = content.replace(/^---[\s\S]*?---\s*\n/, '');
      description = body.replace(/[#*`]/g, '').trim().slice(0, 200);
    }

    challenges.push({
      slug,
      title: fm.title || slug,
      difficulty: fm.difficulty || 'Intermediate',
      description,
      order: fm.order || 999,
      tasks: fm.tasks || [],
      requirements: fm.requirements || [],
    });
  }

  challenges.sort((a, b) => a.order - b.order);
  return challenges;
}
