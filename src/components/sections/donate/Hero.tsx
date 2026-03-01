import React from 'react';
import styles from './Hero.module.css';

export function DonateHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Support 100xSystems</h1>
        <p className={styles.subtitle}>
          Your contribution helps us continue building the best platform for engineering education.
        </p>
      </div>
    </section>
  );
}
