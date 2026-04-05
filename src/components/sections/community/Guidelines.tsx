import React from 'react';
import styles from '../../../styles/components/sections/community/Guidelines.module.css';;

export function Guidelines(): React.ReactElement {
  return (
    <section className={styles.guidelinesSection}>
      <h2 className={styles.sectionTitle}>Community Guidelines</h2>
      <div className={styles.guidelines}>
        <div className={styles.guideline}>
          <h3 className={styles.guidelineTitle}>Be Respectful</h3>
          <p className={styles.guidelineText}>Treat everyone with dignity and respect, regardless of their experience level.</p>
        </div>
        <div className={styles.guideline}>
          <h3 className={styles.guidelineTitle}>Help Others Learn</h3>
          <p className={styles.guidelineText}>Share knowledge generously and support fellow learners on their journey.</p>
        </div>
        <div className={styles.guideline}>
          <h3 className={styles.guidelineTitle}>Stay Constructive</h3>
          <p className={styles.guidelineText}>Provide helpful feedback and contribute to positive discussions.</p>
        </div>
        <div className={styles.guideline}>
          <h3 className={styles.guidelineTitle}>No Spam</h3>
          <p className={styles.guidelineText}>Keep discussions relevant and avoid self-promotion.</p>
        </div>
      </div>
    </section>
  );
}
