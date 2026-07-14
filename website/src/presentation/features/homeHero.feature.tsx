'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { IconAnimatedGridPattern, WordRotate } from '@/presentation/__components';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden flex items-center bg-white" style={{ height: 'calc(100vh - 7rem)' }}>
      <div className="absolute inset-0 z-0">
        <IconAnimatedGridPattern />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-16 text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-fg tracking-tight uppercase leading-[1.05]">
            The world runs on{' '}
            <span className="text-accent inline-block">
              <WordRotate
                words={['systems','code.', 'software.', 'infrastructure.', 'platforms.', 'data.', 'open source.']}
                duration={2000}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-accent tracking-tight uppercase"
              />
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-accent-yellow tracking-tight uppercase flex items-center justify-center gap-4">
            Learn to build them.
          </h2>
        </motion.div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-4 px-14 py-6 text-fg-secondary text-lg font-bold uppercase tracking-wider transition-all duration-200 hover:text-fg relative after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <img
              src="/assets/cubix/images/cubix-close-up-cute.png"
              alt=""
              className="h-12 w-12 object-contain"
              aria-hidden="true"
            />
            EXPLORE
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
