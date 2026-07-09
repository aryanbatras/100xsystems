// Client component
// @ts-nocheck - coming soon
import React from 'react';
import styles from '@/presentation/_styles/css/coming-soon.module.css';

export default function CICD() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/black-boxes-advanced-abstract-animation-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>CI/CD Pipelines</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Continuous Integration and Continuous Deployment strategies, pipeline design, and automation best practices.
        </p>
      </div>
    </div>
  );
}
