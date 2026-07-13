'use client';

import { useMemo, useState, useEffect } from 'react';
import { cn } from '@/application/lib/utils';
import { Heading, Text, Badge, Breadcrumbs } from '@/presentation/__components';
import { MarkdownRenderer } from '@/lib/markdown-renderer';
import { ReadingProvider, useReadingSettings, type ReadingSettings } from '@/lib/reading-context';
import { ReadingToolbar } from '@/components/reading/ReadingToolbar';
import type { ChapterMeta, ChapterContent } from '@/lib/mdx';

interface ChapterPageClientProps {
  slug: string;
  language: string;
  systemTitle: string;
  chapter: ChapterContent;
  chapters: ChapterMeta[];
  prevChapter: ChapterMeta | null;
  nextChapter: ChapterMeta | null;
  content: string;
}

/** Extract headings from markdown for the ToC */
function extractHeadings(markdown: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,4})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ id, text, level });
  }
  return headings;
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

/** Borderless copy button for LLM prompts */
function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 text-fg-muted hover:text-accent"
      title="Copy content for use with LLM"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function ChapterContent({ slug, language, systemTitle, chapter, chapters, prevChapter, nextChapter, content }: ChapterPageClientProps) {
  const { settings } = useReadingSettings();
  const readingClasses = useReadingClasses(settings);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');

  // Track active heading for ToC highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('article h2[id], article h3[id], article h4[id]').forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content]);

  const headings = useMemo(() => extractHeadings(content), [content]);

  return (
    <div className="min-h-screen flex justify-center">
      {/* Outer container: centers sidebar + content + toc on the page */}
      <div className="flex w-full max-w-[1320px]">
        {/* Left Sidebar — Chapter Navigation */}
        <aside className={cn(
          'fixed lg:sticky top-0 left-0 z-40 h-screen overflow-y-auto transition-all duration-300 bg-white',
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-64 lg:translate-x-0',
        )}>
          <div className="p-6">
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-fg-muted mb-1">System</p>
              <a
                href={`/systems/${slug}`}
                className="text-sm font-bold text-fg hover:text-accent transition-colors"
              >
                {systemTitle}
              </a>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-fg-muted mb-3">Chapters</p>
              {chapters.map((ch) => (
                <a
                  key={ch.slug}
                  href={`/systems/${slug}/${language}/chapters/${ch.slug}`}
                  className={cn(
                    'block px-3 py-2 text-xs transition-all duration-150',
                    ch.slug === chapter.meta.slug
                      ? 'bg-accent !text-white font-bold'
                      : 'text-fg hover:bg-accent/5'
                  )}
                >
                  <span className="text-[10px] mr-2 opacity-50">{String(ch.order).padStart(2, '0')}</span>
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

        {/* Main Content Area — centered within the flex container */}
        <div className={cn(
          'flex-1 min-w-0 transition-all duration-300',
          settings.mode === 'sepia' ? 'bg-amber-50' : settings.mode === 'dark' ? 'bg-slate-900' : 'bg-white',
        )}>
          <div className="max-w-[680px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 -ml-2 text-fg-secondary hover:text-accent transition-colors"
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
              <div className="flex items-center gap-1">
                <CopyButton content={content} />
                <ReadingToolbar />
              </div>
            </div>

            {/* Chapter Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="purple" size="sm">
                  Chapter {chapter.meta.order}
                </Badge>
              </div>
              <Heading variant="h1" className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
                {chapter.meta.title}
              </Heading>
              <Text variant="body-lg" className="text-fg-secondary leading-relaxed">
                {chapter.meta.description}
              </Text>
            </div>

            {/* Markdown Content */}
            <article className={cn(
              'prose max-w-none transition-all duration-200',
              readingClasses,
              'prose-headings:font-bold prose-headings:tracking-tight',
              'prose-h2:text-[1.5rem] lg:prose-h2:text-[1.75rem] prose-h2:mt-14 prose-h2:mb-5 prose-h2:leading-tight prose-h2:scroll-mt-20',
              'prose-h3:text-[1.125rem] lg:prose-h3:text-[1.25rem] prose-h3:mt-10 prose-h3:mb-3 prose-h3:scroll-mt-20',
              'prose-p:mb-6',
              'prose-a:font-semibold hover:prose-a:underline decoration-accent underline-offset-2',
              'prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.875em] prose-code:rounded',
              'prose-pre:p-5 prose-pre:overflow-x-auto prose-pre:rounded-none',
              'prose-img:my-10 prose-img:mx-auto prose-img:rounded-none',
              'prose-strong:font-bold',
              'prose-li:mb-2',
              'prose-blockquote:border-l-[3px] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:my-8',
              '[&_pre]:text-[0.875rem] [&_pre]:leading-[1.6]',
              '[&_code]:before:content-none [&_code]:after:content-none',
              settings.mode === 'light' && 'prose-headings:text-fg prose-p:text-fg prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-code:text-fg prose-code:bg-gray-100 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-a:text-accent prose-strong:text-fg prose-li:text-fg prose-hr:border-gray-200',
              settings.mode === 'sepia' && 'prose-headings:text-amber-900 prose-p:text-amber-800 prose-blockquote:border-l-amber-600 prose-blockquote:bg-amber-100/40 prose-code:text-amber-900 prose-code:bg-amber-100 prose-pre:bg-amber-50 prose-pre:border prose-pre:border-amber-200 prose-a:text-amber-700 prose-strong:text-amber-900 prose-li:text-amber-800 prose-hr:border-amber-200',
              settings.mode === 'dark' && 'prose-headings:text-slate-100 prose-p:text-slate-300 prose-blockquote:border-l-slate-500 prose-blockquote:bg-slate-800/40 prose-code:text-slate-200 prose-code:bg-slate-800 prose-pre:bg-slate-800/60 prose-pre:border prose-pre:border-slate-700 prose-a:text-blue-400 prose-strong:text-slate-100 prose-li:text-slate-300 prose-hr:border-slate-700',
              settings.font === 'serif' && 'prose-headings:font-serif'
            )}>
              <MarkdownRenderer source={content} />
            </article>

            {/* Chapter Navigation */}
            <div className="mt-16 pt-10">
              <div className="flex items-center justify-between">
                {prevChapter ? (
                  <a
                    href={`/systems/${slug}/${language}/chapters/${prevChapter.slug}`}
                    className="group"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:-translate-x-0.5 transition-transform">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                      </svg>
                      <div className="text-left">
                        <div className="text-[10px] text-fg-muted uppercase tracking-wider">Previous</div>
                        <div className="text-sm">{prevChapter.title}</div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div />
                )}

                {nextChapter ? (
                  <a
                    href={`/systems/${slug}/${language}/chapters/${nextChapter.slug}`}
                    className="group text-right"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                      <div>
                        <div className="text-[10px] text-fg-muted uppercase tracking-wider">Next</div>
                        <div className="text-sm">{nextChapter.title}</div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-0.5 transition-transform">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </a>
                ) : (
                  <a
                    href={`/systems/${slug}`}
                    className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Complete System
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar — Table of Contents */}
        {headings.length > 0 && (
          <aside className="hidden xl:block w-44 shrink-0">
            <div className="sticky top-0 h-screen overflow-y-auto pt-12 pr-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-fg-muted mb-4">On this page</p>
              <nav className="space-y-1">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(h.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={cn(
                      'block text-xs leading-relaxed transition-all duration-150',
                      h.level === 2 && 'pl-0',
                      h.level === 3 && 'pl-3',
                      h.level === 4 && 'pl-6',
                      activeHeading === h.id
                        ? 'text-accent font-semibold'
                        : 'text-fg-muted hover:text-fg'
                    )}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
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
