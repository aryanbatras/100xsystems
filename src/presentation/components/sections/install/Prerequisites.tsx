import React from 'react';
import styles from '../../../_styles/components/sections/install/Prerequisites.module.css';;

export function Prerequisites(): React.ReactElement {
  return (
    <section className={styles.prerequisitesSection}>
      <h2 className={styles.sectionTitle}>Prerequisites</h2>
      <div className={styles.prerequisites}>
        <div className={styles.prerequisite}>
          <h3 className={styles.prereqTitle}>Node.js</h3>
          <p className={styles.prereqText}>Version 16.0 or higher</p>
        </div>
        <div className={styles.prerequisite}>
          <h3 className={styles.prereqTitle}>Git</h3>
          <p className={styles.prereqText}>For version control</p>
        </div>
        <div className={styles.prerequisite}>
          <h3 className={styles.prereqTitle}>Code Editor</h3>
          <p className={styles.prereqText}>VS Code recommended</p>
        </div>
        <div className={styles.prerequisite}>
          <h3 className={styles.prereqTitle}>Terminal</h3>
          <p className={styles.prereqText}>Command line interface</p>
        </div>
      </div>
    </section>
  );
}
