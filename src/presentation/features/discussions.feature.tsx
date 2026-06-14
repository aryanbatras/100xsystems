'use client';

import Giscus from '@giscus/react';
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
/**
 * ## Discussions
 *
 * Discussions feature module.
 * Contains all components, types, and logic for the discussions domain.
 *
 * @packageDocumentation
 * @module discussions
 */

;



// ============================================================
// Source: DiscussionProvider.tsx
// ============================================================
interface DiscussionContextType {
  isEnabled: boolean;
  isLoading: boolean;
  error: string | null;
  commentCount: number;
  setCommentCount: (count: number) => void;
  setError: (error: string | null) => void;
}

const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined);

interface DiscussionProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

export function DiscussionProvider({ children, enabled = true }: DiscussionProviderProps) {
  const [isEnabled] = useState(enabled);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentCount, setCommentCount] = useState(0);

  const value: DiscussionContextType = {
    isEnabled,
    isLoading,
    error,
    commentCount,
    setCommentCount,
    setError,
  };

  return (
    <DiscussionContext.Provider value={value}>
      {children}
    </DiscussionContext.Provider>
  );
}

export function useDiscussion() {
  const context = useContext(DiscussionContext);
  if (context === undefined) {
    throw new Error('useDiscussion must be used within a DiscussionProvider');
  }
  return context;
}


// ============================================================
// Source: GiscusComments.tsx
// ============================================================
interface GiscusCommentsProps {
  title: string;
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  theme?: 'light' | 'dark' | 'preferred_color_scheme' | 'noborder_light' | 'noborder_dark';
  lang?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

export function GiscusComments({
  title,
  repo = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}` || '100xsystems/100xsystems-discussions',
  repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
  category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General',
  categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
  theme = 'noborder_light',
  lang = 'en',
  loading = 'lazy',
  className = ''
}: GiscusCommentsProps) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'preferred_color_scheme' | 'noborder_light' | 'noborder_dark'>(theme);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(loading === 'eager');
  const containerRef = useRef<HTMLDivElement>(null);

  // Theme management - simplified for noborder themes
  useEffect(() => {
    if (theme === 'preferred_color_scheme') {
      const handleThemeChange = () => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setCurrentTheme(isDarkMode ? 'dark' : 'light');
      };

      handleThemeChange();
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleThemeChange);
      
      return () => mediaQuery.removeEventListener('change', handleThemeChange);
    } else {
      setCurrentTheme(theme);
    }
  }, [theme]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, shouldLoad]);

  // Memoized configuration to prevent unnecessary re-renders
  const giscusConfig = useCallback(() => ({
    id: "comments",
    repo: repo as `${string}/${string}`,
    repoId,
    category,
    categoryId,
    mapping: "title" as const,
    term: title,
    reactionsEnabled: "1" as const,
    emitMetadata: "0" as const,
    inputPosition: "top" as const,
    theme: currentTheme,
    lang,
    loading: "lazy" as const
  }), [repo, repoId, category, categoryId, title, currentTheme, lang]);

  if (!repoId || !categoryId) {
    return (
      <div className={`comments-placeholder ${className}`} ref={containerRef}>
        <p>Comments are not configured yet. Please check back later.</p>
      </div>
    );
  }

  const config = giscusConfig();

  return (
    <div className={`giscus-container ${className}`} ref={containerRef}>
      {shouldLoad ? (
        <Giscus {...config} />
      ) : (
        <div className="comments-loading-placeholder">
          <p>💬 Comments will load when you scroll here</p>
        </div>
      )}
    </div>
  );
}
