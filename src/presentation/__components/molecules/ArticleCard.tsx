/**
 * ## ArticleCard
 *
 * Article preview card with title, description, and date.
 * Used in Articles listing page.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';

export interface ArticleCardProps {
  /** Article slug/URL */
  slug: string;
  /** Article title */
  title: string;
  /** Description/summary */
  description?: string | null;
  /** Publication date */
  date?: string | null;
  /** Category/tag */
  category?: string;
  /** Read time in minutes */
  readTime?: number;
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * Article preview card with title, description, and date.
 *
 * @example
 * ```tsx
 * <ArticleCard
 *   slug="getting-started"
 *   title="Getting Started with Systems Thinking"
 *   description="Learn the fundamentals..."
 *   date="2024-01-15"
 *   category="Engineering"
 *   readTime={8}
 * />
 * ```
 */
export function ArticleCard({
  slug,
  title,
  description,
  date,
  category,
  readTime,
  onClick,
  className,
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        'group rounded-lg border border-[#e5e5e5] bg-white p-5 transition-all duration-200',
        'hover:border-[#d4d4d4] hover:shadow-sm',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Category + Date */}
      <div className="flex items-center gap-3 mb-2">
        {category && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#572EFF]">
            {category}
          </span>
        )}
        {date && (
          <span className="text-[10px] text-[#a3a3a3]">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </span>
        )}
        {readTime && (
          <span className="text-[10px] text-[#a3a3a3]">{readTime} min read</span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-sm font-semibold text-[#0a0a0a] group-hover:text-[#572EFF] transition-colors duration-150">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-1.5 text-xs text-[#76777d] leading-relaxed line-clamp-2">
          {description}
        </p>
      )}

      {/* Read more */}
      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#572EFF] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        Read article
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </article>
  );
}
