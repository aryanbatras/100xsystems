/**
 * ## ProblemCard
 *
 * Collapsible DSA problem card with difficulty, description, and complexity info.
 * Used in DSA problem listings.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { DifficultyBadge } from './DifficultyBadge';

export interface ProblemCardProps {
  /** Problem order number */
  order: number;
  /** Problem title */
  title: string;
  /** Difficulty level */
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Theory';
  /** Problem description (markdown text) */
  description?: string;
  /** Example inputs/outputs */
  examples?: string[];
  /** Time complexity */
  timeComplexity?: string;
  /** Space complexity */
  spaceComplexity?: string;
  /** LeetCode/solution URL */
  leetcodeUrl?: string;
  /** Additional class names */
  className?: string;
}

/**
 * DSA problem card with expand/collapse and complexity info.
 *
 * @example
 * ```tsx
 * <ProblemCard
 *   order={1}
 *   title="Two Sum"
 *   difficulty="Easy"
 *   timeComplexity="O(n)"
 *   leetcodeUrl="https://leetcode.com/..."
 * />
 * ```
 */
export function ProblemCard({
  order,
  title,
  difficulty,
  description,
  examples,
  timeComplexity,
  spaceComplexity,
  leetcodeUrl,
  className,
}: ProblemCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn('rounded-lg border border-[#e5e5e5] bg-white overflow-hidden transition-all duration-200', className)}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#fafafa] transition-colors"
        aria-expanded={expanded}
      >
        <span className="text-[10px] font-mono text-[#a3a3a3] w-8 shrink-0">
          {String(order).padStart(3, '0')}
        </span>
        <span className="flex-1 text-sm font-medium text-[#0a0a0a]">{title}</span>
        <DifficultyBadge level={difficulty} size="sm" />
        {leetcodeUrl && (
          <a
            href={leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] font-medium text-[#572EFF] hover:text-[#4625CC] transition-colors shrink-0"
          >
            Solve →
          </a>
        )}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round"
          className={cn('text-[#a3a3a3] transition-transform duration-200 shrink-0', expanded && 'rotate-180')}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Content */}
      <div className={cn('overflow-hidden transition-all duration-200', expanded ? 'max-h-[2000px]' : 'max-h-0')}>
        <div className="border-t border-[#e5e5e5] px-4 py-3 space-y-3">
          {description && (
            <div>
              <h5 className="text-[10px] font-semibold uppercase tracking-wider text-[#76777d] mb-1">Description</h5>
              <p className="text-xs text-[#45464d] leading-relaxed">{description}</p>
            </div>
          )}

          {examples && examples.length > 0 && (
            <div>
              <h5 className="text-[10px] font-semibold uppercase tracking-wider text-[#76777d] mb-1">Examples</h5>
              {examples.map((ex, i) => (
                <pre key={i} className="text-xs bg-[#f5f5f5] rounded p-2 mb-1 overflow-x-auto">{ex}</pre>
              ))}
            </div>
          )}

          {(timeComplexity || spaceComplexity) && (
            <div className="flex gap-4">
              {timeComplexity && (
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#76777d]">Time: </span>
                  <code className="text-xs text-[#572EFF]">{timeComplexity}</code>
                </div>
              )}
              {spaceComplexity && (
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#76777d]">Space: </span>
                  <code className="text-xs text-[#572EFF]">{spaceComplexity}</code>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
