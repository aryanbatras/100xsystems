/**
 * ## ReadingToolbar
 *
 * Borderless reading customization panel — font size, line height, reading mode,
 * font family, code theme, content width, and fullscreen.
 *
 * @packageDocumentation
 */

'use client';

import { useState, useCallback } from 'react';
import {
  useReadingSettings,
  type ReadingFontSize,
  type ReadingLineHeight,
  type ReadingMode,
  type ReadingFont,
  type CodeTheme,
  type ContentWidth,
} from '@/lib/reading-context';
import { cn } from '@/application/lib/utils';

const FONT_SIZES: { key: ReadingFontSize; label: string }[] = [
  { key: 'small', label: 'S' },
  { key: 'medium', label: 'M' },
  { key: 'large', label: 'L' },
  { key: 'xlarge', label: 'XL' },
];

const LINE_HEIGHTS: { key: ReadingLineHeight; label: string }[] = [
  { key: 'tight', label: 'Tight' },
  { key: 'normal', label: 'Normal' },
  { key: 'relaxed', label: 'Relaxed' },
  { key: 'wide', label: 'Wide' },
];

const MODES: { key: ReadingMode; label: string }[] = [
  { key: 'light', label: 'Light' },
  { key: 'sepia', label: 'Sepia' },
];

const FONTS: { key: ReadingFont; label: string }[] = [
  { key: 'system-ui', label: 'System UI' },
  { key: 'inter', label: 'Inter' },
  { key: 'charter', label: 'Charter' },
  { key: 'atkinson', label: 'Atkinson' },
  { key: 'open-dyslexic', label: 'OpenDyslexic' },
];

const CODE_THEMES: { key: CodeTheme; label: string }[] = [
  { key: 'oneLight', label: 'One Light' },
  { key: 'github', label: 'GitHub' },
  { key: 'coy', label: 'Coy' },
];

const CONTENT_WIDTHS: { key: ContentWidth; label: string }[] = [
  { key: 'wide', label: 'Wide' },
  { key: 'wider', label: 'Wider' },
  { key: 'widest', label: 'Widest' },
];

export function ReadingToolbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const {
    settings,
    setFontSize,
    setLineHeight,
    setMode,
    setFont,
    setCodeTheme,
    setContentWidth,
    resetDefaults,
  } = useReadingSettings();

  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {}
  }, []);

  return (
    <div className={cn('relative', className)}>
      {/* Toggle Button — borderless */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200',
          open ? 'text-accent' : 'text-fg-muted hover:text-accent'
        )}
        title="Reading settings"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        Settings
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-80 bg-white shadow-lg border border-gray-200 p-5 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Font Size */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Font Size</p>
            <div className="flex gap-1">
              {FONT_SIZES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setFontSize(s.key)}
                  className={cn(
                    'flex-1 py-2 text-xs font-semibold transition-all duration-150',
                    settings.fontSize === s.key
                      ? 'bg-accent text-white'
                      : 'text-fg-secondary hover:text-accent'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Line Height */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Line Height</p>
            <div className="flex gap-1">
              {LINE_HEIGHTS.map((h) => (
                <button
                  key={h.key}
                  onClick={() => setLineHeight(h.key)}
                  className={cn(
                    'flex-1 py-2 text-xs font-semibold transition-all duration-150',
                    settings.lineHeight === h.key
                      ? 'bg-accent text-white'
                      : 'text-fg-secondary hover:text-accent'
                  )}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reading Mode — light only */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Mode</p>
            <div className="flex gap-1">
              {MODES.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={cn(
                    'flex-1 py-2 text-xs font-semibold transition-all duration-150',
                    settings.mode === m.key
                      ? 'bg-accent text-white'
                      : 'text-fg-secondary hover:text-accent'
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Font</p>
            <div className="flex flex-wrap gap-1">
              {FONTS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFont(f.key)}
                  className={cn(
                    'px-3 py-2 text-xs font-semibold transition-all duration-150',
                    settings.font === f.key
                      ? 'bg-accent text-white'
                      : 'text-fg-secondary hover:text-accent'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Code Theme */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Code Theme</p>
            <div className="flex gap-1">
              {CODE_THEMES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setCodeTheme(t.key)}
                  className={cn(
                    'flex-1 py-2 text-xs font-semibold transition-all duration-150',
                    settings.codeTheme === t.key
                      ? 'bg-accent text-white'
                      : 'text-fg-secondary hover:text-accent'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Width */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Content Width</p>
            <div className="flex gap-1">
              {CONTENT_WIDTHS.map((w) => (
                <button
                  key={w.key}
                  onClick={() => setContentWidth(w.key)}
                  className={cn(
                    'flex-1 py-2 text-xs font-semibold transition-all duration-150',
                    settings.contentWidth === w.key
                      ? 'bg-accent text-white'
                      : 'text-fg-secondary hover:text-accent'
                  )}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="w-full py-2 text-xs font-semibold flex items-center justify-center gap-2 text-fg-secondary hover:text-accent transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {fullscreen ? (
                <>
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </>
              ) : (
                <>
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </>
              )}
            </svg>
            {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>

          {/* Reset */}
          <button
            onClick={resetDefaults}
            className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-fg-muted hover:text-accent transition-colors"
          >
            Reset to defaults
          </button>
        </div>
      )}
    </div>
  );
}
