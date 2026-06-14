import Image from 'next/image';
import styles from '../../_styles/components/sections/about/Difference.module.css';

export default function Difference() {
  return (
    <div className={styles.differenceSection}>
      <div className={styles.differenceHeader}>
        <h2 className={styles.sectionTitle}>What Makes Us Different</h2>
        <div className={styles.differenceIllustration}>
          <Image
            src="/assets/illustrations/undraw_a-woman-avatar_ifsl.svg"
            alt="Excellence"
            width={200}
            height={150}
            className={styles.sectionIllustration}
          />
        </div>
      </div>

      <div className={styles.differenceGrid}>
        <div className={styles.differenceItem}>
          <h4 className={styles.differenceTitle}>No Shortcuts</h4>
          <p className={styles.differenceText}>
            No magic formulas. Just hard work and smart practice.
          </p>
        </div>

        <div className={styles.differenceItem}>
          <h4 className={styles.differenceTitle}>Industry Mentors</h4>
          <p className={styles.differenceText}>
            Learn from engineers who actually build things, not just talk
            about them.
          </p>
        </div>

        <div className={styles.differenceItem}>
          <h4 className={styles.differenceTitle}>Real Projects</h4>
          <p className={styles.differenceText}>
            Build projects you can show to employers. Not tutorial
            copy-paste.
          </p>
        </div>
      </div>
    </div>
  );
}
