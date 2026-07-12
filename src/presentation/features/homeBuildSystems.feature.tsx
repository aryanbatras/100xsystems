'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HomeBuildSystems() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/assets/cubix/images/cubix-putting-yellow-box-in-almirah.png"
            alt="Building systems piece by piece"
            className="w-full max-w-[450px] h-auto object-contain"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium">
            Build Systems
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-fg tracking-tight uppercase leading-tight">
            Every roadmap ends with
            <span className="text-accent"> something real.</span>
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed">
            Not toy projects. Not CRUD apps.
            Real systems that exist in production — built by you, from scratch.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {[
              'Build a compiler',
              'Build a database',
              'Build a distributed cache',
              'Build a browser engine',
              'Build an operating system',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-fg">
                <div className="w-1.5 h-1.5 bg-accent-yellow shrink-0" />
                <span className="font-medium uppercase tracking-wide">{item}</span>
              </div>
            ))}
          </div>

          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider mt-4 w-fit"
          >
            View Roadmaps <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
