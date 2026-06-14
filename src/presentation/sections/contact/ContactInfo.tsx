import CubeHover from '../../animation/CubeHover';
import styles from '../../_styles/components/sections/contact/ContactInfo.module.css';;

export default function ContactInfo() {
  return (
    <div className={styles.contactInfo}>
      <h2 className={styles.infoTitle}>Contact Information</h2>

      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>Email</div>
        <div className={styles.infoValue}>
          <a
            href="mailto:admin@100xSystems.dev"
            className={styles.infoLink}
          >
            admin@100xSystems.dev
          </a>
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>Business Hours</div>
        <div className={styles.infoValue}>
          Monday - Friday: 9:00 AM - 6:00 PM EST
          <br />
          Saturday - Sunday: Closed
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>Response Time</div>
        <div className={styles.infoValue}>
          We typically respond within 24 hours during business days.
        </div>
      </div>
      <section className={styles.cubeShowcase}>
        <div className={styles.cubeContainer}>
          <CubeHover />
        </div>
      </section>
    </div>
  );
}
