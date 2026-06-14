import React from 'react';
import styles from '../../../presentation/_styles/coming-soon.module.css';;

export default function ArchitecturalPatterns() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/shinning-mirror-advanced-abstract-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Architectural Patterns</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Discover MVC, MVP, MVVM, Layered Architecture, and other architectural patterns for scalable applications.
        </p>
      </div>
    </div>
  );
}
