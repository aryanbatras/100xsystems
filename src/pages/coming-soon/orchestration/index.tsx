import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function Orchestration() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/black-glasses-how-does-llm-work-text-thought-video-google-deepmind.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.title}>Orchestration</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Kubernetes, service mesh, and container orchestration patterns for scalable microservices.
        </p>
      </div>
    </div>
  );
}
