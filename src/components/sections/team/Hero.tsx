import React from 'react';
import styles from '../../../styles/components/sections/team/Hero.module.css';;

export function TeamHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Meet Our Team</h1>
        <p className={styles.subtitle}>
          The passionate minds behind 100xSystems, dedicated to transforming developers into 100xEngineers through structured learning and system optimization.
        </p>
      </div>
    </section>
  );
}
