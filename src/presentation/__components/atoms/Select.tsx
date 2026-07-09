/**
 * ## Select
 *
 * Dropdown select component with optional label and error state.
 *
 * @packageDocumentation
 */

'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../../_components/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** Label text */
  label?: string;
  /** Error message */
  errorMessage?: string;
  /** Helper text */
  helperText?: string;
  /** Options list */
  options: SelectOption[];
  /** Placeholder option */
  placeholder?: string;
  /** Full width */
  fullWidth?: boolean;
}

/**
 * Dropdown select with label and error state.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Difficulty"
 *   options={[
 *     { value: 'beginner', label: 'Beginner' },
 *     { value: 'intermediate', label: 'Intermediate' },
 *   ]}
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, errorMessage, helperText, options, placeholder, fullWidth = true, id, ...props }, ref) => {
    const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={selectId} className="text-[10px] font-semibold uppercase tracking-[0.6px] text-[#76777d]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full rounded-lg border px-3 py-2 text-sm text-[#0a0a0a] bg-white',
            'transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:border-[#572EFF] focus:ring-[#572EFF]/20',
            'disabled:cursor-not-allowed disabled:bg-[#f5f5f5] disabled:text-[#a3a3a3]',
            errorMessage ? 'border-[#ef4444]' : 'border-[#e5e5e5]',
            className,
          )}
          aria-invalid={!!errorMessage}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <p className="text-xs text-[#ef4444]" role="alert">{errorMessage}</p>
        )}
        {helperText && !errorMessage && (
          <p className="text-xs text-[#76777d]">{helperText}</p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
