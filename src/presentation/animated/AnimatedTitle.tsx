import { ReactNode } from 'react';
import AnimatedText from './AnimatedText';

interface AnimatedTitleProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'section' | 'feature' | 'cta' | 'insight' | 'process' | 'modern' | 'wallpaper' | 'conclusion';
  delay?: number;
  scrollTrigger?: {
    start?: string;
    end?: string;
    scrub?: boolean;
    markers?: boolean;
    toggleActions?: string;
  };
}

const AnimatedTitle = ({ 
  children, 
  className = '', 
  variant = 'default',
  delay = 0,
  scrollTrigger = {}
}: AnimatedTitleProps) => {
  const getAnimationConfig = () => {
    const baseDelay = delay;
    
    switch (variant) {
      case 'hero':
        return {
          y: 40,
          opacity: 0,
          stagger: 0.02,
          duration: 0.8,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      case 'section':
        return {
          y: 30,
          opacity: 0,
          stagger: 0.015,
          duration: 0.7,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      case 'feature':
        return {
          y: 25,
          opacity: 0,
          stagger: 0.01,
          duration: 0.6,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      case 'cta':
        return {
          y: 30,
          opacity: 0,
          stagger: 0.02,
          duration: 0.7,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      case 'insight':
        return {
          y: 25,
          opacity: 0,
          stagger: 0.02,
          duration: 0.6,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      case 'process':
        return {
          y: 20,
          opacity: 0,
          stagger: 0.01,
          duration: 0.6,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      case 'modern':
        return {
          y: 30,
          opacity: 0,
          stagger: 0.015,
          duration: 0.7,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      case 'wallpaper':
        return {
          x: 30,
          opacity: 0,
          stagger: 0.02,
          duration: 0.6,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      case 'conclusion':
        return {
          y: 30,
          opacity: 0,
          stagger: 0.02,
          duration: 0.7,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      default:
        return {
          y: 25,
          opacity: 0,
          stagger: 0.015,
          duration: 0.6,
          delay: baseDelay,
          ease: "power2.out"
        };
    }
  };

  const getAnimationType = () => {
    switch (variant) {
      case 'conclusion':
        return 'words-lines';
      case 'insight':
        return 'chars';
      case 'process':
        return 'chars';
      default:
        return 'chars-words';
    }
  };

  return (
    <AnimatedText
      className={className}
      animationType={getAnimationType()}
      animationConfig={getAnimationConfig()}
      scrollTrigger={scrollTrigger}
    >
      {children}
    </AnimatedText>
  );
};

export default AnimatedTitle;
