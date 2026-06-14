'use client';

import buttonStyles from '../_styles/animated-animatedbutton.module.css';
import cardStyles from '../_styles/animated-animatedcard.module.css';
import sectionStyles from '../_styles/animated-animatedsection.module.css';
import techGridStyles from '../_styles/animated-animatedtechgrid.module.css';
import Link from 'next/link';
import { ReactNode, forwardRef } from 'react';
/**
 * ## Animated
 *
 * Animated feature module.
 * Contains all components, types, and logic for the animated domain.
 *
 * @packageDocumentation
 * @module animated
 */

;



// ============================================================
// Source: AnimatedCard.tsx
// ============================================================
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
      className={`${cardStyles.animatedCard} ${cardStyles[hoverEffect]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { AnimatedCard };


// ============================================================
// Source: AnimatedDescription.tsx
// ============================================================
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

export { AnimatedDescription };


// ============================================================
// Source: AnimatedSection.tsx
// ============================================================
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
    <div className={`${sectionStyles.animatedSection} ${sectionStyles[animationType]} ${className}`}>
      {children}
    </div>
  );
};

export { AnimatedSection };


// ============================================================
// Source: AnimatedTechGrid.tsx
// ============================================================
interface TechItem {
  text: string;
}

interface AnimatedTechGridProps {
  items: TechItem[];
  className?: string;
}

const AnimatedTechGrid = ({ items, className = '' }: AnimatedTechGridProps) => {
  return (
    <div className={`${techGridStyles.techGrid} ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={techGridStyles.techItem}>
          {item.text}
        </div>
      ))}
    </div>
  );
};

export { AnimatedTechGrid };


// ============================================================
// Source: AnimatedText.tsx
// ============================================================
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

export { AnimatedText };


// ============================================================
// Source: AnimatedTitle.tsx
// ============================================================
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

export { AnimatedTitle };


// ============================================================
// Source: InteractiveButton.tsx
// ============================================================
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
  const ButtonComponent = href ? 'a' : 'button';
  const buttonProps = href ? { href } : { onClick };

  if (href && !isExternalUrl(href)) {
    return (
      <Link href={href} legacyBehavior>
        <a 
          className={`${buttonStyles.animatedButton} ${buttonStyles[variant]} ${className}`}
        >
          <span className={buttonStyles.buttonContent}>
            {children}
          </span>
        </a>
      </Link>
    );
  }

  return (
    <ButtonComponent 
      className={`${buttonStyles.animatedButton} ${buttonStyles[variant]} ${className}`}
      {...buttonProps}
    >
      <span className={buttonStyles.buttonContent}>
        {children}
      </span>
    </ButtonComponent>
  );
});

InteractiveButton.displayName = 'InteractiveButton';

export { InteractiveButton };
