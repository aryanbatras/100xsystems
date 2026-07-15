import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import { getAllSystems, getSystemMeta } from '../reader/system-reader.js';
import { loadProgress, detectInProgressProjects } from '../actions/progress.js';
import type { ProgressData, ProgressEntry } from '../reader/index.js';

export const args = zod.tuple([
  zod.string().optional().describe('Optional system slug to show detailed progress'),
]);

type Props = {
  args: zod.infer<typeof args>;
};

export default function Progress({ args }: Props) {
  const [systemSlug] = args;
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      detectInProgressProjects();
      const data = loadProgress();
      setProgressData(data);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="red">  {error}</Text>
      </Box>
    );
  }

  if (!progressData) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text dimColor>  Loading progress...</Text>
      </Box>
    );
  }

  const allSystems = getAllSystems();
  const entries = Object.entries(progressData.systems);

  if (systemSlug) {
    const system = getSystemMeta(systemSlug);
    if (!system) {
      return (
        <Box flexDirection="column" paddingX={2}>
          <Text color="red">  System &ldquo;{systemSlug}&rdquo; not found.</Text>
        </Box>
      );
    }

    const entry = progressData.systems[systemSlug];

    if (!entry || entry.status === 'not-started') {
      return (
        <Box flexDirection="column" paddingX={2} paddingY={1}>
          <Text bold>{'  '}{system.title}</Text>
          <Text dimColor>{'  '}Status: ○ Not started</Text>
          <Box marginY={1} />
          <Text color="cyan">{'  '}100x init {systemSlug}  <Text dimColor>→ start building</Text></Text>
          <Text color="cyan">{'  '}100x quiz {systemSlug}  <Text dimColor>→ take quizzes</Text></Text>
          <Text color="cyan">{'  '}100x resources {systemSlug}  <Text dimColor>→ view resources</Text></Text>
        </Box>
      );
    }

    const statusColor = entry.status === 'completed' ? 'green' : 'yellow';
    const statusIcon = entry.status === 'completed' ? '✓' : '⟳';
    return (
      <Box flexDirection="column" paddingX={2} paddingY={1}>
        <Text bold>{'  '}{system.title}</Text>
        <Text>{'  '}Status: <Text color={statusColor}>{statusIcon} {entry.status}</Text></Text>
        {entry.startedAt && <Text dimColor>{'  '}Started: {new Date(entry.startedAt).toLocaleDateString()}</Text>}
        {entry.completedAt && <Text dimColor>{'  '}Completed: {new Date(entry.completedAt).toLocaleDateString()}</Text>}
        {entry.projectDir && <Text dimColor>{'  '}Project: {entry.projectDir}</Text>}
        {entry.language && <Text dimColor>{'  '}Language: {entry.language}</Text>}
        <Box marginY={1} />
        <Text color="cyan">{'  '}100x validate  <Text dimColor>→ check document completeness</Text></Text>
        <Text color="cyan">{'  '}100x verify  <Text dimColor>→ verify against specification</Text></Text>
        {entry.status !== 'completed' && (
          <Text color="cyan">{'  '}100x submit {systemSlug}  <Text dimColor>→ submit for review</Text></Text>
        )}
      </Box>
    );
  }

  // All systems view
  const completedSlugs: string[] = entries.filter(([, e]) => e.status === 'completed').map(([s]) => s);
  const inProgressSlugs: string[] = entries.filter(([, e]) => e.status === 'in-progress').map(([s]) => s);
  const notStarted: string[] = allSystems.map((s) => s.slug).filter((slug) => !completedSlugs.includes(slug) && !inProgressSlugs.includes(slug));

  const total = allSystems.length;
  const pct = total > 0 ? Math.round((completedSlugs.length / total) * 100) : 0;

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Text bold>{'  '}100xSystems — Your Progress</Text>
      <Box marginY={1} />

      {completedSlugs.length > 0 && (
        <Box flexDirection="column">
          <Text color="green">{'  '}✓ Completed</Text>
          {completedSlugs.map((slug) => {
            const system = getSystemMeta(slug);
            const entry = progressData.systems[slug];
            const date = entry?.completedAt ? new Date(entry.completedAt).toLocaleDateString() : '';
            return <Text key={slug}>{'    '}<Text color="green">●</Text> <Text bold>{system?.title || slug}</Text> <Text dimColor>({date})</Text></Text>;
          })}
        </Box>
      )}

      {inProgressSlugs.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text color="yellow">{'  '}⟳ In Progress</Text>
          {inProgressSlugs.map((slug) => {
            const system = getSystemMeta(slug);
            const entry = progressData.systems[slug];
            return (
              <Box key={slug} flexDirection="column">
                <Text>{'    '}<Text color="yellow">●</Text> <Text bold>{system?.title || slug}</Text></Text>
                {entry?.projectDir && <Text dimColor>{'      '}{entry.projectDir}</Text>}
              </Box>
            );
          })}
        </Box>
      )}

      {notStarted.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text dimColor>{'  '}○ Not Started</Text>
          {notStarted.map((slug) => {
            const system = getSystemMeta(slug);
            return <Text key={slug}>{'    '}<Text dimColor>○ {system?.title || slug}</Text></Text>;
          })}
        </Box>
      )}

      <Box marginY={1} />
      <Text>{'  '}<Text dimColor>─{'─'.repeat(38)}</Text></Text>
      <Text bold>{'  '}Progress: {completedSlugs.length}/{total} systems completed ({pct}%)</Text>

      {notStarted.length > 0 && (
        <Text>
          {'  '}<Text dimColor>Next:</Text> <Text color="cyan">100x init {notStarted[0]}</Text> <Text dimColor>— {getSystemMeta(notStarted[0])?.title || ''}</Text>
        </Text>
      )}
    </Box>
  );
}
