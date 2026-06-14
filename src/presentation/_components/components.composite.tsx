/**
 * ## Presentation: Composite Components
 *
 * Higher-order composite UI components built from
 * atomic primitives — Table, SearchInput, Pagination,
 * and FilterBar for data-heavy interfaces.
 *
 * @packageDocumentation
 */

import React from 'react';
import { Input, Spinner } from './components.atomic';
import { table, tableHeader, tableHeaderCell, tableRow, tableCell, textMuted } from '../_styles/components.styles';

// ─── TABLE ────────────────────────────────────────────────────────
interface ColumnDef<T = Record<string, unknown>> {
  key: string;
  label: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string);
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

/**
 * Generic data table with column definitions, loading state, and empty state.
 *
 * @remarks
 * Fully typed generic table supporting custom column renderers,
 * row click handlers, server-side loading, and customizable
 * empty state messaging.
 *
 * @typeParam T - The row data type
 * @param props - Table properties including columns, data, and options
 * @returns A rendered table with header and body
 * @public
 */
export function Table<T extends Record<string, unknown>>({
  columns, data, rowKey, onRowClick, loading, emptyMessage,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className={textMuted}>{emptyMessage || 'No data available'}</p>
      </div>
    );
  }

  const getRowKey = (row: T): string => {
    if (typeof rowKey === 'function') return rowKey(row);
    return String(row[rowKey]);
  };

  return (
    <div className="overflow-x-auto border border-[#e5e5e5] rounded-lg">
      <table className={table}>
        <thead className={tableHeader}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={tableHeaderCell} style={col.width ? { width: col.width } : undefined}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={getRowKey(row)}
              className={tableRow}
              onClick={() => onRowClick?.(row)}
              style={{ cursor: onRowClick ? 'pointer' : undefined }}
            >
              {columns.map((col) => (
                <td key={col.key} className={tableCell}>
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── SEARCH INPUT ─────────────────────────────────────────────────
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Search input with magnifying glass icon.
 *
 * @remarks
 * Controlled input that displays a search icon and
 * calls onChange with the updated value on each keystroke.
 *
 * @param props - Search input properties
 * @returns A search input with icon
 * @public
 */
export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="pl-10"
      />
    </div>
  );
}

// ─── PAGINATION ───────────────────────────────────────────────────
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
}

/**
 * Page navigation with Previous/Next buttons and item count.
 *
 * @remarks
 * Shows current page info and navigation controls.
 * Automatically hides when there's only one page.
 * Displays "Showing X-Y of Z" when totalItems is provided.
 *
 * @param props - Pagination properties
 * @returns Page navigation controls, or null for single-page datasets
 * @public
 */
export function Pagination({ currentPage, totalPages, onPageChange, totalItems, pageSize = 25 }: PaginationProps) {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500">
        {totalItems ? `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, totalItems)} of ${totalItems}` : ''}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ConfirmDialog is defined in components.atomic.ts as Modal
// Usage: <Modal title="Confirm" footer={<Button onClick={onConfirm}>OK</Button>}>...</Modal>

// ─── FILTER BAR ───────────────────────────────────────────────────
interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

/**
 * Search + filter control bar.
 *
 * @remarks
 * Combines a search input with additional filter controls
 * passed as children (e.g., select dropdowns, date pickers).
 *
 * @param props - Filter bar properties
 * @returns A horizontal filter bar with search and controls
 * @public
 */
export function FilterBar({ searchValue, onSearchChange, searchPlaceholder, children }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 mb-4 flex-wrap">
      <SearchInput value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} />
      {children}
    </div>
  );
}
