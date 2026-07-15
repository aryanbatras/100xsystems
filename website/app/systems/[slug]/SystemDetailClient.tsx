'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Breadcrumbs } from '@/presentation/__components';
import type {
  SystemMeta,
  SystemFolderTag,
  SystemTrackTree,
  LessonMeta,
} from '@/lib/mdx';

interface SystemDetailClientProps {
  system: SystemMeta;
  folderTags: SystemFolderTag[];
  hasTracks?: boolean;
  trackTree?: SystemTrackTree[];
}

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

const languageLogos: Record<string, string> = {
  typescript: '/assets/icons/typescript.svg',
  javascript: '/assets/icons/javascript.svg',
  python: '/assets/icons/python.svg',
  go: '/assets/icons/go.svg',
  rust: '/assets/icons/rust.svg',
  java: '/assets/icons/java.svg',
  spring: '/assets/icons/spring.svg',
};

// ─── Lesson Card ────────────────────────────────────────────────────

function LessonCard({
  lesson,
  trackSlug,
  moduleSlug,
  systemSlug,
  isHovered,
  onHover,
  onLeave,
}: {
  lesson: LessonMeta;
  trackSlug: string;
  moduleSlug: string;
  systemSlug: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const href = `/systems/${systemSlug}/read/${trackSlug}/${moduleSlug}/${lesson.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        'group block px-5 py-4 transition-all duration-300',
        isHovered ? 'bg-accent' : 'bg-white hover:bg-accent/[0.03]',
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-start gap-3">
        <span className={cn(
          'flex items-center justify-center w-9 h-9 text-sm font-bold font-mono shrink-0 transition-all duration-300',
          isHovered ? 'text-white' : 'text-accent',
        )}>
          {String(lesson.order).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              'text-sm font-bold tracking-tight transition-colors duration-300 truncate',
              isHovered ? 'text-white' : 'text-fg',
            )}>
              {lesson.title}
            </h3>
            {lesson.estimatedTime && (
              <span className={cn(
                'text-[10px] font-medium shrink-0 transition-colors duration-300',
                isHovered ? 'text-white/70' : 'text-fg-muted',
              )}>
                {lesson.estimatedTime}
              </span>
            )}
          </div>
          {lesson.description && (
            <p className={cn(
              'text-xs leading-relaxed line-clamp-2 transition-colors duration-300',
              isHovered ? 'text-white/80' : 'text-fg-secondary',
            )}>
              {lesson.description}
            </p>
          )}
          <div className={cn(
            'flex items-center gap-1.5 text-xs font-bold transition-all duration-300 mt-1.5',
            isHovered ? 'text-white opacity-100 translate-x-0' : 'text-accent opacity-0 -translate-x-2',
          )}>
            <span>Start Lesson</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Track Section ──────────────────────────────────────────────────

function TrackSection({
  tree,
  systemSlug,
}: {
  tree: SystemTrackTree;
  systemSlug: string;
}) {
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(tree.modules.map((m) => m.module.slug))
  );

  const toggleModule = (slug: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const langSlug = tree.track.language || tree.track.slug.replace('track-', '');
  const logo = languageLogos[langSlug];

  return (
    <section className="border-t border-gray-100 pt-10 first:border-t-0 first:pt-0">
      {/* Track Header */}
      <div className="flex items-center gap-3 mb-2">
        {logo && (
          <img
            src={logo}
            alt={tree.track.language}
            className="w-6 h-6 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        <h2 className="text-xl font-extrabold tracking-tight text-fg">{tree.track.title}</h2>
        <span className={cn(
          'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5',
          difficultyStyles[tree.track.difficulty] || 'bg-surface-secondary text-fg-muted',
        )}>
          {tree.track.difficulty}
        </span>
        <span className="text-xs text-fg-muted font-medium">
          {tree.lessonCount} {tree.lessonCount === 1 ? 'lesson' : 'lessons'} · {tree.modules.length} {tree.modules.length === 1 ? 'module' : 'modules'}
        </span>
      </div>

      <p className="text-sm text-fg-secondary mb-8 ml-0">
        {tree.track.language && (
          <span className="text-xs font-medium uppercase tracking-wider text-fg-muted">{tree.track.language}</span>
        )}
      </p>

      {/* Modules */}
      <div className="space-y-6">
        {tree.modules.map(({ module: mod, lessons }) => (
          <div key={mod.slug}>
            {/* Module Header (clickable to expand/collapse) */}
            <button
              onClick={() => toggleModule(mod.slug)}
              className="flex items-center gap-2 w-full text-left mb-3 group"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  'shrink-0 transition-transform duration-200 text-fg-muted',
                  expandedModules.has(mod.slug) ? 'rotate-90' : '',
                )}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-sm font-bold text-fg-secondary group-hover:text-accent transition-colors">
                {mod.title}
              </span>
              <span className="text-[10px] font-medium text-fg-muted">
                {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
              </span>
            </button>

            {/* Lessons Grid */}
            {expandedModules.has(mod.slug) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-6">
                {lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.slug}
                    lesson={lesson}
                    trackSlug={tree.track.slug}
                    moduleSlug={mod.slug}
                    systemSlug={systemSlug}
                    isHovered={hoveredLesson === lesson.slug}
                    onHover={() => setHoveredLesson(lesson.slug)}
                    onLeave={() => setHoveredLesson(null)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Legacy FolderTag Section ───────────────────────────────────────

function FolderTagSection({
  folderTag,
  systemSlug,
  hoveredId,
  onHover,
  onLeave,
}: {
  folderTag: SystemFolderTag;
  systemSlug: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onLeave: () => void;
}) {
  return (
    <section key={folderTag.tag}>
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-accent text-white">
          {folderTag.displayName}
        </span>
        <span className="text-xs text-fg-muted font-medium">
          {folderTag.children.length} {folderTag.children.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {folderTag.children.map((entry) => {
          const id = entry.type === 'folder' ? `folder-${entry.slug}` : entry.slug;
          const isHovered = hoveredId === id;
          const isFolder = entry.type === 'folder';
          const href = isFolder
            ? `/systems/${systemSlug}/folder/${folderTag.tag}/${entry.slug}`
            : `/systems/${systemSlug}/read/${folderTag.tag}/${entry.slug}`;

          return (
            <Link
              key={id}
              href={href}
              className={cn(
                'group block px-6 py-5 transition-all duration-300',
                isHovered ? 'bg-accent' : 'bg-white hover:bg-accent/[0.03]',
              )}
              onMouseEnter={() => onHover(id)}
              onMouseLeave={onLeave}
            >
              <div className="flex items-start gap-3 mb-2">
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
                  )}>{entry.title}</h3>
                  {isFolder && (
                    <span className={cn(
                      'text-xs transition-colors duration-300',
                      isHovered ? 'text-white/60' : 'text-fg-muted',
                    )}>{entry.slug}</span>
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
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export function SystemDetailClient({
  system,
  folderTags,
  hasTracks = false,
  trackTree = [],
}: SystemDetailClientProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const showTracks = hasTracks && trackTree.length > 0;
  const showFolderTags = !showTracks && folderTags.length > 0;
  const showEmpty = !showTracks && !showFolderTags;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumbs items={[{ label: 'Systems', href: '/systems' }, { label: system.title }]} />
        </div>

        {/* System Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
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
            {showTracks && (
              <>
                <span className="text-xs text-fg-muted">·</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-accent">
                  {trackTree.reduce((sum, t) => sum + t.lessonCount, 0)} lessons
                </span>
              </>
            )}
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-fg">{system.title}</h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-2xl">{system.description}</p>
        </div>

        {/* Empty State */}
        {showEmpty && (
          <div className="text-center py-20 text-fg-muted">
            <p className="text-sm">No content yet. Check back soon!</p>
          </div>
        )}

        {/* Track/Module/Lesson Hierarchy */}
        {showTracks && (
          <div className="space-y-12">
            {trackTree.map((tree) => (
              <TrackSection
                key={tree.track.slug}
                tree={tree}
                systemSlug={system.slug}
              />
            ))}
          </div>
        )}

        {/* Legacy Folder Tags */}
        {showFolderTags && (
          <div className="space-y-16">
            {folderTags.map((folderTag) => (
              <FolderTagSection
                key={folderTag.tag}
                folderTag={folderTag}
                systemSlug={system.slug}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
