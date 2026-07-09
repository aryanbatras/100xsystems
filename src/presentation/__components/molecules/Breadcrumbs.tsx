/**
 * ## Breadcrumbs
 *
 * Navigation breadcrumbs showing the current page location in a hierarchy.
 *
 * @packageDocumentation
 */

import { type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items (last is current page) */
  items: BreadcrumbItem[];
  /** Breadcrumb separator element */
  separator?: ReactNode;
  /** Additional class names */
  className?: string;
}

/**
 * Navigation breadcrumbs for page hierarchy.
 *
 * @example
 * ```tsx
 * <Breadcrumbs items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Roadmaps', href: '/roadmaps' },
 *   { label: 'System Design' },
 * ]} />
 * ```
 */
export function Breadcrumbs({
  items,
  separator = '/',
  className,
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-sm', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <span className="text-[#a3a3a3] select-none" aria-hidden="true">
                {separator}
              </span>
            )}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="text-[#76777d] hover:text-[#572EFF] transition-colors duration-150"
              >
                {item.label}
              </a>
            ) : (
              <span
                className={cn(
                  isLast ? 'text-[#0a0a0a] font-medium' : 'text-[#76777d]',
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
