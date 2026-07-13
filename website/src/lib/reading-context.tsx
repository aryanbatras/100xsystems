/**
 * ## Reading Context
 *
 * Provides reading customization state — font size, line height, reading mode (light/sepia/dark),
 * and font family — for the chapter reading experience.
 *
 * @packageDocumentation
 */

'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type ReadingFontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ReadingLineHeight = 'tight' | 'normal' | 'relaxed' | 'wide';
export type ReadingMode = 'light' | 'sepia' | 'dark';
export type ReadingFont = 'sans' | 'serif' | 'mono';

export interface ReadingSettings {
  fontSize: ReadingFontSize;
  lineHeight: ReadingLineHeight;
  mode: ReadingMode;
  font: ReadingFont;
}

interface ReadingContextValue {
  settings: ReadingSettings;
  setFontSize: (size: ReadingFontSize) => void;
  setLineHeight: (height: ReadingLineHeight) => void;
  setMode: (mode: ReadingMode) => void;
  setFont: (font: ReadingFont) => void;
  resetDefaults: () => void;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 'medium',
  lineHeight: 'relaxed',
  mode: 'light',
  font: 'sans',
};

const ReadingContext = createContext<ReadingContextValue | null>(null);

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cloudcode-reading-settings');
      if (saved) {
        const parsed = JSON.parse(saved) as ReadingSettings;
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch {}
  }, []);

  // Persist settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cloudcode-reading-settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const setFontSize = (fontSize: ReadingFontSize) => setSettings((s) => ({ ...s, fontSize }));
  const setLineHeight = (lineHeight: ReadingLineHeight) => setSettings((s) => ({ ...s, lineHeight }));
  const setMode = (mode: ReadingMode) => setSettings((s) => ({ ...s, mode }));
  const setFont = (font: ReadingFont) => setSettings((s) => ({ ...s, font }));
  const resetDefaults = () => setSettings(DEFAULT_SETTINGS);

  return (
    <ReadingContext.Provider value={{ settings, setFontSize, setLineHeight, setMode, setFont, resetDefaults }}>
      {children}
    </ReadingContext.Provider>
  );
}

export function useReadingSettings() {
  const ctx = useContext(ReadingContext);
  if (!ctx) throw new Error('useReadingSettings must be used within a ReadingProvider');
  return ctx;
}
