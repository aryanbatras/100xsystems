import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import { systemExists, getSystemMeta } from '../reader/system-reader.js';
import { getQuizzes } from '../reader/quiz-reader.js';
import { QuizApp } from '../ui/Quiz.js';

export const args = zod.tuple([
  zod.string().describe('System slug (e.g., claude-code)'),
]);

type Props = {
  args: zod.infer<typeof args>;
};

export default function Quiz({ args }: Props) {
  const [systemSlug] = args;
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [systemTitle, setSystemTitle] = useState('');
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    if (!systemExists(systemSlug)) {
      setError(`System "${systemSlug}" not found. Run 100x list to see all available systems.`);
      return;
    }

    const system = getSystemMeta(systemSlug)!;
    const quizData = getQuizzes(systemSlug);

    if (quizData.length === 0) {
      setError(`No quizzes found for "${system.title}".`);
      return;
    }

    setSystemTitle(system.title);
    setQuizzes(quizData);
    setReady(true);
  }, [systemSlug]);

  // ─── Error state ────────────────────────────────────────────────
  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="yellow">  {error}</Text>
      </Box>
    );
  }

  // ─── Loading state ──────────────────────────────────────────────
  if (!ready) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text dimColor>  Loading quizzes...</Text>
      </Box>
    );
  }

  // ─── Quiz welcome + interactive quiz ───────────────────────────
  const lessonQuizzes = quizzes.filter((q: any) => q._source === 'lesson');
  const folderQuizzes = quizzes.filter((q: any) => q._source !== 'lesson');

  return (
    <Box flexDirection="column">
      {lessonQuizzes.length > 0 && (
        <Box flexDirection="column" paddingX={2} paddingY={1}>
          <Text bold>{'  '}📚 Lesson Quizzes ({lessonQuizzes.length})</Text>
          {lessonQuizzes.map((q: any, i: number) => (
            <Text key={`lq-${i}`} dimColor>
              {'  '}• {q.title}
              {q._track && q._module && (
                <Text dimColor> — {q._track} / {q._module}</Text>
              )}
            </Text>
          ))}
        </Box>
      )}
      {folderQuizzes.length > 0 && (
        <Box flexDirection="column" paddingX={2} paddingY={1}>
          <Text bold>{'  '}📁 System Quizzes ({folderQuizzes.length})</Text>
          {folderQuizzes.map((q: any, i: number) => (
            <Text key={`fq-${i}`} dimColor>{'  '}• {q.title}</Text>
          ))}
        </Box>
      )}
      <Box paddingX={2} paddingY={1}>
        <QuizApp
          quizzes={quizzes}
          systemTitle={systemTitle}
          onDone={() => {}}
        />
      </Box>
    </Box>
  );
}
