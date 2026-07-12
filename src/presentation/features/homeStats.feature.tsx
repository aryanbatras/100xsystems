'use client';

import { motion } from 'motion/react';
import { NumberTicker } from '@/presentation/__components';

const stats = [
  { value: 50, label: 'Systems Built' },
  { value: 200, label: 'Contributors' },
  { value: 120, label: 'Projects' },
  { value: 30, label: 'Roadmaps' },
  { value: 500, label: 'Articles' },
  { value: 20, label: 'Languages' },
];

export function HomeStats() {
  return (
    <section className="py-20 bg-accent text-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] tracking-[0.15em] uppercase text-white/60 font-medium">
            Growing every day
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                <NumberTicker value={stat.value} />
              </div>
              <span className="text-xs text-white/60 uppercase tracking-wider font-medium text-center">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
