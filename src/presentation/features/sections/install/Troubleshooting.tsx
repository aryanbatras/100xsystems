import React from 'react';
import styles from '../../../_styles/components/sections/install/Troubleshooting.module.css';;

export function Troubleshooting(): React.ReactElement {
  return (
    <section className={styles.troubleshootingSection}>
      <h2 className={styles.sectionTitle}>Troubleshooting</h2>
      <div className={styles.issues}>
        <div className={styles.issue}>
          <h3 className={styles.issueTitle}>Port Already in Use</h3>
          <p className={styles.issueText}>Change port: npm run dev -- -p 3001</p>
        </div>
        <div className={styles.issue}>
          <h3 className={styles.issueTitle}>Permission Denied</h3>
          <p className={styles.issueText}>Run with sudo or check file permissions</p>
        </div>
        <div className={styles.issue}>
          <h3 className={styles.issueTitle}>Module Not Found</h3>
          <p className={styles.issueText}>Clear cache: rm -rf node_modules && npm install</p>
        </div>
        <div className={styles.issue}>
          <h3 className={styles.issueTitle}>Build Fails</h3>
          <p className={styles.issueText}>Check Node.js version and update dependencies</p>
        </div>
      </div>
    </section>
  );
}
