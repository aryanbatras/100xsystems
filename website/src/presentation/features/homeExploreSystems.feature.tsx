'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Frontend', icon: '>' },
  { name: 'Backend', icon: '{' },
  { name: 'Databases', icon: '█' },
  { name: 'Operating Systems', icon: '⚙' },
  { name: 'Networking', icon: '⟷' },
  { name: 'DevOps', icon: '⟳' },
  { name: 'AI', icon: '◆' },
  { name: 'Distributed Systems', icon: '⬡' },
  { name: 'Security', icon: 'Shield' },
  { name: 'Compilers', icon: '⟨⟩' },
  { name: 'System Design', icon: '⊞' },
  { name: 'Algorithms', icon: 'λ' },
];

export function HomeExploreSystems() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            Explore
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight mb-4">
            Systems you can build.
          </h2>
          <p className="text-lg text-fg-secondary max-w-xl mx-auto leading-relaxed">
            From frontend frameworks to distributed databases.
            Pick a domain. Build a system. Understand it deeply.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="group flex flex-col items-center gap-3 p-6 bg-white border border-border cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <span className="text-2xl text-fg-muted group-hover:text-accent transition-colors">{cat.icon}</span>
              <span className="text-sm font-bold text-fg uppercase tracking-wider text-center group-hover:text-accent transition-colors">{cat.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider hover:gap-3 transition-all duration-200"
          >
            View all roadmaps <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
