import React from 'react';
import styles from '../../../styles/components/sections/terms/Hero.module.css';

export function TermsHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.subtitle}>
          Our terms and conditions govern your use of the 100xSystems platform and services.
        </p>
      </div>
    </section>
  );
}
