import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function Install() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Installation Guide</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Step-by-step installation instructions, prerequisites, and setup guide for getting started with 100XSystems.
        </p>
      </div>
    </div>
  );
}
