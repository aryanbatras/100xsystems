import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function CICD() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/black-boxes-advanced-abstract-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>CI/CD Pipelines</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Continuous Integration and Continuous Deployment strategies, pipeline design, and automation best practices.
        </p>
      </div>
    </div>
  );
}
