import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function Contribute() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Contribute</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Join our community of developers and architects. Contribute patterns, share knowledge, and help shape the future of software design.
        </p>
      </div>
    </div>
  );
}
