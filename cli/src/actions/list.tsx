import React from 'react';
import { renderToString } from 'ink';
import { Box, Text, Divider } from '../ui/index.js';
import { getAllSystems, getSystemMeta, getSystemFolderTags } from '../reader/system-reader.js';

/**
 * `100x list` — List all available systems
 * `100x list <system>` — List sections of a specific system
 */
export async function listCommand(systemSlug?: string): Promise<void> {
  if (systemSlug) {
    await listSystemDetail(systemSlug);
  } else {
    await listAllSystems();
  }
}

async function listAllSystems(): Promise<void> {
  const systems = getAllSystems();

  if (systems.length === 0) {
    const { default: chalk } = await import('chalk');
    console.log(chalk.yellow('\n  No systems found in curriculum.'));
    console.log(chalk.dim('  Ensure the curriculum/ directory exists with system folders.'));
    return;
  }

  // Render the list using Ink

  const output = renderToString(
    <Box flexDirection="column" paddingX={2}>
      <Text bold>{'\n  100xSystems — Available Systems\n'}</Text>
      {systems.map(sys => {
        const difficultyColor = sys.difficulty === 'Advanced' ? 'red'
          : sys.difficulty === 'Intermediate' ? 'yellow'
          : 'green';

        return (
          <Box key={sys.slug} flexDirection="column" marginBottom={1} paddingX={2}>
            <Text bold>{'  '}{sys.title}</Text>
            <Text dimColor>{'  '}{sys.description}</Text>
            <Box marginTop={1}>
              <Text color={difficultyColor}>{'  '}{sys.difficulty}</Text>
              {sys.tags.length > 0 && (
                <Text dimColor>{'  '}{sys.tags.join(' · ')}</Text>
              )}
            </Box>
            <Text color="cyan">{'  '}100x list {sys.slug}</Text>
            <Text dimColor>  → see sections</Text>
            <Text color="cyan">{'  '}100x init {sys.slug}</Text>
            <Text dimColor>  → start building</Text>
          </Box>
        );
      })}
    </Box>,
  );

  console.log(output);
}

async function listSystemDetail(slug: string): Promise<void> {
  const system = getSystemMeta(slug);

  if (!system) {
    const { default: chalk } = await import('chalk');
    console.log(chalk.red(`\n  System "${slug}" not found.`));
    console.log(chalk.dim('  Run `100x list` to see all available systems.'));
    return;
  }

  const folderTags = getSystemFolderTags(slug);

  // Components already imported at top

  const output = renderToString(
    <Box flexDirection="column" paddingX={2}>
      <Text bold>{'\n  '}{system.title}</Text>
      {system.description && <Text dimColor>{'  '}{system.description}</Text>}
      {system.tags.length > 0 && (
        <Text dimColor>{'  '}{system.tags.join(' · ')}</Text>
      )}

      <Box marginY={1} />

      {folderTags.length === 0 ? (
        <Text color="yellow">{'  '}No sections found for this system.</Text>
      ) : (
        folderTags.map(tag => (
          <Box key={tag.tag} flexDirection="column" marginBottom={1}>
            <Text bold>{'  '}{tag.displayName} <Text dimColor>({tag.children.length} items)</Text></Text>
            {tag.children.map(child => (
              <Box key={child.slug} marginLeft={2}>
                <Text dimColor>{child.type === 'folder' ? '📁' : '📄'} {child.title}</Text>
              </Box>
            ))}
            {tag.tag === 'quizzes' && (
              <Text color="cyan">{'    '}100x quiz {slug}  <Text dimColor>→ take quizzes</Text></Text>
            )}
            {tag.tag === 'challenges' && (
              <Text color="cyan">{'    '}100x challenge {slug}  <Text dimColor>→ start a challenge</Text></Text>
            )}
            {tag.tag === 'specification' && (
              <Text color="cyan">{'    '}100x verify  <Text dimColor>→ verify your implementation</Text></Text>
            )}
            {tag.tag === 'implementation' && (
              <Text color="cyan">{'    '}100x init {slug} --lang &lt;language&gt;  <Text dimColor>→ scaffold project</Text></Text>
            )}
          </Box>
        ))
      )}
    </Box>,
  );

  console.log(output);
}
