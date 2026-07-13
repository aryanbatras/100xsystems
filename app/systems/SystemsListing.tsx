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
          'group relative p-6 border transition-all duration-300 cursor-pointer',
          'bg-white',
          isHovered
            ? 'border-accent shadow-[0_0_20px_-4px_rgba(98,37,230,0.15)]'
            : 'border-border hover:border-accent/50',
        )}
        onMouseEnter={() => setHoveredCard(system.slug)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Purple hover gradient overlay */}
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-300 pointer-events-none',
            isHovered ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            background: 'linear-gradient(135deg, rgba(98,37,230,0.03) 0%, rgba(98,37,230,0.08) 100%)',
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn(
                  'text-base font-bold transition-colors duration-200',
                  isHovered ? 'text-accent' : 'text-fg',
                )}>
                  {system.title}
                </h3>
                {isOutsourced && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800">
                    <Icon name="external-link" size={10} />
                    External
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-fg-muted">
                <Badge variant={system.difficulty === 'advanced' ? 'black' : system.difficulty === 'intermediate' ? 'purple' : 'yellow'} size="sm">
                  {system.difficulty}
                </Badge>
                <span className="text-fg-muted">{system.estimatedTime}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-fg-secondary leading-relaxed mb-4 line-clamp-2">
            {system.description}
          </p>

          {/* Skills/Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {system.skills.slice(0, 4).map((skill) => (
              <Tag key={skill} variant="brand" size="sm">{skill}</Tag>
            ))}
            {system.skills.length > 4 && (
              <Tag size="sm">+{system.skills.length - 4}</Tag>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 pt-3 border-t border-border">
            <div className="flex items-center gap-1.5 text-xs text-fg-muted">
              <Icon name="file" size={12} />
              <span>{system.chapters.length} chapters</span>
            </div>
            {!system.languageAgnostic && system.languages.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-fg-muted">
                <Icon name="globe" size={12} />
                <span>{system.languages.length} languages</span>
              </div>
            )}
            {system.hasTemplate && (
              <div className="flex items-center gap-1.5 text-xs text-fg-muted">
                <Icon name="download" size={12} />
                <span>Template</span>
              </div>
            )}
          </div>

          {/* Hover indicator */}
          <div className={cn(
            'mt-3 flex items-center gap-1 text-xs font-semibold transition-all duration-200',
            isHovered ? 'text-accent opacity-100' : 'text-accent opacity-0',
          )}>
            {isOutsourced ? 'Visit Resource' : 'Start Learning'}
            <Icon name="arrow-right" size={12} />
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
    <div className="space-y-16">
      {/* ── Handcrafted Systems ── */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <Badge variant="purple" size="sm">HANDCRAFTED</Badge>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Text variant="body" className="text-center max-w-xl mx-auto mb-8 text-fg-secondary">
          Systems we built from scratch with complete tutorials. Learn by building production-grade software.
        </Text>

        {allHandcrafted.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border">
            <Icon name="folder" size={32} className="text-fg-muted mx-auto mb-3" />
            <Text variant="muted">No handcrafted systems yet. Check back soon!</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allHandcrafted.map((system) => (
              <SystemCard key={system.slug} system={system} />
            ))}
          </div>
        )}
      </section>

      {/* ── Outsourced Systems ── */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <Badge variant="yellow" size="sm">OUTSOURCED</Badge>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Text variant="body" className="text-center max-w-xl mx-auto mb-8 text-fg-secondary">
          Curated resources from across the web. We don&apos;t own this content — we help you find the best learning materials.
        </Text>

        {allOutsourced.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border">
            <Icon name="globe" size={32} className="text-fg-muted mx-auto mb-3" />
            <Text variant="muted">No outsourced systems yet. Check back soon!</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allOutsourced.map((system) => (
              <SystemCard key={system.slug} system={system} isOutsourced />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
