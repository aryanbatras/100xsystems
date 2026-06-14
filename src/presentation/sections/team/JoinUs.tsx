import React from 'react';
import Link from 'next/link';
import styles from '../../_styles/components/sections/team/JoinUs.module.css';;

export function JoinUs(): React.ReactElement {
  return (
    <section className={styles.joinSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.joinTitle}>Join Our Team</h2>
        <p className={styles.joinSubtitle}>
          Ready to be part of something extraordinary? We're always looking for passionate engineers who want to make a difference.
        </p>
      </div>
      
      <div className={styles.joinGrid}>
        <div className={styles.joinItem}>
          <h3 className={styles.itemTitle}>Build Impactful Systems</h3>
          <p className={styles.itemDescription}>
            Work on projects that matter and help thousands of developers become 100xEngineers.
          </p>
        </div>
        
        <div className={styles.joinItem}>
          <h3 className={styles.itemTitle}>Grow with Excellence</h3>
          <p className={styles.itemDescription}>
            Learn from the best minds in engineering and accelerate your career growth.
          </p>
        </div>
        
        <div className={styles.joinItem}>
          <h3 className={styles.itemTitle}>Shape the Future</h3>
          <p className={styles.itemDescription}>
            Influence the direction of engineering education and system design.
          </p>
        </div>
      </div>
      
      <div className={styles.joinActions}>
        <Link href="/contact" className={styles.primaryButton}>
          Apply Now
        </Link>
        
        <Link href="/contribute" className={styles.secondaryButton}>
          Contribute First
        </Link>
      </div>
    </section>
  );
}
