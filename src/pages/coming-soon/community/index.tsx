import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';;

export default function Community() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Community Guidelines</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Community standards, code of conduct, and guidelines for participating in the 100XSystems developer community.
        </p>
      </div>
    </div>
  );
}
