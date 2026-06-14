import React from 'react';
import styles from '../../../presentation/_styles/css/coming-soon.module.css';;

export default function TestingStrategies() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/ai-search-systems-connecting-light-animation-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Testing Strategies</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Unit testing, integration testing, TDD, BDD, and comprehensive testing strategies for reliable software.
        </p>
      </div>
    </div>
  );
}
