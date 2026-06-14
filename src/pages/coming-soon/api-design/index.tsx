import React from 'react';
import styles from '../../../presentation/_styles/css/coming-soon.module.css';;

export default function ApiDesign() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/abstract-light-color-files-tasks-animation-google-deepmind.gif' alt='' />
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
