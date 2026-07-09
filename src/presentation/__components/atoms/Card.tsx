/**
 * ## Card
 *
 * Content container card with optional header and footer sections.
 * Built from scratch for the 100xSystems design system.
 *
 * @packageDocumentation
 */

import { type ReactNode, type ElementType } from 'react';
import { cn } from '../../_components/utils';

// ─── Types ──────────────────────────────────────────────────────────

export interface CardProps {
  /** Card header content */
  header?: ReactNode;
  /** Card footer content */
  footer?: ReactNode;
  /** Remove padding from body */
  noPadding?: boolean;
  /** Hover effect */
  hoverable?: boolean;
  /** Click handler for the entire card */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
  /** Children */
  children?: ReactNode;
  /** HTML element to render as */
  as?: ElementType;
}

// ─── Component ──────────────────────────────────────────────────────

/**
 * Content container with header, body, and footer sections.
 *
 * @remarks
 * Provides consistent card styling with optional hover effects.
 * Supports header, body, and footer sections.
 *
 * @example
 * ```tsx
 * <Card header={<h2>Title</h2>} footer={<Button>Action</Button>}>
 *   Card content here
 * </Card>
 * ```
 */
export function Card({
  children,
  header,
  footer,
  noPadding = false,
  hoverable = false,
  className,
  onClick,
  as,
}: CardProps) {
  const Tag: ElementType = as || (onClick ? 'button' : 'div');

  const extraProps: Record<string, unknown> = {};
  if (onClick) {
    extraProps.onClick = onClick;
    extraProps.type = 'button';
  }

  return (
    <Tag
      className={cn(
        // Base
        'rounded-lg border border-[#e5e5e5] bg-white',
        'shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
        // Hover
        hoverable && 'transition-all duration-200 hover:shadow-md hover:border-[#d4d4d4]',
        onClick && 'cursor-pointer text-left w-full',
        className,
      )}
      {...extraProps}
    >
      {/* Header */}
      {header && (
        <div className="border-b border-[#e5e5e5] px-6 py-4">
          {header}
        </div>
      )}

      {/* Body */}
      <div className={cn(noPadding ? '' : 'px-6 py-5')}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-[#e5e5e5] px-6 py-4">
          {footer}
        </div>
      )}
    </Tag>
  );
}

// ─── Card Header (standalone) ───────────────────────────────────────

export interface CardHeaderProps {
  /** Title text */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Action elements (buttons, icons) */
  actions?: ReactNode;
  /** Additional class names */
  className?: string;
}

/**
 * Standardized card header with title, subtitle, and actions.
 */
export function CardHeader({ title, subtitle, actions, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between', className)}>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-[#0a0a0a] truncate">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-[#76777d]">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="ml-4 flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  );
}
