/**
 * ## DataGrid
 *
 * Responsive stats grid for displaying metric cards.
 * Built from scratch for the 100xSystems design system.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────

export interface StatCard {
  /** Metric label */
  label: string;
  /** Metric value */
  value: string | number;
  /** Optional icon (emoji or SVG) */
  icon?: string;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend text (e.g., "+12%") */
  trendText?: string;
}

export interface DataGridProps {
  /** Array of stat cards */
  stats: StatCard[];
  /** Number of columns (1-4) */
  columns?: 1 | 2 | 3 | 4;
  /** Additional class names */
  className?: string;
  /** Small variant for compact displays */
  compact?: boolean;
}

// ─── Column Maps ────────────────────────────────────────────────────

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
} as const;

const trendColors = {
  up: 'text-[#16a34a]',
  down: 'text-[#dc2626]',
  neutral: 'text-[#76777d]',
} as const;

const trendIcons = {
  up: '↑',
  down: '↓',
  neutral: '→',
} as const;

// ─── Component ──────────────────────────────────────────────────────

/**
 * Responsive stats grid for displaying metric cards.
 *
 * @remarks
 * Arranges stat cards in a responsive grid (1-4 columns).
 * Each card shows label, value, optional icon, and trend indicator.
 *
 * @example
 * ```tsx
 * const stats = [
 *   { label: 'Total Users', value: '10,000', trend: 'up', trendText: '+12%' },
 *   { label: 'Active Now', value: '234', trend: 'neutral' },
 * ];
 * <DataGrid stats={stats} columns={4} />
 * ```
 */
export function DataGrid({
  stats,
  columns = 4,
  compact = false,
  className,
}: DataGridProps) {
  if (stats.length === 0) {
    return null;
  }

  return (
    <div className={cn('grid gap-4', colsMap[columns], className)}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            'rounded-lg border border-[#e5e5e5] bg-white shadow-sm',
            compact ? 'p-3' : 'p-4',
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span
              className={cn(
                'font-bold uppercase tracking-[0.6px] text-[#76777d]',
                compact ? 'text-[9px]' : 'text-[10px]',
              )}
            >
              {stat.label}
            </span>
            {stat.icon && <span className={cn(compact ? 'text-base' : 'text-lg')}>{stat.icon}</span>}
          </div>

          {/* Value */}
          <div
            className={cn(
              'mt-2 font-semibold text-[#0a0a0a]',
              compact ? 'text-xl' : 'text-2xl',
            )}
          >
            {stat.value}
          </div>

          {/* Trend */}
          {stat.trend && (
            <div className={cn('mt-1 flex items-center gap-1 text-xs', trendColors[stat.trend])}>
              <span>{trendIcons[stat.trend]}</span>
              {stat.trendText && <span>{stat.trendText}</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
