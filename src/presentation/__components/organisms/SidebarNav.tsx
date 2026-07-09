/**
 * ## SidebarNav
 *
 * Vertical navigation sidebar with sections, active states, and icons.
 *
 * @packageDocumentation
 */

'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

export interface SidebarNavItem {
  /** Unique ID */
  id: string;
  /** Display label */
  label: string;
  /** Icon element */
  icon?: ReactNode;
  /** Href for Link */
  href?: string;
  /** Badge count */
  count?: number;
  /** Child items (nested) */
  children?: SidebarNavItem[];
  /** Disabled state */
  disabled?: boolean;
}

export interface SidebarNavProps {
  /** Navigation items */
  items: SidebarNavItem[];
  /** Active item ID */
  activeId?: string;
  /** Section header (e.g. "Main Menu") */
  header?: string;
  /** Footer content */
  footer?: ReactNode;
  /** Compact mode */
  compact?: boolean;
  /** Collapsed state */
  collapsed?: boolean;
  /** Override collapsed state toggle */
  onToggleCollapse?: () => void;
  /** Click handler for items */
  onItemClick?: (item: SidebarNavItem) => void;
  /** Additional class names */
  className?: string;
}

/**
 * Sidebar navigation with sections, icons, and nested items.
 *
 * @example
 * ```tsx
 * <SidebarNav
 *   header="Navigation"
 *   items={[
 *     { id: 'overview', label: 'Overview', icon: '📊', href: '/dashboard' },
 *     { id: 'lessons', label: 'Lessons', icon: '📚', count: 12 },
 *   ]}
 *   activeId="overview"
 * />
 * ```
 */
export function SidebarNav({
  items,
  activeId,
  header,
  footer,
  compact = false,
  collapsed = false,
  onItemClick,
  className,
}: SidebarNavProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderItem = (item: SidebarNavItem, depth: number = 0) => {
    const isActive = activeId === item.id;
    const isExpanded = expandedIds.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <button
          type="button"
          disabled={item.disabled}
          onClick={() => {
            if (hasChildren) toggleExpand(item.id);
            onItemClick?.(item);
          }}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-150',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            isActive
              ? 'bg-[#f0f0ff] text-[#572EFF] font-medium'
              : 'text-[#76777d] hover:text-[#45464d] hover:bg-[#f5f5f5]',
            collapsed && 'justify-center px-2',
          )}
          style={{ paddingLeft: collapsed ? undefined : `${12 + depth * 16}px` }}
          title={collapsed ? item.label : undefined}
        >
          {item.icon && <span className="shrink-0 text-base">{item.icon}</span>}
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.label}</span>
              {item.count !== undefined && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 rounded-full bg-[#f0f0f0] text-[10px] font-semibold text-[#76777d]">
                  {item.count}
                </span>
              )}
              {hasChildren && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={cn('transition-transform duration-150', isExpanded && 'rotate-90')}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </>
          )}
        </button>

        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-0.5">
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={cn(
        'flex flex-col bg-white border-r border-[#e5e5e5] min-h-full',
        collapsed ? 'w-14' : 'w-56',
        className,
      )}
    >
      {/* Header */}
      {header && !collapsed && (
        <div className="px-4 py-3 border-b border-[#e5e5e5]">
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[#a3a3a3]">
            {header}
          </h3>
        </div>
      )}

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {items.map((item) => renderItem(item))}
      </div>

      {/* Footer */}
      {footer && !collapsed && (
        <div className="border-t border-[#e5e5e5] p-3">{footer}</div>
      )}
    </nav>
  );
}
