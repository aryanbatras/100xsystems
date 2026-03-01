import React from 'react';
import styles from './Stories.module.css';

export function SuccessStories(): React.ReactElement {
  return (
    <section className={styles.storiesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Success Stories</h2>
        <p className={styles.sectionDescription}>
          Coming Soon! We're excited to share the success stories of our future 100xEngineers. 
          As our community grows, we'll feature real transformations and achievements from developers 
          who have completed our program.
        </p>
      </div>
      
      <div className={styles.comingSoonContainer}>
        <div className={styles.comingSoonMessage}>
          <h3>Be the First Success Story</h3>
          <p>
            We're just getting started! Join our program today and you could be one of the first 
            developers to transform into a 100xEngineer. Your journey could inspire thousands of others.
          </p>
          <a href="/contact" className={styles.getStartedButton}>Start Your Journey</a>
        </div>
      </div>
    </section>
  );
}
