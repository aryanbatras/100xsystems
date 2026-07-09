/**
 * ## InfoRow
 *
 * Label-value pair row for displaying metadata, profile info, and details.
 * Used in Profile, Dashboard, and detail pages.
 *
 * @packageDocumentation
 */

import { type ReactNode } from 'react';
import { cn } from '../../_components/utils';

export interface InfoRowProps {
  /** Label text */
  label: string;
  /** Value content */
  value: ReactNode;
  /** Visual variant */
  variant?: 'default' | 'compact' | 'inline';
  /** Additional class names */
  className?: string;
}

/**
 * Label-value row for displaying information pairs.
 *
 * @example
 * ```tsx
 * <InfoRow label="Email" value="user@example.com" />
 * <InfoRow label="Status" value={<Badge>Active</Badge>} variant="inline" />
 * ```
 */
export function InfoRow({
  label,
  value,
  variant = 'default',
  className,
}: InfoRowProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <span className="text-[#76777d]">{label}:</span>
        <span className="text-[#0a0a0a]">{value}</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center justify-between py-1', className)}>
        <span className="text-xs text-[#76777d]">{label}</span>
        <span className="text-xs text-[#0a0a0a] font-medium">{value}</span>
      </div>
    );
  }

  return (
    <div className={cn('py-3 border-b border-[#f0f0f0] last:border-b-0', className)}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a3a3a3] block mb-1">
        {label}
      </span>
      <div className="text-sm text-[#0a0a0a]">{value}</div>
    </div>
  );
}
