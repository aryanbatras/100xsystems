'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import type { SystemMeta } from '@/lib/mdx';

interface SystemsListingProps {
  systems: SystemMeta[];
}

export function SystemsListing({ systems }: SystemsListingProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section>
      {systems.length === 0 ? (
        <div className="text-center py-20 text-fg-muted">
          <p className="text-sm">No systems yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-px">
          {systems.map((system) => {
            const isHovered = hoveredCard === system.slug;
            return (
              <Link
                key={system.slug}
                href={`/systems/${system.slug}`}
                className={cn(
                  'block px-4 py-5 transition-all duration-200',
                  isHovered ? 'bg-accent/5' : 'hover:bg-accent/[0.03]',
                )}
                onMouseEnter={() => setHoveredCard(system.slug)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-4">
                  {/* Number */}
                  <span className={cn(
                    'flex items-center justify-center w-10 h-10 text-sm font-bold shrink-0 transition-colors duration-200',
                    isHovered ? 'text-white bg-accent' : 'text-accent bg-accent/5',
                  )}>
                    {String(systems.indexOf(system) + 1).padStart(2, '0')}
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      'text-lg font-bold transition-colors duration-200',
                      isHovered ? 'text-accent' : 'text-fg',
                    )}>
                      {system.title}
                    </h3>
                    {system.languages.length > 0 && (
                      <p className="text-xs text-fg-muted mt-0.5">
                        {system.chapters.length} {system.chapters.length === 1 ? 'chapter' : 'chapters'}
                        {' · '}
                        {system.languages.map((l) =>
                          l.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                        ).join(', ')}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn(
                    'shrink-0 transition-all duration-200',
                    isHovered ? 'text-accent opacity-100 translate-x-0' : 'text-fg-muted opacity-0 -translate-x-2',
                  )}>
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
