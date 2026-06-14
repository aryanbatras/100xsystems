import React from 'react';
import styles from '../../../presentation/_styles/css/coming-soon.module.css';;

export default function Documentation() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/ai-search-systems-connecting-light-animation-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Documentation</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Comprehensive documentation, API references, and technical guides for all system components.
        </p>
      </div>
    </div>
  );
}
