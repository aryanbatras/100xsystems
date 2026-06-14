import React from 'react';
import styles from '../../../presentation/_styles/css/coming-soon.module.css';;

export default function CaseStudies() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/abstract-light-color-files-tasks-animation-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Case Studies</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Real-world case studies, success stories, and lessons learned from large-scale system implementations.
        </p>
      </div>
    </div>
  );
}
