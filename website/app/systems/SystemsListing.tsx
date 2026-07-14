'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import type { SystemMeta } from '@/lib/mdx';

interface SystemsListingProps {
  systems: SystemMeta[];
}

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

export function SystemsListing({ systems }: SystemsListingProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (systems.length === 0) {
    return <div className="text-center py-20 text-fg-muted"><p className="text-sm">No systems yet. Check back soon!</p></div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {systems.map((system) => {
        const isHovered = hoveredId === system.slug;
        return (
          <Link
            key={system.slug}
            href={`/systems/${system.slug}`}
            className={cn(
              'group block px-5 py-6 transition-all duration-200',
              isHovered ? 'bg-accent' : 'hover:bg-accent/[0.03]',
            )}
            onMouseEnter={() => setHoveredId(system.slug)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className={cn('text-base font-bold tracking-tight transition-colors duration-200', isHovered ? 'text-white' : 'text-fg')}>
                {system.title}
              </h3>
              <span className={cn(
                'text-[10px] font-semibold px-2 py-0.5 shrink-0 transition-colors duration-200',
                isHovered ? 'bg-white/20 text-white' : difficultyStyles[system.difficulty] || 'bg-surface-secondary text-fg-muted',
              )}>
                {system.difficulty}
              </span>
            </div>
            <p className={cn('text-xs leading-relaxed transition-colors duration-200 line-clamp-2', isHovered ? 'text-white/80' : 'text-fg-secondary')}>
              {system.description}
            </p>
            <div className={cn('flex items-center gap-1.5 mt-3 text-xs font-semibold transition-all duration-200', isHovered ? 'text-white opacity-100' : 'text-accent opacity-0')}>
              <span>Explore system</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            {/* Tags */}
            {system.tags && system.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {system.tags.map((tag) => (
                  <span key={tag} className={cn('text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 transition-colors duration-200', isHovered ? 'text-white/60' : 'text-fg-muted')}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
