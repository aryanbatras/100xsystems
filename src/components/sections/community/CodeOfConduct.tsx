import React from 'react';
import styles from '../../../styles/components/sections/community/CodeOfConduct.module.css';;

export function CodeOfConduct(): React.ReactElement {
  return (
    <section className={styles.conductSection}>
      <h2 className={styles.sectionTitle}>Code of Conduct</h2>
      <div className={styles.conduct}>
        <p className={styles.description}>
          Our code of conduct ensures a safe and inclusive environment for all community members.
        </p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <h3 className={styles.principleTitle}>Inclusivity</h3>
            <p className={styles.principleText}>We welcome people from all backgrounds and experience levels.</p>
          </div>
          <div className={styles.principle}>
            <h3 className={styles.principleTitle}>Collaboration</h3>
            <p className={styles.principleText}>We work together to solve problems and learn from each other.</p>
          </div>
          <div className={styles.principle}>
            <h3 className={styles.principleTitle}>Excellence</h3>
            <p className={styles.principleText}>We strive for technical excellence and continuous improvement.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
