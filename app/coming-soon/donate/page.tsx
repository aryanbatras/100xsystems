// Client component
// @ts-nocheck - coming soon
import React from 'react';
import styles from '@/presentation/_styles/css/coming-soon.module.css';

export default function Donate() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Donate</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Support our mission to democratize software architecture knowledge. Help us build comprehensive resources for developers worldwide.
        </p>
      </div>
    </div>
  );
}
