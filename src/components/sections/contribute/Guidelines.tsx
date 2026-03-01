import React from 'react';
import styles from './Guidelines.module.css';

export function Guidelines(): React.ReactElement {
  return (
    <section className={styles.guidelinesSection}>
      <h2 className={styles.sectionTitle}>Contribution Guidelines</h2>
      <div className={styles.content}>
        <p className={styles.description}>
          We welcome contributions from the community. Here's how you can help make 100xSystems better.
        </p>
        <div className={styles.guidelines}>
          <div className={styles.guideline}>
            <h3 className={styles.guidelineTitle}>Code Quality</h3>
            <p className={styles.guidelineText}>Follow clean code practices and maintain high standards.</p>
          </div>
          <div className={styles.guideline}>
            <h3 className={styles.guidelineTitle}>Documentation</h3>
            <p className={styles.guidelineText}>Provide clear documentation for your contributions.</p>
          </div>
          <div className={styles.guideline}>
            <h3 className={styles.guidelineTitle}>Testing</h3>
            <p className={styles.guidelineText}>Include tests for new features and bug fixes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
