import Image from 'next/image';
import styles from './Pathway.module.css';

export default function Pathway() {
  return (
    <div className={styles.pathwaySection}>
      <div className={styles.pathwayHeader}>
        <h2 className={styles.sectionTitle}>The Engineering Pathway</h2>
        <div className={styles.pathwayIllustration}>
          <Image
            src="/assets/illustrations/undraw_project-completed_ug9i.svg"
            alt="Project Completion"
            width={200}
            height={150}
            className={styles.sectionIllustration}
          />
        </div>
      </div>

      <div className={styles.pathwayStages}>
        <div className={styles.stage}>
          <div className={styles.stageNumber}>01</div>
          <div className={styles.stageContent}>
            <h3 className={styles.stageTitle}>Foundation</h3>
            <p className={styles.stageDesc}>
              Master one language properly. Learn CS basics that actually
              matter.
            </p>
          </div>
        </div>

        <div className={styles.stage}>
          <div className={styles.stageNumber}>02</div>
          <div className={styles.stageContent}>
            <h3 className={styles.stageTitle}>Systems Architecture</h3>
            <p className={styles.stageDesc}>
              Build things that don't break. Learn databases, APIs, and
              deployment.
            </p>
          </div>
        </div>

        <div className={styles.stage}>
          <div className={styles.stageNumber}>03</div>
          <div className={styles.stageContent}>
            <h3 className={styles.stageTitle}>Engineering Excellence</h3>
            <p className={styles.stageDesc}>
              Write professional code. Learn testing, security, and
              performance.
            </p>
          </div>
        </div>

        <div className={styles.stage}>
          <div className={styles.stageNumber}>04</div>
          <div className={styles.stageContent}>
            <h3 className={styles.stageTitle}>Leadership & Innovation</h3>
            <p className={styles.stageDesc}>
              Lead projects. Make technical decisions. Stay relevant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
