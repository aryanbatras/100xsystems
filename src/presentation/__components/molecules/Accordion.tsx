/**
 * ## Accordion
 *
 * Expandable/collapsible accordion sections for content organization.
 *
 * @packageDocumentation
 */

'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

export interface AccordionItem {
  /** Unique identifier */
  id: string;
  /** Title/header text */
  title: string;
  /** Content */
  content: ReactNode;
  /** Optional badge/count */
  count?: number;
  /** Disabled state */
  disabled?: boolean;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Allow multiple items open at once */
  multiple?: boolean;
  /** Default open item IDs */
  defaultOpen?: string[];
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'separated';
  /** Additional class names */
  className?: string;
}

const variantStyles = {
  default: 'divide-y divide-[#e5e5e5]',
  bordered: 'space-y-1',
  separated: 'space-y-2',
};

const itemStyles = {
  default: '',
  bordered: 'border border-[#e5e5e5] rounded-lg overflow-hidden',
  separated: 'border border-[#e5e5e5] rounded-lg overflow-hidden shadow-sm',
};

/**
 * Expandable accordion sections.
 *
 * @example
 * ```tsx
 * <Accordion items={[
 *   { id: '1', title: 'Section 1', content: <p>Content</p>, count: 5 },
 *   { id: '2', title: 'Section 2', content: <p>More content</p> },
 * ]} />
 * ```
 */
export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  variant = 'default',
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn(variantStyles[variant], className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);

        return (
          <div key={item.id} className={itemStyles[variant]}>
            <button
              type="button"
              onClick={() => !item.disabled && toggle(item.id)}
              disabled={item.disabled}
              className={cn(
                'flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors duration-150',
                'hover:bg-[#fafafa]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                isOpen && variant !== 'default' && 'border-b border-[#e5e5e5]',
              )}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-[#0a0a0a]">{item.title}</span>
              <span className="flex items-center gap-2">
                {item.count !== undefined && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-semibold rounded-full bg-[#f0f0f0] text-[#76777d]">
                    {item.count}
                  </span>
                )}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    'text-[#a3a3a3] transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0',
              )}
            >
              <div className="px-4 py-3 text-sm text-[#45464d] leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
