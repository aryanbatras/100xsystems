/**
 * ## Loading Screen Domain: React Hooks
 *
 * Hook for managing the page loading screen with route transitions.
 *
 * @packageDocumentation
 */

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hook for managing a full-page loading screen on route changes.
 *
 * @remarks
 * Shows a loading screen during initial page load and subsequent
 * route transitions. Auto-hides after 2 seconds or on route change complete.
 *
 * Skips the loader for client-side chapter-to-chapter navigation within
 * the same system/language (handled by history.pushState + content swap).
 *
 * @returns Loading state and controls
 *
 * @public
 */
export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);

  /** Returns true if the path looks like a chapter page */
  const isChapterPage = (path: string): boolean =>
    /^\/systems\/[^\/]+\/[^\/]+\/chapters\/[^\/]+\/?$/.test(path);

  const hideLoader = () => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return timer;
  };

  const showLoader = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const timer = hideLoader();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Skip loading screen when navigating between chapters within the same system
    // (ChapterPageClient swaps content client-side via history.pushState)
    if (prevPath && isChapterPage(prevPath) && isChapterPage(pathname)) {
      return;
    }

    showLoader();
    const timer = hideLoader();
    return () => clearTimeout(timer);
  }, [pathname]);

  return { isLoading, showLoader, hideLoader };
};
