'use client';

import Image from 'next/image';
import valuesStyles from '../_styles/css/sections-about-values.module.css';

export function Values() {
  return (
    <div className={`${valuesStyles.valuesSection} glass-card section-padding`}>
      <h2 className={valuesStyles.sectionTitle}>Core Values</h2>
      <div className={valuesStyles.valuesGrid}>
        <div className={valuesStyles.valueCard}>
          <div className={valuesStyles.valueIcon}>
            <Image
              src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
              alt="Continuous Learning"
              width={100}
              height={100}
            />
          </div>
          <h3 className={valuesStyles.valueTitle}>Continuous Learning</h3>
          <p className={valuesStyles.valueDescription}>
            Technology changes constantly. Good engineers keep learning.
          </p>
        </div>
        <div className={valuesStyles.valueCard}>
          <div className={valuesStyles.valueIcon}>
            <Image
              src="/assets/illustrations/undraw_code-contribution_8k0x.svg"
              alt="Collaborative Excellence"
              width={100}
              height={100}
            />
          </div>
          <h3 className={valuesStyles.valueTitle}>Collaborative Excellence</h3>
          <p className={valuesStyles.valueDescription}>
            Great software is built by teams. Learn to work with others.
          </p>
        </div>
        <div className={valuesStyles.valueCard}>
          <div className={valuesStyles.valueIcon}>
            <Image
              src="/assets/illustrations/undraw_bright-ideas_z7u9.svg"
              alt="Innovation & Pragmatism"
              width={100}
              height={100}
            />
          </div>
          <h3 className={valuesStyles.valueTitle}>Innovation &amp; Pragmatism</h3>
          <p className={valuesStyles.valueDescription}>
            Use the right tool for the job. Don&apos;t over-engineer.
          </p>
        </div>
      </div>
    </div>
  );
}
