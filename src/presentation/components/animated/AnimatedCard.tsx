import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import styles from '../../_styles/components/animated/AnimatedCard.module.css';;

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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      switch (hoverEffect) {
        case 'lift':
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
          break;
        case 'scale':
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
          break;
        case 'tilt':
          gsap.to(card, {
            rotationY: 5,
            y: -15,
            duration: 0.4,
            ease: 'power2.out'
          });
          break;
        case 'glow':
          gsap.to(card, {
            boxShadow: '0 20px 40px rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            duration: 0.3,
            ease: 'power2.out'
          });
          break;
        case 'none':
          break;
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationY: 0,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoverEffect]);

  return (
    <div 
      ref={cardRef} 
      className={`${styles.animatedCard} ${styles[hoverEffect]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
