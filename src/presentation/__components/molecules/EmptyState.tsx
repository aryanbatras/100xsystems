/**
 * ## EmptyState
 *
 * Empty state display for empty lists, no search results, and error states.
 *
 * @packageDocumentation
 */

import { type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

export interface EmptyStateProps {
  /** Icon/emoji to display */
  icon?: ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Action element (button, link) */
  action?: ReactNode;
  /** Compact variant */
  compact?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Empty state display with icon, title, description, and optional action.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon="📚"
 *   title="No articles yet"
 *   description="Articles will appear here once published."
 *   action={<Button>Create Article</Button>}
 * />
 * ```
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'py-8 gap-2' : 'py-16 gap-4',
        className,
      )}
    >
      {icon && (
        <div className={cn('text-[#d4d4d4]', compact ? 'text-2xl' : 'text-4xl')}>
          {icon}
        </div>
      )}
      <h3 className={cn('font-semibold text-[#0a0a0a]', compact ? 'text-sm' : 'text-base')}>
        {title}
      </h3>
      {description && (
        <p className={cn('text-[#76777d] max-w-sm', compact ? 'text-xs' : 'text-sm')}>
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
