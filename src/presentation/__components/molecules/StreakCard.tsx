/**
 * ## StreakCard
 *
 * Learning streak display with current streak, longest streak, and total days.
 * Used in Dashboard achievements section.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';

export interface StreakCardProps {
  /** Current streak days */
  currentStreak: number;
  /** Longest streak days */
  longestStreak: number;
  /** Total learning days */
  totalDays?: number;
  /** Last activity date */
  lastActivityDate?: string;
  /** Show update button */
  showUpdate?: boolean;
  /** Update handler */
  onUpdate?: () => void;
  /** Additional class names */
  className?: string;
}

function getStreakEmoji(days: number): string {
  if (days >= 100) return '🔥🔥🔥';
  if (days >= 50) return '🔥🔥';
  if (days >= 10) return '🔥';
  if (days >= 1) return '✨';
  return '🌱';
}

/**
 * Learning streak card with current/longest streak stats.
 *
 * @example
 * ```tsx
 * <StreakCard currentStreak={7} longestStreak={14} totalDays={45} />
 * ```
 */
export function StreakCard({
  currentStreak,
  longestStreak,
  totalDays,
  lastActivityDate,
  showUpdate = false,
  onUpdate,
  className,
}: StreakCardProps) {
  return (
    <div className={cn('rounded-lg border border-[#e5e5e5] bg-white p-5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#0a0a0a]">Learning Streak</h3>
        {showUpdate && onUpdate && (
          <button
            type="button"
            onClick={onUpdate}
            className="text-[10px] font-medium text-[#572EFF] hover:text-[#4625CC] transition-colors"
          >
            Update Today
          </button>
        )}
      </div>

      {/* Main Streak Display */}
      <div className="flex items-center gap-4">
        <span className="text-3xl">{getStreakEmoji(currentStreak)}</span>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0a0a0a]">{currentStreak}</div>
            <div className="text-[10px] text-[#76777d]">Current Streak</div>
          </div>
          <div className="w-px h-10 bg-[#e5e5e5]" />
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0a0a0a]">{longestStreak}</div>
            <div className="text-[10px] text-[#76777d]">Longest Streak</div>
          </div>
        </div>
      </div>

      {/* Details */}
      {(totalDays || lastActivityDate) && (
        <div className="mt-4 pt-4 border-t border-[#e5e5e5] flex items-center justify-between">
          {totalDays !== undefined && (
            <div className="text-center">
              <div className="text-sm font-semibold text-[#0a0a0a]">{totalDays}</div>
              <div className="text-[10px] text-[#76777d]">Total Days</div>
            </div>
          )}
          {lastActivityDate && (
            <div className="text-[10px] text-[#a3a3a3]">
              Last: {new Date(lastActivityDate).toLocaleDateString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
