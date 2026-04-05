import React from 'react';
import styles from '../../styles/components/sections/success/Hero.module.css';

export function SuccessStoriesHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Success Stories</h1>
        <p className={styles.subtitle}>
          Real transformations from developers to 100xEngineers. See how our approach has changed careers and built exceptional systems.
        </p>
      </div>
    </section>
  );
}
