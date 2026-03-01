import React from 'react';
import styles from '../../../../styles/ComingSoon.module.css';

export default function Microservices() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Microservices</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Comprehensive guide to microservices architecture, design patterns, and best practices.
        </p>
      </div>
    </div>
  );
}
