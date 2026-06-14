import Image from 'next/image';
import styles from '../../../_styles/components/sections/about/Values.module.css';

export default function Values() {
  return (
    <div className={styles.valuesSection}>
      <h2 className={styles.sectionTitle}>Core Values</h2>
      <div className={styles.valuesGrid}>
        <div className={styles.valueCard}>
          <div className={styles.valueIcon}>
            <Image
              src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
              alt="Continuous Learning"
              width={100}
              height={100}
            />
          </div>
          <h3 className={styles.valueTitle}>Continuous Learning</h3>
          <p className={styles.valueDescription}>
            Technology changes constantly. Good engineers keep learning.
          </p>
        </div>
        <div className={styles.valueCard}>
          <div className={styles.valueIcon}>
            <Image
              src="/assets/illustrations/undraw_code-contribution_8k0x.svg"
              alt="Collaborative Excellence"
              width={100}
              height={100}
            />
          </div>
          <h3 className={styles.valueTitle}>Collaborative Excellence</h3>
          <p className={styles.valueDescription}>
            Great software is built by teams. Learn to work with others.
          </p>
        </div>
        <div className={styles.valueCard}>
          <div className={styles.valueIcon}>
            <Image
              src="/assets/illustrations/undraw_bright-ideas_z7u9.svg"
              alt="Innovation & Pragmatism"
              width={100}
              height={100}
            />
          </div>
          <h3 className={styles.valueTitle}>Innovation & Pragmatism</h3>
          <p className={styles.valueDescription}>
            Use the right tool for the job. Don't over-engineer.
          </p>
        </div>
      </div>
    </div>
  );
}
