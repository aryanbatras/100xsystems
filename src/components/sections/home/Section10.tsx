import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import InteractiveButton from '../../animated/InteractiveButton';
import Image from 'next/image';
import styles from './Section10.module.css';

export default function Section10() {
  return (
    <AnimatedSection animationType="fadeInUp" delay={0.2}>
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.leftCard}>
            <div className={styles.cardImage}>
              <Image
                src="/assets/wallpaper/hand-one-finger-rubik-cube-holded-like-pro.jpg"
                alt="Mastery and Precision"
                width={600}
                height={800}
                className={styles.cardImageElement}
              />
            </div>
            <div className={styles.imageOverlay}></div>
          </div>
          
          <div className={styles.rightCard}>
            <div className={styles.cardContent}>
              <AnimatedTitle variant="hero" delay={0.3} className={styles.cardTitle}>
                The Final 1%
              </AnimatedTitle>
              <AnimatedTitle variant="hero" delay={0.5} className={styles.cardSubtitle}>
                That Separates Good Engineers From 100x Engineers
              </AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.7} className={styles.cardDescription}>
                You've mastered the syntax. You know the frameworks. But can you architect systems that scale?
                Can you debug the impossible? Can you lead teams through complexity?
              </AnimatedDescription>
              <AnimatedDescription variant="subtle" delay={0.9} className={styles.cardSubDescription}>
                Join engineers from Google, Meta, and startups who've made the leap.
                The journey isn't easy—but greatness never is.
              </AnimatedDescription>
              
              <AnimatedSection animationType="scaleIn" delay={1.1}>
                <InteractiveButton 
                  variant="cta" 
                  href="/paths"
                  scrambleText={{
                    hover: "START JOURNEY NOW",
                    speed: 2,
                    chars: "upperCase",
                    revealDelay: 0.1
                  }}
                  className={styles.ctaButton}
                >
                  Start Your Journey
                </InteractiveButton>
              </AnimatedSection>
              
              <AnimatedSection animationType="fadeInUp" delay={1.3}>
                <div className={styles.trustIndicators}>
                  <div className={styles.trustItem}>
                    <span className={styles.trustNumber}>500+</span>
                    <span className={styles.trustLabel}>Engineers Transformed</span>
                  </div>
                  <div className={styles.trustItem}>
                    <span className={styles.trustNumber}>50x</span>
                    <span className={styles.trustLabel}>Impact Multiplier</span>
                  </div>
                  <div className={styles.trustItem}>
                    <span className={styles.trustNumber}>12mo</span>
                    <span className={styles.trustLabel}>Journey Duration</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
