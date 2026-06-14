'use client';

import Image from 'next/image';
import differenceStyles from '../_styles/css/sections-about-difference.module.css';

export function Difference() {
  return (
    <div className={`${differenceStyles.differenceSection} glass-card section-padding`}>
      <div className={differenceStyles.differenceHeader}>
        <h2 className={differenceStyles.sectionTitle}>What Makes Us Different</h2>
        <div className={differenceStyles.differenceIllustration}>
          <Image
            src="/assets/illustrations/undraw_a-woman-avatar_ifsl.svg"
            alt="Excellence"
            width={200}
            height={150}
            className={differenceStyles.sectionIllustration}
          />
        </div>
      </div>

      <div className={differenceStyles.differenceGrid}>
        <div className={differenceStyles.differenceItem}>
          <h4 className={differenceStyles.differenceTitle}>No Shortcuts</h4>
          <p className={differenceStyles.differenceText}>
            No magic formulas. Just hard work and smart practice.
          </p>
        </div>

        <div className={differenceStyles.differenceItem}>
          <h4 className={differenceStyles.differenceTitle}>Industry Mentors</h4>
          <p className={differenceStyles.differenceText}>
            Learn from engineers who actually build things, not just talk
            about them.
          </p>
        </div>

        <div className={differenceStyles.differenceItem}>
          <h4 className={differenceStyles.differenceTitle}>Real Projects</h4>
          <p className={differenceStyles.differenceText}>
            Build projects you can show to employers. Not tutorial
            copy-paste.
          </p>
        </div>
      </div>
    </div>
  );
}
