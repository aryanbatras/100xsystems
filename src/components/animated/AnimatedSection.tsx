import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../styles/components/animated/AnimatedSection.module.css';;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'rotateIn';
  delay?: number; 
  stagger?: number;
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  animationType = 'fadeInUp',
  delay = 0,
  stagger = 0
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const elements = section.children;

    const getInitialProps = () => {
      switch (animationType) {
        case 'fadeInUp':
          return { opacity: 0, y: 60 };
        case 'fadeInLeft':
          return { opacity: 0, x: -80 };
        case 'fadeInRight':
          return { opacity: 0, x: 80 };
        case 'scaleIn':
          return { opacity: 0, scale: 0.8 };
        case 'rotateIn':
          return { opacity: 0, rotation: -5, scale: 0.7 };
        default:
          return { opacity: 0, y: 60 };
      }
    };

    const getAnimationProps = () => {
      switch (animationType) {
        case 'fadeInUp':
          return { opacity: 1, y: 0, duration: 1, ease: 'power3.out' };
        case 'fadeInLeft':
          return { opacity: 1, x: 0, duration: 1, ease: 'power3.out' };
        case 'fadeInRight':
          return { opacity: 1, x: 0, duration: 1, ease: 'power3.out' };
        case 'scaleIn':
          return { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' };
        case 'rotateIn':
          return { opacity: 1, rotation: 0, scale: 1, duration: 1.2, ease: 'back.out(1.3)' };
        default:
          return { opacity: 1, y: 0, duration: 1, ease: 'power3.out' };
      }
    };

    gsap.set(elements, getInitialProps());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    if (stagger > 0) {
      tl.to(elements, { ...getAnimationProps(), stagger, delay });
    } else {
      tl.to(elements, { ...getAnimationProps(), delay });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationType, delay, stagger]);

  return (
    <div ref={sectionRef} className={`${styles.animatedSection} ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedSection;
