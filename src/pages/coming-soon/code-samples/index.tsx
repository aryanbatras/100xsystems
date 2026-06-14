import React from 'react';
import styles from '../../../presentation/_styles/coming-soon.module.css';;

export default function CodeSamples() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/black-boxes-advanced-abstract-animation-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Code Samples</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Ready-to-use code examples, templates, and implementations for common software engineering patterns.
        </p>
      </div>
    </div>
  );
}
