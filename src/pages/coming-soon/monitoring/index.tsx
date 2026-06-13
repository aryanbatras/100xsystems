import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function Monitoring() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.gif"
      </img>
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
