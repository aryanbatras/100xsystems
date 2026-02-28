import { useEffect, useRef, ReactNode, forwardRef } from 'react';
import { gsap } from 'gsap';
import styles from '../../styles/AnimatedButton.module.css';

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'cta';
  href?: string;
  onClick?: () => void;
}

const AnimatedButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, AnimatedButtonProps>(({ 
  children, 
  className = '', 
  variant = 'primary',
  href,
  onClick
}, ref) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const internalRef = buttonRef;

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        y: -3,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const ButtonComponent = href ? 'a' : 'button';
  const buttonProps = href ? { href } : { onClick };

  return (
    <ButtonComponent 
      ref={(ref as any) || internalRef}
      className={`${styles.animatedButton} ${styles[variant]} ${className}`}
      {...buttonProps}
    >
      <span className={styles.buttonContent}>
        {children}
      </span>
    </ButtonComponent>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
