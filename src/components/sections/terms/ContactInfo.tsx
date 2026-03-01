import React from 'react';
import styles from './ContactInfo.module.css';

export function ContactInfo(): React.ReactElement {
  return (
    <section className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Contact Information</h2>
      <div className={styles.content}>
        <p className={styles.description}>
          If you have any questions about these Terms of Service, please contact us.
        </p>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <h3 className={styles.contactHeading}>Email</h3>
            <p className={styles.contactDetail}>admin@100xsystems.dev</p>
          </div>
          <div className={styles.contactItem}>
            <h3 className={styles.contactHeading}>Website</h3>
            <p className={styles.contactDetail}>www.100xsystems.dev</p>
          </div>
          <div className={styles.contactItem}>
            <h3 className={styles.contactHeading}>Response Time</h3>
            <p className={styles.contactDetail}>We typically respond within 24-48 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}
