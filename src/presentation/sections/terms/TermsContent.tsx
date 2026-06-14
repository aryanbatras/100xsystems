import React from 'react';
import styles from '../../_styles/components/sections/terms/TermsContent.module.css';

export function TermsContent(): React.ReactElement {
  return (
    <section className={styles.termsSection}>
      <h2 className={styles.sectionTitle}>Terms of Service</h2>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionHeading}>1. Acceptance of Terms</h3>
          <p className={styles.text}>
            By accessing and using 100xSystems, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionHeading}>2. Use License</h3>
          <p className={styles.text}>
            Permission is granted to temporarily use 100xSystems for personal, non-commercial transitory viewing only.
          </p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionHeading}>3. Disclaimer</h3>
          <p className={styles.text}>
            The information on this platform is provided on an as-is basis. To the fullest extent permitted by law, this Company:
          </p>
          <ul className={styles.list}>
            <li>excludes all representations and warranties relating to this website and its contents</li>
            <li>makes no warranty or representation regarding the accuracy or completeness of the information</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionHeading}>4. Limitations of Liability</h3>
          <p className={styles.text}>
            In no event shall 100xSystems or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on 100xSystems.
          </p>
        </div>
      </div>
    </section>
  );
}
