/**
 * ## ProgressBar
 *
 * Linear progress indicator with determinate and indeterminate modes.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';

const colorStyles = {
  brand: 'bg-[#572EFF]',
  success: 'bg-[#22c55e]',
  warning: 'bg-[#f59e0b]',
  error: 'bg-[#ef4444]',
  neutral: 'bg-[#76777d]',
} as const;

const sizeStyles = {
  sm: 'h-1',
  default: 'h-2',
  lg: 'h-3',
} as const;

export interface ProgressBarProps {
  /** Progress percentage (0-100). Omit for indeterminate */
  value?: number;
  /** Color variant */
  variant?: keyof typeof colorStyles;
  /** Size preset */
  size?: keyof typeof sizeStyles;
  /** Show percentage label */
  showLabel?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Linear progress bar with determinate and indeterminate modes.
 *
 * @example
 * ```tsx
 * <ProgressBar value={75} variant="brand" />
 * <ProgressBar variant="success" showLabel />
 * <ProgressBar /> - indeterminate mode
 * ```
 */
export function ProgressBar({
  value,
  variant = 'brand',
  size = 'default',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const isIndeterminate = value === undefined;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-[#f0f0f0]',
          sizeStyles[size],
        )}
        role="progressbar"
        aria-valuenow={!isIndeterminate ? value : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={isIndeterminate ? 'Loading...' : value + '% complete'}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorStyles[variant],
            isIndeterminate && 'animate-pulse w-1/2',
          )}
          style={!isIndeterminate ? { width: (Math.min(100, Math.max(0, value))) + '%' } : undefined}
        />
      </div>
      {showLabel && !isIndeterminate && (
        <span className="text-xs font-medium text-[#76777d] min-w-[3ch] text-right tabular-nums">
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
}
