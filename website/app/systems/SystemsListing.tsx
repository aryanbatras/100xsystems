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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {systems.map((system) => {
        const isHovered = hoveredId === system.slug;
        return (
          <Link
            key={system.slug}
            href={`/systems/${system.slug}`}
            className={cn(
              'group block px-8 py-8 transition-all duration-300',
              isHovered ? 'bg-accent' : 'bg-white hover:bg-accent/[0.03]',
            )}
            onMouseEnter={() => setHoveredId(system.slug)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                {/* Bigger order number */}
                <span className={cn(
                  'flex items-center justify-center w-12 h-12 text-lg font-bold font-mono shrink-0 transition-all duration-300',
                  isHovered ? 'text-white' : 'text-accent',
                )}>
                  {String(systems.indexOf(system) + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className={cn(
                    'text-xl font-extrabold tracking-tight transition-colors duration-300',
                    isHovered ? 'text-white' : 'text-fg',
                  )}>
                    {system.title}
                  </h3>
                  {system.tags && system.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {system.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={cn(
                          'text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 transition-colors duration-300',
                          isHovered ? 'text-white/50' : 'text-fg-muted/60',
                        )}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <span className={cn(
                'text-[10px] font-bold px-2.5 py-1 shrink-0 transition-all duration-300',
                isHovered ? 'bg-white/20 text-white' : difficultyStyles[system.difficulty] || 'bg-surface-secondary text-fg-muted',
              )}>
                {system.difficulty}
              </span>
            </div>
            <p className={cn(
              'text-sm leading-relaxed line-clamp-2 transition-colors duration-300',
              isHovered ? 'text-white/80' : 'text-fg-secondary',
            )}>
              {system.description}
            </p>
            <div className={cn(
              'flex items-center gap-2 mt-5 text-sm font-bold transition-all duration-300',
              isHovered ? 'text-white opacity-100 translate-x-0' : 'text-accent opacity-0 -translate-x-2',
            )}>
              <span>Explore system</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
