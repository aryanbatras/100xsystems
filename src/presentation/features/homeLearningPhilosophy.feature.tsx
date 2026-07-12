'use client';

import { motion } from 'motion/react';

const principles = [
  {
    label: 'Depth',
    text: 'Over speed. Understanding one system deeply beats skimming ten.',
    image: '/assets/cubix/images/cubix-sitting-and-reading-book.png',
  },
  {
    label: 'Build',
    text: 'First. Read source code. Break things. Rebuild.',
    image: '/assets/cubix/images/cubix-deploy-btn.png',
  },
  {
    label: 'Curiosity',
    text: 'Over completion. The question matters more than the certificate.',
    image: '/assets/cubix/images/cubix-pieces-rubik-cube-in-air.png',
  },
  {
    label: 'Understanding',
    text: 'Over memorization. Why it works beats how it works.',
    image: '/assets/cubix/images/two-cubes-laptop.png',
  },
];

export function HomeLearningPhilosophy() {
  return (
    <section className="py-24 lg:py-32 bg-surface-secondary border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((p, i) => (
            <motion.div
              key={p.label}
              className="learning-card group flex items-start gap-6 p-8 cursor-default transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img
                src={p.image}
                alt=""
                className="shrink-0 w-28 h-28 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-2">
                <span className="text-5xl font-extrabold text-accent tracking-tight transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-fg uppercase tracking-wide transition-colors duration-300">{p.label}</h3>
                <p className="text-sm text-fg-secondary leading-relaxed transition-colors duration-300">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <style>{`
          .learning-card:hover {
            background-color: #572EFF;
          }
          .learning-card:hover * {
            color: #ffffff !important;
          }
        `}</style>
      </div>
    </section>
  );
}
