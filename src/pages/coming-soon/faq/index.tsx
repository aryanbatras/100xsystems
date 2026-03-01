import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function FAQ() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/shinning-mirror-advanced-abstract-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>FAQ</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Frequently asked questions about our platform, design patterns, and best practices for software architecture.
        </p>
      </div>
    </div>
  );
}
