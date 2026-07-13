/**
 * ## Video Autoplay Domain: React Hooks
 *
 * Hook for handling video autoplay with Safari compatibility.
 *
 * @packageDocumentation
 */

import { useEffect } from 'react';

/**
 * Hook for attempting autoplay on video elements.
 *
 * @remarks
 * Uses multiple strategies: immediate play attempt, play on loadeddata,
 * play on user interaction (click, touch, scroll), and IntersectionObserver
 * for visibility-based playback. Silently handles autoplay restrictions.
 *
 * @param videoRef - Ref to the video element
 *
 * @public
 */
export const useVideoAutoplay = (videoRef: React.RefObject<HTMLVideoElement | null> | null) => {
  useEffect(() => {
    if (videoRef === null) return;
    const video = videoRef?.current;
    if (!video) return;

    const attemptVideoPlay = () => {
      if (video && video.paused) {
        video.play().catch(() => {
          // Silently handle Safari's autoplay restrictions
        });
      }
    };

    attemptVideoPlay();
    video.addEventListener('loadeddata', attemptVideoPlay);

    const handleUserInteraction = () => {
      attemptVideoPlay();
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          attemptVideoPlay();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(video);

    return () => {
      video.removeEventListener('loadeddata', attemptVideoPlay);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      observer.disconnect();
    };
  }, [videoRef]);
};
