#!/usr/bin/env node

import { Command } from 'commander';
import { listCommand } from './commands/list.js';
import { initCommand } from './commands/init.js';
import { quizCommand } from './commands/quiz.js';
import { challengeCommand } from './commands/challenge.js';
import { verifyCommand } from './commands/verify.js';

const program = new Command();

program
  .name('100x')
  .description('CLI for 100xSystems — build real systems, take quizzes, and verify your implementations.')
  .version('0.1.0');

// ─── list — Show available systems ──────────────────────────────────

program
  .command('list')
  .description('List all available systems or sections of a specific system')
  .argument('[system]', 'Optional system slug to show details')
  .action(async (system?: string) => {
    try {
      await listCommand(system);
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

// ─── init — Scaffold a new implementation project ───────────────────

program
  .command('init')
  .description('Scaffold a new implementation project for a system')
  .argument('<system>', 'System slug (e.g., claude-code)')
  .option('-l, --lang <language>', 'Programming language (typescript, java)', 'typescript')
  .option('-o, --output <directory>', 'Output directory')
  .action(async (system: string, options: { lang?: string; output?: string }) => {
    try {
      await initCommand(system, options);
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

// ─── quiz — Take interactive quizzes ────────────────────────────────

program
  .command('quiz')
  .description('Take interactive quizzes for a system')
  .argument('<system>', 'System slug (e.g., claude-code)')
  .action(async (system: string) => {
    try {
      await quizCommand(system);
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

// ─── challenge — List and start challenges ──────────────────────────

program
  .command('challenge')
  .description('List challenges for a system')
  .argument('<system>', 'System slug (e.g., claude-code)')
  .action(async (system: string) => {
    try {
      await challengeCommand(system);
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

// ─── verify — Verify implementation against spec ────────────────────

program
  .command('verify')
  .description('Verify your implementation against the system specification')
  .action(async () => {
    try {
      await verifyCommand();
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

// ─── Parse ──────────────────────────────────────────────────────────

program.parse(process.argv);

// Show help if no arguments
if (process.argv.length === 2) {
  program.outputHelp();
}
