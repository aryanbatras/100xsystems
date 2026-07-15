import fs from 'fs';
import path from 'path';
import { parseFrontmatter } from '../reader/index.js';
import { systemExists, getSystemMeta, readFileContent, getChallengesDir } from '../reader/system-reader.js';

export interface ChallengeInfo {
  slug: string;
  title: string;
  difficulty: string;
  description: string;
  order: number;
  tasks?: string[];
  requirements?: string[];
}

export function readChallenges(systemSlug: string): ChallengeInfo[] {
  const challengesDir = getChallengesDir(systemSlug);
  if (!fs.existsSync(challengesDir)) return [];

  const files = fs.readdirSync(challengesDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

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
      slug,
      title: fm.title || slug,
      difficulty: fm.difficulty || 'Intermediate',
      description,
      order: fm.order || 999,
      tasks: fm.tasks || [],
      requirements: fm.requirements || [],
    });
  }

  challenges.sort((a, b) => a.order - b.order);
  return challenges;
}
