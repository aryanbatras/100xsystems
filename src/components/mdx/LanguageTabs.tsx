/**
 * ## LanguageTabs
 *
 * A tabbed component for MDX content that allows users to switch between
 * programming language implementations within a single chapter.
 * Uses localStorage to persist the user's language preference.
 *
 * @packageDocumentation
 */

'use client';

import React, { useState, useEffect, useRef, createContext, useContext, useCallback, type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

// ─── Context for persisting language preference ─────────────────────

interface LanguageContextType {
  activeLanguage: string;
  setActiveLanguage: (lang: string) => void;
  registerLanguage: (lang: string, label: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  activeLanguage: '',
  setActiveLanguage: () => {},
  registerLanguage: () => {},
});

export function useLanguageContext() {
  return useContext(LanguageContext);
}

// ─── Language icon mapping ─────────────────────────────────────────

const LANG_ICONS: Record<string, string> = {
  javascript: '🟨',
  typescript: '🟦',
  python: '🐍',
  java: '☕',
  rust: '🦀',
  go: '🔷',
  cpp: '⚡',
  csharp: '💻',
  ruby: '💎',
  swift: '🍎',
  kotlin: '🅺',
};

const LANG_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  rust: 'Rust',
  go: 'Go',
  cpp: 'C++',
  csharp: 'C#',
  ruby: 'Ruby',
  swift: 'Swift',
  kotlin: 'Kotlin',
};

function labelForLanguage(lang: string): string {
  return LANG_LABELS[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
}

// ─── LanguageTabs Provider ─────────────────────────────────────────

interface LanguageTabsProps {
  children: ReactNode;
  className?: string;
  defaultLanguage?: string;
}

export function LanguageTabs({ children, className, defaultLanguage }: LanguageTabsProps) {
  // Use ref to avoid re-render loop when languages register
  const availableLanguagesRef = useRef<Set<string>>(new Set());
  const languageLabelsRef = useRef<Map<string, string>>(new Map());
  const [activeLanguage, setActiveLanguageState] = useState<string>('');
  const [renderTick, setRenderTick] = useState(0); // Force re-render when languages change

  const registerLanguage = useCallback((lang: string, label: string) => {
    const prevSize = availableLanguagesRef.current.size;
    availableLanguagesRef.current.add(lang);
    languageLabelsRef.current.set(lang, label);
    // Only trigger re-render if a new language was actually added
    if (availableLanguagesRef.current.size !== prevSize) {
      setRenderTick((t) => t + 1);
    }
  }, []);

  const setActiveLanguage = useCallback((lang: string) => {
    setActiveLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  }, []);

  // Restore preference from localStorage
  useEffect(() => {
    const langs = Array.from(availableLanguagesRef.current);
    if (langs.length === 0) return;

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-language');
      if (saved && langs.includes(saved)) {
        setActiveLanguageState(saved);
      } else if (defaultLanguage && langs.includes(defaultLanguage)) {
        setActiveLanguageState(defaultLanguage);
      } else {
        setActiveLanguageState(langs[0]);
      }
    }
  }, [defaultLanguage, renderTick]); // Only re-run when renderTick changes (new language added)

  const langs = Array.from(availableLanguagesRef.current);
  const showTabBar = langs.length > 1;

  return (
    <LanguageContext.Provider
      value={{ activeLanguage, setActiveLanguage, registerLanguage }}
    >
      <div className={cn('my-8 border border-border', className)}>
        {/* Tab Bar */}
        {showTabBar && (
          <div className="flex border-b border-border bg-surface-secondary overflow-x-auto">
            {langs.map((lang) => {
              const isActive = activeLanguage === lang;
              return (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-150 whitespace-nowrap',
                    isActive
                      ? 'bg-white text-accent border-t-2 border-accent -mb-[1px]'
                      : 'text-fg-secondary hover:text-fg hover:bg-white/50',
                  )}
                >
                  <span className="text-sm">{LANG_ICONS[lang] || '📄'}</span>
                  <span>{languageLabelsRef.current.get(lang) || labelForLanguage(lang)}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </LanguageContext.Provider>
  );
}

// ─── TabItem ────────────────────────────────────────────────────────

interface TabItemProps {
  value: string;
  label: string;
  children: ReactNode;
}

export function TabItem({ value, label, children }: TabItemProps) {
  const { activeLanguage, registerLanguage } = useLanguageContext();

  // Register this language on mount
  useEffect(() => {
    registerLanguage(value, label);
  }, [value, label, registerLanguage]);

  const isActive = activeLanguage === value;

  if (!isActive) return null;

  return <div>{children}</div>;
}
