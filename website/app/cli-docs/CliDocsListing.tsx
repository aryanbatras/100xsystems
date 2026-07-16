'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import type { CliDocItem } from '@/lib/cli-docs';

interface CliDocsListingProps {
  docs: CliDocItem[];
}

const categoryConfig: Record<string, { label: string }> = {
  setup: { label: 'Setup' },
  verification: { label: 'Verification' },
  learning: { label: 'Learning' },
  auth: { label: 'Authentication' },
  system: { label: 'System' },
};

export function CliDocsListing({ docs }: CliDocsListingProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (docs.length === 0) {
    return <div className="text-center py-20 text-fg-muted"><p className="text-sm">No CLI documentation available yet.</p></div>;
  }

  // Group by category
  const grouped: Record<string, CliDocItem[]> = {};
  for (const doc of docs) {
    const cat = doc.category || 'general';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(doc);
  }

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-fg-muted mb-3">
            {categoryConfig[cat]?.label || cat}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {items.map((doc) => {
              const isHovered = hoveredId === doc.slug;
              const isIndex = doc.slug === 'index';
              return (
                <Link
                  key={doc.slug}
                  href={isIndex ? '/cli-docs' : `/cli-docs/${doc.slug}`}
                  className={cn(
                    'group block px-5 py-6 transition-all duration-200',
                    isHovered ? 'bg-accent' : 'hover:bg-accent/[0.03]',
                  )}
                  onMouseEnter={() => setHoveredId(doc.slug)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className={cn(
                      'text-base font-bold tracking-tight transition-all duration-200 font-mono',
                      isHovered ? 'text-white' : 'text-fg',
                    )}>
                      <span className="text-accent-yellow">{'100xsystems '}</span>
                      {doc.slug}
                    </h3>
                    {doc.authRequired && (
                      <span className={cn(
                        'text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shrink-0',
                        isHovered ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800',
                      )}>
                        Auth
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    'text-xs leading-relaxed transition-colors duration-200 line-clamp-2',
                    isHovered ? 'text-white/80' : 'text-fg-secondary',
                  )}>
                    {doc.description}
                  </p>
                  <div className={cn(
                    'flex items-center gap-1 mt-3 text-xs font-semibold transition-all duration-200',
                    isHovered ? 'text-white opacity-100 translate-x-0' : 'text-accent opacity-0 -translate-x-1',
                  )}>
                    <span>View docs</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
