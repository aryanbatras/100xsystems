'use client';

import footerStyles from '../_styles/css/sections-about-footer.module.css';

export function AboutFooter() {
  return (
    <div className={footerStyles.footer}>
      <p className={footerStyles.footerText}>
        Engineering Excellence. Systematic.
      </p>
      <p className={footerStyles.footerSubtext}>
        Advancing the future of software engineering education
      </p>
    </div>
  );
}
