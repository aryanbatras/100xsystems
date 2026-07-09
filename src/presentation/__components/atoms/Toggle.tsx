/**
 * ## Toggle
 *
 * Toggle switch for binary on/off states.
 *
 * @packageDocumentation
 */

'use client';

import { cn } from '@/application/lib/utils';

export interface ToggleProps {
  /** Whether the toggle is on */
  checked: boolean;
  /** Change handler */
  onChange: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'default';
  /** Additional class names */
  className?: string;
}

/**
 * Toggle switch for settings and preferences.
 *
 * @example
 * ```tsx
 * <Toggle checked={isOn} onChange={setIsOn} label="Notifications" />
 * ```
 */
export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'default',
  className,
}: ToggleProps) {
  const sizeStyles = size === 'sm'
    ? { track: 'h-5 w-9', thumb: 'h-4 w-4', translateX: 'translate-x-4' }
    : { track: 'h-6 w-11', thumb: 'h-5 w-5', translateX: 'translate-x-5' };

  return (
    <label className={cn('inline-flex items-center gap-3', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#572EFF] focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed',
          sizeStyles.track,
          checked ? 'bg-[#572EFF]' : 'bg-[#d4d4d4]',
        )}
      >
        <span
          className={cn(
            'inline-block rounded-full bg-white shadow-sm transition-transform duration-200',
            sizeStyles.thumb,
            checked && sizeStyles.translateX,
          )}
        />
      </button>
      {label && <span className="text-sm text-[#45464d] select-none">{label}</span>}
    </label>
  );
}
