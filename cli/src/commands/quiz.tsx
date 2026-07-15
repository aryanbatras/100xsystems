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

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="yellow">  {error}</Text>
      </Box>
    );
  }

  if (!ready) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text dimColor>  Loading quizzes...</Text>
      </Box>
    );
  }

  return (
    <QuizApp
      quizzes={quizzes}
      systemTitle={systemTitle}
      onDone={() => {}}
    />
  );
}
