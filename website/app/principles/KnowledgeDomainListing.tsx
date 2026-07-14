'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import type { KnowledgeItem } from '@/lib/mdx';

interface KnowledgeDomainListingProps {
  items: KnowledgeItem[];
  domain: string;
}

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

export function KnowledgeDomainListing({ items, domain }: KnowledgeDomainListingProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (items.length === 0) {
    return <div className="text-center py-20 text-fg-muted"><p className="text-sm">Nothing yet. Contributions welcome!</p></div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const isHovered = hoveredId === item.slug;
        return (
          <Link
            key={item.slug}
            href={`/${domain}/read/${item.slug}`}
            className={cn(
              'group block px-5 py-6 transition-all duration-200',
              isHovered ? 'bg-accent' : 'hover:bg-accent/[0.03]',
            )}
            onMouseEnter={() => setHoveredId(item.slug)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className={cn('text-base font-bold tracking-tight transition-colors duration-200', isHovered ? 'text-white' : 'text-fg')}>
                {item.title}
              </h3>
              <span className={cn(
                'text-[10px] font-semibold px-2 py-0.5 shrink-0 transition-colors duration-200',
                isHovered ? 'bg-white/20 text-white' : difficultyStyles[item.difficulty] || 'bg-surface-secondary text-fg-muted',
              )}>
                {item.difficulty}
              </span>
            </div>
            <p className={cn('text-xs leading-relaxed transition-colors duration-200', isHovered ? 'text-white/80' : 'text-fg-secondary')}>
              {item.description}
            </p>
            <div className={cn('flex items-center gap-1 mt-3 text-xs font-semibold transition-all duration-200', isHovered ? 'text-white opacity-100' : 'text-accent opacity-0')}>
              <span>Read more</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
