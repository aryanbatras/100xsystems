import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function Containerization() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Containerization</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Docker containers, container orchestration, and containerization best practices for modern applications.
        </p>
      </div>
    </div>
  );
}
