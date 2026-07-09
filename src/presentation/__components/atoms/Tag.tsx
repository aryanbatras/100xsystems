/**
 * ## Tag
 *
 * Tag/chip component for labels, filters, and metadata display.
 *
 * @packageDocumentation
 */

'use client';

import { cn } from '@/application/lib/utils';

const variantStyles = {
  default: 'bg-[#f5f5f5] text-[#45464d] border-[#e5e5e5]',
  brand: 'bg-[#f0f0ff] text-[#572EFF] border-[#e0e0ff]',
  success: 'bg-[#f0fdf4] text-[#16a34a] border-[#b8f5c8]',
  warning: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]',
  error: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]',
  outline: 'bg-transparent text-[#76777d] border-[#d4d4d4]',
} as const;

const sizeStyles = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  default: 'px-2 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
} as const;

export interface TagProps {
  /** Visual variant */
  variant?: keyof typeof variantStyles;
  /** Size preset */
  size?: keyof typeof sizeStyles;
  /** Show remove button */
  removable?: boolean;
  /** Remove handler */
  onRemove?: () => void;
  /** Click handler (makes tag interactive) */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
  children: React.ReactNode;
}

/**
 * Tag/chip for displaying labels, filters, and metadata.
 *
 * @example
 * ```tsx
 * <Tag variant="brand">React</Tag>
 * <Tag removable onRemove={() => {}}>Filter</Tag>
 * ```
 */
export function Tag({
  variant = 'default',
  size = 'default',
  removable = false,
  onRemove,
  onClick,
  className,
  children,
}: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 rounded-md border font-medium whitespace-nowrap',
        'transition-colors duration-150',
        variantStyles[variant],
        sizeStyles[size],
        onClick && 'cursor-pointer',
        removable && 'pr-1',
        className,
      )}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-black/10 transition-colors"
          aria-label="Remove"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
}
