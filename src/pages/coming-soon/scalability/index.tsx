import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function Scalability() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Scalability Patterns</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Learn about horizontal and vertical scaling strategies, load distribution, and performance optimization techniques.
        </p>
      </div>
    </div>
  );
}
