'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const products = [
  {
    name: 'StartX',
    tagline: 'Generate Ideas & Research your ideas into X-Factor Systems',
    description:
      'Not a course. Not a tutorial. A platform for engineers who want to build real systems. The first of many 100XSystems products.',
    url: 'https://startx.100xsystems.dev',
    screenshot: '/websites/startx.100xsystems.dev.png',
    flagship: true
  },
  {
    name: 'Peerly',
    tagline: 'Learn with people who actually build',
    description:
      'Peer-to-peer learning environment. Connect with engineers, share knowledge, and collaborate on projects that matter.',
    url: 'https://peerly.100xsystems.dev',
    screenshot: '/websites/peerly.100xsystems.dev.png',
  },
  {
    name: '100X Tools',
    tagline: 'Browser tools that respect your privacy',
    description:
      'Merge PDFs, resize images, remove backgrounds. Everything runs in your browser. No uploads. No signups. Your files never leave your machine.',
    url: 'https://tools.100xsystems.dev',
    screenshot: '/websites/tools.100xsystems.dev.png',
  },
  {
    name: 'Engineering Blog',
    tagline: 'Deep dives. No fluff.',
    description:
      'Articles on system architecture, clean code, distributed systems, and engineering practices that actually scale.',
    url: 'https://blog.100xsystems.dev',
    screenshot: '/websites/blog.100xsystems.dev.png',
  },
];

export function HomeProducts() {
  return (
    <section id="products" className="py-24 px-4 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-fg tracking-tight uppercase mb-4">
            What we ship
          </h2>
          <p className="text-lg text-fg-secondary max-w-xl mx-auto leading-relaxed">
            Currently 4 products in production. More on the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <motion.a
              key={product.name}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col border border-border transition-all duration-400 overflow-hidden relative ${
                product.flagship
                  ? 'border-accent bg-accent-bg/30'
                  : 'bg-white hover:border-border-hover hover:shadow-sm'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {product.flagship && (
                <span className="absolute top-3 right-3 z-10 text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 text-accent font-medium">
                  Flagship
                </span>
              )}
              <div className="relative w-full aspect-video overflow-hidden bg-surface-secondary">
                <Image
                  src={product.screenshot}
                  alt={`${product.name} screenshot`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold text-fg">{product.name}</span>
                  <ArrowRight size={14} className="text-fg-muted transition-all duration-300 group-hover:text-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-sm text-fg-secondary font-medium">{product.tagline}</p>
                <p className="text-sm text-fg-muted leading-relaxed mt-1">{product.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
