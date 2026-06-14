import React from 'react';
import styles from '../../../_styles/components/sections/blog/Newsletter.module.css';

export function Newsletter(): React.ReactElement {
  return (
    <section className={styles.newsletterSection}>
      <h2 className={styles.sectionTitle}>Stay Updated</h2>
      <p className={styles.description}>
        Get the latest insights on engineering excellence and career growth delivered to your inbox.
      </p>
      <div className={styles.newsletterForm}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className={styles.emailInput}
        />
        <button className={styles.subscribeButton}>Subscribe</button>
      </div>
    </section>
  );
}
