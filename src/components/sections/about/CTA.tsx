import styles from '../../styles/components/sections/about/CTA.module.css';

export default function AboutCTA() {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          Join the Engineering Revolution
        </h2>
        <p className={styles.ctaText}>
          Stop collecting certificates. Start building real skills.
        </p>

        <div className={styles.contactLinks}>
          <a
            href="https://www.100xsystems.dev"
            className={styles.contactLink}
          >
            100xsystems.dev
          </a>
          <span className={styles.separator}>•</span>
          <a
            href="mailto:admin@100xsystems.dev"
            className={styles.contactLink}
          >
            admin@100xsystems.dev
          </a>
          <span className={styles.separator}>•</span>
          <a
            href="https://www.linkedin.com/company/100xsystems/"
            className={styles.contactLink}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
