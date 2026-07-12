'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function HomeVideoParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Auto-playing video */}
        <motion.div style={{ y: videoY }} className="relative">
          <div className="relative w-full aspect-square max-w-[500px] mx-auto overflow-hidden border border-border bg-surface-secondary">
            <video
              ref={videoRef}
              src="/assets/cubix/video/cube-video.mp4"
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
        </motion.div>

        {/* Right: Text with parallax */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="flex flex-col gap-6">
          <span className="text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium">
            See it in action
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight">
            Master Rubik Cube&apos;s Software Engineering
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed max-w-lg">
            Watch how Cubix breaks down complex systems into manageable pieces. 
            Each cube represents a concept — together they form complete understanding.
          </p>
          <div className="flex items-center gap-3 text-sm text-fg-muted">
            <div className="w-2 h-2 bg-accent" />
            <span>See how it works in action</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
