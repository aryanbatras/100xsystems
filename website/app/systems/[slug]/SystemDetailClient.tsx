'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { MarkdownRenderer } from '@/lib/markdown-renderer';
import { Breadcrumbs } from '@/presentation/__components';
import type { SystemMeta, SystemFileEntry } from '@/lib/mdx';

interface SystemDetailClientProps {
  system: SystemMeta;
  flatFiles: SystemFileEntry[];
}

export function SystemDetailClient({ system, flatFiles }: SystemDetailClientProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const displayName = (slug: string) =>
    slug.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const selectedFile = flatFiles.find((f) => f.slug === selectedSlug);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumbs items={[{ label: 'Systems', href: '/systems' }, { label: system.title }]} />
        </div>

        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
          {system.title}
        </h1>

        {/* Sections as toggle tags */}
        {flatFiles.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-4">
              Sections
            </p>
            <div className="flex flex-wrap gap-2">
              {flatFiles.map((file) => (
                <button
                  key={file.slug}
                  onClick={() => setSelectedSlug(selectedSlug === file.slug ? null : file.slug)}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-all duration-200',
                    selectedSlug === file.slug
                      ? 'bg-accent text-white'
                      : 'bg-surface-secondary text-fg-secondary hover:bg-accent hover:text-white',
                  )}
                >
                  {file.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected File Content Inline */}
        {selectedFile && (
          <div className="mt-8 border-t border-border pt-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {selectedFile.title}
              </span>
              {selectedFile.frontmatter.difficulty && (
                <span className={cn(
                  'text-[10px] font-semibold px-2 py-0.5',
                  selectedFile.frontmatter.difficulty === 'Beginner' ? 'bg-accent text-white' :
                  selectedFile.frontmatter.difficulty === 'Intermediate' ? 'bg-accent-yellow text-black' :
                  'bg-fg text-white',
                )}>
                  {selectedFile.frontmatter.difficulty}
                </span>
              )}
              <button
                onClick={() => setSelectedSlug(null)}
                className="ml-auto text-[10px] font-medium text-fg-muted hover:text-accent transition-colors"
              >
                Close
              </button>
            </div>
            <article className={cn(
              'prose max-w-none',
              'prose-headings:font-bold prose-headings:tracking-tight',
              'prose-h2:text-[1.5rem] prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-fg',
              'prose-h3:text-[1.125rem] prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-fg',
              'prose-p:mb-5 prose-p:text-fg-secondary',
              'prose-a:text-accent prose-a:font-semibold',
              'prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.875em] prose-code:bg-pink-50 prose-code:text-pink-600',
              'prose-strong:text-fg',
              'prose-li:text-fg-secondary',
              'prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:py-3 prose-blockquote:px-5',
              'prose-table:border-collapse prose-table:border prose-table:border-border',
              'prose-th:bg-surface-secondary prose-th:px-4 prose-th:py-2 prose-th:text-xs prose-th:font-bold',
              'prose-td:px-4 prose-td:py-2 prose-td:text-sm prose-td:border prose-td:border-border',
              '[&_code]:before:content-none [&_code]:after:content-none',
            )}>
              <MarkdownRenderer source={selectedFile.content} />
            </article>
          </div>
        )}

        {/* Reference Implementations */}
        {system.languages.length > 0 && (
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-4">
              Reference Implementations
            </p>
            <div className="flex flex-wrap gap-2">
              {system.languages.map((lang) => (
                <Link
                  key={lang}
                  href={`/systems/${system.slug}/${lang}/chapters`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-surface-secondary text-fg-secondary hover:bg-accent hover:text-white transition-all duration-200"
                >
                  <span className="w-4 h-4 flex items-center justify-center text-[10px] font-bold bg-accent/10 text-accent">
                    {lang.charAt(0).toUpperCase()}
                  </span>
                  {displayName(lang)}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Chapters */}
        {system.chapters.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-4">
              Chapters ({system.chapters.length})
            </p>
            <div className="space-y-px">
              {system.chapters.map((chapter, idx) => (
                <div key={chapter.slug} className="flex items-center gap-4 px-4 py-3 text-sm text-fg-secondary">
                  <span className="flex items-center justify-center w-8 h-8 text-xs font-bold text-accent shrink-0 border border-accent/20">
                    {String(chapter.order || idx + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">{chapter.title}</span>
                  <span className="text-[10px] text-fg-muted uppercase tracking-wider">Chapter {chapter.order || idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
