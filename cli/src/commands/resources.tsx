import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import { systemExists, getSystemMeta } from '../reader/system-reader.js';
import { getSystemResources, getSystemsWithResources } from '../reader/resource-reader.js';

export const args = zod.tuple([
  zod.string().optional().describe('Optional system slug to show resources'),
]);

type Props = {
  args: zod.infer<typeof args>;
};

const TYPE_ICONS: Record<string, string> = {
  paper: '📄',
  video: '🎬',
  blog: '📝',
  documentation: '📚',
  tool: '🔧',
};

export default function Resources({ args }: Props) {
  const [systemSlug] = args;
  const [output, setOutput] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (systemSlug) {
      if (!systemExists(systemSlug)) {
        setError(`System "${systemSlug}" not found. Run 100x list to see all available systems.`);
        return;
      }

      const system = getSystemMeta(systemSlug);
      const resources = getSystemResources(systemSlug);

      if (!resources || resources.categories.length === 0) {
        setError(`No curated resources yet for "${system?.title || systemSlug}".`);
        return;
      }

      setOutput(
        <Box flexDirection="column" paddingX={2}>
          <Text bold>{'  '}{system?.title || systemSlug} Resources</Text>
          {resources.categories.map((cat) => (
            <Box key={cat.name} flexDirection="column" marginTop={1}>
              <Text bold>{'  '}{cat.name}</Text>
              {cat.items.map((item, i) => (
                <Box key={i} flexDirection="column" marginLeft={2}>
                  <Text>
                    {'  '}{TYPE_ICONS[item.type] || '🔗'} <Text color="cyan">{item.title}</Text>
                  </Text>
                  <Text dimColor>{'    '}{item.url}</Text>
                  {item.description && <Text dimColor>{'    '}{item.description}</Text>}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      );
    } else {
      const systems = getSystemsWithResources();

      if (systems.length === 0) {
        setError('No resources found for any system yet.');
        return;
      }

      setOutput(
        <Box flexDirection="column" paddingX={2}>
          <Text bold>{'  '}100xSystems — Systems with Curated Resources</Text>
          {systems.map((slug) => {
            const system = getSystemMeta(slug);
            const resources = getSystemResources(slug);
            const resourceCount = resources?.categories.reduce((sum, c) => sum + c.items.length, 0) || 0;
            return (
              <Box key={slug} flexDirection="column" marginTop={1}>
                <Text bold>{'  '}{system?.title || slug}</Text>
                <Text dimColor>{'  '}{resourceCount} resources in {resources?.categories.length || 0} categories</Text>
                <Text color="cyan">{'  '}100x resources {slug}  <Text dimColor>→ view resources</Text></Text>
              </Box>
            );
          })}
        </Box>
      );
    }
  }, [systemSlug]);

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="yellow">  {error}</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      {output || <Text dimColor>  Loading resources...</Text>}
    </Box>
  );
}
