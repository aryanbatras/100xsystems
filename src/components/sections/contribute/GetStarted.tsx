import React from 'react';
import Link from 'next/link';
import styles from './GetStarted.module.css';

export function GetStarted(): React.ReactElement {
  return (
    <section className={styles.startedSection}>
      <h2 className={styles.sectionTitle}>Ready to Contribute?</h2>
      <p className={styles.description}>
        Join our community of passionate engineers and help shape the future of learning.
      </p>
      <div className={styles.actions}>
        <Link href="/contact" className={styles.primaryButton}>Get Started</Link>
        <Link href="/community" className={styles.secondaryButton}>Join Community</Link>
      </div>
    </section>
  );
}
