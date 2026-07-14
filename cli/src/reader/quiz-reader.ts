import fs from 'fs';
import path from 'path';
import { parseFrontmatter } from './index.js';
import { getQuizzesDir, readFileContent } from './system-reader.js';
import type { QuizData, QuizQuestion } from './index.js';

/**
 * Parse quiz files from a system's quizzes/ folder.
 * Each .md file contains quiz questions in its frontmatter.
 */
export function getQuizzes(systemSlug: string): QuizData[] {
  const quizzesDir = getQuizzesDir(systemSlug);
  if (!fs.existsSync(quizzesDir)) return [];

  const files = fs.readdirSync(quizzesDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  const quizzes: QuizData[] = [];

  for (const filename of files) {
    const content = readFileContent(path.join(quizzesDir, filename));
    if (!content) continue;

    const { data } = parseFrontmatter(content);
    const fm = data as any;

    if (!fm.questions || !Array.isArray(fm.questions)) continue;

    const questions: QuizQuestion[] = fm.questions.map((q: any) => ({
      question: q.question || '',
      type: q.type || 'multiple-choice',
      choices: q.choices || undefined,
      answer: q.answer,
    }));

    quizzes.push({
      title: fm.title || filename.replace('.md', ''),
      order: fm.order || 999,
      questions,
    });
  }

  quizzes.sort((a, b) => a.order - b.order);
  return quizzes;
}

/**
 * Get a single quiz by its slug (filename without .md).
 */
export function getQuiz(systemSlug: string, quizSlug: string): QuizData | null {
  const quizzes = getQuizzes(systemSlug);
  return quizzes.find((q) => {
    const slug = q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return slug === quizSlug;
  }) || null;
}
