'use client';

import { motion } from 'motion/react';

export function HomePhilosophy() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight mb-6">
            Tutorials teach you syntax.
            <br />
            <span className="text-accent">Systems teach you engineering.</span>
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed max-w-2xl mx-auto text-justify">
            The gap between writing code and understanding software is enormous.
            We close it by building complete systems — not fragments.
          </p>
        </motion.div>

        {/* Bento grid — single image left, text cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Tall image card */}
          <motion.div
            className="philosophy-image-card group relative overflow-hidden lg:row-span-3 cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/assets/wallpaper/hand-one-finger-rubik-cube-holded-like-pro.jpg"
              alt="Mastery — balancing complex systems"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Text card 1 */}
          <motion.div
            className="philosophy-card group flex flex-col justify-center p-8 lg:col-span-2 cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-fg uppercase tracking-wide mb-3 group-hover:text-white transition-colors duration-300">Why systems matter</h3>
            <p className="text-base text-fg-secondary leading-relaxed text-justify group-hover:text-white/80 transition-colors duration-300">
              Every product you use is a system. Understanding how they work — not just how to use them — is what separates engineers from coders.
            </p>
          </motion.div>

          {/* Text card 2 */}
          <motion.div
            className="philosophy-card group flex flex-col justify-center p-8 lg:col-span-2 cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-fg uppercase tracking-wide mb-3 group-hover:text-white transition-colors duration-300">Why tutorials fail</h3>
            <p className="text-base text-fg-secondary leading-relaxed text-justify group-hover:text-white/80 transition-colors duration-300">
              Tutorials give you steps. Systems give you understanding. One teaches you to follow. The other teaches you to think.
            </p>
          </motion.div>

          {/* Text card 3 */}
          <motion.div
            className="philosophy-card group flex flex-col justify-center p-8 lg:col-span-2 cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-fg uppercase tracking-wide mb-3 group-hover:text-white transition-colors duration-300">Why building changes everything</h3>
            <p className="text-base text-fg-secondary leading-relaxed text-justify group-hover:text-white/80 transition-colors duration-300">
              When you build a database from scratch, you stop being a user of databases. You become someone who understands them.
            </p>
          </motion.div>
        </div>

        <style>{`
          .philosophy-card {
            background-color: #f5f5f5;
            min-height: 180px;
          }
          .philosophy-card:hover {
            background-color: #572EFF;
          }
          .philosophy-card:hover * {
            color: #ffffff !important;
          }
          .philosophy-image-card {
            min-height: 100%;
          }
        `}</style>
      </div>
    </section>
  );
}
