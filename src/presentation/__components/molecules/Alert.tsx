/**
 * ## Alert
 *
 * Alert banner for notifications, errors, warnings, and success messages.
 * Supports dismissible alerts and contextual variants.
 *
 * @packageDocumentation
 */

'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../../_components/utils';

const variantStyles = {
  info: {
    container: 'bg-[#eff6ff] border-[#93c5fd] text-[#1d4ed8]',
    icon: 'text-[#3b82f6]',
  },
  success: {
    container: 'bg-[#f0fdf4] border-[#86efac] text-[#15803d]',
    icon: 'text-[#22c55e]',
  },
  warning: {
    container: 'bg-[#fffbeb] border-[#fcd34d] text-[#92400e]',
    icon: 'text-[#f59e0b]',
  },
  error: {
    container: 'bg-[#fef2f2] border-[#fca5a5] text-[#991b1b]',
    icon: 'text-[#ef4444]',
  },
} as const;

const icons = {
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

export interface AlertProps {
  /** Alert variant */
  variant?: keyof typeof variantStyles;
  /** Title text */
  title?: string;
  /** Alert message */
  children: ReactNode;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Hide icon */
  hideIcon?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Alert banner for notifications and feedback.
 *
 * @example
 * ```tsx
 * <Alert variant="error" title="Error" dismissible>
 *   Something went wrong. Please try again.
 * </Alert>
 * <Alert variant="success">Operation completed successfully!</Alert>
 * ```
 */
export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  hideIcon = false,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 rounded-lg border p-4 text-sm',
        variantStyles[variant].container,
        className,
      )}
      role="alert"
    >
      {!hideIcon && (
        <span className={cn('mt-0.5 shrink-0', variantStyles[variant].icon)}>
          {icons[variant]}
        </span>
      )}
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 p-0.5 rounded hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
