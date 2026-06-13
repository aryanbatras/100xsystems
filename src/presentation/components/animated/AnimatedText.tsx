import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  animationType?: 'chars' | 'words' | 'lines' | 'chars-words' | 'words-lines' | 'all';
  animationConfig?: {
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
    rotationY?: number;
    opacity?: number;
    stagger?: number | { each: number; from?: 'start' | 'end' | 'center' | 'random' };
    duration?: number;
    delay?: number;
    ease?: string;
  };
  autoSplit?: boolean;
  onAnimationComplete?: () => void;
  scrollTrigger?: {
    start?: string;
    end?: string;
    scrub?: boolean;
    markers?: boolean;
    toggleActions?: string;
  };
}

const AnimatedText = ({ 
  children, 
  className = '',
  animationType = 'chars',
  animationConfig = {},
  autoSplit = true,
  onAnimationComplete,
  scrollTrigger = {}
}: AnimatedTextProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AnimatedText;
