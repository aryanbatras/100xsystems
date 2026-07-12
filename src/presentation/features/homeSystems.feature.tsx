'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const systems = [
  {
    title: 'Handcrafted Systems',
    description: 'Curated curation of outsourced and free resources to save time and give you the best updated quality learning to build systems.',
    image: '/assets/cubix/images/cubix-putting-yellow-box-in-almirah.png',
    href: '/roadmaps',
    tag: 'Free',
  },
  {
    title: 'Deploy with Confidence',
    description: 'From code to production. Cubix shows you how to ship real systems that scale.',
    image: '/assets/cubix/images/cubix-deploy-btn.png',
    href: '/roadmaps',
    tag: 'Free',
  },
  {
    title: 'Follow the Roadmap',
    description: 'Structured learning paths from foundations to advanced systems. Step by step, cube by cube.',
    image: '/assets/cubix/images/many-cubix-roadmaps-no-bg.png',
    href: '/roadmaps',
    tag: 'Free',
  },
];

export function HomeSystems() {
  return (
    <section className="py-24 lg:py-32 bg-surface-secondary border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            What we offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-fg tracking-tight uppercase mb-4">
            Systems you&apos;d love to build
          </h2>
          <p className="text-lg text-fg-secondary max-w-xl mx-auto leading-relaxed">
            Handpicked learning paths. Outsourced wisdom. Templates to ship fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {systems.map((system, index) => (
            <motion.div
              key={system.title}
              className="group flex flex-col bg-white border border-border overflow-hidden transition-all duration-300 hover:border-border-hover hover:shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative w-full aspect-[4/3] bg-surface-secondary overflow-hidden">
                <img
                  src={system.image}
                  alt={system.title}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 bg-accent-bg text-accent">
                    {system.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-fg">{system.title}</h3>
                <p className="text-sm text-fg-secondary leading-relaxed flex-1">{system.description}</p>
                <Link
                  href={system.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider mt-2 group-hover:gap-3 transition-all duration-200"
                >
                  Explore <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
