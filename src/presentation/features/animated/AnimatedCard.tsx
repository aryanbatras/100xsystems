import { ReactNode } from 'react';
import styles from '../../_styles/components/animated/AnimatedCard.module.css';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'scale' | 'tilt' | 'glow' | 'none';
  onClick?: () => void;
}

const AnimatedCard = ({ 
  children, 
  className = '', 
  hoverEffect = 'lift',
  onClick
}: AnimatedCardProps) => {
  return (
    <div 
      className={`${styles.animatedCard} ${styles[hoverEffect]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
