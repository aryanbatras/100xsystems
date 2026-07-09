/**
 * ## ModuleCard
 *
 * Learning module/course card with progress, difficulty, and status.
 * Used in Dashboard for course overviews.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';
import { ProgressBar } from '../atoms/ProgressBar';
import { DifficultyBadge } from '../molecules/DifficultyBadge';

export type ModuleStatus = 'not-started' | 'in-progress' | 'completed';

export interface ModuleCardProps {
  /** Module title */
  title: string;
  /** Description */
  description: string;
  /** Progress percentage (0-100) */
  progress: number;
  /** Completed lessons count */
  completedLessons: number;
  /** Total lessons count */
  totalLessons: number;
  /** Difficulty level */
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Estimated time */
  estimatedTime: string;
  /** Module status */
  status: ModuleStatus;
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
}

const statusStyles: Record<ModuleStatus, string> = {
  'not-started': 'bg-[#f5f5f5] text-[#76777d]',
  'in-progress': 'bg-[#eff6ff] text-[#2563eb]',
  'completed': 'bg-[#f0fdf4] text-[#16a34a]',
};

/**
 * Learning module card with progress tracking.
 *
 * @example
 * ```tsx
 * <ModuleCard
 *   title="System Fundamentals"
 *   description="Master core principles"
 *   progress={75}
 *   completedLessons={9}
 *   totalLessons={12}
 *   difficulty="Intermediate"
 *   estimatedTime="8 hours"
 *   status="in-progress"
 * />
 * ```
 */
export function ModuleCard({
  title,
  description,
  progress,
  completedLessons,
  totalLessons,
  difficulty,
  estimatedTime,
  status,
  onClick,
  className,
}: ModuleCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[#e5e5e5] bg-white p-5 transition-all duration-200',
        'hover:border-[#d4d4d4] hover:shadow-sm',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-semibold text-[#0a0a0a]">{title}</h3>
        <DifficultyBadge level={difficulty} size="sm" />
      </div>

      {/* Description */}
      <p className="text-xs text-[#76777d] mb-4 line-clamp-2">{description}</p>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-[#76777d] mb-1.5">
          <span>{completedLessons}/{totalLessons} lessons</span>
          <span>{progress}%</span>
        </div>
        <ProgressBar
          value={progress}
          size="sm"
          variant={status === 'completed' ? 'success' : 'brand'}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-[#a3a3a3]">⏱️ {estimatedTime}</span>
        <span className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium',
          statusStyles[status],
        )}>
          {status.replace('-', ' ')}
        </span>
      </div>
    </div>
  );
}
