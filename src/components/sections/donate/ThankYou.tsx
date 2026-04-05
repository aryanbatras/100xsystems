import React from 'react';
import styles from '../../styles/components/sections/donate/ThankYou.module.css';

export function ThankYou(): React.ReactElement {
  return (
    <section className={styles.thankYouSection}>
      <h2 className={styles.sectionTitle}>Thank You</h2>
      <p className={styles.description}>
        Every contribution, no matter the size, makes a difference in helping engineers achieve their full potential.
      </p>
      <div className={styles.appreciation}>
        <p className={styles.message}>
          Your support enables us to maintain and improve our platform, create new learning materials, and provide free education to aspiring engineers worldwide.
        </p>
      </div>
    </section>
  );
}
