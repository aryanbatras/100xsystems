'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Breadcrumbs } from '@/presentation/__components';
import type { SystemMeta, SystemFolderTag } from '@/lib/mdx';

interface SystemDetailClientProps {
  system: SystemMeta;
  folderTags: SystemFolderTag[];
}

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

export function SystemDetailClient({ system, folderTags }: SystemDetailClientProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (folderTags.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-[1000px] mx-auto">
          <Breadcrumbs items={[{ label: 'Systems', href: '/systems' }, { label: system.title }]} />
          <div className="mb-16 mt-10">
            <div className="flex items-center gap-2 mb-4">
              {system.difficulty && (
                <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2.5 py-1', difficultyStyles[system.difficulty])}>
                  {system.difficulty}
                </span>
              )}
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-fg">{system.title}</h1>
            <p className="text-base text-fg-secondary leading-relaxed max-w-2xl">{system.description}</p>
          </div>
          <div className="text-center py-20 text-fg-muted"><p className="text-sm">No content yet. Check back soon!</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumbs items={[{ label: 'Systems', href: '/systems' }, { label: system.title }]} />
        </div>

        {/* System Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            {system.difficulty && (
              <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2.5 py-1', difficultyStyles[system.difficulty])}>
                {system.difficulty}
              </span>
            )}
            {system.tags && system.tags.length > 0 && (
              <>
                <span className="text-xs text-fg-muted">·</span>
                {system.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium uppercase tracking-wider text-fg-muted">{tag}</span>
                ))}
              </>
            )}
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-fg">{system.title}</h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-2xl">{system.description}</p>
        </div>

        {/* Folder Tags — stacked vertically, each with a tag badge and grid below */}
        <div className="space-y-16">
          {folderTags.map((folderTag) => (
            <section key={folderTag.tag}>
              {/* Tag badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-accent text-white">
                  {folderTag.displayName}
                </span>
                <span className="text-xs text-fg-muted font-medium">
                  {folderTag.children.length} {folderTag.children.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Grid of files/folders — 2 columns so cards don't overflow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {folderTag.children.map((entry) => {
                  const id = entry.type === 'folder' ? `folder-${entry.slug}` : entry.slug;
                  const isHovered = hoveredId === id;
                  const isFolder = entry.type === 'folder';

                  const href = isFolder
                    ? `/systems/${system.slug}/folder/${folderTag.tag}/${entry.slug}`
                    : `/systems/${system.slug}/read/${folderTag.tag}/${entry.slug}`;

                  return (
                    <Link
                      key={id}
                      href={href}
                      className={cn(
                        'group block px-6 py-5 transition-all duration-300',
                        isHovered ? 'bg-accent' : 'bg-white hover:bg-accent/[0.03]',
                      )}
                      onMouseEnter={() => setHoveredId(id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        {/* Icon for folders, order number for files */}
                        {isFolder ? (
                          <span className={cn(
                            'flex items-center justify-center w-10 h-10 shrink-0 transition-all duration-300',
                            isHovered ? 'text-white' : 'text-accent',
                          )}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                            </svg>
                          </span>
                        ) : (
                          <span className={cn(
                            'flex items-center justify-center w-10 h-10 text-base font-bold font-mono shrink-0 transition-all duration-300',
                            isHovered ? 'text-white' : 'text-accent',
                          )}>
                            {String(entry.order).padStart(2, '0')}
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            'text-sm font-bold tracking-tight transition-colors duration-300 truncate',
                            isHovered ? 'text-white' : 'text-fg',
                          )}>
                            {entry.title}
                          </h3>
                          {isFolder && (
                            <span className={cn(
                              'text-xs transition-colors duration-300',
                              isHovered ? 'text-white/60' : 'text-fg-muted',
                            )}>
                              {entry.slug}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={cn(
                        'flex items-center gap-1.5 text-xs font-bold transition-all duration-300',
                        isHovered ? 'text-white opacity-100 translate-x-0' : 'text-accent opacity-0 -translate-x-2',
                      )}>
                        <span>{isFolder ? 'Browse' : 'Read'}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
