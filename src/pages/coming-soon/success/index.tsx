import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';;

export default function Success() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/black-boxes-advanced-abstract-animation-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Success Stories</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Real-world examples of how teams have used our patterns and strategies to build scalable, robust software systems.
        </p>
      </div>
    </div>
  );
}
