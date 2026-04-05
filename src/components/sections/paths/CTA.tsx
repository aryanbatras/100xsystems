import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import InteractiveButton from '../../animated/InteractiveButton';
import styles from '../../styles/components/sections/paths/CTA.module.css';

export default function CTA() {
  return (
    <AnimatedSection animationType="fadeInLeft" delay={0.2}>
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <AnimatedTitle variant="cta" delay={0.1} className={styles.ctaTitle}>
            Ready to Become a 100xEngineer?
          </AnimatedTitle>
          <AnimatedDescription variant="featured" delay={0.3} className={styles.ctaText}>
            Join engineers who've transformed their careers through our structured pathways. 
            Stop collecting certificates and start building real engineering expertise.
          </AnimatedDescription>
          
          <div className={styles.ctaButtons}>
            <InteractiveButton 
              variant="primary" 
              href="/contact"
              scrambleText={{
                hover: "START YOUR JOURNEY",
                speed: 2,
                chars: "upperCase",
                revealDelay: 0.1
              }}
            >
              Start Your Journey
            </InteractiveButton>
            <InteractiveButton 
              variant="secondary" 
              href="/about"
              scrambleText={{
                hover: "LEARN MORE",
                speed: 2,
                chars: "upperCase",
                revealDelay: 0.1
              }}
            >
              Learn More
            </InteractiveButton>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
