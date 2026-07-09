/**
 * ## FilterBar
 *
 * Search + filter control bar combining SearchInput with
 * additional filter controls. Built from scratch.
 *
 * @packageDocumentation
 */

'use client';

import { type ReactNode } from 'react';
import { cn } from '../../_components/utils';
import { SearchInput } from './SearchInput';

// ─── Types ──────────────────────────────────────────────────────────

export interface FilterBarProps {
  /** Current search value */
  searchValue: string;
  /** Search change handler */
  onSearchChange: (value: string) => void;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Called when search is submitted */
  onSearch?: (value: string) => void;
  /** Additional filter controls (Select, buttons, etc.) */
  children?: ReactNode;
  /** Show result count */
  resultCount?: number;
  /** Additional class names */
  className?: string;
}

// ─── Component ──────────────────────────────────────────────────────

/**
 * Horizontal filter bar combining SearchInput with additional controls.
 *
 * @remarks
 * Arranges a search input and filter controls in a responsive row.
 * Optionally shows result count.
 *
 * @example
 * ```tsx
 * <FilterBar
 *   searchValue={query}
 *   onSearchChange={setQuery}
 *   resultCount={results.length}
 * >
 *   <select>
 *     <option value="all">All</option>
 *   </select>
 * </FilterBar>
 * ```
 */
export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  onSearch,
  resultCount,
  children,
  className,
}: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {/* Search */}
      <div className="min-w-[240px] flex-1">
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
        />
      </div>

      {/* Additional Filters */}
      {children && (
        <div className="flex items-center gap-2">{children}</div>
      )}

      {/* Result Count */}
      {resultCount !== undefined && (
        <span className="text-xs text-[#76777d] whitespace-nowrap">
          {resultCount} result{resultCount !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}
