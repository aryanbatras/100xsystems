import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import AnimatedButton from '../../animated/AnimatedButton';
import CubeAnimation from '../../animation/CubeAnimation';
import Image from 'next/image';
import sharedStyles from './shared.module.css';
import styles from './Section10.module.css';

export default function Section10() {
  return (
    <>
      <AnimatedSection animationType="fadeInLeft" delay={0.2}>
        <section className={styles.finalCtaSection} data-speed="0.9">
          <div className={styles.finalCtaContent}>
            <div className={sharedStyles.videoLeft} data-speed="0.7">
              <Image
                src="/assets/wallpaper/3d-granular-cube-gray-bg-center.jpg"
                alt="Systems Thinking Visualization"
                width={600}
                height={400}
                className={styles.finalCtaImage}
              />
            </div>
            <AnimatedSection animationType="fadeInRight" delay={0.4}>
              <div className={sharedStyles.videoRight}>
                <AnimatedTitle variant="cta" delay={0.1} className={styles.finalCtaTitle}>Your Engineering Journey Starts Here</AnimatedTitle>
                <AnimatedDescription variant="featured" delay={0.3} className={styles.finalCtaDescription}>
                  Move beyond feature development to true systems thinking. 
                  Join engineers who understand how components interact, anticipate consequences, 
                  and build solutions that scale reliably in production.
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
                <div className={styles.finalCtaButtons}>
                  <AnimatedButton variant="primary" href="/paths">
                    Start Your Journey
                  </AnimatedButton>
                  <AnimatedButton variant="secondary" href="/about">
                    Learn More
                  </AnimatedButton>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CubeAnimation />
      </div>
    </>
  );
}
