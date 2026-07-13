'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Heading, Text, Badge, Icon, Breadcrumbs } from '@/presentation/__components';
import { MdxRenderer } from '@/lib/mdx-renderer';
import { ReadingProvider, useReadingSettings, type ReadingSettings } from '@/lib/reading-context';
import { ReadingToolbar } from '@/components/reading/ReadingToolbar';
import type { ChapterMeta, ChapterContent } from '@/lib/mdx';

interface ChapterPageClientProps {
  slug: string;
  systemTitle: string;
  chapter: ChapterContent;
  chapters: ChapterMeta[];
  prevChapter: ChapterMeta | null;
  nextChapter: ChapterMeta | null;
  content: string;
}

/** Maps reading settings to Tailwind classes */
function useReadingClasses(settings: ReadingSettings) {
  return useMemo(() => {
    const sizeMap: Record<string, string> = {
      small: 'prose-sm',
      medium: 'prose-base',
      large: 'prose-lg',
      xlarge: 'prose-xl',
    };
    const heightMap: Record<string, string> = {
      tight: 'prose-p:leading-[1.4] prose-li:leading-[1.4]',
      normal: 'prose-p:leading-[1.6] prose-li:leading-[1.6]',
      relaxed: 'prose-p:leading-[1.8] prose-li:leading-[1.8]',
      wide: 'prose-p:leading-[2.0] prose-li:leading-[2.0]',
    };
    const modeMap: Record<string, string> = {
      light: 'bg-white text-fg',
      sepia: 'bg-amber-50 text-amber-900',
      dark: 'bg-slate-900 text-slate-100',
    };
    const fontMap: Record<string, string> = {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
    };

    return `${sizeMap[settings.fontSize]} ${heightMap[settings.lineHeight]} ${modeMap[settings.mode]} ${fontMap[settings.font]}`;
  }, [settings]);
}

