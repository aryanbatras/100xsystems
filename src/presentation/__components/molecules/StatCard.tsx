/**
 * ## StatCard
 *
 * Single stat display with number, label, and optional trend.
 * Used in dashboard, roadmaps, and resource pages.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';

export interface StatCardProps {
  /** Stat value */
  value: string | number;
  /** Stat label */
  label: string;
  /** Optional icon/emoji */
  icon?: string;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend text */
  trendText?: string;
  /** Variant */
  variant?: 'default' | 'compact' | 'hero';
  /** Additional class names */
  className?: string;
}

const variantStyles = {
  default: 'p-4 border border-[#e5e5e5] rounded-lg bg-white shadow-sm',
  compact: 'p-3 border border-[#e5e5e5] rounded-lg bg-white',
  hero: 'p-5 border-0 rounded-xl bg-[#f0f0ff]',
};

const trendColors = {
  up: 'text-[#16a34a]',
  down: 'text-[#dc2626]',
  neutral: 'text-[#76777d]',
};

const trendIcons = { up: '↑', down: '↓', neutral: '→' };

/**
 * Stat card for dashboards and overviews.
 *
 * @example
 * ```tsx
 * <StatCard value="10,000" label="Total Users" trend="up" trendText="+12%" />
 * <StatCard value="75%" label="Completion" variant="hero" />
 * ```
 */
export function StatCard({
  value,
  label,
  icon,
  trend,
  trendText,
  variant = 'default',
  className,
}: StatCardProps) {
  return (
    <div className={cn(variantStyles[variant], className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.6px] text-[#76777d]">
          {label}
        </span>
        {icon && <span className="text-base">{icon}</span>}
      </div>
      <div className={cn('font-semibold text-[#0a0a0a]', variant === 'hero' ? 'text-3xl' : 'text-2xl')}>
        {value}
      </div>
      {trend && (
        <div className={cn('mt-1 flex items-center gap-1 text-xs', trendColors[trend])}>
          <span>{trendIcons[trend]}</span>
          {trendText && <span>{trendText}</span>}
        </div>
      )}
    </div>
  );
}
