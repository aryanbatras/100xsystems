import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import AnimatedTechGrid from '../../animated/AnimatedTechGrid';
import styles from '../../../_styles/components/sections/home/Section9.module.css';;

export default function Section9() {
  return (
    <AnimatedSection animationType="rotateIn" delay={0.2}>
      <section className={styles.modernSection} data-speed="0.8">
        <div className={styles.modernContent}>
          <div className={styles.modernImageWrapper} data-speed="0.85">
            <div className={styles.videoLeft}>
              <div 
                className={styles.videoCard}
              />
            </div>
          </div>
          <AnimatedSection animationType="fadeInRight" delay={0.6}>
            <div className={styles.modernText}>
              <AnimatedTitle variant="modern" delay={0.5} className={styles.modernTitle}>Modern Engineering Stack</AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.7} className={styles.modernDescription}>
                Stay ahead with cutting-edge technologies and practices that define modern software engineering. 
                From microservices to serverless, from containers to orchestration.
              </AnimatedDescription>
              <AnimatedTechGrid 
                items={[
                  { text: 'Cloud Native' },
                  { text: 'Microservices' },
                  { text: 'DevOps' },
                  { text: 'AI/ML Integration' },
                  { text: 'Security First' },
                  { text: 'Performance' }
                ]} 
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </AnimatedSection>
  );
}
