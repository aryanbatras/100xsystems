import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text, useApp } from 'ink';
import Spinner from 'ink-spinner';
import { TextInput, ConfirmInput, ValidationSummary } from '../ui/index.js';
import SelectInput from 'ink-select-input';
import zod from 'zod';
import {
  readSubmitConfig,
  authenticateGitHub,
  detectGitRemote,
  buildReviewPackage,
  updateSubmissionsIndex,
  markProjectCompleted,
  isInsideMonorepo,
} from '../actions/submit.js';
import type { SubmitAnswers, BuildResult } from '../actions/submit.js';
import { runValidation } from '../actions/validate.js';
import type { ValidationResult } from '../actions/validate.js';

export const args = zod.tuple([
  zod.string().optional().describe('Optional system slug (auto-detected from .100x.json)'),
]);

type Props = {
  args: zod.infer<typeof args>;
};

type SharedContext = {
  config: Record<string, any>;
  slug: string;
  projectDir: string;
  systemTitle: string;
};

type SubmitPhase =
  | { name: 'loading' }
  | { name: 'error'; message: string }
  | { name: 'confirm'; ctx: SharedContext; results: ValidationResult[] }
  | { name: 'auth'; ctx: SharedContext }
  | { name: 'metadata'; ctx: SharedContext; user: string; defaultRepoUrl: string | null }
  | { name: 'building'; ctx: SharedContext; answers: SubmitAnswers; user: string }
  | { name: 'done'; result: BuildResult };

