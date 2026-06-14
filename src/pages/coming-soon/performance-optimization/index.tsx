import React from 'react';
import styles from '../../../presentation/_styles/coming-soon.module.css';;

export default function PerformanceOptimization() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/black-boxes-advanced-abstract-animation-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Performance Optimization</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Code optimization techniques, profiling, memory management, and performance tuning strategies.
        </p>
      </div>
    </div>
  );
}
