import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function CreationalPatterns() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Creational Patterns</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Explore Singleton, Factory, Builder, Prototype, and other creational design patterns with practical examples.
        </p>
      </div>
    </div>
  );
}
