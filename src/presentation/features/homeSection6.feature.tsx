'use client';

import sec6Styles from '../_styles/css/sections-home-section6.module.css';
import sharedStyles from '../_styles/css/sections-home-shared.module.css';

export function HomeSection6() {
  return (
    <section className={`${sec6Styles.illustrationSection} glass-card section-padding`}>
      <div className={`${sharedStyles.videoSideBySide} ${sec6Styles.illustrationContent}`}>
        <div className={sharedStyles.videoLeft}>
          <div className={sharedStyles.videoCard} />
        </div>
        <div className={sharedStyles.videoRight}>
          <h2 className={sharedStyles.sectionTitle}>Beyond Code, Into Engineering</h2>
          <p className={sec6Styles.illustrationText}>
            While others teach you to write code, we teach you to think like engineers.
            Understand the &apos;why&apos; behind every architectural decision, master system design principles,
            and build solutions that scale.
          </p>
          <div className={sharedStyles.illustrationPoints}>
            <div className={sharedStyles.pointItem}>
              <span className={sharedStyles.pointNumber}>01</span>
              <span className={sharedStyles.pointText}>System Architecture Mastery</span>
            </div>
            <div className={sharedStyles.pointItem}>
              <span className={sharedStyles.pointNumber}>02</span>
              <span className={sharedStyles.pointText}>Performance Engineering</span>
            </div>
            <div className={sharedStyles.pointItem}>
              <span className={sharedStyles.pointNumber}>03</span>
              <span className={sharedStyles.pointText}>Production-Ready Development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
