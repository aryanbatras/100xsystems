'use client';

import { motion } from 'motion/react';

export function HomeOpenSource() {
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
            Open Source
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight mb-6">
            Everything lives publicly.
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed max-w-2xl mx-auto text-justify">
            Every system, every tutorial, every roadmap is open source.
            Contributions improve everything. Learning happens together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Free',
              text: 'No paywalls. No premium tiers. Everything is accessible to everyone.',
            },
            {
              title: 'Community',
              text: 'Real collaboration. Reviews. Projects. Discussions. Study groups. Engineering challenges.',
            },
            {
              title: 'Evolving',
              text: 'As technology evolves, so do the systems. Contributions keep everything current.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="opensource-card group text-center p-8 cursor-default transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-lg font-bold text-fg uppercase tracking-wider mb-3 transition-colors duration-300">{item.title}</h3>
              <p className="text-sm text-fg-secondary leading-relaxed transition-colors duration-300">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <style>{`
          .opensource-card:hover {
            background-color: #572EFF;
          }
          .opensource-card:hover * {
            color: #ffffff !important;
          }
        `}</style>
      </div>
    </section>
  );
}
