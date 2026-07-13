'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Heading, Text } from '@/presentation/__components';
import type { SystemMeta } from '@/lib/mdx';

interface SystemDetailClientProps {
  system: SystemMeta;
}

export function SystemDetailClient({ system }: SystemDetailClientProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  const displayName = (slug: string) =>
    slug.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[1100px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-12">
          <a href="/systems" className="text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors">
            ← Systems
          </a>
        </div>

        {/* System Title — pure, no tags, no badges, no stats */}
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
          {system.title}
        </h1>

        {/* Language Selection — big borderless cards */}
        {!selectedLanguage && (
          <div className="mt-12">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-6">
              Choose a language to get started
            </p>
            {system.languages.length === 0 ? (
              <Text variant="muted">No languages available yet. Coming soon!</Text>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {system.languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={cn(
                      'group text-left p-8 transition-all duration-300',
                      'hover:bg-accent/[0.03] bg-transparent',
                    )}
                  >
                    <div className="flex items-center justify-center w-16 h-16 mb-5 bg-accent/5 text-accent text-2xl font-bold">
                      {lang.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold text-fg group-hover:text-accent transition-colors mb-2">
                      {displayName(lang)}
                    </h3>
                    <p className="text-sm text-fg-muted">
                      {system.chapters.length} {system.chapters.length === 1 ? 'chapter' : 'chapters'}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Start learning</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chapters List — shown when language is selected */}
        {selectedLanguage && (
          <div className="mt-12">
            {/* Header with back button */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center gap-1 text-xs font-bold text-fg-muted hover:text-accent transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
                Back to languages
              </button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{displayName(selectedLanguage)}</span>
            </div>

            {/* Chapters */}
            <div className="space-y-px">
              {system.chapters.map((chapter) => {
                const isHovered = hoveredChapter === chapter.slug;
                return (
                  <Link
                    key={chapter.slug}
                    href={`/systems/${system.slug}/${selectedLanguage}/chapters/${chapter.slug}`}
                    className={cn(
                      'flex items-center gap-4 px-4 py-4 transition-all duration-200',
                      isHovered ? 'bg-accent/5' : 'hover:bg-accent/[0.03]',
                    )}
                    onMouseEnter={() => setHoveredChapter(chapter.slug)}
                    onMouseLeave={() => setHoveredChapter(null)}
                  >
                    <span className="flex items-center justify-center w-8 h-8 text-xs font-bold text-accent shrink-0 border border-accent/20">
                      {String(chapter.order).padStart(2, '0')}
                    </span>
                    <h3 className="text-base font-semibold text-fg group-hover:text-accent transition-colors">
                      {chapter.title}
                    </h3>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(
                      'ml-auto shrink-0 transition-all duration-200',
                      isHovered ? 'text-accent opacity-100 translate-x-0' : 'text-fg-muted opacity-50 -translate-x-1',
                    )}>
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Chapter count */}
        <div className="mt-8 pt-4 text-[10px] text-fg-muted uppercase tracking-wider">
          {system.chapters.length} {system.chapters.length === 1 ? 'chapter' : 'chapters'} ·
          {system.languages.map((l) => displayName(l)).join(', ')}
        </div>
      </div>
    </div>
  );
}
