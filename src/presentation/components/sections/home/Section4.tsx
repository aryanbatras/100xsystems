import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedCard from '../../animated/AnimatedCard';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import styles from '../../../_styles/components/sections/home/Section4.module.css';;

export default function Section4() {
  return (
    <AnimatedSection animationType="scaleIn" stagger={0.15}>
      <section className={styles.featuresSection} data-speed="0.6">
        <AnimatedTitle variant="section" className={styles.sectionTitle}>What You'll Master</AnimatedTitle>
        <div className={styles.featuresGrid}>
          <AnimatedCard hoverEffect="lift" className={styles.featureCard} data-lag="0.3">
            <div className={styles.featureNumber}>01</div>
            <AnimatedTitle variant="feature" delay={0.1} className={styles.featureTitle}>Deep Technical Understanding</AnimatedTitle>
            <AnimatedDescription variant="subtle" delay={0.3} className={styles.featureDescription}>
              Go beyond surface-level knowledge to truly understand how systems work from the ground up
            </AnimatedDescription>
          </AnimatedCard>
          <AnimatedCard hoverEffect="lift" className={styles.featureCard} data-lag="0.4">
            <div className={styles.featureNumber}>02</div>
            <AnimatedTitle variant="feature" delay={0.15} className={styles.featureTitle}>Systems Thinking</AnimatedTitle>
            <AnimatedDescription variant="subtle" delay={0.35} className={styles.featureDescription}>
              Learn to architect scalable solutions and understand the trade-offs engineers make every day
            </AnimatedDescription>
          </AnimatedCard>
          <AnimatedCard hoverEffect="lift" className={styles.featureCard} data-lag="0.5">
            <div className={styles.featureNumber}>03</div>
            <AnimatedTitle variant="feature" delay={0.2} className={styles.featureTitle}>Real-World Application</AnimatedTitle>
            <AnimatedDescription variant="subtle" delay={0.4} className={styles.featureDescription}>
              Build production-ready systems that demonstrate true engineering capabilities
            </AnimatedDescription>
          </AnimatedCard>
        </div>
      </section>
    </AnimatedSection>
  );
}
