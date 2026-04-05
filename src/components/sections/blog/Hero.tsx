import React from 'react';
import styles from '../../../styles/components/sections/blog/Hero.module.css';;

export function BlogHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Engineering Blog</h1>
        <p className={styles.subtitle}>
          Deep dives into system architecture, engineering principles, and journey to becoming a 100xEngineer.
        </p>
      </div>
    </section>
  );
}
