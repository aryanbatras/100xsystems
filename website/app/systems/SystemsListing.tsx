'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/application/lib/utils';
import { Badge, Tag, Icon, Heading, Text } from '@/presentation/__components';
import type { SystemMeta } from '@/lib/mdx';

interface SystemsListingProps {
  handcrafted: SystemMeta[];
  outsourced: SystemMeta[];
}

export function SystemsListing({ handcrafted: allHandcrafted, outsourced: allOutsourced }: SystemsListingProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const SystemCard = ({ system, isOutsourced = false }: { system: SystemMeta; isOutsourced?: boolean }) => {
    const isHovered = hoveredCard === system.slug;
    const href = isOutsourced ? (system.sourceUrl || '#') : `/systems/${system.slug}`;

    const CardContent = (
      <div
        className={cn(
          'group relative p-6 transition-all duration-300 cursor-pointer border-none',
          isHovered
            ? 'bg-accent/5'
            : 'bg-transparent hover:bg-accent/[0.03]',
        )}
        onMouseEnter={() => setHoveredCard(system.slug)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn(
                  'text-base font-bold transition-colors duration-200',
                  isHovered ? 'text-accent' : 'text-fg',
                )}>
                  {system.title}
                </h3>
                {isOutsourced && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700">
                    <Icon name="external-link" size={10} />
                    External
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-fg-muted mt-1">
                <Badge variant={system.difficulty === 'advanced' ? 'black' : system.difficulty === 'intermediate' ? 'purple' : 'yellow'} size="sm">
                  {system.difficulty}
                </Badge>
                <span className="text-fg-muted">{system.estimatedTime}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-fg-secondary leading-relaxed mb-4 line-clamp-2">
            {system.description}
          </p>

          {/* Skills/Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {system.skills.slice(0, 4).map((skill) => (
              <Tag key={skill} variant="brand" size="sm">{skill}</Tag>
            ))}
            {system.skills.length > 4 && (
              <Tag size="sm">+{system.skills.length - 4}</Tag>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs text-fg-muted">
            <span className="flex items-center gap-1.5">
              <Icon name="file" size={12} />
              {system.languages.reduce((sum, l) => sum + l.chapters.length, 0)} chapters
            </span>
            {system.languages.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Icon name="globe" size={12} />
                {system.languages.length} {system.languages.length === 1 ? 'language' : 'languages'}
              </span>
            )}
            {system.hasTemplate && (
              <span className="flex items-center gap-1.5">
                <Icon name="download" size={12} />
                Template
              </span>
            )}
          </div>

          {/* Hover indicator */}
          <div className={cn(
            'mt-3 flex items-center gap-1 text-xs font-semibold transition-all duration-200',
            isHovered ? 'text-accent opacity-100 translate-x-0' : 'text-accent opacity-0 -translate-x-2',
          )}>
            {isOutsourced ? 'Visit Resource' : 'Start Learning'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    );

    if (isOutsourced) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {CardContent}
        </a>
      );
    }

    return <Link href={href}>{CardContent}</Link>;
  };

  return (
    <div className="space-y-20">
      {/* ── Handcrafted Systems ── */}
      <section>
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <Icon name="star" size={20} className="text-accent" />
            <Heading variant="h4" className="uppercase tracking-wider">
              Handcrafted
            </Heading>
          </div>
          <Text variant="body" className="text-fg-secondary">
            Systems we built from scratch with complete tutorials. Learn by building production-grade software.
          </Text>
        </div>

        {allHandcrafted.length === 0 ? (
          <div className="text-center py-16 text-fg-muted">
            <Icon name="folder" size={32} className="mx-auto mb-3" />
            <Text variant="muted">No handcrafted systems yet. Check back soon!</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {allHandcrafted.map((system) => (
              <SystemCard key={system.slug} system={system} />
            ))}
          </div>
        )}
      </section>

      {/* ── Outsourced Systems ── */}
      <section>
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <Icon name="globe" size={20} className="text-amber-600" />
            <Heading variant="h4" className="uppercase tracking-wider">
              Outsourced
            </Heading>
          </div>
          <Text variant="body" className="text-fg-secondary">
            Curated resources from across the web. We help you find the best learning materials.
          </Text>
        </div>

        {allOutsourced.length === 0 ? (
          <div className="text-center py-16 text-fg-muted">
            <Icon name="globe" size={32} className="mx-auto mb-3" />
            <Text variant="muted">No outsourced systems yet. Check back soon!</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {allOutsourced.map((system) => (
              <SystemCard key={system.slug} system={system} isOutsourced />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
