import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function DatabaseDesign() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/black-boxes-advanced-abstract-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
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
