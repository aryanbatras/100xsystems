import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function SecurityPatterns() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/shinning-mirror-advanced-abstract-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Security Patterns</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Authentication, authorization, encryption, and security patterns for building secure applications.
        </p>
      </div>
    </div>
  );
}
