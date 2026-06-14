import styles from '../../_styles/components/sections/about/Footer.module.css';

export default function AboutFooter() {
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>
        Engineering Excellence. Systematic.
      </p>
      <p className={styles.footerSubtext}>
        Advancing the future of software engineering education
      </p>
    </div>
  );
}
