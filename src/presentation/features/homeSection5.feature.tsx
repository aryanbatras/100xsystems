'use client';

import Link from 'next/link';
import sec5Styles from '../_styles/css/sections-home-section5.module.css';

export function HomeSection5() {
  return (
    <section className={`${sec5Styles.ctaSection} glass-card section-padding`}>
      <h2 className={sec5Styles.ctaTitle}>Ready to Become an Engineer?</h2>
      <p className={sec5Styles.ctaText}>
        Join thousands who&apos;ve transformed their careers through our structured learning pathways
      </p>
      <Link href="/roadmaps" className={sec5Styles.ctaButton}>
        Start Your Journey
      </Link>
    </section>
  );
}
