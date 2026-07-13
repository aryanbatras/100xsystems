'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Heading, Text, Badge, Tag, Icon, Breadcrumbs, Button, Divider } from '@/presentation/__components';
import type { SystemMeta } from '@/lib/mdx';

interface SystemDetailClientProps {
  system: SystemMeta;
}

export function SystemDetailClient({ system }: SystemDetailClientProps) {
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  const difficultyVariant = system.difficulty === 'advanced' ? 'black' : system.difficulty === 'intermediate' ? 'purple' : 'yellow';

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Systems', href: '/systems' },
            { label: system.title },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2">
            {/* Title & Meta */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Badge variant={difficultyVariant} size="sm">
                  {system.difficulty}
                </Badge>
                <Badge variant={system.type === 'handcrafted' ? 'purple' : 'yellow'} size="sm">
                  {system.type === 'handcrafted' ? 'Handcrafted' : 'Outsourced'}
                </Badge>
                <span className="text-xs text-fg-muted">{system.estimatedTime}</span>
              </div>
              <Heading variant="h2" className="uppercase tracking-tight mb-3">
                {system.title}
              </Heading>
              <Text variant="body-lg" className="text-fg-secondary">
                {system.longDescription || system.description}
              </Text>
            </div>

            <Divider className="mb-8" />

            {/* Description */}
            <div className="mb-8">
              <Heading variant="h4" className="uppercase tracking-wider mb-3">
                Overview
              </Heading>
              <Text variant="body" className="text-fg-secondary leading-relaxed">
                {system.description}
              </Text>
            </div>

            {/* Chapters */}
            <div className="mb-8">
              <Heading variant="h4" className="uppercase tracking-wider mb-4">
                Chapters ({system.chapters.length})
              </Heading>

              {system.chapters.length === 0 ? (
                <div className="border border-dashed border-border p-8 text-center">
                  <Icon name="file" size={24} className="text-fg-muted mx-auto mb-2" />
                  <Text variant="muted">Chapters coming soon.</Text>
                </div>
              ) : (
                <div className="space-y-3">
                  {system.chapters.map((chapter, idx) => {
                    const isHovered = hoveredChapter === chapter.slug;
                    return (
                      <Link
                        key={chapter.slug}
                        href={`/systems/${system.slug}/chapters/${chapter.slug}`}
                        className={cn(
                          'flex items-center gap-4 p-4 border transition-all duration-200',
                          isHovered
                            ? 'border-accent bg-accent-bg/5'
                            : 'border-border bg-white hover:border-accent/40',
                        )}
                        onMouseEnter={() => setHoveredChapter(chapter.slug)}
                        onMouseLeave={() => setHoveredChapter(null)}
                      >
                        <div className="flex items-center justify-center w-10 h-10 bg-accent-bg text-accent text-sm font-bold shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            'text-sm font-semibold transition-colors',
                            isHovered ? 'text-accent' : 'text-fg',
                          )}>
                            {chapter.title}
                          </h3>
                          <p className="text-xs text-fg-secondary mt-0.5 line-clamp-1">
                            {chapter.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {chapter.estimatedTime && (
                            <span className="text-[10px] text-fg-muted whitespace-nowrap">
                              {chapter.estimatedTime}
                            </span>
                          )}
                          <Icon
                            name="arrow-right"
                            size={14}
                            className={cn(
                              'transition-all duration-200',
                              isHovered ? 'text-accent translate-x-0.5' : 'text-fg-muted',
                            )}
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Templates & Specifications */}
            {(system.hasTemplate || system.hasSpecification) && (
              <>
                <Divider className="mb-8" />
                <div className="flex flex-wrap gap-4">
                  {system.hasTemplate && system.templateInstallCmd && (
                    <div className="flex-1 min-w-[240px] border border-border p-5 bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="download" size={16} className="text-accent" />
                        <Heading variant="h5" className="uppercase tracking-wider">
                          Template
                        </Heading>
                      </div>
                      <Text variant="body-sm" className="mb-3">
                        Get started instantly with our pre-built template.
                      </Text>
                      <div className="bg-surface-secondary p-3 font-mono text-xs text-fg break-all">
                        {system.templateInstallCmd}
                      </div>
                    </div>
                  )}

                  {system.hasSpecification && system.specificationInstallCmd && (
                    <div className="flex-1 min-w-[240px] border border-border p-5 bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="file" size={16} className="text-accent" />
                        <Heading variant="h5" className="uppercase tracking-wider">
                          Specification
                        </Heading>
                      </div>
                      <Text variant="body-sm" className="mb-3">
                        Install the formal specification for spec-driven development.
                      </Text>
                      <div className="bg-surface-secondary p-3 font-mono text-xs text-fg break-all">
                        {system.specificationInstallCmd}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="border border-border p-6 bg-white">
              <Heading variant="h5" className="uppercase tracking-wider mb-4">
                Skills You&apos;ll Learn
              </Heading>
              <div className="flex flex-wrap gap-2">
                {system.skills.map((skill) => (
                  <Tag key={skill} variant="brand" size="sm">{skill}</Tag>
                ))}
              </div>
            </div>

            {/* Technologies */}
            {system.technologies.length > 0 && (
              <div className="border border-border p-6 bg-white">
                <Heading variant="h5" className="uppercase tracking-wider mb-4">
                  Technologies
                </Heading>
                <div className="flex flex-wrap gap-2">
                  {system.technologies.map((tech) => (
                    <Tag key={tech} variant="default" size="sm">{tech}</Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {system.prerequisites.length > 0 && (
              <div className="border border-border p-6 bg-white">
                <Heading variant="h5" className="uppercase tracking-wider mb-4">
                  Prerequisites
                </Heading>
                <ul className="space-y-2">
                  {system.prerequisites.map((prereq) => (
                    <li key={prereq} className="flex items-center gap-2 text-xs text-fg-secondary">
                      <Icon name="check" size={12} className="text-accent shrink-0" />
                      <span className="capitalize">{prereq.replace(/-/g, ' ')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Language Support */}
            {!system.languageAgnostic && system.languages.length > 0 && (
              <div className="border border-border p-6 bg-white">
                <Heading variant="h5" className="uppercase tracking-wider mb-4">
                  Languages
                </Heading>
                <div className="flex flex-wrap gap-2">
                  {system.languages.map((lang) => (
                    <Tag key={lang} variant="outline" size="sm">{lang}</Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Author */}
            {system.author && (
              <div className="border border-border p-6 bg-white">
                <Heading variant="h5" className="uppercase tracking-wider mb-4">
                  Author
                </Heading>
                <Text variant="body-sm">{system.author}</Text>
              </div>
            )}

            {/* Leaderboard placeholder */}
            <div className="border border-border p-6 bg-white">
              <Heading variant="h5" className="uppercase tracking-wider mb-4">
                Leaderboard
              </Heading>
              <Text variant="muted">
                Track your progress and compete with other learners. Coming soon.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
