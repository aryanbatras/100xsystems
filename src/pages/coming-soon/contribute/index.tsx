import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function Contribute() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Contribute</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Join our community of developers and architects. Contribute patterns, share knowledge, and help shape the future of software design.
        </p>
      </div>
    </div>
  );
}
