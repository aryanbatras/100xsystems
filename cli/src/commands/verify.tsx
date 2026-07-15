import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import { readProjectConfig } from '../scaffold/index.js';
import { getSpec } from '../reader/spec-reader.js';
import { runSpecCheck } from '../actions/verify.js';
import type { SpecCheckResult } from '../actions/verify.js';
import { checkDocumentation, checkStructure } from '../actions/validate.js';
import type { ValidationResult } from '../actions/validate.js';

export const args = zod.tuple([]);

type Props = {
  args: zod.infer<typeof args>;
};

export default function Verify({}: Props) {
  const [elements, setElements] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const projectDir = process.cwd();
      const config = readProjectConfig(projectDir);
      if (!config) {
        setError('No .100x.json found. Run `100x init <system>` first.');
        return;
      }

      const systemSlug = config.system as string;
      const systemTitle = (config.systemTitle as string) || systemSlug;
      const spec = getSpec(systemSlug);

      let passed = 0, failed = 0, skipped = 0;
      const children: React.ReactNode[] = [];

      children.push(<Text bold key="header">{'  '}100xSystems — Verifying &ldquo;{systemTitle}&rdquo;</Text>);
      children.push(<Box marginY={1} key="sp1" />);

      if (spec) {
        children.push(<Text key="specinfo" dimColor>{'  '}Specification: {spec.title} (v{spec.version})</Text>);
        children.push(<Text key="proj" dimColor>{'  '}Project: {projectDir}</Text>);
        children.push(<Box marginY={1} key="sp2" />);
      }

      // Spec checks (from actions/verify.ts)
      if (spec && spec.checks.length > 0) {
        children.push(<Text bold key="sc">{'  '}Specification Checks</Text>);

        for (const check of spec.checks) {
          const sr: SpecCheckResult = await runSpecCheck(check, projectDir);
          const resultKey = `sc-${check.type}-${check.path || check.name || ''}`;
          if (sr.result === 'pass') {
            passed++;
            children.push(<Text key={resultKey}>{'  '}<Text color="green">✓</Text> <Text dimColor>{check.type}{check.path ? ' ' + check.path : ''}</Text></Text>);
          } else if (sr.result === 'fail') {
            failed++;
            children.push(<Text key={resultKey}>{'  '}<Text color="red">✗</Text> <Text dimColor>{check.type}{check.path ? ' ' + check.path : ''}</Text></Text>);
            children.push(<Text key={`${resultKey}-hint`} color="red">{'    '}{sr.hint}</Text>);
          } else {
            skipped++;
          }
        }
        children.push(<Box marginY={1} key="sp3" />);
      }

      // Documentation checks (from actions/validate.ts)
      children.push(<Text bold key="dc">{'  '}Documentation Completeness</Text>);
      const docResults: ValidationResult[] = checkDocumentation(projectDir);
      for (const r of docResults) {
        if (r.status === 'pass') { passed++; children.push(<Text key={`doc-${r.check}`}>{'  '}<Text color="green">✓</Text> {r.message}</Text>); }
        else if (r.status === 'fail') { failed++; children.push(<Text key={`doc-${r.check}`}>{'  '}<Text color="red">✗</Text> {r.message}</Text>); }
        else { children.push(<Text key={`doc-${r.check}`}>{'  '}<Text color="yellow">⚠</Text> {r.message}</Text>); }
      }
      children.push(<Box marginY={1} key="sp4" />);

      // Structure checks (from actions/validate.ts)
      children.push(<Text bold key="st">{'  '}Project Structure</Text>);
      const structResults: ValidationResult[] = checkStructure(projectDir);
      for (const r of structResults) {
        if (r.status === 'pass') { passed++; children.push(<Text key={`st-${r.check}`}>{'  '}<Text color="green">✓</Text> {r.message}</Text>); }
        else if (r.status === 'fail') { failed++; children.push(<Text key={`st-${r.check}`}>{'  '}<Text color="red">✗</Text> {r.message}</Text>); }
        else { children.push(<Text key={`st-${r.check}`}>{'  '}<Text color="yellow">⚠</Text> {r.message}</Text>); }
      }
      children.push(<Box marginY={1} key="sp5" />);

      // Summary
      children.push(
        <Box key="summary" flexDirection="column">
          <Text>{'  '}<Text dimColor>─{'─'.repeat(38)}</Text></Text>
          <Text bold>{'  '}Results: <Text color="green">{passed} passed</Text>{failed > 0 ? <Text>, <Text color="red">{failed} failed</Text></Text> : null}{skipped > 0 ? <Text>, <Text dimColor>{skipped} skipped</Text></Text> : null}</Text>
          {failed === 0 ? (
            <Box flexDirection="column">
              <Text color="green">{'  '}All checks passed! Your implementation looks good.</Text>
              <Text dimColor>{'  '}Run 100x submit to submit for review.</Text>
            </Box>
          ) : (
            <Box flexDirection="column">
              <Text color="yellow">{'  '}{failed} check(s) failed. Review the issues above.</Text>
              <Text dimColor>{'  '}Fix the issues and run 100x verify again.</Text>
            </Box>
          )}
        </Box>
      );

      setElements(<Box flexDirection="column" paddingX={2}>{children}</Box>);
    })();
  }, []);

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="yellow">  {error}</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      {elements || <Text dimColor>  Verifying...</Text>}
    </Box>
  );
}
