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
      <div className="max-w-[900px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumbs items={[{ label: 'Systems', href: '/systems' }, { label: system.title }]} />
        </div>

        {/* System Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            {system.difficulty && (
              <span className={cn('text-[10px] font-bold uppercase tracking-wider', difficultyStyles[system.difficulty])}>
                {system.difficulty}
              </span>
            )}
            {system.tags && system.tags.length > 0 && (
              <>
                <span className="text-[10px] text-fg-muted">·</span>
                {system.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-medium uppercase tracking-wider text-fg-muted">
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            {system.title}
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-2xl">
            {system.description}
          </p>
        </div>

        {/* All Files Grid — like principles listing with order numbers */}
        {flatFiles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {flatFiles.map((file) => {
              const isHovered = hoveredId === file.slug;
              return (
                <Link
                  key={file.slug}
                  href={`/systems/${system.slug}/read/${file.slug}`}
                  className={cn(
                    'group block px-5 py-6 transition-all duration-200',
                    isHovered ? 'bg-accent' : 'hover:bg-accent/[0.03]',
                  )}
                  onMouseEnter={() => setHoveredId(file.slug)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    {/* Order number badge */}
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        'text-sm font-bold font-mono transition-colors duration-200',
                        isHovered ? 'text-white' : 'text-accent',
                      )}>
                        {String(file.order || flatFiles.indexOf(file) + 1).padStart(2, '0')}
                      </span>
                      <h3 className={cn('text-base font-bold tracking-tight transition-colors duration-200', isHovered ? 'text-white' : 'text-fg')}>
                        {file.title}
                      </h3>
                    </div>
                    {file.frontmatter.difficulty && (
                      <span className={cn(
                        'text-[10px] font-semibold px-2 py-0.5 shrink-0 transition-colors duration-200',
                        isHovered ? 'bg-white/20 text-white' : difficultyStyles[file.frontmatter.difficulty] || 'bg-surface-secondary text-fg-muted',
                      )}>
                        {file.frontmatter.difficulty}
                      </span>
                    )}
                  </div>
                  <p className={cn('text-xs leading-relaxed transition-colors duration-200 ml-9 mt-1 line-clamp-2', isHovered ? 'text-white/80' : 'text-fg-secondary')}>
                    {file.description}
                  </p>
                  <div className={cn('flex items-center gap-1.5 mt-3 text-xs font-semibold transition-all duration-200 ml-9', isHovered ? 'text-white opacity-100' : 'text-accent opacity-0')}>
                    <span>Read</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
