'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
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
import type { KnowledgeItem, KnowledgeDomain } from '@/lib/mdx';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface KnowledgeItemDetailProps {
  item: KnowledgeItem;
  domain: KnowledgeDomain;
  sidebarItems: KnowledgeItem[];
}

const domainConfig: Record<string, { label: string; order: number }> = {
  principles: { label: 'Principles', order: 1 },
  patterns: { label: 'Patterns', order: 2 },
  tools: { label: 'Tools', order: 3 },
  technologies: { label: 'Technologies', order: 4 },
};

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-accent text-white',
  Intermediate: 'bg-accent-yellow text-black',
  Advanced: 'bg-fg text-white',
};

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
    <div className="flex flex-col">
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-fg-muted mb-5 block">
        Lesson content
      </span>

      <div className="flex flex-col space-y-1.5">
        {items.map((item) => (
          <OutlineRow
            key={item.id}
            item={item}
            isActive={item.id === activeId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

/** Single outline row */
function OutlineRow({
  item,
  isActive,
  onSelect,
}: {
  item: OutlineItem;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onSelect(item.id)}
      className={cn(
        'cursor-pointer text-sm leading-snug py-2 rounded-sm transition-colors duration-150',
        item.indent,
        isActive
          ? 'text-fg font-semibold'
          : 'text-fg-secondary hover:bg-accent hover:text-white',
      )}
    >
      <span className="block truncate px-2">{item.text}</span>
    </div>
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

function KnowledgeReadingContent({ item, domain, sidebarItems }: KnowledgeItemDetailProps) {
  const { settings } = useReadingSettings();
  const router = useRouter();
  const config = domainConfig[domain] || { label: domain, order: 999 };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: true,
      normalizeScroll: true,
    });
    return () => { ScrollSmoother.get()?.kill(); };
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [fullscreen, setFullscreen] = useState(false);
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);

  // Find prev/next items
  const currentIndex = sidebarItems.findIndex((s) => s.slug === item.slug);
  const prevItem = currentIndex > 0 ? sidebarItems[currentIndex - 1] : null;
  const nextItem = currentIndex < sidebarItems.length - 1 ? sidebarItems[currentIndex + 1] : null;

  // MobileNav items
  const mobileItems: MobileNavItem[] = useMemo(() => [
    { id: 'settings', label: 'Settings', iconName: 'settings' },
    { id: 'copy', label: 'Copy', iconName: 'copy' },
    { id: 'fullscreen', label: fullscreen ? 'Exit' : 'Fullscreen', iconName: fullscreen ? 'minimize' : 'maximize' },
  ] as MobileNavItem[], [fullscreen]);

  const handleMobileNav = useCallback((navItem: MobileNavItem) => {
    if (navItem.id === 'settings') {
      setMobileSettingsOpen(prev => !prev);
    } else if (navItem.id === 'fullscreen') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else if (navItem.id === 'copy') {
      navigator.clipboard.writeText(item.content).catch(() => {});
    }
  }, [item.content]);

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
  }, [item.content]);

  // Fullscreen listener
  useEffect(() => {
    const handleFSChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  const sidebarNavItems: SidebarNavItem[] = useMemo(() => sidebarItems.map(si => ({
    id: si.slug,
    label: si.title,
    href: `/${domain}/read/${si.slug}`,
    iconName: 'bookmark',
  })), [sidebarItems, domain]);

  const navigateToItem = useCallback((slug: string) => {
    setSidebarOpen(false);
    router.push(`/${domain}/read/${slug}`);
  }, [domain, router]);

  const handleSidebarNav = useCallback((item: SidebarNavItem) => {
    navigateToItem(item.id);
  }, [navigateToItem]);

  // Strip the first # heading from markdown since it's already shown in the header
  const bodyContent = useMemo(() => item.content.replace(/^\s*# .+(\n|$)/, ''), [item.content]);

  const headings = useMemo(() => extractHeadings(item.content), [item.content]);
  const contentMaxW = contentWidthClass(settings.contentWidth);
  const fontClass = fontFamilyClass(settings.font);
  const articleFontSize = fontSizeRem(settings.fontSize);
  const articleLineHeight = lineHeightValue(settings.lineHeight);

  // Build mode-specific prose classes
  const modeClasses = settings.mode === 'light'
    ? 'prose-headings:text-fg prose-p:text-fg prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-code:text-pink-600 prose-code:bg-pink-50 prose-a:text-accent prose-strong:text-fg prose-li:text-fg prose-hr:border-gray-200'
    : 'prose-headings:text-amber-900 prose-p:text-amber-800 prose-blockquote:border-l-amber-600 prose-blockquote:bg-amber-100/40 prose-code:text-amber-900 prose-code:bg-amber-100 prose-a:text-amber-700 prose-strong:text-amber-900 prose-li:text-amber-800 prose-hr:border-amber-200';

  return (
    <>
      {/* ── Fixed sidebars (outside smooth-wrapper) ── */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 transition-transform duration-300',
          'shrink-0',
        )}
      >
        <SidebarNav
          items={sidebarNavItems}
          activeId={item.slug}
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

      {headings.length > 0 && (
        <aside className="fixed right-0 top-0 h-screen z-30 hidden xl:block w-72 bg-white">
          <div className="h-full overflow-y-auto pr-8 pl-6 pt-10">
            <LessonOutline
              headings={headings}
              activeId={activeHeading}
              onSelect={(id) => {
                ScrollSmoother.get()?.scrollTo(`#${id}`, true, 'top top');
              }}
            />
          </div>
        </aside>
      )}

      {/* ── Smooth Wrapper (main scrollable content only) ── */}
      <div id="smooth-wrapper" className="relative z-10">
        <div id="smooth-content">
          <div className={cn('min-h-screen lg:ml-[60px] xl:mr-72', settings.mode === 'sepia' ? 'bg-amber-50' : 'bg-white', fontClass)}>
            <div className={cn('mx-auto px-6 lg:px-12 py-12 lg:py-16', contentMaxW)}>
              <div className="flex items-center justify-between mb-8">
                <a href="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <img
                    src="/assets/cubix/base/cubix-brand-logo.png"
                    alt="Cubix"
                    className="h-8 w-auto lg:h-10"
                  />
                  <span className="text-lg lg:text-xl font-extrabold text-fg tracking-tight select-none uppercase">
                    100XSYSTEMS
                  </span>
                </a>
                <nav className="hidden sm:flex items-center gap-1">
                  <Link href="/systems" className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-fg-secondary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                    Systems
                  </Link>
                  <Link href="/principles" className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-fg-secondary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                    Principles
                  </Link>
                  <Link href="/patterns" className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-fg-secondary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                    Patterns
                  </Link>
                  <Link href="/tools" className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-fg-secondary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                    Tools
                  </Link>
                  <Link href="/technologies" className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-fg-secondary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                    Technologies
                  </Link>
                  <Link href="/search" className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-fg-secondary hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                    Search
                  </Link>
                </nav>
              </div>

              {/* Top Bar */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 -ml-2 text-fg-secondary hover:text-accent transition-colors" aria-label="Toggle sidebar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                  <a href={`/${domain}`} className="text-xs text-fg-muted font-medium hidden sm:inline hover:text-accent transition-colors">{config.label}</a>
                  <span className="text-xs text-fg-muted hidden sm:inline">/</span>
                  <span className="text-xs text-fg font-medium hidden sm:inline">{item.title}</span>
                </div>
                <div className="hidden sm:flex items-center gap-px">
                  <CopyButton content={item.content} />
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

              {/* Content Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  {item.difficulty && (
                    <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2.5 py-1', difficultyStyles[item.difficulty])}>
                      {item.difficulty}
                    </span>
                  )}
                  <span className="text-[10px] text-fg-muted">·</span>
                  <span className="text-[10px] font-medium text-fg-muted uppercase tracking-wider">{config.label}</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 leading-tight text-fg">{item.title}</h1>
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 bg-surface-secondary text-fg-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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

              {/* Navigation */}
              <div className="mt-16 pt-8">
                <div className="flex items-center justify-between">
                  {prevItem ? (
                    <button onClick={() => navigateToItem(prevItem.slug)} className="group text-left cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:-translate-x-0.5 transition-transform">
                          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        <div className="text-left">
                          <div className="text-[9px] text-fg-muted uppercase tracking-wider">Previous</div>
                          <div className="text-sm">{prevItem.title}</div>
                        </div>
                      </div>
                    </button>
                  ) : <div />}
                  {nextItem ? (
                    <button onClick={() => navigateToItem(nextItem.slug)} className="group text-right cursor-pointer">
                      <div className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                        <div>
                          <div className="text-[9px] text-fg-muted uppercase tracking-wider">Next</div>
                          <div className="text-sm">{nextItem.title}</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-0.5 transition-transform">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <a href={`/${domain}`} className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Back to {config.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed elements (outside smooth-wrapper) ── */}
      <button onClick={() => ScrollSmoother.get()?.scrollTo(0, true, 'top')}
        className="fixed bottom-20 right-6 z-40 w-10 h-10 flex items-center justify-center bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.1)] text-fg-muted hover:text-accent transition-all duration-200"
        aria-label="Back to top">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
        </svg>
      </button>

      <div className="fixed bottom-4 right-4 z-50 sm:hidden">
        <MobileNav items={mobileItems} activeId="" onNavigate={handleMobileNav} />
      </div>

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
    </>
  );
}

export function KnowledgeItemDetail(props: KnowledgeItemDetailProps) {
  return (
    <ReadingProvider>
      <KnowledgeReadingContent {...props} />
    </ReadingProvider>
  );
}
