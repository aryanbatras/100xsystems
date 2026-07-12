// Client component
// @ts-nocheck - coming soon
import React from 'react';
import styles from '@/presentation/_styles/css/coming-soon.module.css';

export default function Containerization() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/ai-search-systems-connecting-light-animation-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Containerization</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Docker containers, container orchestration, and containerization best practices for modern applications.
        </p>
      </div>
    </div>
  );
}
