'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Breadcrumbs } from '@/presentation/__components';
import type { SystemMeta, SystemFolderEntry } from '@/lib/mdx';

interface FolderBrowserClientProps {
  system: SystemMeta;
  pathSegments: string[];
  contents: SystemFolderEntry[];
}

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

export function FolderBrowserClient({ system, pathSegments, contents }: FolderBrowserClientProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const folderTitle = pathSegments[pathSegments.length - 1]
    .split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Build breadcrumbs
  const breadcrumbs = [
    { label: 'Systems', href: '/systems' },
    { label: system.title, href: `/systems/${system.slug}` },
  ];

  // Add intermediate path segments as breadcrumbs
  let accumulatedPath = '';
  pathSegments.forEach((seg, idx) => {
    accumulatedPath += (idx > 0 ? '/' : '') + seg;
    const segLabel = seg.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    if (idx < pathSegments.length - 1) {
      breadcrumbs.push({ label: segLabel, href: `/systems/${system.slug}/folder/${accumulatedPath}` });
    }
  });

  if (contents.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-10">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 text-fg">{folderTitle}</h1>
          <div className="text-center py-20 text-fg-muted">
            <p className="text-sm">This folder is empty.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-10">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Page title */}
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-10 text-fg">{folderTitle}</h1>

        {/* Grid of files and subfolders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contents.map((entry) => {
            const isHovered = hoveredId === entry.slug;
            const isFolder = entry.type === 'folder';

            const href = isFolder
              ? `/systems/${system.slug}/folder/${[...pathSegments, entry.slug].join('/')}`
              : `/systems/${system.slug}/read/${[...pathSegments, entry.slug].join('/')}`;

            return (
              <Link
                key={entry.slug}
                href={href}
                className={cn(
                  'group block px-6 py-5 transition-all duration-300',
                  isHovered ? 'bg-accent' : 'bg-white hover:bg-accent/[0.03]',
                )}
                onMouseEnter={() => setHoveredId(entry.slug)}
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
                      {isFolder ? entry.title : (
                        <><span className="mr-1">{entry.title}</span></>
                      )}
                    </h3>
                    {isFolder && (
                      <span className={cn(
                        'text-xs transition-colors duration-300',
                        isHovered ? 'text-white/60' : 'text-fg-muted',
                      )}>
                        Folder
                      </span>
                    )}
                  </div>
                </div>
                <div className={cn(
                  'flex items-center gap-1.5 text-xs font-bold transition-all duration-300',
                  isHovered ? 'text-white opacity-100 translate-x-0' : 'text-accent opacity-0 -translate-x-2',
                )}>
                  <span>
                    {isFolder ? 'Browse' : 'Read'}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
