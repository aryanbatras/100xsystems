'use client';

import { motion } from 'motion/react';

const principles = [
  'Build.',
  'Think.',
  'Question.',
  'Simplify.',
  'Read source code.',
  'Share knowledge.',
  'Stay curious.',
  'Never stop learning.',
  'Understand before using.',
  'Systems over shortcuts.',
];

export function HomeMission() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            The Mission
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight mb-6">
            The world doesn&apos;t need more tutorials.
            <br />
            <span className="text-accent">It needs better engineers.</span>
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed max-w-2xl mx-auto">
            Engineers who understand systems.
            Who can build from scratch.
            Who think before they code.
          </p>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-8">
            Principles
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {principles.map((p, i) => (
              <motion.span
                key={p}
                className="inline-block px-5 py-3 text-sm font-bold text-fg uppercase tracking-wider border border-border bg-white transition-all duration-200 hover:border-accent hover:text-accent cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                {p}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
