import React from 'react';
import styles from '../../styles/components/sections/privacy/PrivacyContent.module.css';

export function PrivacyContent(): React.ReactElement {
  return (
    <section className={styles.privacySection}>
      <h2 className={styles.sectionTitle}>Our Privacy Policy</h2>
      <div className={styles.content}>
        <p className={styles.description}>
          At 100xSystems, we are committed to protecting your privacy and ensuring the security of your personal information.
        </p>
        <div className={styles.sections}>
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>Information We Collect</h3>
            <p className={styles.text}>
              We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>How We Use Your Information</h3>
            <p className={styles.text}>
              We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>Information Sharing</h3>
            <p className={styles.text}>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>Data Security</h3>
            <p className={styles.text}>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
