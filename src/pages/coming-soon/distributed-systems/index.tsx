import React from 'react';
import styles from '../../../presentation/_styles/coming-soon.module.css';;

export default function DistributedSystems() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Distributed Systems</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Deep dive into distributed systems concepts, consensus algorithms, and distributed computing patterns.
        </p>
      </div>
    </div>
  );
}
