import React from 'react';
import styles from '../../../presentation/_styles/coming-soon.module.css';;

export default function Status() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/black-glasses-how-does-llm-work-text-thought-video-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>System Status</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Real-time system monitoring, uptime statistics, and service status dashboard.
        </p>
      </div>
    </div>
  );
}
