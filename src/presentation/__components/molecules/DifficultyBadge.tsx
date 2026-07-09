/**
 * ## DifficultyBadge
 *
 * Colored badge for difficulty levels (Beginner, Intermediate, Advanced).
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';

const difficultyStyles = {
  Beginner: 'bg-[#f0fdf4] text-[#16a34a] border-[#86efac]',
  Intermediate: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]',
  Advanced: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]',
  Theory: 'bg-[#f0f0ff] text-[#572EFF] border-[#e0e0ff]',
  Easy: 'bg-[#f0fdf4] text-[#16a34a] border-[#86efac]',
  Medium: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]',
  Hard: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]',
} as const;

export interface DifficultyBadgeProps {
  /** Difficulty level */
  level: keyof typeof difficultyStyles;
  /** Size */
  size?: 'sm' | 'default';
  /** Additional class names */
  className?: string;
}

/**
 * Colored difficulty badge.
 *
 * @example
 * ```tsx
 * <DifficultyBadge level="Beginner" />
 * <DifficultyBadge level="Advanced" size="sm" />
 * ```
 */
export function DifficultyBadge({ level, size = 'default', className }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium whitespace-nowrap',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
        difficultyStyles[level] || difficultyStyles.Beginner,
        className,
      )}
    >
      {level}
    </span>
  );
}
