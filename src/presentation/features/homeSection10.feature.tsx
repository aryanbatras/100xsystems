'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import sec10Styles from '../_styles/css/sections-home-section10.module.css';

export function HomeSection10() {
  return (
    <section className={`${sec10Styles.ctaSection} glass-card section-padding`}>
      <div className={sec10Styles.ctaContainer}>
        <div className={sec10Styles.leftCard}>
          <div className={sec10Styles.cardImage}>
            <Image
              src="/assets/wallpaper/hand-one-finger-rubik-cube-holded-like-pro.jpg"
              alt="Mastery and Precision"
              width={600}
              height={800}
              className={sec10Styles.cardImageElement}
            />
          </div>
          <div className={sec10Styles.imageOverlay} />
        </div>

        <div className={sec10Styles.rightCard}>
          <div className={sec10Styles.cardContent}>
            <span className={sec10Styles.cardLabel}>The Mission</span>
          <h2 className={sec10Styles.cardTitle}>100x or nothing.</h2>
            <p className={sec10Styles.cardDescription}>
              Make engineers genuinely better at understanding systems. That's it.
              No corporate nonsense. Just engineering, done right.
            </p>

            <div className={sec10Styles.ctaButton}>
              <Link href="/roadmaps" className={sec10Styles.ctaPrimary}>
                Get started <ArrowRight size={16} />
              </Link>
            </div>

            <div className={sec10Styles.trustIndicators}>
              <div className={sec10Styles.trustItem}>
                <span className={sec10Styles.trustNumber}>4</span>
                <span className={sec10Styles.trustLabel}>Products live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
