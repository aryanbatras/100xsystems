import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { readProjectConfig } from '../scaffold/index.js';
import { getSpec } from '../reader/spec-reader.js';
import type { SpecCheck } from '../reader/index.js';

export const args = zod.tuple([]);

type Props = {
  args: zod.infer<typeof args>;
};

interface CheckResult { ok: boolean; message: string; }

async function runSpecCheck(check: SpecCheck, projectDir: string): Promise<{ type: string; result: 'pass' | 'fail' | 'skip'; hint: string }> {
  switch (check.type) {
    case 'file-exists': {
      if (!check.path) return { type: check.type, result: 'skip', hint: '' };
      return { type: check.type, result: fs.existsSync(path.join(projectDir, check.path)) ? 'pass' : 'fail', hint: `Create the file at: ${check.path}` };
    }
    case 'doc-section': {
      if (!check.path || !check.name) return { type: check.type, result: 'skip', hint: '' };
      const fullPath = path.join(projectDir, check.path);
      if (!fs.existsSync(fullPath)) return { type: check.type, result: 'fail', hint: `Add section "${check.name}" to ${check.path}` };
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const pattern = new RegExp(`^##+\\s+${check.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
        return { type: check.type, result: pattern.test(content) ? 'pass' : 'fail', hint: `Add section "${check.name}" to ${check.path}` };
      } catch { return { type: check.type, result: 'fail', hint: '' }; }
    }
    case 'doc-contains': {
      if (!check.path || !check.name) return { type: check.type, result: 'skip', hint: '' };
      const fp = path.join(projectDir, check.path);
      if (!fs.existsSync(fp)) return { type: check.type, result: 'fail', hint: `Ensure "${check.name}" is in ${check.path}` };
      try { return { type: check.type, result: fs.readFileSync(fp, 'utf-8').toLowerCase().includes(check.name.toLowerCase()) ? 'pass' : 'fail', hint: `Ensure "${check.name}" is mentioned in ${check.path}` }; }
      catch { return { type: check.type, result: 'fail', hint: '' }; }
    }
    case 'file-count-min': {
      if (!check.path) return { type: check.type, result: 'skip', hint: '' };
      const fp2 = path.join(projectDir, check.path);
      if (!fs.existsSync(fp2)) return { type: check.type, result: 'fail', hint: `Expected at least ${check.name} file(s) in ${check.path}` };
      try {
        const count = fs.readdirSync(fp2).filter((f) => !f.startsWith('.')).length;
        const min = parseInt(check.name || '1', 10) || 1;
        return { type: check.type, result: count >= min ? 'pass' : 'fail', hint: `Expected at least ${min} file(s) in ${check.path}` };
      } catch { return { type: check.type, result: 'fail', hint: '' }; }
    }
    case 'test-passes':
    case 'custom-command':
      if (!check.command) return { type: check.type, result: 'skip', hint: '' };
      try {
        execSync(check.command, { cwd: projectDir, stdio: 'pipe', timeout: 60000 });
        return { type: check.type, result: 'pass', hint: '' };
      } catch { return { type: check.type, result: 'fail', hint: `Run: ${check.command}` }; }
    default:
      return { type: check.type, result: 'skip', hint: '' };
  }
}

function checkDocumentation(projectDir: string): CheckResult[] {
  return [
    { path: 'README.md', name: 'README.md', minLength: 50 },
    { path: 'design/decisions.md', name: 'Engineering Decision Log (design/decisions.md)', minLength: 50 },
    { path: 'design/architecture.md', name: 'Architecture Document (design/architecture.md)', minLength: 50 },
    { path: 'design/tradeoffs.md', name: 'Trade-offs Analysis (design/tradeoffs.md)', minLength: 50 },
    { path: 'verification/checklist.md', name: 'Self-Assessment (verification/checklist.md)', minLength: 30 },
  ].map((doc) => {
    const fullPath = path.join(projectDir, doc.path);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8').trim();
      return content.length >= doc.minLength
        ? { ok: true, message: `${doc.name} exists with sufficient content` }
        : { ok: false, message: `${doc.name} exists but is incomplete. Add more content.` };
    }
    return { ok: false, message: `${doc.name} is missing. Create this file.` };
  });
}

function checkStructure(projectDir: string): CheckResult[] {
  const results: CheckResult[] = [];
  if (fs.existsSync(path.join(projectDir, '.100x.json'))) {
    results.push({ ok: true, message: '.100x.json project config found' });
  }
  const designDir = path.join(projectDir, 'design');
  if (fs.existsSync(designDir) && fs.statSync(designDir).isDirectory()) {
    const files = fs.readdirSync(designDir).filter(f => f.endsWith('.md'));
    if (files.length >= 2) results.push({ ok: true, message: `design/ directory with ${files.length} documentation file(s)` });
  }
  const srcDir = path.join(projectDir, 'src');
  const javaDir = path.join(projectDir, 'src', 'main', 'java');
  const hasSrc = fs.existsSync(srcDir) && fs.readdirSync(srcDir).some(f => !f.startsWith('.'));
  const hasJava = fs.existsSync(javaDir);
  if (hasSrc) results.push({ ok: true, message: 'Source code directory (src/) found' });
  else if (hasJava) results.push({ ok: true, message: 'Java source code directory (src/main/java/) found' });
  else results.push({ ok: false, message: 'No source code directory found' });
  return results;
}

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

      // Spec checks
      if (spec && spec.checks.length > 0) {
        children.push(<Text bold key="sc">{'  '}Specification Checks</Text>);

        for (const check of spec.checks) {
          const result = await runSpecCheck(check, projectDir);
          if (result.result === 'pass') {
            passed++;
            children.push(<Text key={`sc-${check.type}-${check.name || ''}`}>{'  '}<Text color="green">✓</Text> <Text dimColor>{check.type}{check.path ? ' ' + check.path : ''}</Text></Text>);
          } else if (result.result === 'fail') {
            failed++;
            children.push(<Text key={`sc-${check.type}-${check.name || ''}`}>{'  '}<Text color="red">✗</Text> <Text dimColor>{check.type}{check.path ? ' ' + check.path : ''}</Text></Text>);
            children.push(<Text key={`sc-hint-${check.type}-${check.name || ''}`} color="red">{'    '}{result.hint}</Text>);
          } else {
            skipped++;
          }
        }
        children.push(<Box marginY={1} key="sp3" />);
      }

      // Documentation checks
      children.push(<Text bold key="dc">{'  '}Documentation Completeness</Text>);
      const docResults = checkDocumentation(projectDir);
      for (const r of docResults) {
        if (r.ok) { passed++; children.push(<Text key={`doc-${r.message}`}>{'  '}<Text color="green">✓</Text> {r.message}</Text>); }
        else { failed++; children.push(<Text key={`doc-${r.message}`}>{'  '}<Text color="red">✗</Text> {r.message}</Text>); }
      }
      children.push(<Box marginY={1} key="sp4" />);

      // Structure checks
      children.push(<Text bold key="st">{'  '}Project Structure</Text>);
      const structResults = checkStructure(projectDir);
      for (const r of structResults) {
        if (r.ok) { passed++; children.push(<Text key={`st-${r.message}`}>{'  '}<Text color="green">✓</Text> {r.message}</Text>); }
        else { failed++; children.push(<Text key={`st-${r.message}`}>{'  '}<Text color="red">✗</Text> {r.message}</Text>); }
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
