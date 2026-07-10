/**
 * ## Layout Components
 *
 * Full-width page layout components — SidebarNav, Header, MobileNav, Footer.
 *
 * @packageDocumentation
 */

'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

// ─── Header ────────────────────────────────────────────────────────

export interface HeaderNavItem {
  id: string;
  label: string;
  href?: string;
  children?: HeaderNavItem[];
}

export interface HeaderProps {
  logo?: ReactNode;
  items: HeaderNavItem[];
  actions?: ReactNode;
  sticky?: boolean;
  className?: string;
}

export function Header({ logo, items, actions, sticky = true, className }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={cn(
      'bg-white border-b border-border z-50',
      sticky && 'sticky top-0',
      className,
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="shrink-0">
            {logo || <span className="text-lg font-bold text-fg">100X</span>}
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href || '#'}
                className="px-3 py-2 text-sm font-medium text-fg-secondary hover:text-accent hover:bg-accent/10 rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions + mobile toggle */}
          <div className="flex items-center gap-3">
            {actions && <div className="hidden md:flex items-center gap-2">{actions}</div>}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-fg-secondary hover:text-fg hover:bg-surface-secondary rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="px-4 py-3 space-y-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href || '#'}
                className="block px-3 py-2 text-sm font-medium text-fg-secondary hover:text-accent hover:bg-accent/10 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          {actions && <div className="px-4 pb-3 border-t border-border pt-3">{actions}</div>}
        </div>
      )}
    </header>
  );
}

// ─── MobileNav ─────────────────────────────────────────────────────

export interface MobileNavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  badge?: number;
}

export interface MobileNavProps {
  items: MobileNavItem[];
  activeId?: string;
  onNavigate?: (item: MobileNavItem) => void;
  className?: string;
}

export function MobileNav({ items, activeId, onNavigate, className }: MobileNavProps) {
  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 md:hidden',
      className,
    )}>
      <div className="flex items-center justify-around h-14">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={item.href || '#'}
              onClick={() => onNavigate?.(item)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors min-w-0',
                isActive ? 'text-accent' : 'text-fg-secondary hover:text-fg',
              )}
            >
              <span className="relative">
                {item.icon || (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 px-0.5 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </span>
              <span className="truncate">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Footer ────────────────────────────────────────────────────────

export interface FooterSection {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
  tagline?: string;
  className?: string;
}

export function Footer({ sections = [], copyright, tagline, className }: FooterProps) {
  return (
    <footer className={cn('bg-fg text-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {(tagline || copyright) && (
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {tagline && <p className="text-sm text-gray-400">{tagline}</p>}
            {copyright && <p className="text-xs text-gray-500">{copyright}</p>}
          </div>
        )}
      </div>
    </footer>
  );
}

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
