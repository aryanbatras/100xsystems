import React from 'react';
import styles from '../../../presentation/_styles/css/coming-soon.module.css';;

export default function SecurityPatterns() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/shinning-mirror-advanced-abstract-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Security Patterns</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Authentication, authorization, encryption, and security patterns for building secure applications.
        </p>
      </div>
    </div>
  );
}
