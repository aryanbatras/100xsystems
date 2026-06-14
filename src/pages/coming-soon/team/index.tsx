import React from 'react';
import styles from '../../../presentation/_styles/css/coming-soon.module.css';;

export default function Team() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif' alt='' />
      <div className={styles.content}>
        <h1 className={styles.title}>Team</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Meet the brilliant minds behind 100XSystems. Our team of engineers and architects is building the future of software design.
        </p>
      </div>
    </div>
  );
}
