import { Metadata } from 'next';
import Link from 'next/link';
import { CommunityPageClient } from './CommunityPageClient';

export const metadata: Metadata = {
  title: 'Community — 100xsystems Systems',
  description: 'See verified community implementations and top reviewers.',
};

// ─── Types ──────────────────────────────────────────────────────────

interface SubmissionEntry {
  system: string;
  systemTitle: string;
  author: string;
  language: string;
  difficulty: string;
  repository: string;
  prUrl: string;
  reviewers: string[];
  verifiedAt: string;
}

interface ReviewActivity {
  reviewer: string;
  reviewCount: number;
  systemsReviewed: string[];
}

interface CommunityData {
  submissions: SubmissionEntry[];
  leaderboard: ReviewActivity[];
  totalSystems: number;
  totalSubmissions: number;
}

// ─── Mock Data (Development) ────────────────────────────────────────

const MOCK_SUBMISSIONS: SubmissionEntry[] = [
  {
    system: 'microservices',
    systemTitle: 'Microservices',
    author: 'aryan',
    language: 'Spring Boot',
    difficulty: 'Advanced',
    repository: 'https://github.com/aryan/microservices-implementation',
    prUrl: 'https://github.com/100xsystems/submissions/pull/1',
    reviewers: ['sarah', 'bob'],
    verifiedAt: '2026-03-15',
  },
  {
    system: 'microservices',
    systemTitle: 'Microservices',
    author: 'alice',
    language: 'TypeScript (NestJS)',
    difficulty: 'Intermediate',
    repository: 'https://github.com/alice/nest-ms',
    prUrl: 'https://github.com/100xsystems/submissions/pull/2',
    reviewers: ['sarah', 'bob'],
    verifiedAt: '2026-03-20',
  },
  {
    system: 'claude-code',
    systemTitle: 'Claude Code',
    author: 'bob',
    language: 'Python',
    difficulty: 'Intermediate',
    repository: 'https://github.com/bob/claude-code-py',
    prUrl: 'https://github.com/100xsystems/submissions/pull/3',
    reviewers: ['sarah'],
    verifiedAt: '2026-03-22',
  },
  {
    system: 'microservices',
    systemTitle: 'Microservices',
    author: 'charlie',
    language: 'Go',
    difficulty: 'Advanced',
    repository: 'https://github.com/charlie/go-microservices',
    prUrl: 'https://github.com/100xsystems/submissions/pull/4',
    reviewers: ['bob', 'sarah'],
    verifiedAt: '2026-04-01',
  },
  {
    system: 'cloud-code',
    systemTitle: 'Cloud Code',
    author: 'diana',
    language: 'Terraform + Go',
    difficulty: 'Intermediate',
    repository: 'https://github.com/diana/cloud-infra',
    prUrl: 'https://github.com/100xsystems/submissions/pull/5',
    reviewers: ['sarah'],
    verifiedAt: '2026-04-05',
  },
  {
    system: 'claude-code',
    systemTitle: 'Claude Code',
    author: 'eve',
    language: 'TypeScript',
    difficulty: 'Advanced',
    repository: 'https://github.com/eve/claude-code-ts',
    prUrl: 'https://github.com/100xsystems/submissions/pull/6',
    reviewers: ['bob', 'sarah', 'alice'],
    verifiedAt: '2026-04-10',
  },
];

const MOCK_LEADERBOARD: ReviewActivity[] = [
  { reviewer: 'sarah', reviewCount: 12, systemsReviewed: ['microservices', 'claude-code', 'cloud-code'] },
  { reviewer: 'bob', reviewCount: 8, systemsReviewed: ['microservices', 'claude-code'] },
  { reviewer: 'alice', reviewCount: 4, systemsReviewed: ['microservices', 'claude-code'] },
  { reviewer: 'mike', reviewCount: 2, systemsReviewed: ['cloud-code'] },
];

// ─── Data Fetching ──────────────────────────────────────────────────

async function fetchCommunityData(): Promise<CommunityData> {
  // Try GitHub API first
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error('No GITHUB_TOKEN configured');

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    // Fetch the submissions directory listing
    const contentsRes = await fetch(
      'https://api.github.com/repos/100xsystems/submissions/contents/submissions',
      { headers, next: { revalidate: 3600 } }
    );

    if (!contentsRes.ok) throw new Error(`GitHub API error: ${contentsRes.status}`);

    const contents = await contentsRes.json();
    if (!Array.isArray(contents)) throw new Error('Unexpected response format');

    const submissions: SubmissionEntry[] = [];

    for (const entry of contents) {
      if (entry.type !== 'dir') continue;
      const systemSlug = entry.name;

      // Read all YAML files in this system directory
      const systemContentsRes = await fetch(
        `https://api.github.com/repos/100xsystems/submissions/contents/submissions/${systemSlug}`,
        { headers, next: { revalidate: 3600 } }
      );

      if (!systemContentsRes.ok) continue;
      const systemContents = await systemContentsRes.json();
      if (!Array.isArray(systemContents)) continue;

      for (const subFile of systemContents) {
        if (!subFile.name.endsWith('.yml') && !subFile.name.endsWith('.yaml')) continue;
        try {
          const fileRes = await fetch(subFile.download_url, { next: { revalidate: 3600 } });
          if (!fileRes.ok) continue;
          const text = await fileRes.text();

          // Parse simple YAML (no yaml parser dependency)
          const lines = text.split('\n');
          const data: Record<string, any> = {};
          for (const line of lines) {
            const colonIdx = line.indexOf(':');
            if (colonIdx === -1) continue;
            const key = line.slice(0, colonIdx).trim();
            const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
            data[key] = value;
          }

          if (data.author) {
            submissions.push({
              system: systemSlug,
              systemTitle: data.system || systemSlug,
              author: data.author,
              language: data.language || '',
              difficulty: data.difficulty || 'Intermediate',
              repository: data.repository || '',
              prUrl: data.pr_url || '',
              reviewers: data.reviewers
                ? String(data.reviewers).split(',').map((r: string) => r.trim())
                : [],
              verifiedAt: data.verified_at || '',
            });
          }
        } catch {
          continue;
        }
      }
    }

    // Build leaderboard from submissions
    const reviewerMap = new Map<string, { count: number; systems: Set<string> }>();
    for (const sub of submissions) {
      for (const reviewer of sub.reviewers) {
        const existing = reviewerMap.get(reviewer) || { count: 0, systems: new Set<string>() };
        existing.count++;
        existing.systems.add(sub.system);
        reviewerMap.set(reviewer, existing);
      }
    }

    const leaderboard: ReviewActivity[] = Array.from(reviewerMap.entries())
      .map(([reviewer, data]) => ({
        reviewer,
        reviewCount: data.count,
        systemsReviewed: Array.from(data.systems),
      }))
      .sort((a, b) => b.reviewCount - a.reviewCount);

    const systemNames = new Set(submissions.map((s) => s.system));

    return {
      submissions,
      leaderboard,
      totalSystems: systemNames.size,
      totalSubmissions: submissions.length,
    };
  } catch {
    // Fall back to mock data
    return {
      submissions: MOCK_SUBMISSIONS,
      leaderboard: MOCK_LEADERBOARD,
      totalSystems: new Set(MOCK_SUBMISSIONS.map((s) => s.system)).size,
      totalSubmissions: MOCK_SUBMISSIONS.length,
    };
  }
}

// ─── Server Component ───────────────────────────────────────────────

export default async function CommunityPage() {
  const data = await fetchCommunityData();

  return <CommunityPageClient data={data} />;
}
