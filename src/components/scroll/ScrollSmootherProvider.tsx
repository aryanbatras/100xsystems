import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function ScrollSmootherProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        smoothTouch: 0.15,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: false
      });

      const handleRouteChange = () => {
        smoother.scrollTo(0, true);
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        smoother.kill();
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  return <>{children}</>;
}
