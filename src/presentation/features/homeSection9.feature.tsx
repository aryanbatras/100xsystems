'use client';

import sec9Styles from '../_styles/css/sections-home-section9.module.css';
import sharedStyles from '../_styles/css/sections-home-shared.module.css';

export function HomeSection9() {
  return (
    <section className={`${sec9Styles.modernSection} glass-card section-padding`}>
      <div className={sec9Styles.modernContent}>
        <div className={sec9Styles.modernImageWrapper}>
          <div className={sharedStyles.videoCard} />
        </div>
        <div className={sec9Styles.modernText}>
          <h2 className={sec9Styles.modernTitle}>Modern Engineering Stack</h2>
          <p className={sec9Styles.modernDescription}>
            Stay ahead with cutting-edge technologies and practices that define modern software engineering.
            From microservices to serverless, from containers to orchestration.
          </p>
          <div className={sec9Styles.techGrid}>
            <div className={sec9Styles.techItem}>Cloud Native</div>
            <div className={sec9Styles.techItem}>Microservices</div>
            <div className={sec9Styles.techItem}>DevOps</div>
            <div className={sec9Styles.techItem}>AI/ML Integration</div>
            <div className={sec9Styles.techItem}>Security First</div>
            <div className={sec9Styles.techItem}>Performance</div>
          </div>
        </div>
      </div>
    </section>
  );
}
