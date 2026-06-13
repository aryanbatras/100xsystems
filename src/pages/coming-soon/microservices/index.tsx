import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function Microservices() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Microservices</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Comprehensive guide to microservices architecture, design patterns, and best practices.
        </p>
      </div>
    </div>
  );
}
