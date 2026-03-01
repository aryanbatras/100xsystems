import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function Monitoring() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Monitoring & Observability</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Application monitoring, logging, metrics, distributed tracing, and observability strategies.
        </p>
      </div>
    </div>
  );
}
