import React from 'react';
import styles from '../../../styles/ComingSoon.module.css';

export default function Team() {
  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay loop muted playsInline>
        <source src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.mp4" type="video/mp4" />
      </video>
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
