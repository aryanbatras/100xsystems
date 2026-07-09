/**
 * ## Typography
 *
 * Typography primitives for consistent text styling.
 * Built from scratch for the 100xSystems design system.
 *
 * @packageDocumentation
 */

import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

// ─── Variant Definitions ────────────────────────────────────────────

const headingVariants = {
  h1: 'text-[2.25rem] font-bold leading-tight tracking-tight text-[#0a0a0a]',
  h2: 'text-[1.875rem] font-semibold leading-tight tracking-tight text-[#0a0a0a]',
  h3: 'text-[1.5rem] font-semibold leading-snug text-[#0a0a0a]',
  h4: 'text-[1.25rem] font-semibold leading-snug text-[#0a0a0a]',
  h5: 'text-[1.125rem] font-medium leading-snug text-[#0a0a0a]',
  h6: 'text-[1rem] font-medium leading-snug text-[#0a0a0a]',
} as const;

const textVariants = {
  body: 'text-sm leading-relaxed text-[#45464d]',
  'body-lg': 'text-base leading-relaxed text-[#45464d]',
  'body-sm': 'text-xs leading-normal text-[#76777d]',
  caption: 'text-[10px] font-medium uppercase tracking-wider text-[#76777d]',
  muted: 'text-xs text-[#76777d]',
  code: 'text-sm font-mono leading-normal text-[#0a0a0a]',
} as const;

// ─── Types ──────────────────────────────────────────────────────────

export type HeadingVariant = keyof typeof headingVariants;
export type TextVariant = keyof typeof textVariants;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (h1-h6) */
  variant?: HeadingVariant;
  /** HTML tag override */
  as?: ElementType;
  children: ReactNode;
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Text style variant */
  variant?: TextVariant;
  /** HTML tag override */
  as?: ElementType;
  children: ReactNode;
}

// ─── Component: Heading ─────────────────────────────────────────────

/**
 * Heading component for page and section titles.
 *
 * @remarks
 * Supports h1-h6 variants. The `as` prop allows overriding the HTML tag
 * while keeping the visual style (useful for semantic HTML).
 *
 * @example
 * ```tsx
 * <Heading variant="h1">Page Title</Heading>
 * <Heading variant="h3" as="h2">Section with h2 semantics but h3 style</Heading>
 * ```
 */
export function Heading({
  variant = 'h1',
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as || variant;

  return (
    <Tag className={cn(headingVariants[variant], className)} {...props}>
      {children}
    </Tag>
  );
}

// ─── Component: Text ────────────────────────────────────────────────

/**
 * Text component for body copy and labels.
 *
 * @remarks
 * Supports body, body-lg, body-sm, caption, muted, and code variants.
 * The `as` prop allows overriding the HTML tag.
 *
 * @example
 * ```tsx
 * <Text variant="body">Main paragraph content</Text>
 * <Text variant="caption">Section label</Text>
 * ```
 */
export function Text({
  variant = 'body',
  as,
  className,
  children,
  ...props
}: TextProps) {
  const Tag = as || 'p';
  const isCode = variant === 'code';

  return (
    <Tag
      className={cn(
        textVariants[variant],
        isCode && 'bg-[#f5f5f5] rounded px-1.5 py-0.5',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ─── Component: Divider ─────────────────────────────────────────────

export interface DividerProps {
  className?: string;
  /** Optional label in the center of the divider */
  label?: string;
}

/**
 * Horizontal divider with optional centered label.
 */
export function Divider({ label, className }: DividerProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="flex-1 border-t border-[#e5e5e5]" />
        <span className="text-xs text-[#76777d]">{label}</span>
        <div className="flex-1 border-t border-[#e5e5e5]" />
      </div>
    );
  }

  return <hr className={cn('border-t border-[#e5e5e5]', className)} />;
}
