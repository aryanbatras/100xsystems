'use client';

import { motion } from 'motion/react';

const cubixImages = [
  { src: '/assets/cubix/images/cubix-close-up-cute.png', alt: 'Cubix close up' },
  { src: '/assets/cubix/images/cubix-sitting-and-reading-book.png', alt: 'Cubix reading' },
  { src: '/assets/cubix/images/cubix-pieces-rubik-cube-in-air.png', alt: 'Cubix with puzzle pieces' },
  { src: '/assets/cubix/images/two-cubes-laptop.png', alt: 'Cubix at laptop' },
];

export function HomeCubixShowcase() {
  return (
    <section className="py-24 px-4 bg-surface-secondary border-y border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            Meet Cubix
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-fg tracking-tight uppercase mb-4">
            Our brand character
          </h2>
          <p className="text-lg text-fg-secondary max-w-xl mx-auto leading-relaxed">
            Cubix represents the journey of every engineer — learning, building, and growing through systems thinking.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {cubixImages.map((img, index) => (
            <motion.div
              key={img.src}
              className="relative aspect-square bg-white border border-border overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-border">
            <div className="w-8 h-8 bg-accent-yellow flex items-center justify-center">
              <span className="text-xs font-bold text-black">X</span>
            </div>
            <span className="text-sm text-fg-secondary font-medium tracking-wide uppercase">
              Cubix — Think in systems. Build with purpose.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
