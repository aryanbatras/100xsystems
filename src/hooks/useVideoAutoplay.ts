import { useEffect, useRef } from 'react';

export const useVideoAutoplay = (videoRef: React.RefObject<HTMLVideoElement | null> | null) => {
  useEffect(() => {
    if(videoRef === null) return;
    const video = videoRef?.current;
    if (!video) return;

    const attemptVideoPlay = () => {
      if (video && video.paused) {
        video.play().catch(() => {
          // Silently handle Safari's autoplay restrictions
        });
      }
    };

    // Try to play immediately
    attemptVideoPlay();
    
    // Try when video is loaded
    video.addEventListener('loadeddata', attemptVideoPlay);
    
    // Try on user interaction
    const handleUserInteraction = () => {
      attemptVideoPlay();
    };
    
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });
    
    // Try when video becomes visible
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
