/**
 * ## Avatar
 *
 * User avatar display with image, initials fallback, and size variants.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';

const sizeStyles = {
  xs: 'h-6 w-6 text-[8px]',
  sm: 'h-8 w-8 text-xs',
  default: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
} as const;

export interface AvatarProps {
  /** Image URL */
  src?: string;
  /** Alt text */
  alt?: string;
  /** Fallback initials (used when no src or image fails) */
  initials?: string;
  /** Size preset */
  size?: keyof typeof sizeStyles;
  /** Additional class names */
  className?: string;
  /** Status indicator */
  status?: 'online' | 'away' | 'busy' | 'offline';
}

const statusColors = {
  online: 'bg-[#22c55e]',
  away: 'bg-[#f59e0b]',
  busy: 'bg-[#ef4444]',
  offline: 'bg-[#a3a3a3]',
};

/**
 * User avatar with image and initials fallback.
 *
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John" />
 * <Avatar initials="JD" size="lg" status="online" />
 * ```
 */
export function Avatar({
  src,
  alt = '',
  initials,
  size = 'default',
  status,
  className,
}: AvatarProps) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn('rounded-full object-cover', sizeStyles[size])}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const fallback = (e.currentTarget as HTMLImageElement).nextElementSibling;
            if (fallback) (fallback as HTMLElement).style.display = 'flex';
          }}
        />
      ) : null}
      <div
        className={cn(
          'rounded-full bg-[#f0f0ff] text-[#572EFF] font-medium items-center justify-center',
          src ? 'hidden' : 'flex',
          sizeStyles[size],
        )}
      >
        {initials || '?'}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white',
            statusColors[status],
          )}
          aria-label={status}
        />
      )}
    </div>
  );
}
