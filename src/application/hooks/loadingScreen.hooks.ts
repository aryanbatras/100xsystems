/**
 * ## Loading Screen Domain: React Hooks
 *
 * Hook for managing the page loading screen with route transitions.
 *
 * @packageDocumentation
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Hook for managing a full-page loading screen on route changes.
 *
 * @remarks
 * Shows a loading screen during initial page load and subsequent
 * route transitions. Auto-hides after 2 seconds or on route change complete.
 *
 * @returns Loading state and controls
 *
 * @public
 */
export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
    router.events.on('routeChangeStart', showLoader);
    router.events.on('routeChangeComplete', hideLoader);

    return () => {
      router.events.off('routeChangeStart', showLoader);
      router.events.off('routeChangeComplete', hideLoader);
    };
  }, [router.events]);

  return { isLoading, showLoader, hideLoader };
};
