import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import { option } from 'pastel';
import { readProjectConfig } from '../scaffold/index.js';
import { runReview } from '../actions/review.js';
import type { ReviewSummary, ReviewResult } from '../actions/review.js';

export const args = zod.tuple([
  zod.string().optional().describe('System slug (auto-detected from project if omitted)'),
]);

export const options = zod.object({
  'api-key': zod.string().optional().describe(
    option({ description: 'OpenAI API key (defaults to OPENAI_API_KEY env var)', alias: 'k' }),
  ),
  'api-base': zod.string().optional().describe(
    option({ description: 'Custom API base URL (for local models / proxies)', alias: 'b' }),
  ),
  model: zod.string().optional().describe(
    option({ description: 'Model name (default: gpt-4o-mini)', alias: 'm' }),
  ),
  lesson: zod.string().optional().describe(
    option({ description: 'Review only against a specific lesson\'s criteria', alias: 'l' }),
  ),
});

type Props = {
  args: zod.infer<typeof args>;
  options: zod.infer<typeof options>;
};

export default function Review({ args, options }: Props) {
  const [systemSlug] = args;
  const [output, setOutput] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const projectDir = process.cwd();
      const config = readProjectConfig(projectDir);
      const slug = systemSlug || (config?.system as string);

      if (!slug) {
        setError(
          'No system specified and no .100x.json found.\n' +
          '  Run: 100x review <system-slug>\n' +
          '  Or:  100x review  (from a project directory with .100x.json)'
        );
        return;
      }

      try {
        const summary = await runReview(
          projectDir,
          slug,
          options['api-key'],
          options['api-base'],
          options.model,
          options.lesson,
        );

        setOutput(renderReview(summary));
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="red">{'  '}⚠ Review failed</Text>
        <Box marginY={1} />
        <Text>{'  '}{error}</Text>
        <Box marginY={1} />
        <Text dimColor>{'  '}Need an API key? https://platform.openai.com/api-keys</Text>
        <Text dimColor>{'  '}→ export OPENAI_API_KEY=sk-...</Text>
        <Text dimColor>{'  '}→ 100x review --api-key sk-...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      {output || <Text dimColor>{'  '}Running AI review... (this may take 30-60 seconds)</Text>}
    </Box>
  );
}

// ─── Ink Render ─────────────────────────────────────────────────────

function renderReview(summary: ReviewSummary): React.ReactNode {
  const children: React.ReactNode[] = [];

  // Header
  children.push(
    <Text key="h" bold>{'  '}100xSystems — AI Engineering Review</Text>
  );
  children.push(<Box key="sp0" marginY={1} />);
  children.push(
    <Text key="meta" dimColor>
      {'  '}{summary.systemTitle} · Reviewed {new Date(summary.reviewedAt).toLocaleString()}
    </Text>
  );
  children.push(<Box key="sp1" marginY={1} />);

  // Overall score
  const scoreColor = summary.overallScore >= 80 ? 'green'
    : summary.overallScore >= 50 ? 'yellow'
    : 'red';
  children.push(
    <Text key="score">
      {'  '}Overall Score: <Text bold color={scoreColor}>{summary.overallScore}/100</Text>
      {'  '}<Text dimColor>({summary.totalStrengths} strengths · {summary.totalWeaknesses} weaknesses)</Text>
    </Text>
  );
  children.push(<Box key="sp2" marginY={1} />);

  // Per-category results
  for (const result of summary.results) {
    children.push(...renderCategoryResult(result));
    children.push(<Box key={`sp-${result.category}`} marginY={1} />);
  }

  // Legend
  children.push(<Box key="sp3" marginY={1} />);
  children.push(
    <Text key="legend" dimColor>
      {'  '}Score: <Text color="green">80-100</Text> Excellent ·{' '}
      <Text color="yellow">50-79</Text> Needs work ·{' '}
      <Text color="red">0-49</Text> Missing/Incomplete
    </Text>
  );

  return <Box flexDirection="column" paddingX={2}>{children}</Box>;
}

function renderCategoryResult(result: ReviewResult): React.ReactNode[] {
  const scoreColor = result.score >= 80 ? 'green'
    : result.score >= 50 ? 'yellow'
    : 'red';

  const items: React.ReactNode[] = [];

  items.push(
    <Text key={`cat-${result.category}`}>
      {'  '}<Text bold>{result.category}</Text>
      {'  '}| <Text color={scoreColor}>{result.score}/100</Text>
    </Text>
  );

  if (result.feedback) {
    // Truncate long feedback for terminal display
    const feedback = result.feedback.length > 300
      ? result.feedback.slice(0, 300) + '...'
      : result.feedback;
    items.push(
      <Text key={`fb-${result.category}`} dimColor>
        {'    '}{feedback}
      </Text>
    );
  }

  if (result.strengths.length > 0) {
    const topStrengths = result.strengths.slice(0, 3);
    items.push(
      <Text key={`str-${result.category}`} color="green">
        {'    '}✓ {topStrengths.join(' · ')}
        {result.strengths.length > 3 && ` (+${result.strengths.length - 3} more)`}
      </Text>
    );
  }

  if (result.weaknesses.length > 0) {
    const topWeaknesses = result.weaknesses.slice(0, 3);
    items.push(
      <Text key={`weak-${result.category}`} color="yellow">
        {'    '}⚠ {topWeaknesses.join(' · ')}
        {result.weaknesses.length > 3 && ` (+${result.weaknesses.length - 3} more)`}
      </Text>
    );
  }

  return items;
}
