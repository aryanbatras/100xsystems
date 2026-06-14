import { ReactNode } from 'react';
import styles from '../_styles/components/animated/AnimatedSection.module.css';;

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
  return (
    <div className={`${styles.animatedSection} ${styles[animationType]} ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedSection;
