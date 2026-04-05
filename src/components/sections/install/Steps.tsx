import React from 'react';
import styles from '../../../styles/components/sections/install/Steps.module.css';;

export function InstallationSteps(): React.ReactElement {
  return (
    <section className={styles.stepsSection}>
      <h2 className={styles.sectionTitle}>Installation Steps</h2>
      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Clone Repository</h3>
            <p className={styles.stepText}>git clone https://github.com/100xsystems/platform.git</p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Install Dependencies</h3>
            <p className={styles.stepText}>npm install</p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Start Development Server</h3>
            <p className={styles.stepText}>npm run dev</p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Open Browser</h3>
            <p className={styles.stepText}>Navigate to http://localhost:3000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
