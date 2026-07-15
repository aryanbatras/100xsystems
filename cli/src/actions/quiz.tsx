import React from 'react';
import { render } from 'ink';
import { systemExists, getSystemMeta } from '../reader/system-reader.js';
import { getQuizzes } from '../reader/quiz-reader.js';
import { QuizApp } from '../ui/Quiz.js';

/**
 * `100x quiz <system>` — Run interactive quizzes for a system using Ink.
 */
export async function quizCommand(systemSlug: string): Promise<void> {
  if (!systemExists(systemSlug)) {
    const { default: chalk } = await import('chalk');
    console.log(chalk.red(`\n  System "${systemSlug}" not found.`));
    console.log(chalk.dim('  Run `100x list` to see all available systems.'));
    return;
  }

  const system = getSystemMeta(systemSlug)!;
  const quizzes = getQuizzes(systemSlug);

  if (quizzes.length === 0) {
    const { default: chalk } = await import('chalk');
    console.log(chalk.yellow(`\n  No quizzes found for "${system.title}".`));
    console.log(chalk.dim('  Quizzes should be in the quizzes/ folder of the system.'));
    return;
  }

  // Use Ink render() for the interactive quiz
  const { waitUntilExit } = render(
    <QuizApp
      quizzes={quizzes}
      systemTitle={system.title}
      onDone={(score) => {
        // Score is displayed by QuizApp, just track for potential future use
      }}
    />,
  );

  await waitUntilExit();
}
