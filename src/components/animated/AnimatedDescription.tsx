import { ReactNode } from 'react';
import AnimatedText from './AnimatedText';

interface AnimatedDescriptionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'featured';
  delay?: number;
  scrollTrigger?: {
    start?: string;
    end?: string;
    scrub?: boolean;
    markers?: boolean;
    toggleActions?: string;
  };
}

const AnimatedDescription = ({ 
  children, 
  className = '', 
  variant = 'default',
  delay = 0,
  scrollTrigger = {}
}: AnimatedDescriptionProps) => {
  const getAnimationConfig = () => {
    const baseDelay = delay;
    
    switch (variant) {
      case 'subtle':
        return {
          y: 15,
          opacity: 0,
          stagger: 0.02,
          duration: 0.5,
          delay: baseDelay,
          ease: "power1.out"
        };
      
      case 'featured':
        return {
          y: 20,
          opacity: 0,
          stagger: 0.025,
          duration: 0.6,
          delay: baseDelay,
          ease: "power2.out"
        };
      
      default:
        return {
          y: 18,
          opacity: 0,
          stagger: 0.02,
          duration: 0.5,
          delay: baseDelay,
          ease: "power2.out"
        };
    }
  };

  return (
    <AnimatedText
      className={className}
      animationType="words"
      animationConfig={getAnimationConfig()}
      scrollTrigger={scrollTrigger}
    >
      {children}
    </AnimatedText>
  );
};

export default AnimatedDescription;
