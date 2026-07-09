/**
 * ## Badge
 *
 * Status indicator badge for labels, tags, and counts.
 * Supports multiple semantic variants.
 *
 * @packageDocumentation
 */

import { type HTMLAttributes } from 'react';
import { cn } from '@/application/lib/utils';

// ─── Variant Definitions ────────────────────────────────────────────

const variantStyles = {
  default: 'bg-[#f5f5f5] text-[#45464d]',
  success: 'bg-[#f0fdf4] text-[#16a34a]',
  warning: 'bg-[#fffbeb] text-[#d97706]',
  error: 'bg-[#fef2f2] text-[#dc2626]',
  info: 'bg-[#eff6ff] text-[#2563eb]',
  brand: 'bg-[#f0f0ff] text-[#572EFF]',
} as const;

const sizeStyles = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  default: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
} as const;

// ─── Types ──────────────────────────────────────────────────────────

export type BadgeVariant = keyof typeof variantStyles;
export type BadgeSize = keyof typeof sizeStyles;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color variant */
  variant?: BadgeVariant;
  /** Size preset */
  size?: BadgeSize;
  /** Optional dot indicator */
  dot?: boolean;
}

// ─── Component ──────────────────────────────────────────────────────

/**
 * Colored badge for status indicators, labels, and tags.
 *
 * @remarks
 * Six semantic variants: default, success, warning, error, info, brand.
 * Three sizes: sm, default, lg.
 * Optional dot indicator for status display.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="error" dot>Failed</Badge>
 * ```
 */
export function Badge({
  variant = 'default',
  size = 'default',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Base
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        'whitespace-nowrap',
        // Variant
        variantStyles[variant],
        // Size
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'default' && 'bg-[#45464d]',
            variant === 'success' && 'bg-[#16a34a]',
            variant === 'warning' && 'bg-[#d97706]',
            variant === 'error' && 'bg-[#dc2626]',
            variant === 'info' && 'bg-[#2563eb]',
            variant === 'brand' && 'bg-[#572EFF]',
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
