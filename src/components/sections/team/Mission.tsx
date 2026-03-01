import React from 'react';
import styles from './Mission.module.css';

export function Mission(): React.ReactElement {
  return (
    <section className={styles.missionSection}>
      <div className={styles.missionBackground}>
        <div className={styles.backgroundImage}></div>
      </div>
      
      <div className={styles.missionContent}>
        <div className={styles.contentHeader}>
          <h2 className={styles.missionTitle}>Our Mission</h2>
          <p className={styles.missionSubtitle}>
            Transforming developers into 100xEngineers through depth-first learning and systems thinking.
          </p>
        </div>
        
        <div className={styles.missionGrid}>
          <div className={styles.missionItem}>
            <h3 className={styles.itemTitle}>Depth-First Learning</h3>
            <p className={styles.itemDescription}>
              Master one technology deeply before expanding. Build strong foundations that support complex system understanding.
            </p>
          </div>
          
          <div className={styles.missionItem}>
            <h3 className={styles.itemTitle}>Systems Thinking</h3>
            <p className={styles.itemDescription}>
              See complete picture—how components interact, failures cascade, and performance scales across entire system.
            </p>
          </div>
          
          <div className={styles.missionItem}>
            <h3 className={styles.itemTitle}>Engineering Excellence</h3>
            <p className={styles.itemDescription}>
              Go beyond coding to architect solutions. Build systems that are scalable, maintainable, and truly exceptional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
