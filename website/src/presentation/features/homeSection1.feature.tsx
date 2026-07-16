'use client';

import Link from 'next/link';
import sec1Styles from '../_styles/css/sections-home-section1.module.css';

export function HomeSection1() {
  return (
    <div className={`${sec1Styles.rubikVideoShowcase} glass-card`}>
      <div className={sec1Styles.rubikVideoContent}>
        <div className={sec1Styles.rubikVideoTitle}>
          <img
            src="/100xsystemsonlytitle.webp"
            alt="100xsystems Systems"
            className={sec1Styles.titleLogo}
          />
        </div>
        <p className={sec1Styles.rubikVideoSubtitle}>
          Master the Rubik&apos;s Cube of Software Engineering
        </p>
        <div className={sec1Styles.ctaButtons}>
          <Link href="/articles" className={sec1Styles.ctaPrimary}>
            Start Learning
          </Link>
          <Link href="/roadmaps" className={sec1Styles.ctaSecondary}>
            Explore Paths
          </Link>
        </div>
      </div>
    </div>
  );
}
