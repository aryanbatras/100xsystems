/**
 * ## SearchResults
 *
 * Search results panel with result cards, filters, and empty state.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Tag } from '../atoms/Tag';
import { EmptyState } from '../molecules/EmptyState';
import { Pagination } from '../molecules/Pagination';

export interface SearchResultItem {
  /** Unique ID */
  id: string;
  /** Result title */
  title: string;
  /** Description/snippet */
  description?: string;
  /** URL */
  url?: string;
  /** Category label */
  category?: string;
  /** Tags */
  tags?: string[];
  /** Date string */
  date?: string;
  /** Type icon or emoji */
  icon?: string;
  /** Metadata (e.g. difficulty, duration) */
  meta?: Array<{ label: string; value: string }>;
}

export interface SearchResultsProps {
  /** Search results */
  results: SearchResultItem[];
  /** Current search query */
  query: string;
  /** Total result count (for pagination) */
  totalResults?: number;
  /** Loading state */
  loading?: boolean;
  /** Available filter tags */
  availableTags?: string[];
  /** Selected filter tags */
  selectedTags?: string[];
  /** Tag toggle handler */
  onTagToggle?: (tag: string) => void;
  /** Clear all filters */
  onClearFilters?: () => void;
  /** Page number */
  currentPage?: number;
  /** Total pages */
  totalPages?: number;
  /** Page change handler */
  onPageChange?: (page: number) => void;
  /** Additional class names */
  className?: string;
}

/**
 * Search results panel with filters and pagination.
 *
 * @example
 * ```tsx
 * <SearchResults
 *   query="react"
 *   results={results}
 *   totalResults={24}
 *   availableTags={["beginner", "advanced"]}
 *   selectedTags={[]}
 * />
 * ```
 */
export function SearchResults({
  results,
  query,
  totalResults,
  loading = false,
  availableTags,
  selectedTags = [],
  onTagToggle,
  onClearFilters,
  currentPage,
  totalPages,
  onPageChange,
  className,
}: SearchResultsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border border-[#e5e5e5] p-4 space-y-2">
            <div className="h-4 bg-[#e5e5e5] rounded w-3/4" />
            <div className="h-3 bg-[#f0f0f0] rounded w-full" />
            <div className="h-3 bg-[#f0f0f0] rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={className}>
        <EmptyState
          icon="🔍"
          title={query ? `No results for "${query}"` : 'No results'}
          description={query ? 'Try different keywords or browse categories.' : 'No items match your current filters.'}
          action={
            query || selectedTags.length > 0 ? (
              <button
                type="button"
                onClick={onClearFilters}
                className="text-sm text-[#572EFF] hover:text-[#4625CC] underline underline-offset-2 transition-colors"
              >
                Clear filters
              </button>
            ) : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Results header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#76777d]">
          {totalResults !== undefined ? (
            <>{totalResults} result{totalResults !== 1 ? 's' : ''} found</>
          ) : (
            <>{results.length} result{results.length !== 1 ? 's' : ''} found</>
          )}
          {query && (
            <> for &ldquo;<span className="font-medium text-[#45464d]">{query}</span>&rdquo;</>
          )}
        </p>

        {/* Active filters */}
        {selectedTags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#a3a3a3]">Filters:</span>
            {selectedTags.map((tag) => (
              <Tag
                key={tag}
                variant="brand"
                size="sm"
                removable
                onRemove={() => onTagToggle?.(tag)}
              >
                {tag}
              </Tag>
            ))}
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs text-[#76777d] hover:text-[#45464d] underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Available filters */}
      {availableTags && availableTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {availableTags.map((tag) => (
            <Tag
              key={tag}
              variant={selectedTags.includes(tag) ? 'brand' : 'default'}
              size="sm"
              className="cursor-pointer"
              onClick={() => onTagToggle?.(tag)}
            >
              {tag}
            </Tag>
          ))}
        </div>
      )}

      {/* Results list */}
      <div className="space-y-2">
        {results.map((result) => (
          <a
            key={result.id}
            href={result.url}
            className={cn(
              'block rounded-lg border border-[#e5e5e5] p-4 transition-all duration-150',
              'hover:border-[#d4d4d4] hover:shadow-sm',
              hoveredId === result.id && 'border-[#d4d4d4]',
            )}
            onMouseEnter={() => setHoveredId(result.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              {result.icon && (
                <span className="shrink-0 text-xl mt-0.5">{result.icon}</span>
              )}

              <div className="flex-1 min-w-0">
                {/* Title + Category */}
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-[#0a0a0a] truncate">
                    {result.title}
                  </h3>
                  {result.category && (
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-[#76777d]">
                      {result.category}
                    </span>
                  )}
                </div>

                {/* Description */}
                {result.description && (
                  <p className="mt-0.5 text-xs text-[#76777d] line-clamp-2">
                    {result.description}
                  </p>
                )}

                {/* Meta + Tags */}
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {result.meta?.map((m, i) => (
                    <span key={i} className="text-[10px] text-[#a3a3a3] whitespace-nowrap">
                      {m.value}
                    </span>
                  ))}
                  {result.date && (
                    <span className="text-[10px] text-[#a3a3a3]">
                      {new Date(result.date).toLocaleDateString()}
                    </span>
                  )}
                  {result.tags?.slice(0, 3).map((tag) => (
                    <Tag key={tag} size="sm" variant="outline">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination */}
      {currentPage !== undefined && totalPages !== undefined && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
