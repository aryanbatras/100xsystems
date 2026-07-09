/**
 * ## Button
 *
 * Primary interactive button component with variant, size, and loading support.
 * Built from scratch for the 100xSystems design system.
 *
 * @packageDocumentation
 */

'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/application/lib/utils';
import { Spinner } from './Spinner';

// ─── Variant Definitions ────────────────────────────────────────────

const variantStyles = {
  /** Solid brand background, white text */
  primary:
    'bg-[#572EFF] text-white hover:bg-[#4625CC] active:bg-[#3A1FA8] shadow-sm hover:shadow-md',
  /** Subtle with border */
  secondary:
    'bg-white text-[#45464d] border border-[#e5e5e5] hover:bg-[#f5f5f5] active:bg-[#e5e5e5] hover:border-[#d4d4d4]',
  /** Minimal, no background */
  ghost:
    'text-[#76777d] hover:text-[#45464d] hover:bg-[#f5f5f5] active:bg-[#e5e5e5]',
  /** Danger action */
  destructive:
    'bg-[#ef4444] text-white hover:bg-[#dc2626] active:bg-[#b91c1c] shadow-sm hover:shadow-md',
  /** Transparent with border, for dark backgrounds */
  outline:
    'border border-white/20 text-white/80 hover:border-white/40 hover:text-white bg-transparent',
  /** Link-style button */
  link:
    'text-[#572EFF] underline-offset-4 hover:underline hover:text-[#4625CC] p-0',
} as const;

const sizeStyles = {
  sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
  default: 'h-10 px-5 text-sm rounded-lg gap-2',
  lg: 'h-12 px-7 text-base rounded-lg gap-2.5',
  icon: 'h-10 w-10 rounded-lg',
  'icon-sm': 'h-8 w-8 rounded-md',
} as const;

// ─── Types ──────────────────────────────────────────────────────────

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Render as non-button element (for Link composition) */
  asChild?: boolean;
}

// ─── Component ──────────────────────────────────────────────────────

/**
 * Primary interactive button with variant and size support.
 *
 * @remarks
 * Supports six visual variants: primary, secondary, ghost, destructive, outline, and link.
 * Four size presets: sm, default, lg, icon, icon-sm.
 * Shows a loading spinner while async operations are in progress.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="default" onClick={handleClick}>
 *   Click Me
 * </Button>
 * <Button variant="secondary" loading>Loading...</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center whitespace-nowrap font-medium',
          'transition-all duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#572EFF] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'select-none',
          // Variant & size
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size={size === 'sm' ? 'xs' : 'sm'} variant={variant === 'outline' ? 'white' : 'brand'} />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
