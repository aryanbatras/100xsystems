'use client';

import Link from 'next/link';
import sec2Styles from '../_styles/css/sections-home-section2.module.css';

export function HomeSection2() {
  return (
    <div className={`${sec2Styles.rubiksConclusion} glass-card section-padding`}>
      <div className={sec2Styles.conclusionContent}>
        <div className={sec2Styles.conclusionText}>
          <h2 className={sec2Styles.conclusionTitle}>Systems Clarity</h2>
          <p className={sec2Styles.description}>
            100xEngineers learn to see the complete system—understanding trade-offs,
            anticipating consequences, and architecting solutions that scale.
            They don&apos;t just solve problems; they understand the underlying principles
            that make systems work reliably.
          </p>
          <div className={sec2Styles.ctaContainer}>
            <Link href="/articles" className={sec2Styles.ctaPrimary}>
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
