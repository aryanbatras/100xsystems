import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function BestPractices() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Best Practices</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Industry best practices, coding standards, and guidelines for building robust software systems.
        </p>
      </div>
    </div>
  );
}
