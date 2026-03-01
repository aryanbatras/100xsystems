import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function Documentation() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Documentation</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Comprehensive documentation, API references, and technical guides for all system components.
        </p>
      </div>
    </div>
  );
}
