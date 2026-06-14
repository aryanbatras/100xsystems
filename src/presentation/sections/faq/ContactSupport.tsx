import React from 'react';
import Link from 'next/link';
import styles from '../../_styles/components/sections/faq/ContactSupport.module.css';

export function ContactSupport(): React.ReactElement {
  return (
    <section className={styles.supportSection}>
      <h2 className={styles.sectionTitle}>Still Need Help?</h2>
      <p className={styles.description}>
        Can't find what you're looking for? Our support team is here to help you succeed on your engineering journey.
      </p>
      <div className={styles.contactOptions}>
        <div className={styles.contactOption}>
          <h3 className={styles.optionTitle}>Email Support</h3>
          <p className={styles.optionDescription}>Get detailed help via email</p>
          <a href="mailto:admin@100xsystems.dev" className={styles.contactButton}>Send Email</a>
        </div>
        <div className={styles.contactOption}>
          <h3 className={styles.optionTitle}>Community Forum</h3>
          <p className={styles.optionDescription}>Get help from fellow learners</p>
          <Link href="/community" className={styles.contactButton}>Visit Forum</Link>
        </div>
        <div className={styles.contactOption}>
          <h3 className={styles.optionTitle}>Live Chat</h3>
          <p className={styles.optionDescription}>Chat with our team (coming soon)</p>
          <button className={styles.contactButton} disabled>Coming Soon</button>
        </div>
      </div>
    </section>
  );
}
