import React from 'react';
import styles from '../../_styles/components/sections/install/Hero.module.css';;

export function InstallHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Installation Guide</h1>
        <p className={styles.subtitle}>
          Get started with 100xSystems by following our step-by-step installation instructions.
        </p>
      </div>
    </section>
  );
}
