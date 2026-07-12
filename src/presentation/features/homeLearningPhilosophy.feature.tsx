'use client';

import { motion } from 'motion/react';

const principles = [
  { label: 'Depth', text: 'Over speed. Understanding one system deeply beats skimming ten.' },
  { label: 'Build', text: 'First. Read source code. Break things. Rebuild.' },
  { label: 'Curiosity', text: 'Over completion. The question matters more than the certificate.' },
  { label: 'Understanding', text: 'Over memorization. Why it works beats how it works.' },
];

export function HomeLearningPhilosophy() {
  return (
    <section className="py-24 lg:py-32 bg-surface-secondary border-y border-border">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            Learning Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight">
            How we think about learning.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.label}
              className="flex items-start gap-5 p-8 bg-white border border-border transition-all duration-300 hover:border-border-hover hover:shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-4xl font-extrabold text-accent-bg tracking-tight shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-bold text-fg uppercase tracking-wide mb-2">{p.label}</h3>
                <p className="text-sm text-fg-secondary leading-relaxed">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
