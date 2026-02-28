import Image from 'next/image';
import styles from './Mission.module.css';

export default function Mission() {
  return (
    <div className={styles.missionSection}>
      <div className={styles.missionContent}>
        <div className={styles.missionLeft}>
          <Image
            src="/assets/illustrations/undraw_deep-thinker-avatar_6xg6.svg"
            alt="Deep Thinker"
            width={300}
            height={300}
            className={styles.missionImage}
          />
        </div>
        <div className={styles.missionRight}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            We want engineers to learn systems in college itself, not spend 10 years discovering what 
            senior architects already know. With the right resources and structured path, systems knowledge 
            can be gained during education years, accelerating career growth by decades.
          </p>
          <p className={styles.missionText}>
            This is not a commercial venture—it's for developer welfare. While many projects exist, 
            nobody talks about systems with such depth. We're building that missing bridge between 
            rapid development skills and deep systems understanding.
          </p>
          <p className={styles.missionText}>
            Every article includes practical assignments and assessments with outsourced authentic resources. 
            Learn fundamentals, then see how they connect across domains—because systems thinking 
            is the new baseline for engineering excellence.
          </p>
        </div>
      </div>
    </div>
  );
}
