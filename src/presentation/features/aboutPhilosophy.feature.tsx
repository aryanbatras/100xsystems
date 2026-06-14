'use client';

import Image from 'next/image';
import philosophyStyles from '../_styles/css/sections-about-philosophy.module.css';

export function Philosophy() {
  return (
    <div className={`${philosophyStyles.philosophySection} glass-card section-padding`}>
      <div className={philosophyStyles.philosophyHeader}>
        <h2 className={philosophyStyles.sectionTitle}>The 100x Philosophy</h2>
        <div className={philosophyStyles.philosophyIllustration}>
          <Image
            src="/assets/illustrations/undraw_ideation_r1g5.svg"
            alt="Ideation Process"
            width={200}
            height={150}
            className={philosophyStyles.sectionIllustration}
          />
        </div>
      </div>

      <div className={philosophyStyles.philosophyContent}>
        <div className={philosophyStyles.philosophyBlock}>
          <h3 className={philosophyStyles.blockTitle}>Depth Over Breadth</h3>
          <p className={philosophyStyles.blockText}>
            Learn deeply instead of broadly. Master fundamentals that
            never become obsolete.
          </p>
        </div>

        <div className={philosophyStyles.philosophyBlock}>
          <h3 className={philosophyStyles.blockTitle}>Systems Thinking</h3>
          <p className={philosophyStyles.blockText}>
            Build systems, not just code. Understand how pieces fit
            together.
          </p>
        </div>

        <div className={philosophyStyles.philosophyBlock}>
          <h3 className={philosophyStyles.blockTitle}>Practical Excellence</h3>
          <p className={philosophyStyles.blockText}>
            Build real projects. Get feedback from people who&apos;ve actually
            shipped software.
          </p>
        </div>
      </div>
    </div>
  );
}
