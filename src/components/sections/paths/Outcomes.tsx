import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedCard from '../../animated/AnimatedCard';
import Image from 'next/image';
import styles from './Outcomes.module.css';

export default function Outcomes() {
  return (
    <AnimatedSection animationType="fadeInUp" delay={0.2}>
      <section className={styles.outcomesSection}>
        <AnimatedTitle variant="section" className={styles.sectionTitle}>
          Engineering Outcomes
        </AnimatedTitle>
        
        <div className={styles.outcomesGrid}>
          <AnimatedCard hoverEffect="tilt" className={styles.outcomeCard}>
            <div className={styles.outcomeIcon}>
              <Image
                src="/assets/illustrations/undraw_proud-coder_bivp.svg"
                alt="Career Growth"
                width={80}
                height={80}
              />
            </div>
            <h3 className={styles.outcomeTitle}>Career Acceleration</h3>
            <div className={styles.outcomeDescription}>
              Move from junior developer to senior engineer 5x faster through 
              systems thinking and architectural expertise.
            </div>
          </AnimatedCard>

          <AnimatedCard hoverEffect="tilt" className={styles.outcomeCard}>
            <div className={styles.outcomeIcon}>
              <Image
                src="/assets/illustrations/undraw_web-development_f0tp.svg"
                alt="System Architecture"
                width={80}
                height={80}
              />
            </div>
            <h3 className={styles.outcomeTitle}>System Architecture</h3>
            <div className={styles.outcomeDescription}>
              Design and build scalable systems that handle millions of users 
              with confidence and engineering precision.
            </div>
          </AnimatedCard>

          <AnimatedCard hoverEffect="tilt" className={styles.outcomeCard}>
            <div className={styles.outcomeIcon}>
              <Image
                src="/assets/illustrations/undraw_sharing-knowledge_2jx3.svg"
                alt="Leadership"
                width={80}
                height={80}
              />
            </div>
            <h3 className={styles.outcomeTitle}>Engineering Leadership</h3>
            <div className={styles.outcomeDescription}>
              Lead technical teams, make architectural decisions, and mentor 
              next generation of engineers.
            </div>
          </AnimatedCard>
        </div>
      </section>
    </AnimatedSection>
  );
}
