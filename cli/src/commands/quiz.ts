import chalk from 'chalk';
import inquirer from 'inquirer';
import { systemExists, getSystemMeta } from '../reader/system-reader.js';
import { getQuizzes } from '../reader/quiz-reader.js';
import type { QuizQuestion } from '../reader/index.js';

/**
 * `100x quiz <system>` — Run interactive quizzes for a system
 */
export async function quizCommand(systemSlug: string): Promise<void> {
  if (!systemExists(systemSlug)) {
    console.log(chalk.red(`\n  System "${systemSlug}" not found.`));
    console.log(chalk.dim('  Run `100x list` to see all available systems.'));
    return;
  }

  const system = getSystemMeta(systemSlug)!;
  const quizzes = getQuizzes(systemSlug);

  if (quizzes.length === 0) {
    console.log(chalk.yellow(`\n  No quizzes found for "${system.title}".`));
    console.log(chalk.dim('  Quizzes should be in the quizzes/ folder of the system.'));
    return;
  }

  console.log(chalk.bold(`\n  100xSystems — ${system.title} Quizzes\n`));

  let totalCorrect = 0;
  let totalQuestions = 0;

  for (const quiz of quizzes) {
    if (quiz.questions.length === 0) continue;

    console.log(chalk.bold(`  📝 ${quiz.title}`));
    console.log(`  ${chalk.dim(`─`.repeat(40))}\n`);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      const correct = await askQuestion(q, i + 1);
      if (correct) totalCorrect++;
      totalQuestions++;
      console.log(); // spacing between questions
    }
  }

  // Show final score
  const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const scoreColor = percentage >= 80 ? 'green' : percentage >= 50 ? 'yellow' : 'red';

  console.log(chalk.bold(`  ${'─'.repeat(40)}`));
  console.log(chalk.bold(`  Results: ${chalk[scoreColor as 'green' | 'yellow' | 'red'](`${totalCorrect}/${totalQuestions} (${percentage}%)`)}`));

  if (percentage === 100) {
    console.log(chalk.green('  Perfect score! Excellent work!\n'));
  } else if (percentage >= 80) {
    console.log(chalk.green('  Great job! Almost perfect.\n'));
  } else if (percentage >= 50) {
    console.log(chalk.yellow('  Good effort! Review the topics you missed.\n'));
  } else {
    console.log(chalk.red('  Keep studying! Review the system content and try again.\n'));
  }
}

async function askQuestion(q: QuizQuestion, index: number): Promise<boolean> {
  console.log(`  ${chalk.bold(`Q${index}.`)} ${q.question}`);

  if (q.type === 'multiple-choice' && q.choices && q.choices.length > 0) {
    const { answer } = await inquirer.prompt([{
      type: 'list',
      name: 'answer',
      message: '  Select your answer:',
      choices: q.choices.map((c) => ({ name: c.label, value: c.value })),
      prefix: '',
    }]);

    const isCorrect = answer === q.answer;
    if (isCorrect) {
      console.log(`  ${chalk.green('✓ Correct!')}`);
    } else {
      console.log(`  ${chalk.red('✗ Incorrect.')} ${chalk.dim(`The correct answer was: ${q.answer}`)}`);
    }
    return isCorrect;

  } else if (q.type === 'true-false') {
    const { answer } = await inquirer.prompt([{
      type: 'list',
      name: 'answer',
      message: '  Select your answer:',
      choices: [
        { name: 'True', value: true },
        { name: 'False', value: false },
      ],
      prefix: '',
    }]);

    const isCorrect = answer === q.answer;
    if (isCorrect) {
      console.log(`  ${chalk.green('✓ Correct!')}`);
    } else {
      console.log(`  ${chalk.red('✗ Incorrect.')} ${chalk.dim(`The correct answer was: ${q.answer}`)}`);
    }
    return isCorrect;

  } else {
    // Free text input
    const { answer } = await inquirer.prompt([{
      type: 'input',
      name: 'answer',
      message: '  Your answer:',
      prefix: '',
    }]);

    // For free-text, we don't auto-grade
    console.log(`  ${chalk.dim('Your answer has been recorded (open-ended question).')}`);
    return true;
  }
}