export default function Submit({ args }: Props) {
  const [systemSlug] = args;
  const [phase, setPhase] = useState<SubmitPhase>({ name: 'loading' });
  const { exit } = useApp();

  // ─── Kick off loading ──────────────────────────────────────────

  useEffect(() => {
    if (phase.name !== 'loading') return;

    (async () => {
      const projectDir = process.cwd();
      const loaded = readSubmitConfig(projectDir, systemSlug);
      if (!loaded) {
        setPhase({ name: 'error', message: 'No .100x.json found. Run `100x init <system>` first.' });
        return;
      }

      const { config, slug } = loaded;
      const systemTitle = (config.systemTitle as string) || slug;
      const ctx: SharedContext = { config, slug, projectDir, systemTitle };

      // Run validation, then go straight to confirm
      const results = await runValidation(projectDir, config);
      setPhase({ name: 'confirm', ctx, results });
    })();
  }, [phase]);

  // ─── Confirm → Auth transition ─────────────────────────────────

  const handleConfirm = useCallback((confirmed: boolean) => {
    if (!confirmed) {
      setPhase({ name: 'error', message: 'Submission cancelled.' });
      return;
    }
    // Steal ctx from the current confirm phase
    setPhase(p => {
      if (p.name !== 'confirm') return p;
      return { name: 'auth', ctx: p.ctx };
    });
  }, []);

  // ─── Auth → Metadata transition ────────────────────────────────

  useEffect(() => {
    if (phase.name !== 'auth') return;

    (async () => {
      try {
        const user = await authenticateGitHub();
        const ctx = (phase as Extract<SubmitPhase, { name: 'auth' }>).ctx;
        const defaultRepoUrl = detectGitRemote(ctx.projectDir);
        setPhase({ name: 'metadata', ctx, user, defaultRepoUrl });
      } catch (err: any) {
        setPhase({ name: 'error', message: `Authentication failed: ${err.message}` });
      }
    })();
  }, [phase]);

  // ─── Metadata → Building transition ────────────────────────────

  const handleMetadata = useCallback((answers: SubmitAnswers) => {
    setPhase(p => {
      if (p.name !== 'metadata') return p;
      return { name: 'building', ctx: p.ctx, answers, user: p.user };
    });
  }, []);

  // ─── Building → Done transition ────────────────────────────────

  useEffect(() => {
    if (phase.name !== 'building') return;

    (async () => {
      try {
        const p = phase as Extract<SubmitPhase, { name: 'building' }>;
        const { answers, user } = p;
        const { projectDir, slug, systemTitle } = p.ctx;
        const result = buildReviewPackage(projectDir, slug, user, answers);
        updateSubmissionsIndex(slug, result.metadata);
        markProjectCompleted(slug);
        setPhase({ name: 'done', result });
      } catch (err: any) {
        setPhase({ name: 'error', message: `Failed to build review package: ${err.message}` });
      }
    })();
  }, [phase]);

  // ─── Auto-exit after done ──────────────────────────────────────

  useEffect(() => {
    if (phase.name === 'done') {
      // Small delay so the user sees the done screen before Ink exits
      const timer = setTimeout(() => exit(), 500);
      return () => clearTimeout(timer);
    }
  }, [phase, exit]);

  // ─── Render per phase ──────────────────────────────────────────

  if (phase.name === 'error') {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Box marginY={1}>
          {phase.message === 'Submission cancelled.' ? (
            <Text color="yellow">  {phase.message}</Text>
          ) : (
            <Text color="red">  {phase.message}</Text>
          )}
        </Box>
      </Box>
    );
  }

  if (phase.name === 'loading') {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text>
          {'  '}<Spinner type="dots" />{' '}<Text dimColor>Loading project configuration...</Text>
        </Text>
      </Box>
    );
  }

  if (phase.name === 'confirm') {
    const failCount = phase.results.filter(r => r.status === 'fail').length;
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text bold>{'  '}100xSystems — Submitting &ldquo;{phase.ctx.systemTitle}&rdquo;</Text>
        <Box marginY={1} />
        <ValidationSummary results={phase.results} />
        <ConfirmInput
          message={'  Submit for review?' + (failCount > 0 ? ' (some checks failed)' : '')}
          defaultYes={failCount === 0}
          onConfirm={handleConfirm}
        />
      </Box>
    );
  }

  if (phase.name === 'auth') {
    return (
      <Box flexDirection="column" paddingX={2}>
        <StepIndicator steps={3} current={1} labels={{ 1: 'Auth', 2: 'Meta', 3: 'Build' }} />
        <Box marginY={1} />
        <Text>
          {'  '}<Spinner type="dots" />{' '}<Text dimColor>Step 1/3:</Text> Authenticating with GitHub...
        </Text>
        <Box marginY={1} />
        <Text dimColor>    A browser window will open for GitHub authorization.</Text>
      </Box>
    );
  }

  if (phase.name === 'metadata') {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text bold>{'  '}Step 2/3: Gathering submission metadata</Text>
        <Box marginY={1} />
        <MetadataForm
          defaultRepoUrl={phase.defaultRepoUrl || ''}
          defaultLanguage={(phase.ctx.config.language as string) || 'typescript'}
          defaultDifficulty="Intermediate"
          onComplete={handleMetadata}
        />
      </Box>
    );
  }

  if (phase.name === 'building') {
    return (
      <Box flexDirection="column" paddingX={2}>
        <StepIndicator steps={3} current={3} labels={{ 1: 'Auth', 2: 'Meta', 3: 'Build' }} />
        <Box marginY={1} />
        <Text>
          {'  '}<Spinner type="dots" />{' '}<Text dimColor>Step 3/3:</Text> Building review package...
        </Text>
        <Box marginY={1}>
          <Text dimColor>    Packaging project files, generating diffs, and preparing metadata...</Text>
        </Box>
      </Box>
    );
  }

  if (phase.name === 'done') {
    return <DoneScreen result={phase.result} />;
  }

  return null;
}

// ─── Metadata Form ──────────────────────────────────────────────────

function MetadataForm({
  defaultRepoUrl,
  defaultLanguage,
  defaultDifficulty,
  onComplete,
}: {
  defaultRepoUrl: string;
  defaultLanguage: string;
  defaultDifficulty: string;
  onComplete: (answers: SubmitAnswers) => void;
}) {
  const [step, setStep] = useState<'repo-url' | 'language' | 'difficulty'>('repo-url');
  const [repoUrl, setRepoUrl] = useState(defaultRepoUrl);
  const [language, setLanguage] = useState(defaultLanguage);
  const [difficulty, setDifficulty] = useState(defaultDifficulty);

  const languageChoices = [
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Java', value: 'java' },
    { label: 'Python', value: 'python' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'Other', value: 'other' },
  ];

  if (step === 'repo-url') {
    return (
      <TextInput
        message="Link to your implementation repository:"
        defaultValue={repoUrl}
        placeholder="https://github.com/your-username/your-repo"
        validate={(v: string) => v.length > 0 ? true : 'Repository URL is required'}
        onSubmit={(value) => {
          setRepoUrl(value);
          setStep('language');
        }}
      />
    );
  }

  if (step === 'language') {
    return (
      <Box flexDirection="column" marginY={1}>
        <Box>
          <Text>{'  '}Implementation language:</Text>
        </Box>
        <Box marginTop={1} marginLeft={2}>
          <SelectInput
            items={languageChoices}
            onSelect={(item: { value: string }) => {
              setLanguage(item.value);
              setStep('difficulty');
            }}
          />
        </Box>
      </Box>
    );
  }

  if (step === 'difficulty') {
    return (
      <TextInput
        message="Difficulty level (Beginner/Intermediate/Advanced):"
        defaultValue={difficulty}
        onSubmit={(value) => {
          setDifficulty(value);
          // Use setTimeout(0) to let the state settle before calling onComplete
          setTimeout(() => onComplete({ repositoryUrl: repoUrl, language, difficulty: value }), 0);
        }}
      />
    );
  }

  return null;
}

