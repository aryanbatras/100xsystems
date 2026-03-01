import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function Install() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Installation Guide</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Step-by-step installation instructions, prerequisites, and setup guide for getting started with 100XSystems.
        </p>
      </div>
    </div>
  );
}
