/**
 * ## PageHeader
 *
 * Page-level header with title, subtitle, metadata, and action area.
 *
 * @packageDocumentation
 */

import { type ReactNode } from 'react';
import { cn } from '../../_components/utils';
import { Breadcrumbs, type BreadcrumbItem } from '../molecules/Breadcrumbs';

export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Subtitle/description */
  subtitle?: string;
  /** Breadcrumb navigation */
  breadcrumbs?: BreadcrumbItem[];
  /** Metadata items (e.g. difficulty, duration, stats) */
  meta?: Array<{ label: string; value: string | number; icon?: string }>;
  /** Action elements (buttons, links) */
  actions?: ReactNode;
  /** Search element */
  search?: ReactNode;
  /** Additional class names */
  className?: string;
}

/**
 * Page header with breadcrumbs, title, subtitle, metadata, and actions.
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="System Design"
 *   subtitle="Master distributed systems"
 *   breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Roadmaps' }, { label: 'System Design' }]}
 *   meta={[{ label: 'Difficulty', value: 'Advanced' }, { label: 'Duration', value: '12h' }]}
 *   actions={<Button>Start Learning</Button>}
 * />
 * ```
 */
export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  meta,
  actions,
  search,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('space-y-4', className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      {/* Title Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-[#0a0a0a] sm:text-3xl">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-[#76777d] max-w-2xl">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>

      {/* Search */}
      {search && <div className="max-w-md">{search}</div>}

      {/* Meta */}
      {meta && meta.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {meta.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {item.icon && <span className="text-sm">{item.icon}</span>}
              <span className="text-xs text-[#a3a3a3]">{item.label}:</span>
              <span className="text-xs font-medium text-[#45464d]">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
