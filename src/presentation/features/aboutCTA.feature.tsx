'use client';

import ctaStyles from '../_styles/css/sections-about-cta.module.css';

export function AboutCTA() {
  return (
    <div className={`${ctaStyles.ctaSection} glass-card section-padding`}>
      <div className={ctaStyles.ctaContent}>
        <h2 className={ctaStyles.ctaTitle}>
          Join the Engineering Revolution
        </h2>
        <p className={ctaStyles.ctaText}>
          Stop collecting certificates. Start building real skills.
        </p>

        <div className={ctaStyles.contactLinks}>
          <a
            href="https://www.100xsystems.dev"
            className={ctaStyles.contactLink}
          >
            100xsystems.dev
          </a>
          <span className={ctaStyles.separator}>&bull;</span>
          <a
            href="mailto:admin@100xsystems.dev"
            className={ctaStyles.contactLink}
          >
            admin@100xsystems.dev
          </a>
          <span className={ctaStyles.separator}>&bull;</span>
          <a
            href="https://www.linkedin.com/company/100xsystems/"
            className={ctaStyles.contactLink}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
