/**
 * ## KnowledgeCheck
 *
 * Minimal text-based question component. No background, just a clean
 * expandable question card with a purple accent icon.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { cn } from '@/application/lib/utils';

interface KnowledgeCheckProps {
  question: string;
  explanation: string;
  className?: string;
}

export function KnowledgeCheck({ question, explanation, className }: KnowledgeCheckProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={cn('my-6', className)}>
      <button
        onClick={() => setRevealed(!revealed)}
        className="w-full text-left group"
      >
        <div className="flex items-start gap-3 py-3 transition-colors duration-200">
          <span className="flex items-center justify-center w-6 h-6 mt-0.5 shrink-0 bg-accent text-white text-xs font-bold">
            ?
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
              Knowledge Check
            </p>
            <p className="text-sm font-medium text-fg leading-relaxed">
              {question}
            </p>
            <div className={cn(
              'flex items-center gap-1.5 mt-2 text-xs font-semibold transition-all duration-200',
              revealed ? 'text-accent' : 'text-fg-muted group-hover:text-accent'
            )}>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={cn('transition-transform duration-200', revealed && 'rotate-180')}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {revealed ? 'Hide explanation' : 'Think about it...'}
            </div>
          </div>
        </div>
      </button>

      {revealed && (
        <div className="pl-9 pt-2">
          <div className="border-l-2 border-accent/30 pl-4">
            <p className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-1">
              Explanation
            </p>
            <p className="text-sm text-fg-secondary leading-relaxed">
              {explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
