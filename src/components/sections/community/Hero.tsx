import React from 'react';
import styles from './Hero.module.css';

export function CommunityHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Community Guidelines</h1>
        <p className={styles.subtitle}>
          Our community is built on respect, collaboration, and the shared goal of engineering excellence.
        </p>
      </div>
    </section>
  );
}
