import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedCard from '../../animated/AnimatedCard';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import Image from 'next/image';
import styles from '../../../styles/components/sections/home/Section8.module.css';;

export default function Section8() {
  return (
    <AnimatedSection animationType="scaleIn" stagger={0.2}>
      <section className={styles.processSection}>
        <h2 className={styles.sectionTitle}>Our Engineering Process</h2>
        <div className={styles.processGrid}>
          <AnimatedCard hoverEffect="tilt" className={styles.processCard}>
            <div className={styles.processIcon}>
              <Image
                src="/assets/illustrations/undraw_ideation_r1g5.svg"
                alt="Ideation"
                width={80}
                height={80}
              />
            </div>
            <AnimatedTitle variant="process" delay={0.1} className={styles.processTitle}>Ideation & Design</AnimatedTitle>
            <AnimatedDescription variant="subtle" delay={0.3} className={styles.processDescription}>
              Learn to architect solutions from first principles, considering scalability, 
              maintainability, and business requirements from day one.
            </AnimatedDescription>
          </AnimatedCard>
          <AnimatedCard hoverEffect="tilt" className={styles.processCard}>
            <div className={styles.processIcon}>
              <Image
                src="/assets/illustrations/undraw_developer-activity_4zqd.svg"
                alt="Development"
                width={80}
                height={80}
              />
            </div>
            <AnimatedTitle variant="process" delay={0.15} className={styles.processTitle}>Clean Development</AnimatedTitle>
            <AnimatedDescription variant="subtle" delay={0.35} className={styles.processDescription}>
              Master clean code principles, testing strategies, and development workflows 
              that professional engineering teams rely on.
            </AnimatedDescription>
          </AnimatedCard>
          <AnimatedCard hoverEffect="tilt" className={styles.processCard}>
            <div className={styles.processIcon}>
              <Image
                src="/assets/illustrations/undraw_project-completed_ug9i.svg"
                alt="Deployment"
                width={80}
                height={80}
              />
            </div>
            <AnimatedTitle variant="process" delay={0.2} className={styles.processTitle}>Production Deployment</AnimatedTitle>
            <AnimatedDescription variant="subtle" delay={0.4} className={styles.processDescription}>
              Deploy systems with confidence using DevOps best practices, monitoring, 
              and continuous integration pipelines.
            </AnimatedDescription>
          </AnimatedCard>
        </div>
      </section>
    </AnimatedSection>
  );
}
