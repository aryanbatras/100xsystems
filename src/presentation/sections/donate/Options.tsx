import React from 'react';
import styles from '../../_styles/components/sections/donate/Options.module.css';

export function DonationOptions(): React.ReactElement {
  return (
    <section className={styles.optionsSection}>
      <h2 className={styles.sectionTitle}>Donation Options</h2>
      <div className={styles.optionsGrid}>
        <div className={styles.optionCard}>
          <h3 className={styles.optionTitle}>One-time Donation</h3>
          <p className={styles.optionDescription}>Support us with a single contribution</p>
          <button className={styles.donateButton}>Donate Now</button>
        </div>
        <div className={styles.optionCard}>
          <h3 className={styles.optionTitle}>Monthly Support</h3>
          <p className={styles.optionDescription}>Become a sustaining supporter</p>
          <button className={styles.donateButton}>Subscribe</button>
        </div>
        <div className={styles.optionCard}>
          <h3 className={styles.optionTitle}>Corporate Sponsorship</h3>
          <p className={styles.optionDescription}>Partner with us as an organization</p>
          <button className={styles.donateButton}>Learn More</button>
        </div>
      </div>
    </section>
  );
}
