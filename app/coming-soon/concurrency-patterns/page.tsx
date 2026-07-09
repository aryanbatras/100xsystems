// Client component
// @ts-nocheck - coming soon
import React from 'react';
import styles from '@/presentation/_styles/css/coming-soon.module.css';

export default function ConcurrencyPatterns() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/shinning-mirror-advanced-abstract-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Concurrency Patterns</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Thread Pool, Producer-Consumer, Read-Write Lock, and other concurrency patterns for multi-threaded applications.
        </p>
      </div>
    </div>
  );
}
