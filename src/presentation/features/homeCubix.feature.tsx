'use client';

import { motion } from 'motion/react';

export function HomeCubix() {
  return (
    <section className="py-24 lg:py-32 bg-surface-secondary border-y border-border">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Cubix images */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/assets/cubix/images/cubix-close-up-cute.png"
            alt="Cubix"
            className="w-[180px] h-[180px] object-contain"
          />
          <img
            src="/assets/cubix/images/cubix-sitting-and-reading-book.png"
            alt="Cubix reading"
            className="w-[180px] h-[180px] object-contain"
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
          <p className="text-lg text-fg-secondary leading-relaxed">
            Cubix is the mascot of 100X Systems.
            Cubix is curious. Cubix loves solving systems.
            Cubix represents every engineer who learns by building.
          </p>
          <p className="text-base text-fg-secondary leading-relaxed">
            Cubix is not perfect. Cubix makes mistakes.
            But Cubix keeps building — and that&apos;s what matters.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
