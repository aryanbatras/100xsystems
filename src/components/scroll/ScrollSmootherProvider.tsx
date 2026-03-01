import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function ScrollSmootherProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // const smoother = ScrollSmoother.create({
      //   wrapper: "#smooth-wrapper",
      //   content: "#smooth-content",
      //   smooth: 3,
      //   effects: true,
      //   smoothTouch: 0.25
      // });

      // return () => {
      //   smoother.kill();
      // };
    }
  }, []);

  return <>{children}</>;
}
