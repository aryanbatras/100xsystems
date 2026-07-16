'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function HomeJourneyVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100vh] min-h-[600px] overflow-hidden">
      {/* Full-screen background video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/assets/cubix/video/cube-journey.mp4"
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content overlaid on video */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex items-center justify-center text-center px-6"
      >
        <div className="max-w-3xl flex flex-col items-center gap-6">
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/60 font-medium">
            The Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.1]">
            From beginner to{' '}
            <span className="text-accent-yellow">100xsystems Engineer</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
            Every engineer&apos;s journey is unique. Cubix walks the path with you — 
            learning, building, deploying, and growing through systems thinking.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
