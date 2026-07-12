'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export function HomeSection10() {
  return (
    <section className="py-24 lg:py-32 bg-accent text-white">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/assets/cubix/images/many-cubix-on-a-holy-tree.png"
            alt="Cubix community"
            className="w-full max-w-[500px] h-auto object-contain"
          />

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
            Understand the systems.
          </h2>

          <p className="text-lg text-white/70 leading-relaxed max-w-lg">
            Don&apos;t just use technology.
            Build it. Understand it. Improve it.
          </p>

          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-3 px-12 py-5 text-white text-base font-bold uppercase tracking-wider transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Start Building
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
