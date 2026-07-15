import React, { useState, useCallback, useRef } from 'react';
import { Box, Text, useApp } from 'ink';
import { Dashboard } from '../ui/Dashboard.js';

export default function Index() {
  const { exit } = useApp();
  const [navigateMsg, setNavigateMsg] = useState<string | null>(null);

  const handleNavigate = useCallback((command: string, args?: string) => {
    const msg = `100x ${command}${args ? ' ' + args : ''}`;
    setNavigateMsg(msg);
    setTimeout(() => exit(), 100);
  }, [exit]);

  if (navigateMsg) {
    return (
      <Box flexDirection="column" paddingX={2} paddingY={1}>
        <Text>{'  '}Run: <Text color="cyan" bold>{navigateMsg}</Text></Text>
      </Box>
    );
  }

  return <Dashboard onNavigate={handleNavigate} />;
}
