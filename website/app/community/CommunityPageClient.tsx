'use client';

import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Breadcrumbs } from '@/presentation/__components';
import Link from 'next/link';

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

interface CommunityPageClientProps {
  data: CommunityData;
}

// ─── Styles ─────────────────────────────────────────────────────────

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

const languageColors: Record<string, string> = {
  TypeScript: 'text-blue-600',
  JavaScript: 'text-yellow-500',
  Python: 'text-green-600',
  Go: 'text-cyan-500',
  Rust: 'text-orange-600',
  Java: 'text-red-500',
  'Spring Boot': 'text-green-700',
  'Terraform + Go': 'text-purple-500',
};

const systemColors: Record<string, string> = {
  microservices: 'bg-blue-50 border-blue-200',
  'claude-code': 'bg-purple-50 border-purple-200',
  'cloud-code': 'bg-cyan-50 border-cyan-200',
};

function getLanguageColor(lang: string): string {
  for (const [key, color] of Object.entries(languageColors)) {
    if (lang.toLowerCase().includes(key.toLowerCase())) return color;
  }
  return 'text-fg-muted';
}

function getSystemBg(system: string): string {
  return systemColors[system] || 'bg-gray-50 border-gray-200';
}

// ─── Leaderboard Badge ──────────────────────────────────────────────

function LeaderboardBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return <span className="text-xs font-bold text-fg-muted w-6 text-center">{rank}</span>;
}

// ─── Main Component ─────────────────────────────────────────────────

