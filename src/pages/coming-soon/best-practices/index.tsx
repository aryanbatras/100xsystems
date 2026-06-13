import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function BestPractices() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif"
      </img>
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
