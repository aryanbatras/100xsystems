import React from 'react';
import styles from '../../../_styles/components/sections/contribute/Hero.module.css';;

export function ContributeHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Contribute to 100xSystems</h1>
        <p className={styles.subtitle}>
          Help us build the best learning platform for engineers. Your contributions make a difference.
        </p>
      </div>
    </section>
  );
}
