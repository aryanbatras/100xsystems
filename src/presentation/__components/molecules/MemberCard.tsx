/**
 * ## MemberCard
 *
 * User/member profile card with avatar, name, role, bio, and social links.
 * Used in Group Members and team pages.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';
import { Avatar } from '../atoms/Avatar';
import { Tag } from '../atoms/Tag';

export interface SocialLink {
  label: string;
  url: string;
}

export interface MemberCardProps {
  /** Avatar image URL */
  avatarUrl?: string;
  /** Display name */
  name: string;
  /** Username */
  username?: string;
  /** Role in group */
  role?: string;
  /** Bio text */
  bio?: string;
  /** Social links */
  socialLinks?: SocialLink[];
  /** Member since date */
  joinedDate?: string;
  /** Tags (skills) */
  tags?: string[];
  /** Additional class names */
  className?: string;
}

/**
 * Member card for groups and team displays.
 *
 * @example
 * ```tsx
 * <MemberCard
 *   name="John Doe"
 *   username="johndoe"
 *   role="Admin"
 *   bio="Full-stack engineer"
 *   socialLinks={[{ label: 'GitHub', url: 'https://github.com/johndoe' }]}
 * />
 * ```
 */
export function MemberCard({
  avatarUrl,
  name,
  username,
  role,
  bio,
  socialLinks,
  joinedDate,
  tags,
  className,
}: MemberCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className={cn('rounded-lg border border-[#e5e5e5] bg-white p-4', className)}>
      <div className="flex items-start gap-3">
        <Avatar src={avatarUrl} initials={initials} size="default" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-[#0a0a0a]">{name}</h4>
            {role && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#572EFF]">{role}</span>
            )}
          </div>

          {username && (
            <p className="text-xs text-[#76777d]">@{username}</p>
          )}

          {bio && (
            <p className="mt-1 text-xs text-[#76777d] leading-relaxed">{bio}</p>
          )}

          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <Tag key={tag} variant="brand" size="sm">{tag}</Tag>
              ))}
            </div>
          )}

          {socialLinks && socialLinks.length > 0 && (
            <div className="mt-2 flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium text-[#76777d] hover:text-[#572EFF] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {joinedDate && (
            <p className="mt-1 text-[10px] text-[#a3a3a3]">
              Joined {new Date(joinedDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
