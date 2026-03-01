import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function TestingStrategies() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Testing Strategies</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Unit testing, integration testing, TDD, BDD, and comprehensive testing strategies for reliable software.
        </p>
      </div>
    </div>
  );
}
