import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function ApiDesign() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>API Design</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          RESTful API design principles, GraphQL patterns, API versioning, and best practices for scalable APIs.
        </p>
      </div>
    </div>
  );
}
