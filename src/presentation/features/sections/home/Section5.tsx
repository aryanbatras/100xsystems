import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import InteractiveButton from '../../animated/InteractiveButton';
import styles from '../../../_styles/components/sections/home/Section5.module.css';;

export default function Section5() {
  return (
    <AnimatedSection animationType="fadeInUp" stagger={0.1}>
      <section className={styles.ctaSection} data-speed="0.4">
        <AnimatedTitle variant="cta" delay={0.1} className={styles.ctaTitle}>Ready to Become an Engineer?</AnimatedTitle>
        <AnimatedDescription variant="featured" delay={0.3} className={styles.ctaText}>
          Join thousands who've transformed their careers through our structured learning pathways
        </AnimatedDescription>
        <InteractiveButton 
          variant="cta" 
          href="/roadmaps"
          scrambleText={{
            hover: "START JOURNEY NOW",
            speed: 2,
            chars: "upperCase",
            revealDelay: 0.1
          }}
        >
          Start Your Journey
        </InteractiveButton>
      </section>
    </AnimatedSection>
  );
}
