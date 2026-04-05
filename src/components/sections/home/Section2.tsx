import AnimatedSection from '../../animated/AnimatedSection';
import CubeSmall from '../../animation/CubeSmall';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import InteractiveButton from '../../animated/InteractiveButton';
import styles from '../../../styles/components/sections/home/Section2.module.css';;

export default function Section2() {
  return (
    <AnimatedSection animationType="fadeInUp" delay={0.4}>
      <div className={styles.rubiksConclusion}>
        <div className={styles.conclusionContent}>
          <div className={styles.conclusionText}>
            <AnimatedTitle variant="insight" delay={0.1} className={styles.conclusionTitle}>Systems Clarity</AnimatedTitle>
            <AnimatedDescription variant="featured" delay={0.2} className={styles.description}>
              100xEngineers learn to see the complete system—understanding trade-offs, 
              anticipating consequences, and architecting solutions that scale. 
              They don't just solve problems; they understand the underlying principles 
              that make systems work reliably.
            </AnimatedDescription>
            <div className={styles.ctaContainer}>
              <InteractiveButton 
                href="/articles" 
                variant="cta"
                scrambleText={{
                  hover: "BEGIN JOURNEY",
                  speed: 2,
                  chars: "upperCase",
                  revealDelay: 0.1
                }}
              >
                Start Your Journey
              </InteractiveButton>
            </div>
          </div>
          <div className={styles.conclusionAnimation}>
            <CubeSmall />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
