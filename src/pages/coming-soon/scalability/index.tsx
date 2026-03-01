import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function Scalability() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Scalability Patterns</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Learn about horizontal and vertical scaling strategies, load distribution, and performance optimization techniques.
        </p>
      </div>
    </div>
  );
}
