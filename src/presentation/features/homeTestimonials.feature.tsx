'use client';

import { motion } from 'motion/react';

const testimonials = [
  {
    quote: 'Building a compiler taught me more about programming than any course ever did.',
    author: 'Engineer',
    role: 'Self-taught developer',
  },
  {
    quote: 'I finally understand how databases work. Not the API — the actual internals.',
    author: 'Engineer',
    role: 'Computer Science student',
  },
  {
    quote: 'The depth-first approach changed how I think about software. Period.',
    author: 'Engineer',
    role: 'Open-source contributor',
  },
];

export function HomeTestimonials() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-fg tracking-tight uppercase">
            Engineers building engineers.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-4 p-8 bg-white border border-border transition-all duration-300 hover:border-border-hover hover:shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-base text-fg leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-border">
                <span className="text-sm font-bold text-fg uppercase tracking-wider">{t.author}</span>
                <span className="text-xs text-fg-muted">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
