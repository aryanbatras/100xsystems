/**
 * ## Pagination
 *
 * Page navigation with Previous/Next buttons and page info.
 * Built from scratch for the 100xSystems design system.
 *
 * @packageDocumentation
 */

'use client';

import { cn } from '@/application/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────

export interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Page change handler */
  onPageChange: (page: number) => void;
  /** Total number of items (for "Showing X-Y of Z" display) */
  totalItems?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Additional class names */
  className?: string;
  /** Compact variant */
  compact?: boolean;
}

// ─── Component ──────────────────────────────────────────────────────

/**
 * Page navigation controls with info display.
 *
 * @remarks
 * Shows previous/next buttons and current page info.
 * Automatically hides when there's only one page.
 * Displays "Showing X-Y of Z" when totalItems is provided.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 *   totalItems={100}
 * />
 * ```
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 25,
  compact = false,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems || currentPage * pageSize);

  const buttonBase = cn(
    'inline-flex items-center justify-center rounded-md border text-sm font-medium',
    'transition-all duration-150',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#572EFF] focus-visible:ring-offset-1',
    compact ? 'h-8 px-3 text-xs' : 'h-9 px-4',
  );

  const buttonActive = 'border-[#e5e5e5] bg-white text-[#45464d] hover:bg-[#f5f5f5] hover:border-[#d4d4d4]';
  const buttonDisabled = 'border-[#e5e5e5] bg-[#fafafa] text-[#a3a3a3]';

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {/* Item count */}
      {totalItems && (
        <span className={cn('text-[#76777d]', compact ? 'text-xs' : 'text-sm')}>
          Showing {startItem}–{endItem} of {totalItems}
        </span>
      )}

      {/* Page controls */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={cn(buttonBase, currentPage <= 1 ? buttonDisabled : buttonActive)}
          aria-label="Previous page"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {!compact && 'Previous'}
        </button>

        {/* Page indicator */}
        <span className={cn('text-[#76777d]', compact ? 'text-xs px-1' : 'text-sm px-2')}>
          {compact ? `${currentPage}/${totalPages}` : `Page ${currentPage} of ${totalPages}`}
        </span>

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={cn(buttonBase, currentPage >= totalPages ? buttonDisabled : buttonActive)}
          aria-label="Next page"
        >
          {!compact && 'Next'}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
