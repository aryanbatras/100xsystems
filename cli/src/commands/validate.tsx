import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import { ValidationReport } from '../ui/index.js';
import zod from 'zod';
import { readProjectConfig } from '../scaffold/index.js';
import { runValidation } from '../actions/validate.js';
import type { ValidationResult } from '../actions/validate.js';

export const args = zod.tuple([]);

type Props = {
  args: zod.infer<typeof args>;
};

export default function Validate({}: Props) {
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [systemTitle, setSystemTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const projectDir = process.cwd();
      const config = readProjectConfig(projectDir);
      if (!config) {
        setError('No .100x.json found. Run `100x init <system>` first.');
        return;
      }
      const title = (config.systemTitle as string) || (config.system as string);
      setSystemTitle(title);
      const validationResults = await runValidation(projectDir, config);
      setResults(validationResults);
    })();
  }, []);

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="yellow">  {error}</Text>
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text dimColor>  Validating...</Text>
      </Box>
    );
  }

  return <ValidationReport results={results} systemTitle={systemTitle} />;
}
