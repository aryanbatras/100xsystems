'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-white">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Cubix character */}
        <motion.div
          className="flex justify-center lg:justify-end order-2 lg:order-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/assets/cubix/images/cubix-close-up-cute.png"
            alt="Cubix — your 100xEngineer companion"
            className="w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] object-contain"
          />
        </motion.div>

        {/* Right: Text content */}
        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-4 px-3 py-1.5 bg-accent-bg">
              A product by 100xSystems
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight leading-[1.05] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Build. Ship. Scale.{' '}
            <span className="text-accent">Repeat.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-fg-secondary max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be the <strong className="text-fg font-semibold">100x Engineer</strong>. Depth-first learning. Systems thinking. Real engineering.
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-white text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:bg-accent-hover active:bg-accent-active"
            >
              START LEARNING <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-10 py-4 text-fg-secondary text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:text-fg relative after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              EXPLORE
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-[11px] tracking-[0.1em] uppercase">Scroll</span>
        <div className="w-px h-6 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-fg-muted" style={{ animation: 'scrollDot 2s ease infinite' }} />
        </div>
      </motion.div>

      <style>{`
        @keyframes scrollDot {
          0% { top: -50%; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}
