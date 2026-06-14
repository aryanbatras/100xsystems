'use client';

import Image from 'next/image';
import innovationStyles from '../_styles/css/sections-about-innovation.module.css';

export function Innovation() {
  return (
    <div className={`${innovationStyles.innovationSection} glass-card section-padding`}>
      <h2 className={innovationStyles.sectionTitle}>Revolutionary Learning Approach</h2>

      <div className={innovationStyles.innovationContent}>
        <div className={innovationStyles.innovationBlock}>
          <div className={innovationStyles.innovationIcon}>
            <Image
              src="/assets/illustrations/undraw_listening-to-podcasts_j0hm.svg"
              alt="Podcast Learning"
              width={60}
              height={60}
            />
          </div>
          <h3 className={innovationStyles.blockTitle}>Podcast-Based Learning</h3>
          <p className={innovationStyles.blockText}>
            Instead of 100-hour video courses that nobody watches, we break complex topics into{' '}
            5-10 minute audio segments. Listen while commuting, working, or relaxing.{' '}
            Production quality audio with noise reduction for the best learning experience.
          </p>
        </div>

        <div className={innovationStyles.innovationBlock}>
          <div className={innovationStyles.innovationIcon}>
            <Image
              src="/assets/illustrations/undraw_sharing-knowledge_2jx3.svg"
              alt="Multiple Perspectives"
              width={60}
              height={60}
            />
          </div>
          <h3 className={innovationStyles.blockTitle}>Multi-Perspective Learning</h3>
          <p className={innovationStyles.blockText}>
            One topic, multiple expert perspectives. Understand concepts from different{' '}
            senior engineers&apos; viewpoints. Switch between voices, languages (English, Hindi, Bengali, Marathi){' '}
            for native learning experience.
          </p>
        </div>

        <div className={innovationStyles.innovationBlock}>
          <div className={innovationStyles.innovationIcon}>
            <Image
              src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
              alt="Always Updated"
              width={60}
              height={60}
            />
          </div>
          <h3 className={innovationStyles.blockTitle}>Living Content</h3>
          <p className={innovationStyles.blockText}>
            Unlike stale video courses, our articles update instantly with technology changes.{' '}
            Community contributions keep content fresh. Multiple developers can collaborate on the same topic{' '}
            creating comprehensive, always-current knowledge base.
          </p>
        </div>
      </div>
    </div>
  );
}
