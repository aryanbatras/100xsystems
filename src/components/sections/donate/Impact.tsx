import React from 'react';
import styles from '../../../styles/components/sections/donate/Impact.module.css';

export function Impact(): React.ReactElement {
  return (
    <section className={styles.impactSection}>
      <h2 className={styles.sectionTitle}>Your Impact</h2>
      <div className={styles.impactGrid}>
        <div className={styles.impactItem}>
          <h3 className={styles.impactNumber}>10,000+</h3>
          <p className={styles.impactText}>Engineers Educated</p>
        </div>
        <div className={styles.impactItem}>
          <h3 className={styles.impactNumber}>50+</h3>
          <p className={styles.impactText}>Learning Paths</p>
        </div>
        <div className={styles.impactItem}>
          <h3 className={styles.impactNumber}>100%</h3>
          <p className={styles.impactText}>Open Source</p>
        </div>
      </div>
    </section>
  );
}
