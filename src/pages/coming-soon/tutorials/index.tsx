import React from 'react';
import styles from '../../../presentation/_styles/css/coming-soon.module.css';;

export default function Tutorials() {
  return (
    <div className={styles.container}>
      <div 
        className={styles.videoBackground}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Technical Tutorials</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Step-by-step tutorials, hands-on labs, and practical guides for software engineering concepts.
        </p>
      </div>
    </div>
  );
}
