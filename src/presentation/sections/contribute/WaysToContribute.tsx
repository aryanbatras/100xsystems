import React from 'react';
import styles from '../../_styles/components/sections/contribute/WaysToContribute.module.css';;

export function WaysToContribute(): React.ReactElement {
  return (
    <section className={styles.contributeSection}>
      <h2 className={styles.sectionTitle}>Ways to Contribute</h2>
      <div className={styles.ways}>
        <div className={styles.way}>
          <h3 className={styles.wayTitle}>Content Creation</h3>
          <p className={styles.wayDescription}>Write tutorials, articles, and learning materials.</p>
        </div>
        <div className={styles.way}>
          <h3 className={styles.wayTitle}>Code Contributions</h3>
          <p className={styles.wayDescription}>Fix bugs, add features, and improve the platform.</p>
        </div>
        <div className={styles.way}>
          <h3 className={styles.wayTitle}>Community Support</h3>
          <p className={styles.wayDescription}>Help others learn and answer questions.</p>
        </div>
      </div>
    </section>
  );
}
