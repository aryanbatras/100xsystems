'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function HomeCubix() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: cube-learning video */}
        <motion.div
          className="relative w-full"
          style={{ aspectRatio: '4/3' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <video
            ref={videoRef}
            src="/assets/cubix/video/cube-learning.mp4"
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="auto"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium">
            Meet Cubix
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-fg tracking-tight uppercase leading-tight">
            Curious by nature.
            <br />
            <span className="text-accent">Built by learning.</span>
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-fg-secondary leading-relaxed text-justify">
              Cubix is <strong className="text-fg font-semibold">curious</strong>. Cubix asks questions before writing code.
              Cubix reads source code, breaks things, and rebuilds them better.
            </p>
            <p className="text-base text-fg-secondary leading-relaxed text-justify">
              Cubix is <strong className="text-fg font-semibold">not afraid of complexity</strong>. Cubix simplifies it.
              Cubix shares what it learns. Cubix teaches others.
              Cubix is every engineer who chooses <strong className="text-fg font-semibold">understanding over shortcuts</strong>.
            </p>
            <p className="text-base text-fg-secondary leading-relaxed text-justify">
              Cubix is <strong className="text-fg font-semibold">not perfect</strong>. Cubix makes mistakes.
              But Cubix keeps building — and that&apos;s what matters.
              You can build alongside Cubix. Start with any roadmap.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
