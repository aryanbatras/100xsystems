/**
 * ## ReadingToolbar
 *
 * Modal dialog for reading customization — font size, line height, reading mode,
 * font family, code theme, content width, and fullscreen.
 *
 * @packageDocumentation
 */

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  { key: 'sans', label: 'Sans' },
  { key: 'serif', label: 'Serif' },
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
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200',
          'text-fg-muted hover:text-accent',
          className,
        )}
        title="Reading settings"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        Settings
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-md bg-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)] p-6 max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-fg">Reading Settings</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 text-fg-muted hover:text-fg transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Font Size */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Font Size</p>
                    <div className="flex gap-1">
                      {FONT_SIZES.map((s) => (
                        <button
                          key={s.key}
                          onClick={() => setFontSize(s.key)}
                          className={cn(
                            'flex-1 py-2.5 text-xs font-semibold transition-all duration-150',
                            settings.fontSize === s.key
                              ? 'bg-accent text-white'
                              : 'text-fg-secondary bg-gray-100 hover:bg-gray-200'
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
                            'flex-1 py-2.5 text-xs font-semibold transition-all duration-150',
                            settings.lineHeight === h.key
                              ? 'bg-accent text-white'
                              : 'text-fg-secondary bg-gray-100 hover:bg-gray-200'
                          )}
                        >
                          {h.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reading Mode */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-2">Mode</p>
                    <div className="flex gap-1">
                      {MODES.map((m) => (
                        <button
                          key={m.key}
                          onClick={() => setMode(m.key)}
                          className={cn(
                            'flex-1 py-2.5 text-xs font-semibold transition-all duration-150',
                            settings.mode === m.key
                              ? 'bg-accent text-white'
                              : 'text-fg-secondary bg-gray-100 hover:bg-gray-200'
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
                    <div className="flex gap-1">
                      {FONTS.map((f) => (
                        <button
                          key={f.key}
                          onClick={() => setFont(f.key)}
                          className={cn(
                            'flex-1 py-2.5 text-xs font-semibold transition-all duration-150',
                            settings.font === f.key
                              ? 'bg-accent text-white'
                              : 'text-fg-secondary bg-gray-100 hover:bg-gray-200'
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
                            'flex-1 py-2.5 text-xs font-semibold transition-all duration-150',
                            settings.codeTheme === t.key
                              ? 'bg-accent text-white'
                              : 'text-fg-secondary bg-gray-100 hover:bg-gray-200'
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
                            'flex-1 py-2.5 text-xs font-semibold transition-all duration-150',
                            settings.contentWidth === w.key
                              ? 'bg-accent text-white'
                              : 'text-fg-secondary bg-gray-100 hover:bg-gray-200'
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
                    className="w-full py-3 text-xs font-semibold flex items-center justify-center gap-2 text-fg-secondary hover:text-accent transition-colors bg-gray-50 hover:bg-gray-100"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {fullscreen ? (
                        <><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></>
                      ) : (
                        <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>
                      )}
                    </svg>
                    {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  </button>

                  {/* Reset */}
                  <div className="pt-2">
                    <button
                      onClick={resetDefaults}
                      className="w-full py-2.5 text-[10px] font-bold uppercase tracking-widest text-fg-muted hover:text-accent transition-colors border border-gray-200"
                    >
                      Reset to defaults
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
