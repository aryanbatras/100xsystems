import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function CodeSamples() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/black-boxes-advanced-abstract-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Code Samples</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Ready-to-use code examples, templates, and implementations for common software engineering patterns.
        </p>
      </div>
    </div>
  );
}
