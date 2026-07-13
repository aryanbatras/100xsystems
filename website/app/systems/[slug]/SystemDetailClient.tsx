'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Heading, Text, Badge, Tag, Icon, Breadcrumbs } from '@/presentation/__components';
import type { SystemMeta } from '@/lib/mdx';

interface SystemDetailClientProps {
  system: SystemMeta;
}

export function SystemDetailClient({ system }: SystemDetailClientProps) {
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  const difficultyVariant = system.difficulty === 'advanced' ? 'black' : system.difficulty === 'intermediate' ? 'purple' : 'yellow';

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1100px] mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Systems', href: '/systems' },
            { label: system.title },
          ]}
          className="mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* ── Main Content ── */}
          <div>
            {/* Title & Meta */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Badge variant={difficultyVariant} size="sm">
                  {system.difficulty}
                </Badge>
                <Badge variant={system.type === 'handcrafted' ? 'purple' : 'yellow'} size="sm">
                  {system.type === 'handcrafted' ? 'Handcrafted' : 'Outsourced'}
                </Badge>
                <span className="text-xs text-fg-muted">{system.estimatedTime}</span>
              </div>
              <Heading variant="h1" className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                {system.title}
              </Heading>
              <Text variant="body-lg" className="text-fg-secondary leading-relaxed max-w-2xl">
                {system.longDescription || system.description}
              </Text>
            </div>

            {/* Description */}
            <div className="mb-10">
              <p className="text-sm text-fg-secondary leading-relaxed">
                {system.description}
              </p>
            </div>

            {/* Languages & Chapters — borderless */}
            <div className="mb-10">
              <Heading variant="h4" className="uppercase tracking-wider mb-5">
                Chapters
              </Heading>
              {system.languages.length === 0 ? (
                <Text variant="muted">No chapters yet. Coming soon!</Text>
              ) : (
                <div className="space-y-8">
                  {system.languages.map((lang) => (
                    <div key={lang.slug}>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="purple" size="sm">{lang.displayName}</Badge>
                        <span className="text-xs text-fg-muted">{lang.chapters.length} {lang.chapters.length === 1 ? 'chapter' : 'chapters'}</span>
                      </div>
                      <div className="space-y-1">
                        {lang.chapters.map((chapter, idx) => {
                          const isHovered = hoveredChapter === `${lang.slug}-${chapter.slug}`;
                          return (
                            <Link
                              key={chapter.slug}
                              href={`/systems/${system.slug}/${lang.slug}/chapters/${chapter.slug}`}
                              className={cn(
                                'flex items-center gap-4 px-4 py-3 transition-all duration-200',
                                isHovered
                                  ? 'bg-accent/5'
                                  : 'hover:bg-accent/[0.03]',
                              )}
                              onMouseEnter={() => setHoveredChapter(`${lang.slug}-${chapter.slug}`)}
                              onMouseLeave={() => setHoveredChapter(null)}
                            >
                              <span className="flex items-center justify-center w-7 h-7 text-xs font-bold text-accent shrink-0">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-fg">
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
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fg-muted">
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
              )}
            </div>

            {/* Templates & Specifications — borderless */}
            {(system.hasTemplate || system.hasSpecification) && (
              <div className="flex flex-wrap gap-6">
                {system.hasTemplate && system.templateInstallCmd && (
                  <div className="flex-1 min-w-[240px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="download" size={14} className="text-accent" />
                      <Heading variant="h5" className="uppercase tracking-wider">
                        Template
                      </Heading>
                    </div>
                    <Text variant="body-sm" className="mb-2 text-fg-secondary">
                      Get started instantly with our pre-built template.
                    </Text>
                    <div className="font-mono text-xs text-fg bg-gray-50 border border-gray-200 p-3 break-all">
                      {system.templateInstallCmd}
                    </div>
                  </div>
                )}

                {system.hasSpecification && system.specificationInstallCmd && (
                  <div className="flex-1 min-w-[240px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="file" size={14} className="text-accent" />
                      <Heading variant="h5" className="uppercase tracking-wider">
                        Specification
                      </Heading>
                    </div>
                    <Text variant="body-sm" className="mb-2 text-fg-secondary">
                      Install the formal specification for spec-driven development.
                    </Text>
                    <div className="font-mono text-xs text-fg bg-gray-50 border border-gray-200 p-3 break-all">
                      {system.specificationInstallCmd}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-8">
            {/* Skills */}
            <div>
              <Heading variant="h5" className="uppercase tracking-wider mb-3 text-xs">
                Skills You&apos;ll Learn
              </Heading>
              <div className="flex flex-wrap gap-1.5">
                {system.skills.map((skill) => (
                  <Tag key={skill} variant="brand" size="sm">{skill}</Tag>
                ))}
              </div>
            </div>

            {/* Technologies */}
            {system.technologies.length > 0 && (
              <div>
                <Heading variant="h5" className="uppercase tracking-wider mb-3 text-xs">
                  Technologies
                </Heading>
                <div className="flex flex-wrap gap-1.5">
                  {system.technologies.map((tech) => (
                    <Tag key={tech} variant="default" size="sm">{tech}</Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {system.prerequisites.length > 0 && (
              <div>
                <Heading variant="h5" className="uppercase tracking-wider mb-3 text-xs">
                  Prerequisites
                </Heading>
                <ul className="space-y-2">
                  {system.prerequisites.map((prereq) => (
                    <li key={prereq} className="flex items-center gap-2 text-xs text-fg-secondary">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="capitalize">{prereq.replace(/-/g, ' ')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Language Support */}
            {system.languages.length > 0 && (
              <div>
                <Heading variant="h5" className="uppercase tracking-wider mb-3 text-xs">
                  Languages
                </Heading>
                <div className="flex flex-wrap gap-1.5">
                  {system.languages.map((lang) => (
                    <Link key={lang.slug} href={`/systems/${system.slug}/${lang.slug}`}>
                      <Tag variant="outline" size="sm">{lang.displayName}</Tag>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author */}
            {system.author && (
              <div>
                <Heading variant="h5" className="uppercase tracking-wider mb-2 text-xs">
                  Author
                </Heading>
                <Text variant="body-sm" className="text-fg-secondary">{system.author}</Text>
              </div>
            )}

            {/* Leaderboard placeholder */}
            <div className="pt-4">
              <Heading variant="h5" className="uppercase tracking-wider mb-2 text-xs">
                Leaderboard
              </Heading>
              <Text variant="muted" className="text-xs">
                Track your progress and compete with other learners. Coming soon.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
