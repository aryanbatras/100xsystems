'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IconAnimatedGridPattern } from '@/presentation/__components';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden h-screen min-h-[600px] flex items-center bg-white">
      <div className="absolute inset-0 z-0">
        <IconAnimatedGridPattern />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-24 text-center">
        <motion.span
          className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-6 px-3 py-1.5 bg-accent-bg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Open Source Engineering Ecosystem
        </motion.span>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-fg tracking-tight leading-[1.05] mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The world runs on systems.
          <br />
          <span className="text-accent">Learn to build them.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-fg-secondary max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Not tutorials. Not courses. Complete systems from scratch.
        </motion.p>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-3 px-10 py-4 text-fg-secondary text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:text-fg relative after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <img
              src="/assets/cubix/images/cubix-close-up-cute.png"
              alt=""
              className="h-8 w-8 object-contain"
              aria-hidden="true"
            />
            EXPLORE <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
