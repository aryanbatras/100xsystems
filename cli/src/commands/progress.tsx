import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import fs from 'fs';
import path from 'path';
import { getAllSystems, getSystemMeta } from '../reader/system-reader.js';

export const args = zod.tuple([
  zod.string().optional().describe('Optional system slug to show detailed progress'),
]);

type Props = {
  args: zod.infer<typeof args>;
};

interface ProgressEntry {
  status: 'not-started' | 'in-progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
  projectDir?: string;
  language?: string;
}

interface ProgressData {
  systems: Record<string, ProgressEntry>;
}

const PROGRESS_FILE = (): string => path.join(
  path.resolve(process.env.HOME || process.env.USERPROFILE || '~', '.100x'),
  'progress.json'
);

function loadProgress(): ProgressData {
  try {
    if (!fs.existsSync(PROGRESS_FILE())) return { systems: {} };
    return JSON.parse(fs.readFileSync(PROGRESS_FILE(), 'utf-8'));
  } catch {
    return { systems: {} };
  }
}

function detectInProgressProjects(): ProgressData {
  const progress = loadProgress();
  const home = process.env.HOME || process.env.USERPROFILE || '~';
  const dirs = [process.cwd(), path.join(home, 'projects'), path.join(home, 'code'), path.join(home, 'Documents')];
  for (const dir of dirs) {
    try { scanDir(dir, progress, 3); } catch { /* skip */ }
  }
  return progress;
}

function scanDir(dir: string, progress: ProgressData, depth: number): void {
  if (depth <= 0) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    const configPath = path.join(fullPath, '.100x.json');
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        if (config.system && !progress.systems[config.system]) {
          progress.systems[config.system] = {
            status: 'in-progress' as const,
            startedAt: config.createdAt || new Date().toISOString(),
            projectDir: fullPath,
            language: config.language,
          };
        }
      } catch { /* skip */ }
    } else {
      scanDir(fullPath, progress, depth - 1);
    }
  }
}

export default function Progress({ args }: Props) {
  const [systemSlug] = args;
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = detectInProgressProjects();
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
  const completedSlugs = entries.filter(([, e]: [string, ProgressEntry]) => e.status === 'completed').map(([s]: [string, ProgressEntry]) => s);
  const inProgressSlugs = entries.filter(([, e]: [string, ProgressEntry]) => e.status === 'in-progress').map(([s]: [string, ProgressEntry]) => s);
  const notStarted = allSystems.map((s: { slug: string }) => s.slug).filter((slug: string) => !completedSlugs.includes(slug) && !inProgressSlugs.includes(slug));

  const total = allSystems.length;
  const pct = total > 0 ? Math.round((completedSlugs.length / total) * 100) : 0;

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Text bold>{'  '}100xSystems — Your Progress</Text>
      <Box marginY={1} />

      {completedSlugs.length > 0 && (
        <Box flexDirection="column">
          <Text color="green">{'  '}✓ Completed</Text>
          {completedSlugs.map((slug: string) => {
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
          {inProgressSlugs.map((slug: string) => {
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
          {notStarted.map((slug: string) => {
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
