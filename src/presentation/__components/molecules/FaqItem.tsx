/**
 * ## FaqItem
 *
 * Expandable FAQ question/answer item with toggle.
 * Used in FAQ pages and knowledge bases.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { cn } from '@/application/lib/utils';

export interface FaqItemProps {
  /** Question text */
  question: string;
  /** Answer content */
  answer: string;
  /** Initially open */
  defaultOpen?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * FAQ item with expand/collapse toggle.
 *
 * @example
 * ```tsx
 * <FaqItem
 *   question="What is 100xSystems?"
 *   answer="A platform for software engineering education."
 * />
 * ```
 */
export function FaqItem({
  question,
  answer,
  defaultOpen = false,
  className,
}: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn('border-b border-[#e5e5e5] last:border-b-0', className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 py-4 text-left transition-colors hover:text-[#572EFF]"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-[#0a0a0a] flex-1">{question}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={cn('shrink-0 text-[#a3a3a3] transition-transform duration-200', open && 'rotate-180')}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={cn('overflow-hidden transition-all duration-200', open ? 'max-h-[1000px] pb-4' : 'max-h-0')}>
        <p className="text-xs text-[#45464d] leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
