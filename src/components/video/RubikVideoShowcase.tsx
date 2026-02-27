import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const RubikVideoShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    // Set initial states - static text, normal video
    if (video) {
      gsap.set(video, { 
        scale: 1,
        opacity: 1,
      });
      video.play();
    }

    // Text is static - no initial animations needed
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

    // Scroll-based animations - video focus on cube then fade
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: '10% top',
        end: '75% 75%',
        // markers: true,
        scrub: 1
      }
    });

    // Video enlarges and moves down to focus on cube, then fades while zooming
    if (video) {
      tl.to(video, {
        scale: 1.25,
        // opacity: 0.5,
        ease: 'easeInOut'
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([video, title, subtitle]);
    };
  }, []);

  return (
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
          <Image
            src="/100xsystemsonlytitle.png"
            alt="100x Systems"
            width={400}
            height={80}
            className={styles.titleLogo}
          />
        </div>
        <p ref={subtitleRef} className={styles.rubikVideoSubtitle}>
          Master the Rubik's Cube of Software Engineering
        </p>
      </div>
    </div>
  );
};

export default RubikVideoShowcase;
