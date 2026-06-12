import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import styles from '../../../styles/components/sections/paths/Hero.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PathsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const parallax = parallaxRef.current;



    if (title && parallax) {
      gsap.set(title, { 
        opacity: 1, 
        y: 0
      });
    }

    if (subtitle && parallax) {
      gsap.set(subtitle, { 
        opacity: 0.9, 
        y: 0
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    if (title && parallax) {
      tl.to(title, {
        y: -50,
        ease: 'none'
      }, 0);
    }

    if (subtitle && parallax) {
      tl.to(subtitle, {
        y: -30,
        ease: 'none'
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([title, subtitle]);
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      <div ref={parallaxRef} className={styles.heroBackground}>
        <div 
          className={styles.heroBackgroundVideo}
        />
      </div>
      
      <div className={styles.heroOverlay}></div>
      
      <div className={styles.heroContent}>
        <div className={styles.heroTextContent}>
          <h1 className="hero-title">
            <AnimatedTitle variant="hero" className={styles.title}>
              Engineering Excellence Paths
            </AnimatedTitle>
          </h1>
          
          <div className="hero-subtitle">
            <AnimatedDescription variant="featured" className={styles.subtitle}>
              Transform from developer to 100xEngineer through structured, depth-first learning pathways 
              designed for real-world system mastery
            </AnimatedDescription>
          </div>
          
          <div className="hero-description">
            <AnimatedDescription variant="subtle" className={styles.heroDescription}>
              Our paths are built on the philosophy that true engineering excellence comes from 
              understanding systems deeply—not just collecting technologies. Each pathway represents 
              a stage in your evolution from writing code to architecting solutions that scale.
            </AnimatedDescription>
          </div>
        </div>
      </div>
    </section>
  );
}
