import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import Image from 'next/image';
import styles from '../../_styles/components/sections/paths/Journey.module.css';

export default function Journey() {
  return (
    <AnimatedSection animationType="fadeInLeft" delay={0.2}>
      <section className={styles.journeySection}>
        <div className={styles.journeyContent}>
          <div className={styles.journeyLeft}>
            <AnimatedTitle variant="section" delay={0.1} className={styles.sectionTitle}>
              Your Engineering Journey
            </AnimatedTitle>
            <AnimatedDescription variant="featured" delay={0.3} className={styles.journeyText}>
              Each path is carefully structured to build upon previous knowledge, 
              ensuring you develop the deep understanding required for true engineering excellence. 
              Progress through hands-on projects, real-world challenges, and mentorship from experienced engineers.
            </AnimatedDescription>
            
            <div className={styles.journeyStages}>
              <div className={styles.stage}>
                <div className={styles.stageIcon}>
                  <Image
                    src="/assets/illustrations/undraw_ideation_r1g5.svg"
                    alt="Foundation"
                    width={60}
                    height={60}
                  />
                </div>
                <div className={styles.stageContent}>
                  <h4 className={styles.stageTitle}>Foundation</h4>
                  <div className={styles.stageDesc}>Build deep technical understanding</div>
                </div>
              </div>
              
              <div className={styles.stage}>
                <div className={styles.stageIcon}>
                  <Image
                    src="/assets/illustrations/undraw_developer-activity_4zqd.svg"
                    alt="Development"
                    width={60}
                    height={60}
                  />
                </div>
                <div className={styles.stageContent}>
                  <h4 className={styles.stageTitle}>Application</h4>
                  <div className={styles.stageDesc}>Apply knowledge to real systems</div>
                </div>
              </div>
              
              <div className={styles.stage}>
                <div className={styles.stageIcon}>
                  <Image
                    src="/assets/illustrations/undraw_project-completed_ug9i.svg"
                    alt="Mastery"
                    width={60}
                    height={60}
                  />
                </div>
                <div className={styles.stageContent}>
                  <h4 className={styles.stageTitle}>Mastery</h4>
                  <div className={styles.stageDesc}>Lead and architect complex solutions</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.journeyRight}>
            <div className={styles.journeyImageWrapper}>
              <img     className={styles.journeyVideo}>
                src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif"
              </img>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
