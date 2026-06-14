'use client';

import Image from 'next/image';
import pathwayStyles from '../_styles/css/sections-about-pathway.module.css';

export function Pathway() {
  return (
    <div className={`${pathwayStyles.pathwaySection} glass-card section-padding`}>
      <div className={pathwayStyles.pathwayHeader}>
        <h2 className={pathwayStyles.sectionTitle}>The Engineering Pathway</h2>
        <div className={pathwayStyles.pathwayIllustration}>
          <Image
            src="/assets/illustrations/undraw_project-completed_ug9i.svg"
            alt="Project Completion"
            width={200}
            height={150}
            className={pathwayStyles.sectionIllustration}
          />
        </div>
      </div>

      <div className={pathwayStyles.pathwayStages}>
        <div className={pathwayStyles.stage}>
          <div className={pathwayStyles.stageNumber}>01</div>
          <div className={pathwayStyles.stageContent}>
            <h3 className={pathwayStyles.stageTitle}>Foundation</h3>
            <p className={pathwayStyles.stageDesc}>
              Master one language properly. Learn CS basics that actually
              matter.
            </p>
          </div>
        </div>

        <div className={pathwayStyles.stage}>
          <div className={pathwayStyles.stageNumber}>02</div>
          <div className={pathwayStyles.stageContent}>
            <h3 className={pathwayStyles.stageTitle}>Systems Architecture</h3>
            <p className={pathwayStyles.stageDesc}>
              Build things that don&apos;t break. Learn databases, APIs, and
              deployment.
            </p>
          </div>
        </div>

        <div className={pathwayStyles.stage}>
          <div className={pathwayStyles.stageNumber}>03</div>
          <div className={pathwayStyles.stageContent}>
            <h3 className={pathwayStyles.stageTitle}>Engineering Excellence</h3>
            <p className={pathwayStyles.stageDesc}>
              Write professional code. Learn testing, security, and
              performance.
            </p>
          </div>
        </div>

        <div className={pathwayStyles.stage}>
          <div className={pathwayStyles.stageNumber}>04</div>
          <div className={pathwayStyles.stageContent}>
            <h3 className={pathwayStyles.stageTitle}>Leadership &amp; Innovation</h3>
            <p className={pathwayStyles.stageDesc}>
              Lead projects. Make technical decisions. Stay relevant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
