'use client';

import Link from 'next/link';
import bootcampStyles from '../_styles/css/sections-home-sectionbootcamp.module.css';

export function HomeSectionBootcamp() {
  return (
    <div className={`${bootcampStyles.bootcampSection} glass-card section-padding`}>
      <div className={bootcampStyles.bootcampContainer}>
        <div className={bootcampStyles.bootcampHeader}>
          <h2 className={bootcampStyles.bootcampTitle}>
            100xSystems SDE1 Bootcamp
          </h2>
          <h3 className={bootcampStyles.bootcampSubtitle}>
            6-Month Software Engineering Program
          </h3>
          <p className={bootcampStyles.bootcampDescription}>
            A developer learns a language to build things fast. But an engineer goes into the depth of that language.
            Because strong foundation in one language is a golden key to adapt and use any language in the future.
          </p>
        </div>

        <div className={bootcampStyles.bootcampCurriculum}>
          <div className={bootcampStyles.curriculumHeader}>
            <h3>The Engineering Path</h3>
          </div>

          <div className={bootcampStyles.curriculumContent}>
            <div className={bootcampStyles.curriculumPhase}>
              <h4>Foundation in JavaScript</h4>
              <p>Strong foundation in one language is a golden key to adapt and use any language in the future</p>
            </div>

            <div className={bootcampStyles.curriculumPhase}>
              <h4>Foundations of Systems</h4>
              <p>Understanding the lifecycle of software. From frontend to backend to deployment. How scalable systems are built and the challenges faced.</p>
            </div>

            <div className={bootcampStyles.curriculumPhase}>
              <h4>Development of Systems</h4>
              <p>Building frontend, then backend. Building desktop & mobile apps. Building libraries. Building systems.</p>
            </div>

            <div className={bootcampStyles.curriculumPhase}>
              <h4>Design Patterns, Optimizations, Security</h4>
              <p>Latest in ecosystem. Best software practices. Security holes. Optimizations and practical usecases of DSA.</p>
            </div>

            <div className={bootcampStyles.curriculumPhase}>
              <h4>SecDevops & Cloud Infrastructure</h4>
              <p>Linux, Docker, Kubernetes, Terraform, Ansible, Nginx. CI/CD pipelines and securing them using SonarQube. AWS, Azure, Google Cloud.</p>
            </div>

            <div className={bootcampStyles.curriculumPhase}>
              <h4>GenAI, Automation & Data Science</h4>
              <p>Latest AI tools like Claude, Cursor. Automation workflows like n8n, active pieces. Automation backend systems like Inngest. Basics of data science.</p>
            </div>
          </div>
        </div>

        <div className={bootcampStyles.bootcampOffer}>
          <div className={bootcampStyles.offerContent}>
            <h3 className={bootcampStyles.offerTitle}>First Batch - 2027</h3>
            <p className={bootcampStyles.offerDescription}>
              We&apos;re looking for serious students who want to become engineers. <br />
              Join the first batch and help shape the future of 100xSystems.
            </p>
            <div className={bootcampStyles.offerHighlight}>
              <span className={bootcampStyles.highlightSubtext}>Qualification-based admission</span>
            </div>
          </div>
        </div>

        <div className={bootcampStyles.bootcampCTA}>
          <div className={bootcampStyles.ctaPrimary}>
            <Link href="/contact" className={bootcampStyles.ctaPrimaryLink}>
              Apply for Admission
            </Link>
            <p className={bootcampStyles.ctaNote}>Qualification-based admission - Limited seats</p>
          </div>
        </div>

        <div className={bootcampStyles.bootcampTrust}>
          <p className={bootcampStyles.trustText}>
            We&apos;re different from YouTube tutorials and traditional edtech.
            We build engineers who understand systems, not just coders who write syntax.
          </p>
        </div>
      </div>
    </div>
  );
}
