'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SystemMeta } from '@/lib/mdx';

// ─── Types ──────────────────────────────────────────────────────────

interface RecentActivity {
  systemSlug: string;
  systemTitle: string;
  lessonSlug?: string;
  lessonTitle?: string;
  lastAccessed: string;
  progress: number; // 0–100
}

// ─── Storage Keys ───────────────────────────────────────────────────

const STORAGE_KEY = '100x-recent-activity';

// ─── Public API (also used by other components) ─────────────────────

export function saveRecentActivity(activity: Omit<RecentActivity, 'lastAccessed'>): void {
  try {
    const stored = loadRecentActivities();
    const existingIndex = stored.findIndex((a) => a.systemSlug === activity.systemSlug);

    const entry: RecentActivity = {
      ...activity,
      lastAccessed: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      stored[existingIndex] = entry;
    } else {
      stored.unshift(entry);
    }

    // Keep only last 5
    const trimmed = stored.slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage might be unavailable
  }
}

export function loadRecentActivities(): RecentActivity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentActivity[];
  } catch {
    return [];
  }
}

export function clearRecentActivities(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// ─── Component ──────────────────────────────────────────────────────

interface HomeContinueLearningProps {
  systems: SystemMeta[];
}

export function HomeContinueLearning({ systems }: HomeContinueLearningProps) {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const recent = loadRecentActivities();

    // Filter to only show activities for systems that still exist
    const validSlugs = new Set(systems.map((s) => s.slug));
    const valid = recent.filter((a) => validSlugs.has(a.systemSlug));

    setActivities(valid);
    setLoaded(true);
  }, [systems]);

  if (!loaded || activities.length === 0) {
    return null; // Don't render anything if no recent activity
  }

  const totalProgress = activities.reduce((sum, a) => sum + a.progress, 0);
  const avgProgress = Math.round(totalProgress / activities.length);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Continue Learning
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Pick up where you left off
          </h2>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            You&apos;ve made progress on {activities.length} system{activities.length !== 1 ? 's' : ''} —
            average <span className="font-semibold text-neutral-700 dark:text-neutral-300">{avgProgress}%</span> complete.
          </p>
        </div>

        {/* Activity Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {activities.map((activity) => {
            const system = systems.find((s) => s.slug === activity.systemSlug);
            if (!system) return null;

            const difficultyColor =
              system.difficulty === 'Advanced' ? 'text-red-500' :
              system.difficulty === 'Intermediate' ? 'text-amber-500' :
              'text-emerald-500';

            return (
              <Link
                key={activity.systemSlug}
                href={activity.lessonSlug
                  ? `/systems/${activity.systemSlug}/read/${activity.lessonSlug}`
                  : `/systems/${activity.systemSlug}`
                }
                className="group relative bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {system.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Last accessed {formatTimeAgo(activity.lastAccessed)}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor} bg-neutral-50 dark:bg-neutral-800`}>
                    {system.difficulty}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                    <span>Progress</span>
                    <span className="font-medium">{activity.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:from-blue-400 group-hover:to-purple-400"
                      style={{ width: `${activity.progress}%` }}
                    />
                  </div>
                </div>

                {/* Lesson info */}
                {activity.lessonTitle && (
                  <div className="flex items-start gap-2 text-sm">
                    <svg className="h-4 w-4 mt-0.5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-neutral-600 dark:text-neutral-400 truncate">
                      {activity.lessonTitle}
                    </span>
                  </div>
                )}

                {/* Tags */}
                {system.tags && system.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {system.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Hover arrow */}
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Clear / View All */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/systems"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Browse all systems
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <button
            onClick={clearRecentActivities}
            className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            Clear history
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────

function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
