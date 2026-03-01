import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function DistributedSystems() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Distributed Systems</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Deep dive into distributed systems concepts, consensus algorithms, and distributed computing patterns.
        </p>
      </div>
    </div>
  );
}
