import React from 'react';
import Image from 'next/image';
import styles from '../../../styles/components/sections/team/TeamMembers.module.css';;

export function TeamMembers(): React.ReactElement {
  return (
    <section className={styles.teamSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Our Team</h2>
        <p className={styles.sectionDescription}>
          Meet the foundation of 100xSystems. We're a small, dedicated team passionate about 
          transforming developers into 100xEngineers.
        </p>
      </div>
      
      <div className={styles.teamGrid}>
        <div className={styles.memberCard}>
          <div className={styles.memberImage}>
            <Image 
              src="/assets/illustrations/undraw_developer-avatar_f6ac.svg" 
              alt="Aryan Batra"
              width={80}
              height={80}
              className={styles.avatarImage}
            />
          </div>
          <h3 className={styles.memberName}>Aryan Batra</h3>
          <p className={styles.memberRole}>Founder & Lead Engineer</p>
          <p className={styles.memberDescription}>
            Visionary behind 100xSystems with expertise in system architecture and engineering education. 
            Passionate about depth-first learning and building exceptional engineers.
          </p>
        </div>
      </div>
      
      <div className={styles.hiringSection}>
        <div className={styles.hiringMessage}>
          <h3>We're Growing!</h3>
          <p>
            We're looking for talented engineers, educators, and community builders to join our mission. 
            If you're passionate about engineering education and want to help shape the future of 
            developer training, we'd love to hear from you.
          </p>
          <div className={styles.openPositions}>
            <h4>Open to Collaboration:</h4>
            <ul>
              <li>Technical Content Creators</li>
              <li>System Architecture Experts</li>
              <li>Community Managers</li>
              <li>Engineering Mentors</li>
            </ul>
          </div>
          <a href="/contact" className={styles.joinButton}>Get in Touch</a>
        </div>
      </div>
    </section>
  );
}
