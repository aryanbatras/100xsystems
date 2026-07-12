'use client';

import { motion } from 'motion/react';

export function HomePhilosophy() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight mb-6">
            Tutorials teach you syntax.
            <br />
            <span className="text-accent">Systems teach you engineering.</span>
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed max-w-2xl mx-auto">
            The gap between writing code and understanding software is enormous.
            We close it by building complete systems — not fragments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Why systems matter',
              text: 'Every product you use is a system. Understanding how they work — not just how to use them — is what separates engineers from coders.',
            },
            {
              title: 'Why tutorials fail',
              text: 'Tutorials give you steps. Systems give you understanding. One teaches you to follow. The other teaches you to think.',
            },
            {
              title: 'Why building changes everything',
              text: 'When you build a database from scratch, you stop being a user of databases. You become someone who understands them.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex flex-col gap-4 p-8 border border-border bg-white transition-all duration-300 hover:border-border-hover hover:shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-lg font-bold text-fg uppercase tracking-wide">{item.title}</h3>
              <p className="text-sm text-fg-secondary leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
