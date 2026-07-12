'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-white">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Cubix character floating */}
      <motion.div
        className="absolute right-[5%] top-[15%] w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] opacity-20 lg:opacity-30 pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/assets/cubix/images/cubix-close-up-cute.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-6 px-4 py-1.5 bg-accent-bg">
            100X SYSTEMS
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold text-fg tracking-tight leading-[1.05] mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Build. Ship. Scale.{' '}
          <span className="text-accent">Repeat.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-fg-secondary max-w-2xl mx-auto mb-10 uppercase tracking-wider leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          For engineers who build real systems. Depth-first learning. Systems thinking. No fluff.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-[11px] tracking-[0.1em] uppercase">Scroll</span>
          <div className="w-px h-6 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-fg-muted animate-[scrollDot_2s_ease_infinite]" />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0% { top: -50%; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}
