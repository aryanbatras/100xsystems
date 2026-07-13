'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function HomeVideoParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        {/* Left: Roadmaps image */}
        <motion.div style={{ y: imageY }} className="relative flex">
          <div className="relative w-full flex items-center justify-center">
            <img
              src="/assets/cubix/images/many-cubix-roadmaps-no-bg.png"
              alt="Cubix roadmaps — floating islands of learning"
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Right: Text with parallax */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="flex flex-col gap-6 justify-center">
          <span className="text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium">
            Roadmaps
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight">
            Every path leads to
            <span className="text-accent"> understanding systems.</span>
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed max-w-lg text-justify">
            Each learning path leads to building a complete system.
            Not toy projects. Not boilerplate.
            Real engineering — from distributed databases to browser engines.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
