/**
 * ## SearchInput
 *
 * Search input with magnifying glass icon and clear button.
 * Built from the atomic Input component.
 *
 * @packageDocumentation
 */

'use client';

import { type InputHTMLAttributes } from 'react';
import { cn } from '../../_components/utils';

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Current search value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Show clear button */
  showClear?: boolean;
  /** Called when search is submitted (Enter key) */
  onSearch?: (value: string) => void;
}

/**
 * Search input with icon and optional clear button.
 *
 * @example
 * ```tsx
 * <SearchInput
 *   value={search}
 *   onChange={setSearch}
 *   placeholder="Search articles..."
 * />
 * ```
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  showClear = true,
  onSearch,
  className,
  ...props
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Search Icon */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#76777d]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-[#e5e5e5] bg-white py-2 pl-10 pr-10',
          'text-sm text-[#0a0a0a] placeholder:text-[#a3a3a3]',
          'transition-all duration-150',
          'focus:outline-none focus:border-[#572EFF] focus:ring-2 focus:ring-[#572EFF]/20',
          'disabled:cursor-not-allowed disabled:bg-[#f5f5f5]',
        )}
        {...props}
      />

      {/* Clear Button */}
      {showClear && value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#76777d] hover:text-[#0a0a0a] transition-colors"
          aria-label="Clear search"
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
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* Search Button (when no clear) */}
      {!showClear && (
        <button
          type="button"
          onClick={() => onSearch?.(value)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#572EFF] hover:text-[#4625CC] transition-colors"
          aria-label="Search"
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
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      )}
    </div>
  );
}
