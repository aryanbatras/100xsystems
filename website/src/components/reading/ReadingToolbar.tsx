/**
 * ## ReadingToolbar
 *
 * Borderless reading customization toolbar — font size, line height,
 * reading mode (light/sepia/dark), and font family.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { useReadingSettings, type ReadingFontSize, type ReadingLineHeight, type ReadingMode, type ReadingFont } from '@/lib/reading-context';
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
  { key: 'dark', label: 'Dark' },
];

const FONTS: { key: ReadingFont; label: string }[] = [
  { key: 'sans', label: 'Sans' },
  { key: 'serif', label: 'Serif' },
  { key: 'mono', label: 'Mono' },
];

export function ReadingToolbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { settings, setFontSize, setLineHeight, setMode, setFont, resetDefaults } = useReadingSettings();

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
        Read
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-72 bg-white shadow-lg border border-gray-200 p-5 space-y-5">
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

          {/* Reading Mode */}
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
            <div className="flex gap-1">
              {FONTS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFont(f.key)}
                  className={cn(
                    'flex-1 py-2 text-xs font-semibold transition-all duration-150',
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
