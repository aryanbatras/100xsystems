'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function HomeSection10() {
  return (
    <section className="py-24 lg:py-32 bg-accent text-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Cubix illustration */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/assets/cubix/images/cubix-friends-roadmap.webp"
            alt="Cubix and friends on a roadmap"
            className="w-full max-w-[450px] h-auto object-contain"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-[11px] tracking-[0.15em] uppercase text-white/70 font-medium">
            The Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase leading-tight">
            100x or nothing.
          </h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-lg">
            Make engineers genuinely better at understanding systems. That&apos;s it.
            No corporate nonsense. Just engineering, done right.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-2 px-12 py-5 bg-accent-yellow text-black text-base font-bold uppercase tracking-wider transition-all duration-200 hover:bg-yellow-400 active:bg-yellow-500"
            >
              GET STARTED <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex gap-8 mt-4">
            <div className="flex flex-col items-center lg:items-start gap-1">
              <span className="text-3xl font-bold text-white tracking-tight">4</span>
              <span className="text-sm text-white/60">Products live</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
