import React from 'react';
import styles from '../../../presentation/_styles/coming-soon.module.css';;

export default function FAQ() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/shinning-mirror-advanced-abstract-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>FAQ</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Frequently asked questions about our platform, design patterns, and best practices for software architecture.
        </p>
      </div>
    </div>
  );
}
