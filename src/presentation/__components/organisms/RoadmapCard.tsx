/**
 * ## RoadmapCard
 *
 * Learning roadmap card with title, description, difficulty, stats, and section preview.
 * Used in Roadmaps listing page.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';
import { DifficultyBadge } from '../molecules/DifficultyBadge';
import { Tag } from '../atoms/Tag';

export interface RoadmapCardProps {
  /** Roadmap title */
  title: string;
  /** Description */
  description: string;
  /** Difficulty level */
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Estimated time */
  estimatedTime: string;
  /** Number of articles */
  articleCount?: number;
  /** Number of sections */
  sectionCount: number;
  /** Section names */
  sections: string[];
  /** Href for the link */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * Learning roadmap card with difficulty, stats, and section preview.
 *
 * @example
 * ```tsx
 * <RoadmapCard
 *   title="System Design Fundamentals"
 *   description="Master distributed systems."
 *   difficulty="Intermediate"
 *   estimatedTime="8 hours"
 *   sectionCount={6}
 *   sections={['Intro', 'Basics', 'Advanced']}
 * />
 * ```
 */
export function RoadmapCard({
  title,
  description,
  difficulty,
  estimatedTime,
  articleCount,
  sectionCount,
  sections,
  href,
  onClick,
  className,
}: RoadmapCardProps) {
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      className={cn(
        'group block rounded-lg border border-[#e5e5e5] bg-white p-5 transition-all duration-200',
        'hover:border-[#d4d4d4] hover:shadow-sm',
        className,
      )}
      onClick={onClick}
      {...wrapperProps}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 className="text-sm font-semibold text-[#0a0a0a] group-hover:text-[#572EFF] transition-colors">{title}</h2>
        <div className="flex items-center gap-2 shrink-0">
          <DifficultyBadge level={difficulty} size="sm" />
          <span className="text-[10px] text-[#a3a3a3] whitespace-nowrap">{estimatedTime}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-[#76777d] mb-4 line-clamp-2">{description}</p>

      {/* Stats */}
      <div className="flex gap-4 mb-3">
        {articleCount !== undefined && (
          <div>
            <div className="text-sm font-semibold text-[#0a0a0a]">{articleCount}</div>
            <div className="text-[10px] text-[#76777d]">Articles</div>
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-[#0a0a0a]">{sectionCount}</div>
          <div className="text-[10px] text-[#76777d]">Sections</div>
        </div>
      </div>

      {/* Sections */}
      {sections.length > 0 && (
        <div className="pt-3 border-t border-[#e5e5e5]">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#a3a3a3] mb-2">Sections:</div>
          <div className="flex flex-wrap gap-1">
            {sections.slice(0, 4).map((section) => (
              <Tag key={section} variant="default" size="sm">{section}</Tag>
            ))}
            {sections.length > 4 && (
              <Tag size="sm">+{sections.length - 4} more</Tag>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#572EFF] opacity-0 group-hover:opacity-100 transition-opacity">
        Start Learning
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
      </div>
    </Wrapper>
  );
}
