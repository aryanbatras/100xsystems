/**
 * @file Stub — animated components that were removed in the migration.
 * These are simple passthrough wrappers to keep existing features working.
 * TODO: Remove usage of these from sections.feature.tsx and dashboard.feature.tsx
 *       when those files are refactored.
 */

import React, { type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

interface AnimatedWrapperProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

function createWrapper(displayName: string, defaultClass?: string) {
  const Component = ({ children, className, ...props }: AnimatedWrapperProps) => (
    <div className={cn(defaultClass, className)} {...props}>
      {children}
    </div>
  );
  Component.displayName = displayName;
  return Component;
}

export const AnimatedCard = createWrapper('AnimatedCard');
export const AnimatedSection = createWrapper('AnimatedSection');
export const AnimatedTitle = createWrapper('AnimatedTitle');
export const AnimatedDescription = createWrapper('AnimatedDescription', 'text-fg-secondary');
export const AnimatedTechGrid = createWrapper('AnimatedTechGrid');

export const InteractiveButton = ({
  children,
  className,
  onClick,
  ...props
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'inline-flex items-center justify-center font-semibold transition-all duration-200',
      'bg-accent text-white hover:bg-accent-hover',
      'px-10 py-4 text-sm',
      className
    )}
    {...props}
  >
    {children}
  </button>
);
InteractiveButton.displayName = 'InteractiveButton';
