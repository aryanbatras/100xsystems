/**
 * ## Layout Components
 *
 * Full-width page layout components — SidebarNav.
 *
 * @packageDocumentation
 */

'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

// ─── SidebarNav ─────────────────────────────────────────────────────

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  count?: number;
  children?: SidebarNavItem[];
  disabled?: boolean;
}

export interface SidebarNavProps {
  items: SidebarNavItem[];
  activeId?: string;
  header?: string;
  footer?: ReactNode;
  compact?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onItemClick?: (item: SidebarNavItem) => void;
  className?: string;
}

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
              ? 'bg-accent-bg text-accent font-medium'
              : 'text-fg-secondary hover:text-fg-tertiary hover:bg-surface-secondary',
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
                <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 rounded-full bg-surface-muted text-[10px] font-semibold text-fg-secondary">
                  {item.count}
                </span>
              )}
              {hasChildren && (
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  className={cn('transition-transform duration-150', isExpanded && 'rotate-90')}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </>
          )}
        </button>
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-0.5">{item.children!.map((child) => renderItem(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn(
      'flex flex-col bg-white border-r border-border min-h-full',
      collapsed ? 'w-14' : 'w-56',
      className,
    )}>
      {header && !collapsed && (
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">{header}</h3>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {items.map((item) => renderItem(item))}
      </div>
      {footer && !collapsed && (
        <div className="border-t border-border p-3">{footer}</div>
      )}
    </nav>
  );
}
