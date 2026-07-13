/**
 * ## Reading Context
 *
 * Provides reading customization state — font size, line height, reading mode,
 * font family, code block theme, and content width — for the chapter reading experience.
 *
 * @packageDocumentation
 */

'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type ReadingFontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ReadingLineHeight = 'tight' | 'normal' | 'relaxed' | 'wide';
export type ReadingMode = 'light' | 'sepia';
export type ReadingFont = 'sans' | 'serif';
export type CodeTheme = 'oneLight' | 'github' | 'coy';
export type ContentWidth = 'wide' | 'wider' | 'widest';

export interface ReadingSettings {
  fontSize: ReadingFontSize;
  lineHeight: ReadingLineHeight;
  mode: ReadingMode;
  font: ReadingFont;
  codeTheme: CodeTheme;
  contentWidth: ContentWidth;
}

interface ReadingContextValue {
  settings: ReadingSettings;
  setFontSize: (size: ReadingFontSize) => void;
  setLineHeight: (height: ReadingLineHeight) => void;
  setMode: (mode: ReadingMode) => void;
  setFont: (font: ReadingFont) => void;
  setCodeTheme: (theme: CodeTheme) => void;
  setContentWidth: (width: ContentWidth) => void;
  resetDefaults: () => void;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 'large',
  lineHeight: 'relaxed',
  mode: 'light',
  font: 'sans',
  codeTheme: 'oneLight',
  contentWidth: 'wider',
};

const ReadingContext = createContext<ReadingContextValue | null>(null);

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cloudcode-reading-settings');
      if (saved) {
        const parsed = JSON.parse(saved) as ReadingSettings;
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cloudcode-reading-settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const setFontSize = (fontSize: ReadingFontSize) => setSettings((s) => ({ ...s, fontSize }));
  const setLineHeight = (lineHeight: ReadingLineHeight) => setSettings((s) => ({ ...s, lineHeight }));
  const setMode = (mode: ReadingMode) => setSettings((s) => ({ ...s, mode }));
  const setFont = (font: ReadingFont) => setSettings((s) => ({ ...s, font }));
  const setCodeTheme = (codeTheme: CodeTheme) => setSettings((s) => ({ ...s, codeTheme }));
  const setContentWidth = (contentWidth: ContentWidth) => setSettings((s) => ({ ...s, contentWidth }));
  const resetDefaults = () => setSettings(DEFAULT_SETTINGS);

  return (
    <ReadingContext.Provider
      value={{
        settings,
        setFontSize,
        setLineHeight,
        setMode,
        setFont,
        setCodeTheme,
        setContentWidth,
        resetDefaults,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}

export function useReadingSettings() {
  const ctx = useContext(ReadingContext);
  if (!ctx) throw new Error('useReadingSettings must be used within a ReadingProvider');
  return ctx;
}

/** Map contentWidth setting to Tailwind max-w class */
export function contentWidthClass(width: ContentWidth): string {
  switch (width) {
    case 'wide': return 'max-w-[720px]';
    case 'wider': return 'max-w-[880px]';
    case 'widest': return 'max-w-[1040px]';
  }
}

/** Map font setting to CSS font-family */
export function fontFamilyClass(font: ReadingFont): string {
  switch (font) {
    case 'sans': return 'font-sans';
    case 'serif': return 'font-serif';
  }
}

/** Get font-size in rem from setting */
export function fontSizeRem(size: ReadingFontSize): string {
  switch (size) {
    case 'small': return '0.875rem';
    case 'medium': return '1rem';
    case 'large': return '1.125rem';
    case 'xlarge': return '1.25rem';
  }
}

/** Get line-height value from setting */
export function lineHeightValue(height: ReadingLineHeight): number {
  switch (height) {
    case 'tight': return 1.4;
    case 'normal': return 1.6;
    case 'relaxed': return 1.8;
    case 'wide': return 2.0;
  }
}
