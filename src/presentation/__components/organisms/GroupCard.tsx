/**
 * ## GroupCard
 *
 * Study group card with name, description, member count, tags, and actions.
 * Used in Groups listing page.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';
import { Avatar } from '../atoms/Avatar';
import { Tag } from '../atoms/Tag';

export interface GroupCardProps {
  /** Group name */
  name: string;
  /** Description */
  description?: string;
  /** Member count */
  memberCount: number;
  /** Max members */
  maxMembers?: number;
  /** Group avatar URL */
  avatarUrl?: string;
  /** Tags */
  tags?: string[];
  /** Private group */
  isPrivate?: boolean;
  /** Welcome message */
  welcomeMessage?: string;
  /** Creation date */
  createdAt?: string;
  /** Roadmap slug */
  roadmapSlug?: string;
  /** User membership status */
  membership?: 'admin' | 'member' | 'none';
  /** Join handler */
  onJoin?: () => void;
  /** Leave handler */
  onLeave?: () => void;
  /** Edit handler */
  onEdit?: () => void;
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * Study group card with membership actions.
 *
 * @example
 * ```tsx
 * <GroupCard
 *   name="React Study Group"
 *   description="Learn React together"
 *   memberCount={15}
 *   tags={["react", "frontend"]}
 * />
 * ```
 */
export function GroupCard({
  name,
  description,
  memberCount,
  maxMembers,
  avatarUrl,
  tags,
  isPrivate,
  welcomeMessage,
  createdAt,
  roadmapSlug,
  membership = 'none',
  onJoin,
  onLeave,
  onEdit,
  onClick,
  className,
}: GroupCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

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
      <div className="flex items-start gap-3 mb-3">
        <Avatar src={avatarUrl} initials={initials} />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#0a0a0a]">{name}</h3>
          {description && (
            <p className="text-xs text-[#76777d] mt-0.5 line-clamp-2">{description}</p>
          )}
        </div>
      </div>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="text-xs text-[#76777d]">
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
          {maxMembers && ` / ${maxMembers} max`}
        </span>
        {isPrivate && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#f59e0b]">Private</span>
        )}
        {roadmapSlug && (
          <span className="text-[10px] text-[#76777d]">📚 {roadmapSlug}</span>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} variant="brand" size="sm">{tag}</Tag>
            ))}
          </div>
        )}
      </div>

      {/* Welcome Message */}
      {welcomeMessage && (
        <div className="mb-3 p-3 rounded bg-[#fafafa] text-xs text-[#76777d] italic border border-[#e5e5e5]">
          &ldquo;{welcomeMessage}&rdquo;
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-[#e5e5e5]">
        <div className="flex gap-2">
          {membership === 'none' && onJoin && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onJoin(); }}
              className="rounded-lg bg-[#572EFF] px-4 py-1.5 text-xs text-white font-medium hover:bg-[#4625CC] transition-colors"
            >
              Join
            </button>
          )}
          {membership === 'member' && onLeave && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onLeave(); }}
              className="rounded-lg border border-[#e5e5e5] px-4 py-1.5 text-xs text-[#76777d] font-medium hover:bg-[#f5f5f5] transition-colors"
            >
              Leave
            </button>
          )}
          {membership === 'admin' && onEdit && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="rounded-lg border border-[#e5e5e5] px-4 py-1.5 text-xs text-[#76777d] font-medium hover:bg-[#f5f5f5] transition-colors"
            >
              Edit
            </button>
          )}
        </div>
        {createdAt && (
          <span className="text-[10px] text-[#a3a3a3]">
            Created {new Date(createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
