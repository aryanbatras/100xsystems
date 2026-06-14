import React from 'react';
import styles from '../../../presentation/_styles/coming-soon.module.css';;

export default function Orchestration() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/black-glasses-how-does-llm-work-text-thought-video-google-deepmind.gif' alt='' />
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
