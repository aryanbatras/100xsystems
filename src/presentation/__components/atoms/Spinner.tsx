/**
 * ## Spinner
 *
 * Animated loading spinner for async operations.
 * Built from scratch for the 100xSystems design system.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────

export interface SpinnerProps {
  /** Size preset */
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  /** Optional label for screen readers */
  label?: string;
  /** Color variant */
  variant?: 'brand' | 'neutral' | 'white';
  /** Additional class names */
  className?: string;
}

// ─── Size Definitions ──────────────────────────────────────────────

const sizeStyles = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  default: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
} as const;

const borderStyles = {
  xs: 'border-2',
  sm: 'border-2',
  default: 'border-[2.5px]',
  lg: 'border-[3px]',
  xl: 'border-[4px]',
} as const;

const colorStyles = {
  brand: 'border-[#e0e0ff] border-t-[#572EFF]',
  neutral: 'border-[#e5e5e5] border-t-[#76777d]',
  white: 'border-white/20 border-t-white',
} as const;

// ─── Component ──────────────────────────────────────────────────────

/**
 * Animated loading spinner with multiple sizes and colors.
 *
 * @remarks
 * Five sizes: xs, sm, default (md), lg, xl.
 * Three color variants: brand (purple), neutral (gray), white.
 *
 * @example
 * ```tsx
 * <Spinner size="lg" variant="brand" />
 * <Spinner label="Loading results..." />
 * ```
 */
export function Spinner({
  size = 'default',
  variant = 'brand',
  label = 'Loading...',
  className,
}: SpinnerProps) {
  return (
    <div
      className={cn('inline-flex items-center justify-center', className)}
      role="status"
      aria-label={label}
    >
      <div
        className={cn(
          // Base
          'animate-spin rounded-full',
          // Size
          sizeStyles[size],
          borderStyles[size],
          // Color
          colorStyles[variant],
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
