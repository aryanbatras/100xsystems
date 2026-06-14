import Image from 'next/image';
import styles from '../../_styles/components/sections/about/Systems.module.css';

export default function Systems() {
  return (
    <div className={styles.systemsSection}>
      <h2 className={styles.sectionTitle}>Core Systems Knowledge</h2>
      
      <div className={styles.systemsContent}>
        <div className={styles.systemsBlock}>
          <div className={styles.systemsIcon}>
            <Image
              src="/assets/illustrations/undraw_web-development_f0tp.svg"
              alt="Networking Systems"
              width={60}
              height={60}
            />
          </div>
          <h3 className={styles.blockTitle}>Universal Fundamentals</h3>
          <p className={styles.blockText}>
            Systems knowledge isn't domain-specific. Networking, operating systems, and databases 
            form the foundation of every system. Without understanding these three fundamentals, 
            no system can be built effectively.
          </p>
        </div>

        <div className={styles.systemsBlock}>
          <div className={styles.systemsIcon}>
            <Image
              src="/assets/illustrations/undraw_ideation_r1g5.svg"
              alt="System Architecture"
              width={60}
              height={60}
            />
          </div>
          <h3 className={styles.blockTitle}>Tools vs Understanding</h3>
          <p className={styles.blockText}>
            Tools teach you what to use. Systems teach you how things work internally. 
            This understanding separates junior engineers from senior engineers and enables 
            architectural decision-making.
          </p>
        </div>

        <div className={styles.systemsBlock}>
          <div className={styles.systemsIcon}>
            <Image
              src="/assets/illustrations/undraw_proud-coder_bivp.svg"
              alt="Career Growth"
              width={60}
              height={60}
            />
          </div>
          <h3 className={styles.blockTitle}>Career Acceleration</h3>
          <p className={styles.blockText}>
            What separates junior from senior engineers? Only systems understanding. 
            System architects, principal engineers, and tech leads don't code daily—they make 
            architectural decisions because they've spent years understanding systems.
          </p>
        </div>
      </div>
    </div>
  );
}
