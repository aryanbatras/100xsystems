import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import { option } from 'pastel';
import path from 'path';
import fs from 'fs';
import { systemExists, getSystemMeta } from '../reader/system-reader.js';
import { SYSTEMS_DIR } from '../reader/index.js';
import { scaffoldProject } from '../scaffold/index.js';
import { getSpec } from '../reader/spec-reader.js';
import { getCachedUser } from '../auth/index.js';
import { markInProgress } from '../actions/progress.js';

export const args = zod.tuple([
  zod.string().describe('System slug (e.g., claude-code)'),
]);

export const options = zod.object({
  lang: zod.enum(['typescript', 'java']).optional().describe(
    option({ description: 'Programming language (typescript, java)', alias: 'l' }),
  ),
  output: zod.string().optional().describe(
    option({ description: 'Output directory', alias: 'o' }),
  ),
  author: zod.string().optional().describe(
    option({ description: 'Your GitHub username (for templates)', alias: 'a' }),
  ),
});

type Props = {
  args: zod.infer<typeof args>;
  options: zod.infer<typeof options>;
};

export default function Init({ args, options }: Props) {
  const [systemSlug] = args;
  const [elements, setElements] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Validate system
      if (!systemExists(systemSlug)) {
        setError(`System "${systemSlug}" not found. Run 100x list to see all available systems.`);
        return;
      }

      const system = getSystemMeta(systemSlug)!;
      const outputDir = options.output || `./${systemSlug}-implementation`;
      const targetDir = path.resolve(process.cwd(), outputDir);

      // Check if directory already exists
      if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
        setError(`Directory "${outputDir}" already exists and is not empty. Use --output to specify a different path.`);
        return;
      }

      // Read specification
      const spec = getSpec(systemSlug);
      let specContent = '';
      if (spec) {
        specContent = `# ${spec.title}\n\nVersion: ${spec.version}\n\n`;
        if (spec.checks.length > 0) {
          specContent += '## Verification Checks\n\n';
          for (const check of spec.checks) {
            specContent += `- ${check.type}: ${check.path || check.name || check.command || '(see spec details)'}\n`;
          }
        }
      }

      const lang = options.lang || 'typescript';
      const cachedUser = getCachedUser();
      const author = options.author || cachedUser?.login || '';
      const systemTitle = system.title;

      // Scaffold the project
      try {
        const created = scaffoldProject({
          targetDir,
          systemSlug,
          systemTitle,
          language: lang as 'typescript' | 'java',
          author,
          specification: specContent,
        });

        // Track progress
        markInProgress(systemSlug, targetDir, lang);

        // Build Ink JSX output
        const docs = created.filter((f: string) => f.startsWith('design/') || f.startsWith('verification/') || f.startsWith('specification/') || f === 'README.md');
        const code = created.filter((f: string) => f.startsWith('src/') || f.startsWith('pom.xml') || f.startsWith('package.json') || f.startsWith('tsconfig.json'));
        const configs = created.filter((f: string) => f.startsWith('.') || f.startsWith('build'));

        const children: React.ReactNode[] = [];

        children.push(<Text bold key="header">{'  '}100xSystems — Initializing &ldquo;{systemTitle}&rdquo;</Text>);
        children.push(<Box marginY={1} key="sp1" />);
        children.push(<Text key="sys" dimColor>{'  '}System:   {systemTitle}</Text>);
        children.push(<Text key="out" dimColor>{'  '}Output:   {outputDir}</Text>);
        children.push(<Text key="lang" dimColor>{'  '}Language: {lang}</Text>);
        if (author) children.push(<Text key="auth" dimColor>{'  '}Author:   {author}</Text>);
        children.push(<Box marginY={1} key="sp2" />);
        children.push(<Text color="green" key="success">{'  '}✓ Project created successfully!</Text>);
        children.push(<Box marginY={1} key="sp3" />);

        if (docs.length > 0) {
          children.push(<Text key="docs-h" dimColor>{'  '}Documentation:</Text>);
          for (const file of docs) children.push(<Text key={`doc-${file}`}>{'    '}📝 {file}</Text>);
          children.push(<Box marginY={1} key="sp4" />);
        }

        if (code.length > 0) {
          children.push(<Text key="code-h" dimColor>{'  '}Code:</Text>);
          for (const file of code) children.push(<Text key={`code-${file}`}>{'    '}📄 {file}</Text>);
          children.push(<Box marginY={1} key="sp5" />);
        }

        if (configs.length > 0) {
          children.push(<Text key="cfg-h" dimColor>{'  '}Config:</Text>);
          for (const file of configs) children.push(<Text key={`cfg-${file}`}>{'    '}⚙️  {file}</Text>);
          children.push(<Box marginY={1} key="sp6" />);
        }

        children.push(<Text bold key="next">Next steps:</Text>);
        children.push(<Text key="ns1" color="cyan">{'  '}cd {outputDir}</Text>);
        children.push(<Text key="ns2" color="cyan">{'  '}100x validate  <Text dimColor>→ check document completeness</Text></Text>);
        children.push(<Text key="ns3" color="cyan">{'  '}100x verify    <Text dimColor>→ check against specification</Text></Text>);
        children.push(<Box marginY={1} key="sp7" />);

        // Check for quizzes/challenges
        const quizDir = path.join(SYSTEMS_DIR(), systemSlug, 'quizzes');
        const challengeDir = path.join(SYSTEMS_DIR(), systemSlug, 'challenges');
        const hasQuizzes = fs.existsSync(quizDir) && fs.readdirSync(quizDir).some(f => f.endsWith('.md'));
        const hasChallenges = fs.existsSync(challengeDir) && fs.readdirSync(challengeDir).some(f => f.endsWith('.md'));

        if (hasQuizzes || hasChallenges) {
          children.push(<Text key="also" dimColor>Also try:</Text>);
          if (hasQuizzes) children.push(<Text key="quiz" color="cyan">{'  '}100x quiz {systemSlug}  <Text dimColor>→ take quizzes</Text></Text>);
          if (hasChallenges) children.push(<Text key="chal" color="cyan">{'  '}100x challenge {systemSlug}  <Text dimColor>→ start a challenge</Text></Text>);
          children.push(<Box marginY={1} key="sp8" />);
        }

        children.push(<Text key="submit-hint" dimColor>When you&rsquo;re ready to submit your implementation:</Text>);
        children.push(<Text key="submit-cmd" dimColor>{'  '}→ Run 100x submit to prepare your review package</Text>);

        setElements(<Box flexDirection="column" paddingX={2}>{children}</Box>);
      } catch (err: any) {
        setError(`Failed to create project: ${err.message}`);
      }
    })();
  }, [systemSlug]);

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="red">  {error}</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      {elements || <Text dimColor>  Initializing...</Text>}
    </Box>
  );
}
