'use client';

import type { ReactNode, ElementType } from 'react';
import { cn } from '../utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Glassmorphism container inspired by startx design.
 * Provides a frosted glass background with blur effect.
 *
 * @example
 * <GlassCard className="p-8 space-y-6">
 *   <h2>Content</h2>
 *   <p>Description</p>
 * </GlassCard>
 */
export function GlassCard({
  children,
  className = '',
  as: Tag = 'div',
}: GlassCardProps) {
  return (
    <Tag className={cn('glass-card', className)}>
      {children}
    </Tag>
  );
}
