'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HomeBuildSystems() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            Build Systems
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight mb-6">
            Every roadmap ends with
            <span className="text-accent"> something real.</span>
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed max-w-2xl mx-auto text-justify">
            Not toy projects. Not CRUD apps.
            Real systems that exist in production — built by you, from scratch.
            Each system teaches you how software actually works underneath.
          </p>
        </motion.div>

        {/* Top row: putting yellow box + deploy — no cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            className="flex flex-col gap-4 items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/assets/cubix/images/cubix-putting-yellow-box-in-almirah.png"
              alt="Building piece by piece"
              className="w-full max-w-[300px] h-auto object-contain"
            />
            <h3 className="text-xl font-bold text-fg uppercase tracking-wide">Build from scratch</h3>
            <p className="text-sm text-fg-secondary leading-relaxed text-justify max-w-md">
              Every system starts with understanding the fundamentals.
              We guide you through building compilers, databases, operating systems,
              and distributed caches — piece by piece, concept by concept.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src="/assets/cubix/images/cubix-deploy-btn.png"
              alt="Deploy with confidence"
              className="w-full max-w-[300px] h-auto object-contain"
            />
            <h3 className="text-xl font-bold text-fg uppercase tracking-wide">Deploy with confidence</h3>
            <p className="text-sm text-fg-secondary leading-relaxed text-justify max-w-md">
              From code to production. Learn how real systems are deployed,
              scaled, and maintained. Understand CI/CD, containerization,
              and infrastructure — not as buzzwords, but as engineering practice.
            </p>
          </motion.div>
        </div>

        {/* Bottom: journey landscape — no border */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src="/assets/cubix/images/cubix-journey-landscape-transparent-bg.png"
            alt="The engineering journey"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider hover:gap-3 transition-all duration-200"
          >
            View Roadmaps <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
