/**
 * ## FeatureCard
 *
 * Feature/principle card with icon, title, and description.
 * Used across About, Home, and landing pages.
 *
 * @packageDocumentation
 */

import { type ReactNode } from 'react';
import { cn } from '../../_components/utils';

export interface FeatureCardProps {
  /** Icon element or emoji */
  icon?: ReactNode;
  /** Card title */
  title: string;
  /** Description text */
  description: string;
  /** Optional number/badge */
  number?: string | number;
  /** Card variant */
  variant?: 'default' | 'bordered' | 'elevated';
  /** Additional class names */
  className?: string;
}

const variantStyles = {
  default: 'bg-white border border-[#e5e5e5]',
  bordered: 'bg-white border-2 border-[#f0f0ff]',
  elevated: 'bg-white border border-[#e5e5e5] shadow-sm hover:shadow-md',
};

/**
 * Feature card with icon, title, description, and optional number.
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   icon="🚀"
 *   title="Systems Thinking"
 *   description="Learn to architect scalable solutions."
 *   number="01"
 * />
 * ```
 */
export function FeatureCard({
  icon,
  title,
  description,
  number,
  variant = 'default',
  className,
}: FeatureCardProps) {
  return (
    <div className={cn('rounded-lg p-5 transition-all duration-200', variantStyles[variant], className)}>
      {number && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a3a3a3] mb-2 block">
          {String(number).padStart(2, '0')}
        </span>
      )}
      {icon && <div className="mb-3 text-2xl">{icon}</div>}
      <h3 className="text-sm font-semibold text-[#0a0a0a] mb-1.5">{title}</h3>
      <p className="text-xs text-[#76777d] leading-relaxed">{description}</p>
    </div>
  );
}
