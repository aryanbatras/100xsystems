import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import sharedStyles from './shared.module.css';
import styles from './Section6.module.css';

export default function Section6() {
  return (
    <AnimatedSection animationType="fadeInLeft" delay={0.2}>
      <section className={styles.illustrationSection} data-speed="1.03">
        <div className={`${sharedStyles.videoSideBySide} ${styles.illustrationContent}`}>
          <div className={sharedStyles.videoLeft} data-speed="0.98">
            <video autoPlay muted loop playsInline className={sharedStyles.videoCard}>
              <source src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.mp4" type="video/mp4" />
            </video>
          </div>
          <AnimatedSection animationType="fadeInRight" delay={0.4}>
            <div className={sharedStyles.videoRight}>
              <h2 className={sharedStyles.sectionTitle}>Beyond Code, Into Engineering</h2>
              <AnimatedDescription variant="featured" delay={0.3} className={styles.illustrationText}>
                While others teach you to write code, we teach you to think like engineers. 
                Understand the 'why' behind every architectural decision, master system design principles, 
                and build solutions that scale.
              </AnimatedDescription>
              <div className={sharedStyles.illustrationPoints}>
                <div className={sharedStyles.pointItem}>
                  <span className={sharedStyles.pointNumber}>01</span>
                  <span className={sharedStyles.pointText}>System Architecture Mastery</span>
                </div>
                <div className={sharedStyles.pointItem}>
                  <span className={sharedStyles.pointNumber}>02</span>
                  <span className={sharedStyles.pointText}>Performance Engineering</span>
                </div>
                <div className={sharedStyles.pointItem}>
                  <span className={sharedStyles.pointNumber}>03</span>
                  <span className={sharedStyles.pointText}>Production-Ready Development</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </AnimatedSection>
  );
}
