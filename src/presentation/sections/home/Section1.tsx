import Image from 'next/image';
import InteractiveButton from '../../animated/InteractiveButton';
import styles from '../../_styles/components/sections/home/Section1.module.css';;
import cinematicStyles from '../../_styles/components/sections/home/cinematic.module.css';
import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';

export default function Section1() {
  return (
    <>
      <div className={styles.rubikVideoShowcase}>
        <div className={styles.rubikVideoBackground} />
        
        <div className={styles.rubikVideoOverlay}></div>
        
        <div className={styles.rubikVideoContent}>
          <div className={styles.rubikVideoTitle}>
            <Image
              src="/100xsystemsonlytitle.webp"
              alt="100x Systems"
              width={400}
              height={80}
              className={styles.titleLogo}
              priority
            />
          </div>
          <p className={styles.rubikVideoSubtitle}>
            Master Rubik's Cube of Software Engineering
          </p>
          <div className={styles.ctaButtons}>
            <InteractiveButton 
              href="/articles" 
              variant="cta"
              scrambleText={{
                hover: "BEGIN MASTERY",
                speed: 2,
                chars: "upperCase",
                revealDelay: 0.1
              }}
            >
              Start Learning
            </InteractiveButton>
            <InteractiveButton 
              href="/roadmaps" 
              variant="secondary"
              scrambleText={{
                hover: "EXPLORE PATHS",
                speed: 2,
                chars: "upperCase",
                revealDelay: 0.1
              }}
            >
              Explore Paths
            </InteractiveButton>
          </div>
        </div>
      </div>

      <AnimatedSection animationType="fadeInUp" delay={0.3}>
        <div className={cinematicStyles.cinematicSection}>
          <div className={cinematicStyles.cinematicContainer}>
            <div className={cinematicStyles.cinematicHeader}>
              <AnimatedTitle variant="hero" delay={0.1} className={cinematicStyles.cinematicTitle}>
                Systems Thinking in Engineering
              </AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.2} className={cinematicStyles.cinematicDescription}>
                Like a Rubik's Cube, software systems appear simple but hide immense complexity. 
                Most developers focus on one aspect—building features—without understanding how 
                all components work together to create robust, scalable solutions.
              </AnimatedDescription>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
