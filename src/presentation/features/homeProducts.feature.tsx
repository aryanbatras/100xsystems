'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from '../_styles/css/sections-home-products.module.css';

const products = [
  {
    name: 'StartX',
    tagline: 'Generate Ideas & Research your ideas into X-Factor Systems',
    description:
      'Not a course. Not a tutorial. A platform for engineers who want to build real systems. The first of many 100XSystems products.',
    url: 'https://startx.100xsystems.dev',
    screenshot: '/websites/startx.100xsystems.dev.png',
    flagship: false
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
    <section id="products" className={`${styles.section} glass-card section-padding`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Products</span>
          <h2 className={styles.title}>What we ship</h2>
          <p className={styles.description}>
            Currently 4 products in production. More on the way.
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product, index) => (
            <a
              key={product.name}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${product.flagship ? styles.flagshipCard : ''}`}
              style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
            >
              {product.flagship && <span className={styles.flagshipBadge}>Flagship</span>}
              <div className={styles.cardImage}>
                <Image
                  src={product.screenshot}
                  alt={`${product.name} screenshot`}
                  fill
                  className={styles.screenshot}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardName}>{product.name}</span>
                  <ArrowRight size={14} className={styles.cardArrow} />
                </div>
                <p className={styles.cardTagline}>{product.tagline}</p>
                <p className={styles.cardDescription}>{product.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
