import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import {
  getStatus,
  initGist,
  updateGist,
  stopGist,
} from '../actions/build-in-public.js';

export const args = zod.tuple([
  zod.enum(['init', 'update', 'status', 'stop']).optional().describe('Action: init, update, status, or stop'),
]);

export const options = zod.object({});

type Props = {
  args: zod.infer<typeof args>;
};

export default function Public({ args }: Props) {
  const [action] = args;
  const [element, setElement] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        switch (action || 'status') {
          case 'status': {
            const status = getStatus();
            if (!status.isActive) {
              setElement(
                <Box flexDirection="column" paddingX={2} paddingY={1}>
                  <Text bold>{'  '}Build in Public — Not Active</Text>
                  <Box marginY={1} />
                  <Text dimColor>
                    {'  '}Share your 100xSystems progress with the world!
                  </Text>
                  <Box marginY={1} />
                  <Text color="cyan">{'  '}100x public init  <Text dimColor>— Create a public progress gist</Text></Text>
                  <Text color="cyan">{'  '}100x public update  <Text dimColor>— Update your progress gist</Text></Text>
                </Box>
              );
            } else {
              setElement(
                <Box flexDirection="column" paddingX={2} paddingY={1}>
                  <Text bold color="green">{'  '}✓ Build in Public is Active</Text>
                  <Box marginY={1} />
                  <Text>{'  '}Gist URL: <Text color="cyan" bold>{status.gistUrl}</Text></Text>
                  <Text dimColor>{'  '}Last updated: {status.lastUpdated ? new Date(status.lastUpdated).toLocaleString() : 'Never'}</Text>
                  <Box marginY={1} />
                  <Text dimColor>{'  '}Tip: Pin this gist to your GitHub profile!</Text>
                  <Text color="cyan">{'  '}100x public update  <Text dimColor>— Refresh your progress</Text></Text>
                  <Text color="cyan">{'  '}100x public stop  <Text dimColor>— Stop tracking</Text></Text>
                </Box>
              );
            }
            break;
          }

          case 'init': {
            const result = await initGist();
            setElement(
              <Box flexDirection="column" paddingX={2} paddingY={1}>
                <Text bold color="green">{'  '}✓ Build in Public Gist Created!</Text>
                <Box marginY={1} />
                <Text>{'  '}Your progress gist is live at:</Text>
                <Text color="cyan" bold>{'  '}{result.gistUrl}</Text>
                <Box marginY={1} />
                <Text dimColor>{'  '}Pin this gist to your GitHub profile to show off</Text>
                <Text dimColor>{'  '}your systems engineering journey. Update it anytime:</Text>
                <Box marginY={1} />
                <Text color="cyan">{'  '}100x public update  <Text dimColor>— Sync latest progress</Text></Text>
              </Box>
            );
            break;
          }

          case 'update': {
            const result = await updateGist();
            setElement(
              <Box flexDirection="column" paddingX={2} paddingY={1}>
                <Text bold color="green">{'  '}✓ Progress gist updated!</Text>
                <Box marginY={1} />
                <Text>{'  '}{result.gistUrl}</Text>
                <Text dimColor>{'  '}Updated at: {new Date(result.lastUpdated || '').toLocaleString()}</Text>
                {!result.gistUrl?.includes('github') && (
                  <Text dimColor>{'  '}Check your gist at the URL above.</Text>
                )}
              </Box>
            );
            break;
          }

          case 'stop': {
            stopGist();
            setElement(
              <Box flexDirection="column" paddingX={2} paddingY={1}>
                <Text bold color="yellow">{'  '}○ Build in Public stopped.</Text>
                <Box marginY={1} />
                <Text dimColor>{'  '}Your gist still exists on GitHub but will no longer be updated.</Text>
                <Text color="cyan">{'  '}100x public init  <Text dimColor>— Start fresh</Text></Text>
              </Box>
            );
            break;
          }
        }
      } catch (err: any) {
        setError(err.message || String(err));
      }
    })();
  }, [action]);

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2} paddingY={1}>
        <Text color="red">{'  '}⚠ {error}</Text>
      </Box>
    );
  }

  return element || (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Text dimColor>{'  '}Loading...</Text>
    </Box>
  );
}