export function CommunityPageClient({ data }: CommunityPageClientProps) {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [hoveredSubmission, setHoveredSubmission] = useState<string | null>(null);

  // Group submissions by system
  const systemGroups = data.submissions.reduce<Record<string, SubmissionEntry[]>>((acc, sub) => {
    if (!acc[sub.system]) acc[sub.system] = [];
    acc[sub.system].push(sub);
    return acc;
  }, {});

  const systemNames = Object.keys(systemGroups).sort();
  const filteredSystems = activeSystem
    ? systemNames.filter((s) => s === activeSystem)
    : systemNames;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumbs items={[{ label: 'Community', href: '/community' }]} />
        </div>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-accent text-white">
              Community
            </span>
            <span className="text-xs text-fg-muted">·</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-fg-muted">
              {data.totalSubmissions} submissions · {data.totalSystems} systems · {data.leaderboard.length} reviewers
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-fg">
            Community Implementations
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-2xl">
            Explore verified community-built systems. Each submission has been reviewed by experienced engineers.
            Browse implementations, compare approaches across languages, and learn from real-world examples.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-white px-6 py-5 border border-gray-100">
            <p className="text-3xl font-extrabold text-fg">{data.totalSubmissions}</p>
            <p className="text-xs font-medium uppercase tracking-wider text-fg-muted mt-1">Submissions</p>
          </div>
          <div className="bg-white px-6 py-5 border border-gray-100">
            <p className="text-3xl font-extrabold text-fg">{data.totalSystems}</p>
            <p className="text-xs font-medium uppercase tracking-wider text-fg-muted mt-1">Systems</p>
          </div>
          <div className="bg-white px-6 py-5 border border-gray-100">
            <p className="text-3xl font-extrabold text-fg">{data.leaderboard.length}</p>
            <p className="text-xs font-medium uppercase tracking-wider text-fg-muted mt-1">Reviewers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content — Submissions Gallery */}
          <div className="lg:col-span-2 space-y-10">
            {/* System Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveSystem(null)}
                className={cn(
                  'px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200',
                  activeSystem === null ? 'bg-accent text-white' : 'bg-white text-fg-muted hover:bg-gray-50',
                )}
              >
                All Systems
              </button>
              {systemNames.map((name) => (
                <button
                  key={name}
                  onClick={() => setActiveSystem(name)}
                  className={cn(
                    'px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200',
                    activeSystem === name ? 'bg-accent text-white' : 'bg-white text-fg-muted hover:bg-gray-50',
                  )}
                >
                  {name.replace(/-/g, ' ')}
                </button>
              ))}
            </div>

            {/* Submissions by System */}
            {filteredSystems.map((system) => (
              <section key={system}>
                <h2 className="text-lg font-extrabold tracking-tight text-fg mb-4 uppercase">
                  {system.replace(/-/g, ' ')}
                </h2>
                <div className="space-y-3">
                  {systemGroups[system].map((submission) => {
                    const id = `${submission.system}-${submission.author}`;
                    const isHovered = hoveredSubmission === id;

                    return (
                      <div
                        key={id}
                        className={cn(
                          'group border transition-all duration-300',
                          isHovered ? 'border-accent bg-accent/[0.02]' : 'border-gray-100 bg-white',
                        )}
                        onMouseEnter={() => setHoveredSubmission(id)}
                        onMouseLeave={() => setHoveredSubmission(null)}
                      >
                        <div className="px-6 py-5">
                          <div className="flex items-start justify-between gap-4">
                            {/* Author + Meta */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-bold text-fg truncate">
                                  @{submission.author}
                                </span>
                                <span className={cn(
                                  'text-xs font-semibold',
                                  getLanguageColor(submission.language),
                                )}>
                                  {submission.language}
                                </span>
                                <span className={cn(
                                  'text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5',
                                  difficultyStyles[submission.difficulty] || 'bg-surface-secondary text-fg-muted',
                                )}>
                                  {submission.difficulty}
                                </span>
                              </div>

                              {/* Reviewers */}
                              <div className="flex items-center gap-1.5 text-xs text-fg-muted">
                                <span className="font-medium">Reviewed by:</span>
                                {submission.reviewers.map((r) => (
                                  <span key={r} className="font-semibold text-fg-secondary">@{r}</span>
                                ))}
                                <span className="mx-1">·</span>
                                <span>Verified {submission.verifiedAt}</span>
                              </div>
                            </div>

                            {/* Links */}
                            <div className="flex items-center gap-2 shrink-0">
                              <a
                                href={submission.repository}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  'inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200',
                                  isHovered ? 'bg-accent text-white' : 'bg-gray-100 text-fg-secondary hover:bg-accent hover:text-white',
                                )}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                Code
                              </a>
                              <a
                                href={submission.prUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  'inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200',
                                  isHovered ? 'bg-accent text-white' : 'bg-gray-100 text-fg-secondary hover:bg-accent hover:text-white',
                                )}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 8a3 3 0 1 0-3-3" /><line x1="6" y1="6" x2="18" y2="18" /><path d="M18 16a3 3 0 1 0 3 3" />
                                </svg>
                                PR
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Link to system page */}
                <Link
                  href={`/systems/${system}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent/80 transition-colors"
                >
                  View {system.replace(/-/g, ' ')} curriculum
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </section>
            ))}

            {filteredSystems.length === 0 && (
              <div className="text-center py-16 text-fg-muted">
                <p className="text-lg font-semibold mb-2">No submissions yet</p>
                <p className="text-sm">Complete a system and submit it for review to appear here.</p>
              </div>
            )}
          </div>

          {/* Sidebar — Reviewer Leaderboard */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white border border-gray-100 px-6 py-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-fg mb-5">
                  Top Reviewers
                </h3>

                {data.leaderboard.length === 0 ? (
                  <p className="text-xs text-fg-muted">No reviewers yet. Be the first!</p>
                ) : (
                  <div className="space-y-3">
                    {data.leaderboard.map((reviewer, idx) => (
                      <div
                        key={reviewer.reviewer}
                        className="flex items-center gap-3 py-2"
                      >
                        <LeaderboardBadge rank={idx + 1} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-fg truncate">
                            @{reviewer.reviewer}
                          </p>
                          <p className="text-[10px] text-fg-muted uppercase tracking-wider">
                            {reviewer.reviewCount} {reviewer.reviewCount === 1 ? 'review' : 'reviews'}
                          </p>
                        </div>
                        <div className="flex gap-1 flex-wrap justify-end max-w-[100px]">
                          {reviewer.systemsReviewed.map((sys) => (
                            <span
                              key={sys}
                              className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-gray-100 text-fg-muted"
                            >
                              {sys.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-[10px] text-fg-muted leading-relaxed">
                    Reviewers are community members who have verified submissions.
                    <br />
                    <a
                      href="https://github.com/100xsystems/submissions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent font-bold hover:underline"
                    >
                      Become a reviewer →
                    </a>
                  </p>
                </div>
              </div>

              {/* How it works */}
              <div className="mt-6 bg-white border border-gray-100 px-6 py-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-fg mb-4">
                  How It Works
                </h3>
                <ol className="space-y-3">
                  {[
                    'Build a system from the curriculum',
                    'Run 100xsystems submit to create a PR with your review package',
                    'A community reviewer checks your work',
                    'Once verified, your submission appears here',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-fg-secondary">
                      <span className="flex items-center justify-center w-5 h-5 shrink-0 text-[10px] font-bold bg-accent text-white">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