// ─── Done Screen ────────────────────────────────────────────────────

function DoneScreen({ result }: { result: BuildResult }) {
  const inMonorepo = isInsideMonorepo();

  return (
    <Box flexDirection="column" paddingX={2}>
      <Text color="green">{'  '}✓ Submission prepared successfully!</Text>
      <Box marginY={1} />

      {inMonorepo ? (
        <Box flexDirection="column">
          <Text dimColor>  Since you are inside the 100xsystems repository:</Text>
          <Box marginY={1} />
          <Text>{'  '}→ Create a git branch and commit:</Text>
          <Box marginLeft={4}>
            <Text dimColor>git checkout -b submission/{result.slug}/{result.reviewDirName}</Text>
            <Text dimColor>git add submissions/{result.slug}/{result.reviewDirName}</Text>
            <Text dimColor>git commit -m &ldquo;submission: {result.slug} by {result.user}&rdquo;</Text>
            <Text dimColor>git push origin submission/{result.slug}/{result.reviewDirName}</Text>
          </Box>
          <Box marginY={1} />
          <Text>{'  '}→ Then create a Pull Request to 100xsystems:</Text>
          <Box marginLeft={4}>
            <Text color="cyan">  https://github.com/aryanbatras/100xsystems/compare</Text>
          </Box>
          <Box marginY={1} />
          <Text>{'  '}→ Or use the GitHub CLI:</Text>
          <Box marginLeft={4}>
            <Text dimColor>gh pr create --title &ldquo;[{result.slug}] Submission by {result.user}&rdquo; --body &ldquo;...&rdquo;</Text>
          </Box>
        </Box>
      ) : (
        <Text dimColor>  To submit, push this repository or create a PR manually.</Text>
      )}

      <Box marginY={1} />
      <Box flexDirection="column">
        <Text dimColor>  Submission details:</Text>
        <Text>{'  '}System: <Text bold>{result.slug}</Text></Text>
        <Text>{'  '}Author: <Text bold>{result.user}</Text></Text>
        <Text>{'  '}Language: <Text bold>{result.metadata.language}</Text></Text>
        <Text>{'  '}Repository: <Text bold>{result.metadata.repositoryUrl}</Text></Text>
      </Box>
      <Box marginY={1} />
      <Text dimColor>  A reviewer will review your submission.</Text>
      <Text dimColor>  Track the PR status for updates.</Text>
    </Box>
  );
}

// ─── Step Indicator ─────────────────────────────────────────────────

function StepIndicator({ steps, current, labels }: {
  steps: number;
  current: number;
  labels: Record<number, string>;
}) {
  const circles = Array.from({ length: steps }, (_, i) => {
    const num = i + 1;
    if (num < current) {
      return <Text key={num} color="green">  ●  </Text>;
    }
    if (num === current) {
      return <Text key={num} color="cyan">  ◉  </Text>;
    }
    return <Text key={num} color="gray">  ○  </Text>;
  });

  return (
    <Box flexDirection="column" paddingX={2}>
      <Box flexDirection="row" alignItems="center">
        {circles.map((circle, i) => (
          <React.Fragment key={i}>
            {circle}
            {i < steps - 1 && <Text dimColor>━━━</Text>}
          </React.Fragment>
        ))}
      </Box>
      <Box flexDirection="row" marginLeft={1}>
        {Array.from({ length: steps }, (_, i) => {
          const num = i + 1;
          return (
            <Box key={num} width={num < steps ? 9 : 8}>
              <Text dimColor={num !== current} color={num === current ? 'cyan' : undefined}>
                {labels[num] || ''}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

