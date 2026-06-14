'use client';

import Image from 'next/image';
import founderStyles from '../_styles/css/sections-about-founder.module.css';

export function Founder() {
  return (
    <div className={`${founderStyles.founderSection} glass-card section-padding`}>
      <div className={founderStyles.founderContent}>
        <div className={founderStyles.founderLeft}>
          <Image
            src="/aryan.webp"
            alt="Aryan Batra - Founder of 100xSystems"
            width={300}
            height={300}
            className={founderStyles.founderImage}
          />
          <div className={founderStyles.founderLinks}>
            <a
              href="https://aryanbatra.is-a.dev"
              className={founderStyles.founderLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              aryanbatra.is-a.dev
            </a>
          </div>
        </div>
        <div className={founderStyles.founderRight}>
          <h2 className={founderStyles.sectionTitle}>Founded by Aryan Batra</h2>
          <p className={founderStyles.founderText}>
            100xSystems is founded and led by Aryan Batra, who serves as
            the Founder &amp; Project Lead. With a team of 5+ contributors,
            this initiative represents a genuine commitment to elevating
            software engineering education.
          </p>
          <p className={founderStyles.founderText}>
            This isn&apos;t just another course platform—it&apos;s a personal
            mission to help software engineers become truly exceptional at
            their craft. In an era where AI can generate code, the real
            value lies in understanding systems, making architectural
            decisions, and solving problems that machines cannot.
          </p>
        </div>
      </div>
    </div>
  );
}
