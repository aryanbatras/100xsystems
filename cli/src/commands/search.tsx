import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import { getAllSystems, getSystemMeta } from '../reader/system-reader.js';
import { getSystemResources, getSystemsWithResources } from '../reader/resource-reader.js';

export const args = zod.tuple([
  zod.string().describe('Search query (e.g., \"database\", \"kubernetes\", \"AI\")'),
]);

type Props = {
  args: zod.infer<typeof args>;
};

export default function Search({ args }: Props) {
  const [query] = args;
  const [output, setOutput] = useState<React.ReactNode>(null);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setOutput(
        <Box flexDirection="column" paddingX={2}>
          <Text color="yellow">  Please provide a search query.</Text>
          <Text dimColor>  Example: 100x search database</Text>
        </Box>
      );
      return;
    }

    const systems = getAllSystems();
    const results: { type: string; slug: string; title: string; match: string }[] = [];

    // Search systems by title, description, tags
    for (const sys of systems) {
      if (sys.title.toLowerCase().includes(q)) {
        results.push({ type: 'System', slug: sys.slug, title: sys.title, match: `Title matches "${query}"` });
      } else if (sys.description.toLowerCase().includes(q)) {
        results.push({ type: 'System', slug: sys.slug, title: sys.title, match: `Description matches "${query}"` });
      } else if (sys.tags.some((t: string) => t.toLowerCase().includes(q))) {
        results.push({ type: 'System', slug: sys.slug, title: sys.title, match: `Tags match "${query}"` });
      }
    }

    // Search resources
    const resourceSystems = getSystemsWithResources();
    for (const slug of resourceSystems) {
      const resources = getSystemResources(slug);
      if (!resources) continue;
      for (const cat of resources.categories) {
        for (const item of cat.items) {
          if (
            item.title.toLowerCase().includes(q) ||
            (item.description || '').toLowerCase().includes(q)
          ) {
            const system = getSystemMeta(slug);
            results.push({
              type: 'Resource',
              slug,
              title: item.title,
              match: `In ${system?.title || slug} > ${cat.name}`,
            });
          }
        }
      }
    }

    if (results.length === 0) {
      setOutput(
        <Box flexDirection="column" paddingX={2}>
          <Text color="yellow">  No results for &ldquo;{query}&rdquo;</Text>
          <Text dimColor>  Try searching by system name, technology, or topic.</Text>
        </Box>
      );
      return;
    }

    // Limit to 30 results
    const display = results.slice(0, 30);
    const remaining = results.length - display.length;

    setOutput(
      <Box flexDirection="column" paddingX={2}>
        <Text bold>{'  '}Search results for &ldquo;{query}&rdquo; ({results.length} found)</Text>
        <Box marginY={1} />
        {display.map((r, i) => (
          <Box key={i} flexDirection="column" marginBottom={1}>
            <Text>
              {r.type === 'System' ? <Text color="cyan">⚡</Text> : <Text color="green">📚</Text>}
              {' '}<Text bold>{r.title}</Text>
            </Text>
            <Text dimColor>{'  '}{r.match}</Text>
            {r.type === 'System' && (
              <Text color="cyan">{'  '}100x init {r.slug}  <Text dimColor>→ start building</Text></Text>
            )}
          </Box>
        ))}
        {remaining > 0 && (
          <Text dimColor>{'  '}... and {remaining} more results</Text>
        )}
      </Box>
    );
  }, [query]);

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      {output || <Text dimColor>  Searching...</Text>}
    </Box>
  );
}
