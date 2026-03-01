import React from 'react';
import Link from 'next/link';
import styles from './GetInvolved.module.css';

export function GetInvolved(): React.ReactElement {
  return (
    <section className={styles.involvedSection}>
      <h2 className={styles.sectionTitle}>Get Involved</h2>
      <p className={styles.description}>
        Join our community and start making a difference today.
      </p>
      <div className={styles.actions}>
        <Link href="/contribute" className={styles.primaryButton}>Contribute</Link>
        <Link href="/blog" className={styles.secondaryButton}>Read Blog</Link>
        <Link href="/contact" className={styles.secondaryButton}>Contact Us</Link>
      </div>
    </section>
  );
}
