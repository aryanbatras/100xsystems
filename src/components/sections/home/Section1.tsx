import { useEffect, useRef } from 'react';
import Image from 'next/image';
import InteractiveButton from '../../animated/InteractiveButton';
import styles from './Section1.module.css';
import cinematicStyles from './cinematic.module.css';
import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import { useVideoAutoplay } from '../../../hooks/useVideoAutoplay';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useVideoAutoplay(videoRef);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (video) {
      gsap.set(video, { 
        scale: 1,
        opacity: 1,
      });
    }

    if (title) {
      gsap.set(title, { 
        opacity: 1, 
        y: 0
      });
    }

    if (subtitle) {
      gsap.set(subtitle, { 
        opacity: 0.9, 
        y: 0
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: '5% 5%',
        end: '75% 50%',
        scrub: 1.8
      }
    });

    if (video) {
      tl.to(video, {
        scale: 1.3,
        y: 100,
        ease: 'ease'
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([video, title, subtitle]);
    };
  }, []);

  return (
    <>
      <div ref={sectionRef} className={styles.rubikVideoShowcase}>
        <video
          ref={videoRef}
          className={styles.rubikVideoBackground}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/man_solving_rubik_cube_1_minute_long_no_face.mp4" type="video/mp4" />
        </video>
        
        <div className={styles.rubikVideoOverlay}></div>
        
        <div className={styles.rubikVideoContent}>
          <div ref={titleRef} className={styles.rubikVideoTitle}>
            <img
              src="/100xsystemsonlytitle.png"
              alt="100x Systems"
              width={400}
              height={80}
              className={styles.titleLogo}
              loading="eager" 
            />
          </div>
          <p ref={subtitleRef} className={styles.rubikVideoSubtitle}>
            Master Rubik's Cube of Software Engineering
          </p>
          <div className={styles.ctaButtons}>
            <InteractiveButton 
              href="/dashboard" 
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
              href="/paths" 
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
