import { useRef } from 'react';
import Image from 'next/image';
import styles from './Mission.module.css';
import cinematicStyles from './cinematic.module.css';
import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import { useVideoAutoplay } from '../../../hooks/useVideoAutoplay';

export default function Mission() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoAutoplay(videoRef);

  return (
    <>
      <AnimatedSection animationType="fadeInUp" delay={0.2}>
        <div className={styles.missionSection}>
          <div className={styles.videoSideBySide}>
            <div className={styles.videoLeft}>
              <video
                ref={videoRef}
                className={styles.missionVideo}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={styles.videoRight}>
              <AnimatedTitle variant="section" delay={0.1} className={styles.sectionTitle}>
                Our Mission
              </AnimatedTitle>
              <AnimatedDescription variant="default" delay={0.3} className={styles.missionText}>
                We want engineers to learn systems in college itself, not spend 10 years discovering what 
                senior architects already know. With the right resources and structured path, systems knowledge 
                can be gained during education years, accelerating career growth by decades.
              </AnimatedDescription>
              <AnimatedDescription variant="default" delay={0.5} className={styles.missionText}>
                This is not a commercial venture—it's for developer welfare. While many projects exist, 
                nobody talks about systems with such depth. We're building that missing bridge between 
                rapid development skills and deep systems understanding.
              </AnimatedDescription>
              <AnimatedDescription variant="default" delay={0.7} className={styles.missionText}>
                Every article includes practical assignments and assessments with outsourced authentic resources. 
                Learn fundamentals, then see how they connect across domains—because systems thinking 
                is the new baseline for engineering excellence.
              </AnimatedDescription>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* <AnimatedSection animationType="fadeInUp" delay={0.4}>
        <div className={cinematicStyles.cinematicSection}>
          <div className={cinematicStyles.cinematicContainer}>
            <div className={cinematicStyles.cinematicFeatures}>
              <div className={cinematicStyles.cinematicFeature}>
                <div className={cinematicStyles.cinematicFeatureIcon}>🎯</div>
                <h3 className={cinematicStyles.cinematicFeatureTitle}>Early Systems Education</h3>
                <p className={cinematicStyles.cinematicFeatureText}>
                  Learn systems thinking during college, not after 10 years of experience. 
                  Accelerate your career by decades with structured learning paths.
                </p>
              </div>
              <div className={cinematicStyles.cinematicFeature}>
                <div className={cinematicStyles.cinematicFeatureIcon}>🔗</div>
                <h3 className={cinematicStyles.cinematicFeatureTitle}>Connected Knowledge</h3>
                <p className={cinematicStyles.cinematicFeatureText}>
                  Bridge the gap between scattered tutorials and coherent systems understanding. 
                  See how all technologies connect as unified systems.
                </p>
              </div>
              <div className={cinematicStyles.cinematicFeature}>
                <div className={cinematicStyles.cinematicFeatureIcon}>🚀</div>
                <h3 className={cinematicStyles.cinematicFeatureTitle}>Practical Excellence</h3>
                <p className={cinematicStyles.cinematicFeatureText}>
                  Apply systems knowledge through real projects and assessments. 
                  Build engineering judgment that lasts beyond any framework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection> */}
    </>
  );
}
