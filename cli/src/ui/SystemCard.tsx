import React from 'react';
import { Box, Text } from 'ink';
import type { SystemInfo } from '../reader/index.js';

interface SystemCardProps {
  system: SystemInfo;
}

/**
 * A card that displays a system's title, description, difficulty, and tags.
 * Used in the `100x list` command output.
 */
export function SystemCard({ system }: SystemCardProps) {
  const difficultyColor = system.difficulty === 'Advanced' ? 'red'
    : system.difficulty === 'Intermediate' ? 'yellow'
    : 'green';

  return (
    <Box flexDirection="column" marginBottom={1} paddingX={2}>
      <Text bold>{system.title}</Text>
      <Text dimColor>{system.description}</Text>
      <Box marginTop={1}>
        <Text>
          <Text color={difficultyColor}>{system.difficulty}</Text>
          {system.tags.length > 0 && (
            <Text dimColor>  {system.tags.join(' · ')}</Text>
          )}
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text>
          <Text color="cyan">100x list {system.slug}</Text>
          <Text dimColor>  → see sections</Text>
          <Text>{'\n'}</Text>
          <Text color="cyan">100x init {system.slug}</Text>
          <Text dimColor>  → start building</Text>
        </Text>
      </Box>
    </Box>
  );
}
