'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Breadcrumbs } from '@/presentation/__components';
import type { SystemMeta, SystemFileEntry } from '@/lib/mdx';

interface SystemDetailClientProps {
  system: SystemMeta;
  flatFiles: SystemFileEntry[];
}

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

export function SystemDetailClient({ system, flatFiles }: SystemDetailClientProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumbs items={[{ label: 'Systems', href: '/systems' }, { label: system.title }]} />
        </div>

        {/* System Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            {system.difficulty && (
              <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2.5 py-1', difficultyStyles[system.difficulty])}>
                {system.difficulty}
              </span>
            )}
            {system.tags && system.tags.length > 0 && (
              <>
                <span className="text-xs text-fg-muted">·</span>
                {system.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium uppercase tracking-wider text-fg-muted">
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-fg">
            {system.title}
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-2xl">
            {system.description}
          </p>
        </div>

        {/* All Files Grid — bigger, more spacious cards */}
        {flatFiles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {flatFiles.map((file) => {
              const isHovered = hoveredId === file.slug;
              return (
                <Link
                  key={file.slug}
                  href={`/systems/${system.slug}/read/${file.slug}`}
                  className={cn(
                    'group block px-8 py-7 transition-all duration-300',
                    isHovered ? 'bg-accent' : 'bg-white hover:bg-accent/[0.03]',
                  )}
                  onMouseEnter={() => setHoveredId(file.slug)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-4">
                      {/* Bigger order number */}
                      <span className={cn(
                        'flex items-center justify-center w-12 h-12 text-lg font-bold font-mono shrink-0 transition-all duration-300',
                        isHovered ? 'text-white' : 'text-accent',
                      )}>
                        {String(file.order || flatFiles.indexOf(file) + 1).padStart(2, '0')}
                      </span>
                      <h3 className={cn(
                        'text-xl font-extrabold tracking-tight transition-colors duration-300',
                        isHovered ? 'text-white' : 'text-fg',
                      )}>
                        {file.title}
                      </h3>
                    </div>
                    {file.frontmatter.difficulty && (
                      <span className={cn(
                        'text-[10px] font-bold px-2.5 py-1 shrink-0 transition-all duration-300',
                        isHovered ? 'bg-white/20 text-white' : difficultyStyles[file.frontmatter.difficulty] || 'bg-surface-secondary text-fg-muted',
                      )}>
                        {file.frontmatter.difficulty}
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    'text-sm leading-relaxed line-clamp-2 transition-colors duration-300 ml-16',
                    isHovered ? 'text-white/80' : 'text-fg-secondary',
                  )}>
                    {file.description}
                  </p>
                  <div className={cn(
                    'flex items-center gap-2 mt-4 text-sm font-bold transition-all duration-300 ml-16',
                    isHovered ? 'text-white opacity-100 translate-x-0' : 'text-accent opacity-0 -translate-x-2',
                  )}>
                    <span>Read</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
