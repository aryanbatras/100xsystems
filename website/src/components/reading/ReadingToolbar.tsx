/**
 * ## ReadingToolbar
 *
 * Floating toolbar for customizing reading experience — font size, line height,
 * reading mode (light/sepia/dark), and font family.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { useReadingSettings, type ReadingFontSize, type ReadingLineHeight, type ReadingMode, type ReadingFont } from '@/lib/reading-context';
import { cn } from '@/application/lib/utils';

const FONT_SIZES: { key: ReadingFontSize; label: string; className: string }[] = [
  { key: 'small', label: 'S', className: 'text-sm' },
  { key: 'medium', label: 'M', className: 'text-base' },
  { key: 'large', label: 'L', className: 'text-lg' },
  { key: 'xlarge', label: 'XL', className: 'text-xl' },
];

const LINE_HEIGHTS: { key: ReadingLineHeight; label: string; value: string }[] = [
  { key: 'tight', label: 'Tight', value: '1.4' },
  { key: 'normal', label: 'Normal', value: '1.6' },
  { key: 'relaxed', label: 'Relaxed', value: '1.8' },
  { key: 'wide', label: 'Wide', value: '2.0' },
];

const MODES: { key: ReadingMode; label: string; bg: string; text: string }[] = [
  { key: 'light', label: 'Light', bg: 'bg-white', text: 'text-fg' },
  { key: 'sepia', label: 'Sepia', bg: 'bg-amber-50', text: 'text-amber-900' },
  { key: 'dark', label: 'Dark', bg: 'bg-slate-900', text: 'text-slate-100' },
];

const FONTS: { key: ReadingFont; label: string; className: string }[] = [
  { key: 'sans', label: 'Sans', className: 'font-sans' },
  { key: 'serif', label: 'Serif', className: 'font-serif' },
  { key: 'mono', label: 'Mono', className: 'font-mono' },
];

export function ReadingToolbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { settings, setFontSize, setLineHeight, setMode, setFont, resetDefaults } = useReadingSettings();

  return (
    <div className={cn('relative', className)}>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent bg-white border border-border hover:border-accent transition-all duration-200"
        title="Reading settings"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        Read
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-72 bg-white border border-border shadow-lg p-5 space-y-5">
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
                      : 'bg-surface-secondary text-fg-secondary hover:bg-accent/10'
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
                      : 'bg-surface-secondary text-fg-secondary hover:bg-accent/10'
                  )}
                  title={`Line height: ${h.value}`}
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
                    'flex-1 py-2 text-xs font-semibold transition-all duration-150 border',
                    settings.mode === m.key
                      ? 'border-accent bg-accent text-white'
                      : 'border-border bg-surface-secondary text-fg-secondary hover:border-accent'
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
                    'flex-1 py-2 text-xs font-semibold transition-all duration-150',
                    settings.font === f.key
                      ? 'bg-accent text-white'
                      : 'bg-surface-secondary text-fg-secondary hover:bg-accent/10'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

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
