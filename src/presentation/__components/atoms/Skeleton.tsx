/**
 * ## Skeleton
 *
 * Loading placeholder with pulse animation for content that hasn't loaded yet.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';

export interface SkeletonProps {
  /** Width (Tailwind class or CSS value) */
  width?: string;
  /** Height (Tailwind class or CSS value) */
  height?: string;
  /** Border radius variant */
  rounded?: 'sm' | 'default' | 'lg' | 'full';
  /** Additional class names */
  className?: string;
  /** Render as inline-block */
  inline?: boolean;
}

const roundedStyles = {
  sm: 'rounded-sm',
  default: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;

/**
 * Loading skeleton placeholder.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-full" />
 * <Skeleton width="48px" height="48px" rounded="full" />
 * ```
 */
export function Skeleton({
  width,
  height = '1rem',
  rounded = 'default',
  inline = false,
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[#e5e5e5]',
        roundedStyles[rounded],
        inline ? 'inline-block' : 'block',
        className,
      )}
      style={{
        width: width || undefined,
        height,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton block — a collection of skeleton lines for card-like placeholders.
 */
export interface SkeletonBlockProps {
  /** Number of lines */
  lines?: number;
  /** Show avatar circle */
  avatar?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Card skeleton block for loading states.
 *
 * @example
 * ```tsx
 * <SkeletonBlock lines={3} avatar />
 * ```
 */
export function SkeletonBlock({ lines = 3, avatar = false, className }: SkeletonBlockProps) {
  return (
    <div className={cn('flex gap-4 p-4', className)}>
      {avatar && <Skeleton width="40px" height="40px" rounded="full" />}
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <Skeleton key={i} className={`h-3 ${i === lines - 2 ? 'w-1/2' : 'w-full'}`} />
        ))}
      </div>
    </div>
  );
}
