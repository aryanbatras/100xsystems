import { useRef } from 'react';
import Image from 'next/image';
import styles from '../../../styles/components/sections/about/Hero.module.css';;
import cinematicStyles from '../../../styles/components/sections/about/cinematic.module.css';
import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import { useVideoAutoplay } from '../../../application/hooks';

export default function AboutHero() {
  const videoRef = useRef<any>(null);
  useVideoAutoplay(videoRef);

  return (
    <>
      <div className={styles.heroSection}>
        <img
          ref={videoRef}
          className={styles.heroVideoBackground}
          
          
          
          
        >
          src="/videos/black-boxes-advanced-abstract-animation-google-deepmind.gif"
        </img>
        
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroMain}>
            <div className={styles.heroHeader}>
              <h1 className={styles.title}>
                100x Systems
              </h1>
              
              <p className={styles.subtitle}>
                From Developer to Systems Engineer
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatedSection animationType="fadeInUp" delay={0.4}>
        <div className={cinematicStyles.cinematicSection}>
          <div className={cinematicStyles.cinematicContainer}>
            <div className={cinematicStyles.cinematicHeader}>
              <AnimatedTitle variant="hero" delay={0.1} className={cinematicStyles.cinematicTitle}>
                Engineering Systems That Matter
              </AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.3} className={cinematicStyles.cinematicDescription}>
                In a world of rapid technological change, systems thinking remains timeless. 
                While frameworks come and go, understanding how systems work—how components interact, 
                how failures cascade, how performance scales—separates senior engineers from junior developers.
              </AnimatedDescription>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
