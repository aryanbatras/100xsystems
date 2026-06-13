import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function Blog() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Insights, tutorials, and thoughts on software architecture, system design, and engineering best practices from our team.
        </p>
      </div>
    </div>
  );
}
