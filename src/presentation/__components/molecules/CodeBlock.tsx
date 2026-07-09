/**
 * ## CodeBlock
 *
 * Code display block with syntax highlighting, line numbers, and copy button.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { cn } from '../../_components/utils';

export interface CodeBlockProps {
  /** Code content */
  code: string;
  /** Language label */
  language?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Show copy button */
  showCopy?: boolean;
  /** Header/filename */
  header?: string;
  /** Additional class names */
  className?: string;
}

/**
 * Code block with copy button and language label.
 *
 * @example
 * ```tsx
 * <CodeBlock code="console.log('hello')" language="javascript" />
 * ```
 */
export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  showCopy = true,
  header,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const lines = code.split('\n');

  return (
    <div className={cn('rounded-lg border border-[#e5e5e5] overflow-hidden', className)}>
      {/* Header */}
      {(header || language || showCopy) && (
        <div className="flex items-center justify-between gap-3 bg-[#fafafa] border-b border-[#e5e5e5] px-4 py-2">
          <div className="flex items-center gap-2 min-w-0">
            {language && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#76777d]">
                {language}
              </span>
            )}
            {header && (
              <span className="text-xs text-[#76777d] truncate">{header}</span>
            )}
          </div>
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-[#76777d] hover:text-[#0a0a0a] transition-colors shrink-0"
              aria-label={copied ? 'Copied' : 'Copy code'}
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code */}
      <div className="overflow-x-auto bg-[#fafafa]">
        <pre className="py-4 px-4 text-xs leading-relaxed font-mono text-[#0a0a0a]">
          <code>
            {lines.map((line, i) => (
              <span key={i} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-right text-[#a3a3a3] w-8 mr-4 shrink-0">
                    {i + 1}
                  </span>
                )}
                <span className="whitespace-pre">{line || ' '}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
