import Image from 'next/image';
import styles from '../../../styles/components/sections/about/Philosophy.module.css';

export default function Philosophy() {
  return (
    <div className={styles.philosophySection}>
      <div className={styles.philosophyHeader}>
        <h2 className={styles.sectionTitle}>The 100x Philosophy</h2>
        <div className={styles.philosophyIllustration}>
          <Image
            src="/assets/illustrations/undraw_ideation_r1g5.svg"
            alt="Ideation Process"
            width={200}
            height={150}
            className={styles.sectionIllustration}
          />
        </div>
      </div>

      <div className={styles.philosophyContent}>
        <div className={styles.philosophyBlock}>
          <h3 className={styles.blockTitle}>Depth Over Breadth</h3>
          <p className={styles.blockText}>
            Learn deeply instead of broadly. Master fundamentals that
            never become obsolete.
          </p>
        </div>

        <div className={styles.philosophyBlock}>
          <h3 className={styles.blockTitle}>Systems Thinking</h3>
          <p className={styles.blockText}>
            Build systems, not just code. Understand how pieces fit
            together.
          </p>
        </div>

        <div className={styles.philosophyBlock}>
          <h3 className={styles.blockTitle}>Practical Excellence</h3>
          <p className={styles.blockText}>
            Build real projects. Get feedback from people who've actually
            shipped software.
          </p>
        </div>
      </div>
    </div>
  );
}
