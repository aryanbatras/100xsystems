import React from 'react';
import styles from '../../../presentation/_styles/coming-soon.module.css';;

export default function DatabaseDesign() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/black-boxes-advanced-abstract-animation-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Database Design</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Normalization, indexing strategies, query optimization, and database design patterns for performance.
        </p>
      </div>
    </div>
  );
}
