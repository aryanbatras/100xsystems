'use client';

import Image from 'next/image';
import principlesStyles from '../_styles/css/sections-about-core-principles.module.css';

export function CorePrinciples() {
  return (
    <section className={`${principlesStyles.corePrinciplesSection} glass-card section-padding`}>
      <div className={principlesStyles.container}>
        <h2 className={principlesStyles.sectionTitle}>Core Principles</h2>

        <div className={principlesStyles.grid}>
          <div className={principlesStyles.principleCard}>
            <div className={principlesStyles.principleIcon}>
              <Image
                src="/assets/illustrations/undraw_ideas-flow_lwpa.svg"
                alt="Systems Thinking"
                width={64}
                height={64}
                className={principlesStyles.iconImage}
              />
            </div>
            <div className={principlesStyles.principleContent}>
              <h3 className={principlesStyles.principleTitle}>Systems vs Isolated Technologies</h3>
              <p className={principlesStyles.principleText}>
                Most engineers learn technologies quickly and start building projects.{' '}
                But systems knowledge expands your perspective and makes you mature as a software engineer.{' '}
                Understanding how any technology works as a system reveals its impact across every domain.
              </p>
            </div>
          </div>

          <div className={principlesStyles.principleCard}>
            <div className={principlesStyles.principleIcon}>
              <Image
                src="/assets/illustrations/undraw_love_9mug.svg"
                alt="Engineering Excellence"
                width={64}
                height={64}
                className={principlesStyles.iconImage}
              />
            </div>
            <div className={principlesStyles.principleContent}>
              <h3 className={principlesStyles.principleTitle}>Love for Engineering</h3>
              <p className={principlesStyles.principleText}>
                This isn&apos;t just about getting a job. It&apos;s about having genuine love for engineering{' '}
                and understanding how things are made at a deep level. This website is my adventure and exploration of systems thinking,{' '}
                documenting insights so other engineers don&apos;t have to spend years discovering them.
              </p>
            </div>
          </div>

          <div className={principlesStyles.principleCard}>
            <div className={principlesStyles.principleIcon}>
              <Image
                src="/assets/illustrations/undraw_ai-agent_pdkp.svg"
                alt="Human Engineering"
                width={64}
                height={64}
                className={principlesStyles.iconImage}
              />
            </div>
            <div className={principlesStyles.principleContent}>
              <h3 className={principlesStyles.principleTitle}>Real Engineering vs AI Tools</h3>
              <p className={principlesStyles.principleText}>
                AI can help develop things faster, but you must understand the system first{' '}
                to use tools effectively. AI can&apos;t build complex systems without deep system understanding.{' '}
                Real engineers build things themselves because they&apos;ve explored similar domains with such depth.
              </p>
            </div>
          </div>

          <div className={principlesStyles.principleCard}>
            <div className={principlesStyles.principleIcon}>
              <Image
                src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
                alt="Knowledge Architecture"
                width={64}
                height={64}
                className={principlesStyles.iconImage}
              />
            </div>
            <div className={principlesStyles.principleContent}>
              <h3 className={principlesStyles.principleTitle}>The Learning Gap</h3>
              <p className={principlesStyles.principleText}>
                Experienced engineers don&apos;t have time for 50-hour courses. They want to{' '}
                skim through notes and major topics quickly. With AI spreading false information, there&apos;s need for{' '}
                authentic, factual content that bridges scattered knowledge into coherent systems understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
