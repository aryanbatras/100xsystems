import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import styles from '../../styles/components/sections/paths/VideoShowcase.module.css';

export default function PathsVideoShowcase() {
  return (
    <AnimatedSection animationType="fadeInUp" delay={0.2}>
      <section className={styles.videoShowcaseSection}>
        <div className={styles.videoShowcaseContent}>
          <div className={styles.videoShowcaseText}>
            <AnimatedTitle variant="section" delay={0.1} className={styles.sectionTitle}>
              Advanced Systems Thinking
            </AnimatedTitle>
            <AnimatedDescription variant="featured" delay={0.3} className={styles.videoShowcaseDescription}>
              Master the art of building complex systems that scale. Learn to think like an architect, 
              make critical design decisions, and understand the trade-offs that separate good engineers from great ones.
            </AnimatedDescription>
          </div>
          <div className={styles.videoShowcaseVideo}>
            <img 
               
               
               
               
              className={styles.shiningMirrorVideo}
            >
              src="/videos/shinning-mirror-advanced-abstract-google-deepmind.gif"
            </img>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
