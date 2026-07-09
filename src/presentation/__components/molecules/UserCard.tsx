/**
 * ## UserCard
 *
 * Compact user/profile card with avatar, name, bio, and metadata.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';
import { Avatar } from '../atoms/Avatar';
import { Tag } from '../atoms/Tag';

export interface UserCardProps {
  /** Avatar image URL */
  avatarSrc?: string;
  /** Display name */
  name: string;
  /** Username */
  username?: string;
  /** Bio text */
  bio?: string;
  /** Tags (skills, roles) */
  tags?: string[];
  /** Meta info (e.g. "Joined Jan 2024") */
  meta?: string;
  /** Additional class names */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Size variant */
  variant?: 'default' | 'compact' | 'detailed';
}

/**
 * User/profile card with avatar and metadata.
 *
 * @example
 * ```tsx
 * <UserCard
 *   name="John Doe"
 *   username="johndoe"
 *   bio="Full-stack engineer"
 *   tags={["React", "TypeScript"]}
 * />
 * ```
 */
export function UserCard({
  avatarSrc,
  name,
  username,
  bio,
  tags,
  meta,
  variant = 'default',
  onClick,
  className,
}: UserCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg transition-colors duration-150',
        onClick && 'cursor-pointer hover:bg-[#fafafa]',
        variant === 'compact' ? 'p-2' : 'p-4',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <Avatar src={avatarSrc} initials={initials} size={variant === 'compact' ? 'sm' : 'default'} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#0a0a0a] truncate">{name}</span>
          {username && (
            <span className="text-xs text-[#76777d] truncate">@{username}</span>
          )}
        </div>

        {variant === 'detailed' && bio && (
          <p className="mt-0.5 text-xs text-[#76777d] line-clamp-2">{bio}</p>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} variant="brand" size="sm">
                {tag}
              </Tag>
            ))}
            {tags.length > 3 && (
              <Tag size="sm">+{tags.length - 3}</Tag>
            )}
          </div>
        )}

        {meta && (
          <p className="mt-1 text-[10px] text-[#a3a3a3]">{meta}</p>
        )}
      </div>
    </div>
  );
}
