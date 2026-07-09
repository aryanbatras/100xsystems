// Client component
// @ts-nocheck - coming soon
import React from 'react';
import styles from '@/presentation/_styles/css/coming-soon.module.css';

export default function InfrastructureAsCode() {
  return (
    <div className={styles.container}>
      <img className={styles.videoBackground} src='/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif' alt='' />
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
