'use client';

import { motion } from 'motion/react';

const systems = [
  { name: 'Git', desc: 'Version control that changed how the world writes code.' },
  { name: 'Chrome', desc: 'A browser that renders the entire web.' },
  { name: 'Linux', desc: 'An operating system powering most of the internet.' },
  { name: 'Redis', desc: 'In-memory data structure store. Fast. Elegant.' },
  { name: 'React', desc: 'A library that redefined frontend engineering.' },
  { name: 'Docker', desc: 'Containerization that simplified deployment.' },
  { name: 'Kubernetes', desc: 'Orchestration at scale. Complexity made manageable.' },
  { name: 'Spotify', desc: 'Recommendation systems that understand you.' },
  { name: 'Google Search', desc: 'Indexing the entire internet in milliseconds.' },
];

export function HomeWhatIsSystem() {
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
            What is a System?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight mb-6">
            Everything around you is a system.
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed max-w-2xl mx-auto">
            The tools you use daily are engineering marvels.
            Understanding how they work is the first step to building your own.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((sys, i) => (
            <motion.div
              key={sys.name}
              className="flex items-start gap-4 p-5 bg-white border border-border transition-all duration-300 hover:border-border-hover hover:shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="shrink-0 w-2 h-2 mt-2 bg-accent" />
              <div>
                <h3 className="text-base font-bold text-fg uppercase tracking-wide mb-1">{sys.name}</h3>
                <p className="text-sm text-fg-secondary leading-relaxed">{sys.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
