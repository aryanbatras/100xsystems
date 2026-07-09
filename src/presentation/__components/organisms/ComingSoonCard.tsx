/**
 * ## ComingSoonCard
 *
 * Card for featuring upcoming features/items with Coming Soon badge.
 * Used in Dashboard and landing pages.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';

export interface ComingSoonCardProps {
  /** Icon/emoji */
  icon: string;
  /** Feature title */
  title: string;
  /** Description */
  description: string;
  /** Badge text (defaults to "Coming Soon") */
  badgeText?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * Card for upcoming features with Coming Soon badge.
 *
 * @example
 * ```tsx
 * <ComingSoonCard
 *   icon="🏆"
 *   title="Achievements"
 *   description="Track progress and earn badges."
 * />
 * ```
 */
export function ComingSoonCard({
  icon,
  title,
  description,
  badgeText = 'Coming Soon',
  onClick,
  className,
}: ComingSoonCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[#e5e5e5] bg-white p-5 text-center transition-all duration-200',
        'hover:border-[#d4d4d4] hover:shadow-sm',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-[#0a0a0a] mb-1">{title}</h3>
      <p className="text-xs text-[#76777d] mb-3 leading-relaxed">{description}</p>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f5f5f5] text-[10px] font-medium text-[#76777d]">
        {badgeText}
      </span>
    </div>
  );
}
