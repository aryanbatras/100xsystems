import { ReactNode, forwardRef } from 'react';
import Link from 'next/link';
import styles from '../../_styles/components/animated/AnimatedButton.module.css';;

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
