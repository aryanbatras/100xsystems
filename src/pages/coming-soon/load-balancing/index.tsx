import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';;

export default function LoadBalancing() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/black-boxes-advanced-abstract-animation-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Load Balancing</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Understanding load balancing algorithms, strategies, and implementation patterns for high-availability systems.
        </p>
      </div>
    </div>
  );
}
