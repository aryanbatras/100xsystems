import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function BehavioralPatterns() {
  return (
    <div className={styles.container}>
      <div 
        className={styles.videoBackground}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Behavioral Patterns</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Master Observer, Strategy, Command, Iterator, and other behavioral patterns for effective object interaction.
        </p>
      </div>
    </div>
  );
}
