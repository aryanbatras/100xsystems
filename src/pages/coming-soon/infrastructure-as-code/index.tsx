import React from 'react';
import styles from '../../../presentation/_styles/ComingSoon.module.css';;

export default function InfrastructureAsCode() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground}    >
        src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif"
      </img>
      <div className={styles.content}>
        <h1 className={styles.title}>Infrastructure as Code</h1>
        <p className={styles.subtitle}>Coming Soon</p>
        <p className={styles.description}>
          Terraform, CloudFormation, and IaC patterns for automated infrastructure management.
        </p>
      </div>
    </div>
  );
}
