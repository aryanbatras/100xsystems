import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import { getLearnDashboard } from '../actions/learn.js';
import type { LearnDashboard, NextLesson, SystemProgress } from '../actions/learn.js';

export const args = zod.tuple([]);

type Props = {
  args: zod.infer<typeof args>;
};

export default function Learn({}: Props) {
  const [dashboard, setDashboard] = useState<LearnDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const db = getLearnDashboard();
      setDashboard(db);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="red">{'  '}⚠ Could not load learning dashboard: {error}</Text>
      </Box>
    );
  }

  if (!dashboard) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text dimColor>{'  '}Loading your learning path...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      {renderDashboard(dashboard)}
    </Box>
  );
}

// ─── Ink Render Components ──────────────────────────────────────────

function renderDashboard({ nextLesson, allSystems, totalCompleted, totalAvailable, overallProgress }: LearnDashboard) {
  const children: React.ReactNode[] = [];

  // Header
  children.push(
    <Text key="h" bold>{'  '}100xSystems — Learning Dashboard</Text>
  );
  children.push(<Box key="sp0" marginY={1} />);

  // Overall progress bar
  children.push(
    <Text key="progress">
      {'  '}Overall Progress: <Text bold>{overallProgress}%</Text>
      {'  '}<Text dimColor>({totalCompleted}/{totalAvailable} lessons across {allSystems.length} systems)</Text>
    </Text>
  );
  children.push(<Box key="sp1" marginY={1} />);

  // ─── Next Lesson ─────────────────────────────────────────────────
  if (nextLesson) {
    children.push(
      <Text key="next-h" bold color="cyan">{'  '}▶ Next Up</Text>
    );
    children.push(
      <Box key="next-card" flexDirection="column" marginLeft={2} marginTop={1} borderStyle="round" borderColor="cyan" paddingX={1}>
        <Box>
          <Text bold>{'  '}{nextLesson.systemTitle}</Text>
          {nextLesson.trackTitle && (
            <Text dimColor>{'  · '}{nextLesson.trackTitle}</Text>
          )}
        </Box>
        <Box marginTop={1}>
          <Text>{'  '}Lesson: <Text bold>{nextLesson.lesson.title}</Text></Text>
        </Box>
        {nextLesson.lesson.description && (
          <Text dimColor>{'  '}{nextLesson.lesson.description}</Text>
        )}
        <Box marginTop={1}>
          <Text dimColor>{'  '}Difficulty: {nextLesson.difficulty}</Text>
          {nextLesson.lesson.estimatedTime && (
            <Text dimColor>{'  · '}Estimated: {nextLesson.lesson.estimatedTime}</Text>
          )}
        </Box>
        <Box marginTop={1}>
          <Text dimColor>{'  '}Module: {nextLesson.lesson.module}</Text>
          <Text dimColor>{'  · '}Track: {nextLesson.lesson.track}</Text>
        </Box>
      </Box>
    );
    children.push(<Box key="sp2" marginY={1} />);
  } else {
    children.push(
      <Text key="no-next" color="green">{'  '}✓ You've completed all available lessons! 🎉</Text>
    );
    children.push(<Box key="sp3" marginY={1} />);
  }

  // ─── All Systems ─────────────────────────────────────────────────
  children.push(
    <Text key="sys-h" bold>{'  '}All Systems</Text>
  );
  children.push(<Box key="sp4" marginY={1} />);

  for (const sys of allSystems) {
    children.push(...renderSystemRow(sys));
  }

  // ─── Quick Actions ───────────────────────────────────────────────
  children.push(<Box key="sp5" marginY={1} />);
  children.push(
    <Text key="hint" dimColor>{'  '}Quick start: 100x list  ·  100x quiz &lt;system&gt;  ·  100x challenge &lt;system&gt;</Text>
  );

  return <Box flexDirection="column">{children}</Box>;
}

function renderSystemRow(sys: SystemProgress): React.ReactNode[] {
  const statusIcon = sys.status === 'completed' ? '✓'
    : sys.status === 'in-progress' ? '▶'
    : '○';
  const statusColor = sys.status === 'completed' ? 'green'
    : sys.status === 'in-progress' ? 'cyan'
    : 'dimColor';

  return [
    <Text key={`sys-${sys.slug}`}>
      {'  '}
      <Text color={statusColor as any}>{statusIcon}</Text>
      {' '}
      <Text bold>{sys.title}</Text>
      {'  '}
      <Text dimColor>{sys.completedLessons}/{sys.totalLessons} lessons · {sys.percentComplete}%</Text>
    </Text> as React.ReactElement,
  ];
}
