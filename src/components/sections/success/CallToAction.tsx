import React from 'react';
import Link from 'next/link';
import styles from '../../styles/components/sections/success/CallToAction.module.css';

export function CallToAction(): React.ReactElement {
  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.sectionTitle}>Start Your Journey</h2>
      <p className={styles.description}>
        Ready to transform your engineering career? Join the 100xSystems community today.
      </p>
      <div className={styles.buttons}>
        <Link href="/contact" className={styles.primaryButton}>Get Started</Link>
        <Link href="/about" className={styles.secondaryButton}>Learn More</Link>
      </div>
    </section>
  );
}
