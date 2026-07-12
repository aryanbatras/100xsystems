// Client component
// @ts-nocheck - coming soon
import React from 'react';
import styles from '@/presentation/_styles/css/coming-soon.module.css';

export default function BestPractices() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Best Practices</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Industry best practices, coding standards, and guidelines for building robust software systems.
        </p>
      </div>
    </div>
  );
}
