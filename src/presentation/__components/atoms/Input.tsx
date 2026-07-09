/**
 * ## Input
 *
 * Text input component with optional label, error state, and icon support.
 * Built from scratch for the 100xSystems design system.
 *
 * @packageDocumentation
 */

'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../_components/utils';

// ─── Variant Definitions ────────────────────────────────────────────

const variantStyles = {
  default:
    'border-[#e5e5e5] focus:border-[#572EFF] focus:ring-[#572EFF]/20',
  error:
    'border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/20',
  success:
    'border-[#22c55e] focus:border-[#22c55e] focus:ring-[#22c55e]/20',
} as const;

// ─── Types ──────────────────────────────────────────────────────────

export type InputVariant = keyof typeof variantStyles;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  errorMessage?: string;
  /** Success message displayed below the input */
  successMessage?: string;
  /** Visual variant */
  variant?: InputVariant;
  /** Icon or element to show on the left side */
  leftIcon?: ReactNode;
  /** Icon or element to show on the right side */
  rightIcon?: ReactNode;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Full width */
  fullWidth?: boolean;
}

// ─── Component ──────────────────────────────────────────────────────

/**
 * Text input with label, error state, and icon support.
 *
 * @remarks
 * Wraps a native input with consistent styling, optional label,
 * error/success messages, helper text, and icon slots.
 *
 * @example
 * ```tsx
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * <Input label="Password" type="password" errorMessage="Required" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      errorMessage,
      successMessage,
      variant = 'default',
      leftIcon,
      rightIcon,
      helperText,
      fullWidth = true,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    const hasError = !!errorMessage;
    const hasSuccess = !!successMessage;
    const currentVariant = hasError ? 'error' : hasSuccess ? 'success' : variant;

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-[10px] font-semibold uppercase tracking-[0.6px] text-[#76777d]"
          >
            {label}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#76777d]">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base
              'w-full rounded-lg border px-3 py-2 text-sm text-[#0a0a0a]',
              'placeholder:text-[#a3a3a3]',
              'bg-white',
              'transition-all duration-150',
              'focus:outline-none focus:ring-2',
              'disabled:cursor-not-allowed disabled:bg-[#f5f5f5] disabled:text-[#a3a3a3]',
              'read-only:cursor-default read-only:bg-[#fafafa]',
              // Variant
              variantStyles[currentVariant],
              // Icon padding
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#76777d]">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {hasError && (
          <p id={`${inputId}-error`} className="text-xs text-[#ef4444]" role="alert">
            {errorMessage}
          </p>
        )}

        {/* Success Message */}
        {hasSuccess && !hasError && (
          <p className="text-xs text-[#16a34a]">{successMessage}</p>
        )}

        {/* Helper Text */}
        {helperText && !hasError && (
          <p id={`${inputId}-helper`} className="text-xs text-[#76777d]">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
