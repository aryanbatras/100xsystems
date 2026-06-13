import { useEffect, useRef, ReactNode, forwardRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';
import styles from '../../_styles/components/animated/AnimatedButton.module.css';;

gsap.registerPlugin(ScrambleTextPlugin);

interface InteractiveButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'cta';
  href?: string;
  onClick?: () => void;
  scrambleText?: {
    hover: string;
    speed?: number;
    chars?: string;
    revealDelay?: number;
  };
}

const isExternalUrl = (url: string) => {
  return url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:');
};

const InteractiveButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, InteractiveButtonProps>(({ 
  children, 
  className = '', 
  variant = 'primary',
  href,
  onClick,
  scrambleText
}, ref) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const internalRef = buttonRef;
  const originalText = useRef<string>('');

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    originalText.current = button.textContent || '';

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });

      if (scrambleText) {
        gsap.to(button, {
          scrambleText: {
            text: scrambleText.hover,
            chars: scrambleText.chars || "upperCase",
            speed: scrambleText.speed || 2,
            revealDelay: scrambleText.revealDelay || 0.1
          },
          duration: 0.5
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });

      if (scrambleText) {
        gsap.to(button, {
          scrambleText: originalText.current,
          duration: 0.3
        });
      }
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scrambleText]);

  const ButtonComponent = href ? 'a' : 'button';
  const buttonProps = href ? { href } : { onClick };

  if (href && !isExternalUrl(href)) {
    return (
      <Link href={href} legacyBehavior>
        <a 
          ref={(ref as any) || internalRef}
          className={`${styles.animatedButton} ${styles[variant]} ${className}`}
        >
          <span className={styles.buttonContent}>
            {children}
          </span>
        </a>
      </Link>
    );
  }

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

InteractiveButton.displayName = 'InteractiveButton';

export default InteractiveButton;
