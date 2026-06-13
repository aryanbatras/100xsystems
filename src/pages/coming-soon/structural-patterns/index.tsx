import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function StructuralPatterns() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Structural Patterns</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Learn about Adapter, Decorator, Proxy, Facade, and other structural design patterns for flexible software architecture.
        </p>
      </div>
    </div>
  );
}
