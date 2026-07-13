'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '@/application/lib/utils';
import { MarkdownRenderer } from '@/lib/markdown-renderer';
import {
  ReadingProvider,
  useReadingSettings,
  contentWidthClass,
  fontFamilyClass,
  fontSizeRem,
  lineHeightValue,
  type ReadingFontSize,
  type ReadingLineHeight,
  type ReadingMode,
  type ReadingFont,
} from '@/lib/reading-context';
import { ReadingToolbar } from '@/components/reading/ReadingToolbar';

import { MobileNav, SidebarNav } from '@/presentation/__components';
import type { MobileNavItem, SidebarNavItem } from '@/presentation/__components';
import type { ChapterMeta, ChapterContent } from '@/lib/mdx';
import { useRouter } from 'next/navigation';


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

/** Mobile settings panel */
function MobileSettingsPanel({ onClose }: { onClose: () => void }) {
  const { settings, setFontSize, setLineHeight, setMode, setFont, resetDefaults } = useReadingSettings();

  const sizes: { key: ReadingFontSize; label: string }[] = [
    { key: 'small', label: 'S' },
    { key: 'medium', label: 'M' },
    { key: 'large', label: 'L' },
    { key: 'xlarge', label: 'XL' },
  ];
  const heights: { key: ReadingLineHeight; label: string }[] = [
    { key: 'tight', label: 'Tight' },
    { key: 'normal', label: 'Normal' },
    { key: 'relaxed', label: 'Relaxed' },
    { key: 'wide', label: 'Wide' },
  ];
  const modes: { key: ReadingMode; label: string }[] = [
    { key: 'light', label: 'Light' },
    { key: 'sepia', label: 'Sepia' },
  ];
  const fonts: { key: ReadingFont; label: string }[] = [
    { key: 'sans', label: 'Sans' },
    { key: 'serif', label: 'Serif' },
  ];

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-4px_20px_-6px_rgba(0,0,0,0.12)] px-5 pt-5 pb-8 max-h-[70vh] overflow-y-auto rounded-t-xl border-t border-gray-100"
    >
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-fg">Settings</p>
        <button onClick={onClose} className="p-1 text-fg-muted hover:text-fg transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Size</p>
          <div className="flex gap-1.5 flex-wrap">
            {sizes.map((s) => (
              <button key={s.key} onClick={() => setFontSize(s.key)} className={cn('px-3 py-1.5 text-xs font-semibold transition-all duration-150', settings.fontSize === s.key ? 'bg-accent text-white' : 'text-fg-secondary bg-gray-100 hover:bg-gray-200')}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Height</p>
          <div className="flex gap-1.5 flex-wrap">
            {heights.map((h) => (
              <button key={h.key} onClick={() => setLineHeight(h.key)} className={cn('px-3 py-1.5 text-xs font-semibold transition-all duration-150', settings.lineHeight === h.key ? 'bg-accent text-white' : 'text-fg-secondary bg-gray-100 hover:bg-gray-200')}>
                {h.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Mode</p>
          <div className="flex gap-1.5 flex-wrap">
            {modes.map((m) => (
              <button key={m.key} onClick={() => setMode(m.key)} className={cn('px-3 py-1.5 text-xs font-semibold transition-all duration-150', settings.mode === m.key ? 'bg-accent text-white' : 'text-fg-secondary bg-gray-100 hover:bg-gray-200')}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Font</p>
          <div className="flex gap-1.5 flex-wrap">
            {fonts.map((f) => (
              <button key={f.key} onClick={() => setFont(f.key)} className={cn('px-3 py-1.5 text-xs font-semibold transition-all duration-150', settings.font === f.key ? 'bg-accent text-white' : 'text-fg-secondary bg-gray-100 hover:bg-gray-200')}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={resetDefaults} className="mt-5 w-full py-3 text-[10px] font-bold uppercase tracking-widest text-fg-muted hover:text-accent transition-colors">
        Reset defaults
      </button>
    </motion.div>
  );
}

/** ── Lesson Outline — Sticky ToC with dock zoom, no icons ── */

interface OutlineItem {
  id: string;
  text: string;
  level: number;
  indent: string;
}

function LessonOutline({
  headings,
  activeId,
  onSelect,
}: {
  headings: { id: string; text: string; level: number }[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const mouseY = useMotionValue(Infinity);

  // Build flat outline items with indentation
  const items: OutlineItem[] = useMemo(() => {
    const result: OutlineItem[] = [];
    for (const h of headings) {
      let indent = '';
      if (h.level === 2) indent = 'pl-0';
      else if (h.level === 3) indent = 'pl-4';
      else if (h.level >= 4) indent = 'pl-8';
      result.push({ id: h.id, text: h.text, level: h.level, indent });
    }
    return result;
  }, [headings]);

  return (
    <div
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className="flex flex-col"
    >
      {/* "Lesson content" heading */}
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-fg-muted mb-5 block">
        Lesson content
      </span>

      <div className="flex flex-col space-y-1.5">
        {items.map((item) => (
          <OutlineRow
            key={item.id}
            item={item}
            mouseY={mouseY}
            isActive={item.id === activeId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

/** Single outline row with dock-like zoom on mouse proximity */
function OutlineRow({
  item,
  mouseY,
  isActive,
  onSelect,
}: {
  item: OutlineItem;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const size = 1;
  const magnification = 1.035;
  const dist = 120;

  const distanceCalc = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const scaleTransform = useTransform(distanceCalc, [-dist, 0, dist], [size, magnification, size]);
  const scale = useSpring(scaleTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      onClick={() => onSelect(item.id)}
      className={cn(
        'cursor-pointer text-sm leading-snug py-2',
        item.indent,
        isActive
          ? 'bg-accent text-white font-bold'
          : 'hover:bg-accent-yellow hover:text-white',
      )}
    >
      <span className="block truncate px-2">{item.text}</span>
    </motion.div>
  );
}

/** Copy button */
function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [content]);
  return (
    <button onClick={handleCopy} className="flex items-center gap-2 px-2 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 text-fg-muted hover:text-accent" title="Copy content for use with LLM">
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function ChapterContent({ slug, language, systemTitle, chapter, chapters, prevChapter, nextChapter, content }: ChapterPageClientProps) {
  const { settings } = useReadingSettings();
  const router = useRouter();

  // Track navigation to show skeleton while RSC data loads
  const [isNavigating, setIsNavigating] = useState(false);
  const hideAfterRef = useRef(0);

  useEffect(() => {
    if (!isNavigating) return;
    const remaining = hideAfterRef.current - Date.now();
    if (remaining <= 0) {
      setIsNavigating(false);
    } else {
      const timer = setTimeout(() => setIsNavigating(false), remaining);
      return () => clearTimeout(timer);
    }
  }, [chapter.meta.slug, isNavigating]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [fullscreen, setFullscreen] = useState(false);
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);

  // MobileNav items
  const mobileItems: MobileNavItem[] = useMemo(() => [
    { id: 'settings', label: 'Settings', iconName: 'settings' },
    { id: 'copy', label: 'Copy', iconName: 'copy' },
    { id: 'fullscreen', label: fullscreen ? 'Exit' : 'Fullscreen', iconName: fullscreen ? 'minimize' : 'maximize' },
  ], [fullscreen]);

  const handleMobileNav = useCallback((item: MobileNavItem) => {
    if (item.id === 'settings') {
      setMobileSettingsOpen(prev => !prev);
    } else if (item.id === 'fullscreen') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else if (item.id === 'copy') {
      navigator.clipboard.writeText(content).catch(() => {});
    }
  }, [content]);

  // Robust IntersectionObserver for ToC active heading
  useEffect(() => {
    const visibleHeadings = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleHeadings.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.delete(entry.target.id);
          }
        }
        let bestId = '';
        let bestTop = Infinity;
        for (const [id, top] of visibleHeadings) {
          if (top < bestTop) { bestTop = top; bestId = id; }
        }
        if (bestId) setActiveHeading(bestId);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('article h2[id], article h3[id], article h4[id]').forEach((el) => observer.observe(el));
    }, 200);

    return () => { clearTimeout(timer); observer.disconnect(); visibleHeadings.clear(); };
  }, [content]);



  // Fullscreen listener
  useEffect(() => {
    const handleFSChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  const sidebarItems: SidebarNavItem[] = useMemo(() => chapters.map(ch => ({
    id: ch.slug,
    label: ch.title,
    href: `/systems/${slug}/${language}/chapters/${ch.slug}`,
    iconName: 'bookmark',
  })), [chapters, slug, language]);

  const navigateToChapter = useCallback((chapterSlug: string) => {
    hideAfterRef.current = Date.now() + 2500;
    setIsNavigating(true);
    setSidebarOpen(false);
    router.push(`/systems/${slug}/${language}/chapters/${chapterSlug}`);
  }, [slug, language, router]);

  const handleSidebarNav = useCallback((item: SidebarNavItem) => {
    navigateToChapter(item.id);
  }, [navigateToChapter]);

  // Strip the first # heading from markdown since it's already shown in the Chapter Header section
  const bodyContent = useMemo(() => content.replace(/^\s*# .+(\n|$)/, ''), [content]);

  const headings = useMemo(() => extractHeadings(content), [content]);
  const contentMaxW = contentWidthClass(settings.contentWidth);
  const fontClass = fontFamilyClass(settings.font);
  const articleFontSize = fontSizeRem(settings.fontSize);
  const articleLineHeight = lineHeightValue(settings.lineHeight);

  // Build mode-specific prose classes
  const modeClasses = settings.mode === 'light'
    ? 'prose-headings:text-fg prose-p:text-fg prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-code:text-pink-600 prose-code:bg-pink-50 prose-a:text-accent prose-strong:text-fg prose-li:text-fg prose-hr:border-gray-200'
    : 'prose-headings:text-amber-900 prose-p:text-amber-800 prose-blockquote:border-l-amber-600 prose-blockquote:bg-amber-100/40 prose-code:text-amber-900 prose-code:bg-amber-100 prose-a:text-amber-700 prose-strong:text-amber-900 prose-li:text-amber-800 prose-hr:border-amber-200';

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="flex w-full max-w-[1440px]">
        {/* ── Left Sidebar — sticky on desktop, overlay on mobile ── */}
        <div
          className={cn(
            // Mobile: fixed overlay (max-lg ONLY — no fixed/sticky conflict)
            'max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50',
            // Desktop: sticky in flex flow
            'lg:sticky lg:inset-auto lg:top-0 lg:z-auto lg:h-screen',
            // Mobile slide animation
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0 max-lg:transition-transform max-lg:duration-300',
            'shrink-0 overflow-y-auto hide-scrollbar',
          )}
        >
          <SidebarNav
            items={sidebarItems}
            activeId={chapter.meta.slug}
            onItemClick={handleSidebarNav}
          />
        </div>

        {/* Mobile overlay — closes sidebar on tap */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Main Content (scrollable) ── */}
        <div className={cn('flex-1 min-w-0', settings.mode === 'sepia' ? 'bg-amber-50' : 'bg-white', fontClass)}>
          <div className="relative">
            {/* Full-page skeleton — covers title, chapter header, content, and nav */}
            {isNavigating && (
              <div className="absolute inset-0 z-10 bg-white/95 animate-pulse px-6 lg:px-12 py-12 lg:py-16">
                {/* Top bar skeleton */}
                <div className="flex items-center justify-between mb-10">
                  <div className="h-4 w-48 bg-surface-secondary rounded" />
                  <div className="flex gap-2">
                    <div className="h-4 w-14 bg-surface-secondary rounded" />
                    <div className="h-4 w-14 bg-surface-secondary rounded" />
                    <div className="h-4 w-14 bg-surface-secondary rounded" />
                  </div>
                </div>
                {/* Chapter header skeleton */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-3 w-20 bg-surface-secondary rounded" />
                    <div className="h-3 w-3 bg-surface-secondary rounded-full" />
                    <div className="h-3 w-12 bg-surface-secondary rounded" />
                  </div>
                  <div className="h-10 w-3/4 bg-surface-secondary rounded-lg mb-3" />
                </div>
                {/* Content lines skeleton */}
                <div className="space-y-4">
                  <div className="h-4 w-full bg-surface-secondary rounded" />
                  <div className="h-4 w-5/6 bg-surface-secondary rounded" />
                  <div className="h-4 w-4/5 bg-surface-secondary rounded" />
                  <div className="h-4 w-full bg-surface-secondary rounded mt-8" />
                  <div className="h-4 w-3/4 bg-surface-secondary rounded" />
                  <div className="h-4 w-2/3 bg-surface-secondary rounded" />
                  <div className="h-4 w-5/6 bg-surface-secondary rounded mt-8" />
                  <div className="h-4 w-full bg-surface-secondary rounded" />
                  <div className="h-4 w-4/5 bg-surface-secondary rounded" />
                  <div className="h-4 w-3/4 bg-surface-secondary rounded" />
                </div>
                {/* Navigation buttons skeleton */}
                <div className="mt-16 pt-8 flex items-center justify-between">
                  <div className="h-8 w-40 bg-surface-secondary rounded" />
                  <div className="h-8 w-40 bg-surface-secondary rounded" />
                </div>
              </div>
            )}
            <div className={cn('mx-auto px-6 lg:px-12 py-12 lg:py-16', contentMaxW)}>
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 -ml-2 text-fg-secondary hover:text-accent transition-colors" aria-label="Toggle sidebar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                  <span className="text-xs text-fg-muted font-medium hidden sm:inline">{systemTitle} / {chapter.meta.title}</span>
                </div>
                <div className="hidden sm:flex items-center gap-px">
                  <CopyButton content={content} />
                  <ReadingToolbar />
                  <button onClick={() => { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); }}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 text-fg-muted hover:text-accent" title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {fullscreen ? (
                        <><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></>
                      ) : (
                        <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chapter Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Chapter {chapter.meta.order}</span>
                  <span className="text-[10px] text-fg-muted">·</span>
                  <span className="text-[10px] font-medium text-fg-muted uppercase tracking-wider">{language}</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 leading-tight text-fg">{chapter.meta.title}</h1>
              </div>

              {/* Markdown Content */}
              <div>
                <article
                  style={{ fontSize: articleFontSize, lineHeight: articleLineHeight }}
                  className={cn(
                    'prose max-w-none prose-headings:font-bold prose-headings:tracking-tight',
                    'prose-h2:text-[1.75rem] lg:prose-h2:text-[2rem] prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight prose-h2:scroll-mt-20',
                    'prose-h3:text-[1.25rem] lg:prose-h3:text-[1.375rem] prose-h3:mt-10 prose-h3:mb-4 prose-h3:scroll-mt-20',
                    'prose-p:mb-6',
                    'prose-a:font-semibold hover:prose-a:underline decoration-accent underline-offset-2',
                    'prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.875em] prose-code:rounded',
                    'prose-pre:p-0 prose-pre:overflow-x-auto prose-pre:rounded-none prose-pre:bg-transparent',
                    'prose-img:my-10 prose-img:mx-auto prose-img:rounded-none',
                    'prose-strong:font-bold', 'prose-li:mb-2',
                    'prose-blockquote:border-l-[3px] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:my-8',
                    '[&_code]:before:content-none [&_code]:after:content-none',
                    modeClasses,
                    settings.font === 'serif' && 'prose-headings:font-serif',
                  )}
                >
                  <MarkdownRenderer source={bodyContent} codeTheme={settings.codeTheme} />
                </article>
              </div>

              {/* Chapter Navigation */}
              <div className="mt-16 pt-8">
                <div className="flex items-center justify-between">
                  {prevChapter ? (
                    <button onClick={() => navigateToChapter(prevChapter.slug)} className="group text-left cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:-translate-x-0.5 transition-transform">
                          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        <div className="text-left">
                          <div className="text-[9px] text-fg-muted uppercase tracking-wider">Previous</div>
                          <div className="text-sm">{prevChapter.title}</div>
                        </div>
                      </div>
                    </button>
                  ) : <div />}
                  {nextChapter ? (
                    <button onClick={() => navigateToChapter(nextChapter.slug)} className="group text-right cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                        <div>
                          <div className="text-[9px] text-fg-muted uppercase tracking-wider">Next</div>
                          <div className="text-sm">{nextChapter.title}</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-0.5 transition-transform">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <a href={`/systems/${slug}`} className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Complete
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar — Lesson Outline (sticky on desktop) ── */}
        {isNavigating ? (
          <aside className="hidden xl:block w-72 shrink-0">
            <div className="sticky top-10 h-screen overflow-y-auto pr-8 animate-pulse">
              <div className="h-3 w-28 bg-surface-secondary rounded mb-5" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-surface-secondary rounded" />
                <div className="h-4 w-4/5 bg-surface-secondary rounded" />
                <div className="h-4 w-3/4 bg-surface-secondary rounded" />
                <div className="h-4 w-5/6 bg-surface-secondary rounded" />
                <div className="h-4 w-full bg-surface-secondary rounded" />
              </div>
            </div>
          </aside>
        ) : headings.length > 0 && (
          <aside className="hidden xl:block w-72 shrink-0">
            <div className="sticky top-10 h-screen overflow-y-auto pr-8">
              <LessonOutline
                headings={headings}
                activeId={activeHeading}
                onSelect={(id) => {
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              />
            </div>
          </aside>
        )}

        {/* Back to top */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-6 z-40 w-10 h-10 flex items-center justify-center bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.1)] text-fg-muted hover:text-accent transition-all duration-200"
          aria-label="Back to top">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>

      {/* ── Mobile Nav ── */}
      <div className="fixed bottom-4 right-4 z-50 sm:hidden">
        <MobileNav items={mobileItems} activeId="" onNavigate={handleMobileNav} />
      </div>

      {/* ── Mobile Settings Panel ── */}
      <AnimatePresence>
        {mobileSettingsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 sm:hidden"
              onClick={() => setMobileSettingsOpen(false)}
            />
            <div className="sm:hidden relative z-50">
              <MobileSettingsPanel onClose={() => setMobileSettingsOpen(false)} />
            </div>
          </>
        )}
      </AnimatePresence>
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