function ChapterContent({ slug, systemTitle, chapter, chapters, prevChapter, nextChapter, content }: ChapterPageClientProps) {
  const { settings } = useReadingSettings();
  const readingClasses = useReadingClasses(settings);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar — Chapter Navigation */}
      <aside className={cn(
        'fixed lg:sticky top-0 left-0 z-40 h-screen bg-white border-r border-border transition-all duration-300 overflow-y-auto',
        sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-64 lg:translate-x-0',
      )}>
        <div className="p-5">
          <div className="mb-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-1">System</h3>
            <a href={`/systems/${slug}`} className="text-sm font-bold text-fg hover:text-accent transition-colors">
              {systemTitle}
            </a>
          </div>

          <div className="space-y-1">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-3">Chapters</h4>
            {chapters.map((ch) => (
              <a
                key={ch.slug}
                href={`/systems/${slug}/chapters/${ch.slug}`}
                className={cn(
                  'block px-3 py-2 text-xs transition-all duration-150',
                  ch.slug === chapter.meta.slug
                    ? 'bg-accent text-white font-bold'
                    : 'text-fg-secondary hover:bg-accent/5 hover:text-fg'
                )}
              >
                <span className="text-[10px] opacity-60 mr-2">0{ch.order}.</span>
                {ch.title}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={cn(
        'flex-1 min-w-0 transition-all duration-300',
        settings.mode === 'sepia' ? 'bg-amber-50' : settings.mode === 'dark' ? 'bg-slate-900' : 'bg-white',
      )}>
        <div className="max-w-[780px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
          {/* Top Bar — sidebar toggle + reading toolbar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-fg-secondary hover:text-accent transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <Breadcrumbs
                items={[
                  { label: 'Systems', href: '/systems' },
                  { label: systemTitle, href: `/systems/${slug}` },
                  { label: chapter.meta.title },
                ]}
                className="text-xs"
              />
            </div>
            <ReadingToolbar />
          </div>

          {/* Chapter Header */}
          <div className="mb-10 pb-10 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="purple" size="sm">
                Chapter {chapter.meta.order}
              </Badge>
              {chapter.meta.estimatedTime && (
                <span className="text-xs text-fg-muted flex items-center gap-1">
                  <Icon name="clock" size={12} />
                  {chapter.meta.estimatedTime}
                </span>
              )}
            </div>
            <Heading variant="h1" className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
              {chapter.meta.title}
            </Heading>
            <Text variant="body-lg" className="text-fg-secondary leading-relaxed">
              {chapter.meta.description}
            </Text>
          </div>

          {/* MDX Content — Beautiful prose with reading customization */}
          <article className={cn(
            'prose max-w-none transition-all duration-200',
            readingClasses,
            // Base prose styles
            'prose-headings:font-bold prose-headings:tracking-tight',
            'prose-h2:text-[1.625rem] lg:prose-h2:text-[1.875rem] prose-h2:mt-14 prose-h2:mb-5 prose-h2:leading-tight',
            'prose-h3:text-[1.25rem] lg:prose-h3:text-[1.375rem] prose-h3:mt-10 prose-h3:mb-3',
            'prose-p:mb-6',
            'prose-a:font-semibold hover:prose-a:underline',
            'prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.875em]',
            'prose-pre:p-5 prose-pre:overflow-x-auto',
            'prose-img:my-8 prose-img:mx-auto',
            'prose-strong:font-bold',
            'prose-li:mb-2',
            'prose-blockquote:border-l-[3px] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic',
            '[&_pre]:text-[0.875rem] [&_pre]:leading-[1.6]',
            '[&_code]:before:content-none [&_code]:after:content-none',
            // Color variations by mode
            settings.mode === 'light' && 'prose-headings:text-fg prose-p:text-fg prose-blockquote:border-l-accent prose-blockquote:bg-accent-bg/10 prose-code:text-fg prose-code:bg-surface-secondary prose-pre:bg-surface-secondary prose-a:text-accent prose-strong:text-fg prose-li:text-fg',
            settings.mode === 'sepia' && 'prose-headings:text-amber-900 prose-p:text-amber-800 prose-blockquote:border-l-amber-600 prose-blockquote:bg-amber-100/50 prose-code:text-amber-900 prose-code:bg-amber-100 prose-pre:bg-amber-100/80 prose-a:text-amber-700 prose-strong:text-amber-900 prose-li:text-amber-800',
            settings.mode === 'dark' && 'prose-headings:text-slate-100 prose-p:text-slate-300 prose-blockquote:border-l-slate-400 prose-blockquote:bg-slate-800/50 prose-code:text-slate-200 prose-code:bg-slate-800 prose-pre:bg-slate-800 prose-a:text-blue-400 prose-strong:text-slate-100 prose-li:text-slate-300',
            settings.font === 'serif' && 'prose-headings:font-serif'
          )}>
            <MdxRenderer source={content} />
          </article>

          {/* Chapter Navigation */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              {prevChapter ? (
                <a
                  href={`/systems/${slug}/chapters/${prevChapter.slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group"
                >
                  <Icon name="arrow-left" size={14} className="group-hover:-translate-x-0.5 transition-transform shrink-0" />
                  <div className="text-left">
                    <div className="text-[10px] text-fg-muted uppercase tracking-wider">Previous</div>
                    <div className="text-sm">{prevChapter.title}</div>
                  </div>
                </a>
              ) : (
                <div />
              )}

              {nextChapter ? (
                <a
                  href={`/systems/${slug}/chapters/${nextChapter.slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group text-right"
                >
                  <div>
                    <div className="text-[10px] text-fg-muted uppercase tracking-wider">Next</div>
                    <div className="text-sm">{nextChapter.title}</div>
                  </div>
                  <Icon name="arrow-right" size={14} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>
              ) : (
                <a
                  href={`/systems/${slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                  <Icon name="check" size={14} className="shrink-0" />
                  Complete System
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChapterPageClient(props: ChapterPageClientProps) {
  return (
    <ReadingProvider>
      <ChapterContent {...props} />
    </ReadingProvider>
  );
}
