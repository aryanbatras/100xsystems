'use client';

import { motion } from 'motion/react';

export function HomeSection3() {
  return (
    <section className="py-24 px-4 bg-surface-secondary border-y border-border">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-xs tracking-[0.15em] uppercase text-fg-muted font-medium">
            Where we are
          </span>
          <h2 className="text-4xl md:text-[3.25rem] font-bold text-fg tracking-tight leading-tight">
            100XSystems is a brand.
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed">
            We are a growing community of engineers who think in systems. 
            We build products. We build platforms. We build the ecosystem that helps engineers 
            become 100x. But we don&apos;t spoon-feed. You build yourself.
          </p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        >
          <div className="relative w-full max-w-[400px] aspect-square">
            <img
              src="/assets/cubix/images/cubix-with-half-joined-rubik-cube-white-purple-cubes.png"
              alt="Cubix character with rubik cube"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
