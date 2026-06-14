'use client';

import Image from 'next/image';
import systemsStyles from '../_styles/css/sections-about-systems.module.css';

export function Systems() {
  return (
    <div className={`${systemsStyles.systemsSection} glass-card section-padding`}>
      <h2 className={systemsStyles.sectionTitle}>Core Systems Knowledge</h2>

      <div className={systemsStyles.systemsContent}>
        <div className={systemsStyles.systemsBlock}>
          <div className={systemsStyles.systemsIcon}>
            <Image
              src="/assets/illustrations/undraw_web-development_f0tp.svg"
              alt="Networking Systems"
              width={60}
              height={60}
            />
          </div>
          <h3 className={systemsStyles.blockTitle}>Universal Fundamentals</h3>
          <p className={systemsStyles.blockText}>
            Systems knowledge isn&apos;t domain-specific. Networking, operating systems, and databases{' '}
            form the foundation of every system. Without understanding these three fundamentals,{' '}
            no system can be built effectively.
          </p>
        </div>

        <div className={systemsStyles.systemsBlock}>
          <div className={systemsStyles.systemsIcon}>
            <Image
              src="/assets/illustrations/undraw_ideation_r1g5.svg"
              alt="System Architecture"
              width={60}
              height={60}
            />
          </div>
          <h3 className={systemsStyles.blockTitle}>Tools vs Understanding</h3>
          <p className={systemsStyles.blockText}>
            Tools teach you what to use. Systems teach you how things work internally.{' '}
            This understanding separates junior engineers from senior engineers and enables{' '}
            architectural decision-making.
          </p>
        </div>

        <div className={systemsStyles.systemsBlock}>
          <div className={systemsStyles.systemsIcon}>
            <Image
              src="/assets/illustrations/undraw_proud-coder_bivp.svg"
              alt="Career Growth"
              width={60}
              height={60}
            />
          </div>
          <h3 className={systemsStyles.blockTitle}>Career Acceleration</h3>
          <p className={systemsStyles.blockText}>
            What separates junior from senior engineers? Only systems understanding.{' '}
            System architects, principal engineers, and tech leads don&apos;t code daily—they make{' '}
            architectural decisions because they&apos;ve spent years understanding systems.
          </p>
        </div>
      </div>
    </div>
  );
}
