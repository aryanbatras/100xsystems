import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';
import fs from 'fs';
import path from 'path';
import { systemExists, getSystemMeta, readFileContent, getChallengesDir } from '../reader/system-reader.js';
import { parseFrontmatter } from '../reader/index.js';

export const args = zod.tuple([
  zod.string().describe('System slug (e.g., claude-code)'),
]);

export const options = zod.object({
  start: zod.string().optional().describe('Start a specific challenge by slug'),
});

type Props = {
  args: zod.infer<typeof args>;
  options: zod.infer<typeof options>;
};

interface ChallengeInfo {
  slug: string;
  title: string;
  difficulty: string;
  description: string;
  order: number;
  tasks?: string[];
  requirements?: string[];
}

function readChallenges(systemSlug: string): ChallengeInfo[] {
  const challengesDir = getChallengesDir(systemSlug);
  if (!fs.existsSync(challengesDir)) return [];

  const files = fs.readdirSync(challengesDir).filter((f) => f.endsWith('.md')).sort();
  const challenges: ChallengeInfo[] = [];

  for (const filename of files) {
    const content = readFileContent(path.join(challengesDir, filename));
    if (!content) continue;
    const { data } = parseFrontmatter(content);
    const fm = data as any;
    const slug = filename.replace(/\.md$/, '').replace(/^\d+[-_]/, '');
    let description = fm.description || '';
    if (!description) {
      const body = content.replace(/^---[\s\S]*?---\s*\n/, '');
      description = body.replace(/[#*`]/g, '').trim().slice(0, 200);
    }
    challenges.push({
      slug, title: fm.title || slug, difficulty: fm.difficulty || 'Intermediate',
      description, order: fm.order || 999, tasks: fm.tasks || [], requirements: fm.requirements || [],
    });
  }

  challenges.sort((a, b) => a.order - b.order);
  return challenges;
}

function ChallengeList({ systemSlug, systemTitle, challenges }: { systemSlug: string; systemTitle: string; challenges: ChallengeInfo[] }) {
  return (
    <Box flexDirection="column" paddingX={2}>
      <Text bold>{'  '}{systemTitle} Challenges</Text>
      {challenges.map((ch) => {
        const diffColor = ch.difficulty === 'Advanced' ? 'red' : ch.difficulty === 'Intermediate' ? 'yellow' : 'green' as const;
        return (
          <Box key={ch.slug} flexDirection="column" marginTop={1}>
            <Text bold>{'  '}#{ch.order}. {ch.title}</Text>
            <Text dimColor>{'  '}{ch.description}</Text>
            <Text color={diffColor}>{'  '}{ch.difficulty}</Text>
            {ch.requirements && ch.requirements.length > 0 && (
              <Box flexDirection="column" marginLeft={2}>
                <Text dimColor>  Requirements:</Text>
                {ch.requirements.map((req, i) => (
                  <Text key={i} dimColor>{'    '}• {req}</Text>
                ))}
              </Box>
            )}
            <Text color="cyan">{'  '}100x challenge {systemSlug} --start {ch.slug}  <Text dimColor>→ start this challenge</Text></Text>
          </Box>
        );
      })}
      <Box marginY={1} />
      <Text dimColor>  Complete challenges as part of your implementation.</Text>
      <Text dimColor>  Run 100x verify to check your work, then 100x submit to submit.</Text>
    </Box>
  );
}

function ChallengeDetail({ challenge, systemSlug, systemTitle }: { challenge: ChallengeInfo; systemSlug: string; systemTitle: string }) {
  return (
    <Box flexDirection="column" paddingX={2}>
      <Text bold>{'  '}Starting Challenge: {challenge.title}</Text>
      <Box marginY={1} />
      <Text dimColor>{'  '}System:     {systemTitle}</Text>
      <Text dimColor>{'  '}Challenge:  {challenge.title}</Text>
      <Text dimColor>{'  '}Difficulty: {challenge.difficulty}</Text>
      <Box marginY={1} />
      <Text bold>{'  '}Description:</Text>
      <Text>{'  '}{challenge.description}</Text>
      {challenge.requirements && challenge.requirements.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text bold>{'  '}Requirements:</Text>
          {challenge.requirements.map((req, i) => (
            <Text key={i}>{'  '}{i + 1}. {req}</Text>
          ))}
        </Box>
      )}
      {challenge.tasks && challenge.tasks.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text bold>{'  '}Tasks:</Text>
          {challenge.tasks.map((task, i) => (
            <Text key={i}>{'  '}{i + 1}. {task}</Text>
          ))}
        </Box>
      )}
      <Box marginY={1} />
      <Text bold>{'  '}To get started:</Text>
      <Text color="cyan">{'  '}100x init {systemSlug}  <Text dimColor>→ scaffold the project</Text></Text>
      <Text color="cyan">{'  '}100x validate  <Text dimColor>→ check your progress</Text></Text>
      <Text color="cyan">{'  '}100x verify  <Text dimColor>→ verify your implementation</Text></Text>
      <Text color="cyan">{'  '}100x submit {systemSlug}  <Text dimColor>→ submit for review</Text></Text>
    </Box>
  );
}

export default function Challenge({ args, options }: Props) {
  const [systemSlug] = args;
  const [data, setData] = useState<{ challenges: ChallengeInfo[]; systemTitle: string } | null>(null);
  const [challenge, setChallenge] = useState<ChallengeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!systemExists(systemSlug)) {
      setError(`System "${systemSlug}" not found. Run 100x list to see all available systems.`);
      return;
    }

    const system = getSystemMeta(systemSlug)!;
    const challenges = readChallenges(systemSlug);

    if (challenges.length === 0) {
      setError(`No challenges found for "${system.title}".`);
      return;
    }

    if (options.start) {
      const found = challenges.find((c) => c.slug === options.start);
      if (!found) {
        setError(`Challenge "${options.start}" not found for "${system.title}".`);
        return;
      }
      setChallenge(found);
    } else {
      setData({ challenges, systemTitle: system.title });
    }
  }, [systemSlug]);

  if (error) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text color="yellow">  {error}</Text>
      </Box>
    );
  }

  if (challenge) {
    return <ChallengeDetail challenge={challenge} systemSlug={systemSlug} systemTitle={data?.systemTitle || systemSlug} />;
  }

  if (data) {
    return <ChallengeList systemSlug={systemSlug} systemTitle={data.systemTitle} challenges={data.challenges} />;
  }

  return (
    <Box flexDirection="column" paddingX={2}>
      <Text dimColor>  Loading challenges...</Text>
    </Box>
  );
}
