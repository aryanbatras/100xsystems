'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function HomeSection10() {
  return (
    <section className="py-24 px-4 bg-accent text-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <motion.div
          className="relative overflow-hidden bg-accent-hover"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative w-full aspect-[4/5]">
            <Image
              src="/assets/wallpaper/hand-one-finger-rubik-cube-holded-like-pro.jpg"
              alt="Mastery and Precision"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
        </motion.div>

        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-[11px] tracking-[0.15em] uppercase text-white/70 font-medium mb-3">
            The Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase leading-tight mb-4">
            100x or nothing.
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
            Make engineers genuinely better at understanding systems. That&apos;s it.
            No corporate nonsense. Just engineering, done right.
          </p>

          <div className="mb-8">
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-2 px-12 py-5 bg-accent-yellow text-black text-base font-bold uppercase tracking-wider transition-all duration-200 hover:bg-yellow-400 active:bg-yellow-500"
            >
              GET STARTED <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex gap-8">
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
