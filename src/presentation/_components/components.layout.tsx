/**
 * ## Presentation: Layout Components
 *
 * Layout primitives for page structure — PageFrame,
 * Sidebar, Section, and Grid for consistent
 * page-level composition.
 *
 * @packageDocumentation
 */

import React from 'react';
import { pageContainer, mainContent, contentArea } from '../_styles/components.styles';

// ─── PAGE FRAME ───────────────────────────────────────────────────
interface PageFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Standard page frame with centered content area.
 *
 * @remarks
 * Wraps page content in a full-width container with
 * constrained content area. Provides consistent
 * page-level structure.
 *
 * @param props - Page frame properties
 * @returns A page layout frame
 * @public
 */
export function PageFrame({ children, className }: PageFrameProps) {
  return (
    <div className={`${pageContainer()} ${className || ''}`}>
      <div className={mainContent()}>
        <div className={contentArea()}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────
interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activePath?: string;
  onLogout?: () => void;
}

/**
 * Navigation sidebar with link items and active state.
 *
 * @remarks
 * Displays navigation items with icons and labels.
 * Active item is highlighted. Hidden on mobile screens.
 *
 * @param props - Sidebar properties including nav items
 * @returns A left-side navigation sidebar
 * @public
 */
export function Sidebar({ items, activePath }: SidebarProps) {
  return (
    <aside className="w-56 bg-white border-r border-[#e5e5e5] min-h-screen hidden lg:flex flex-col">
      <div className="p-4 border-b border-[#e5e5e5]">
        <h2 className="font-semibold text-lg">100x Systems</h2>
      </div>
      <nav className="flex-1 p-2">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activePath === item.href ? 'bg-[#f5f5f5] text-[#572EFF] font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────
interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Content section with optional title.
 *
 * @remarks
 * Groups related content with an optional heading.
 * Adds bottom margin for consistent spacing.
 *
 * @param props - Section properties
 * @returns A content section element
 * @public
 */
export function Section({ title, children, className }: SectionProps) {
  return (
    <section className={`mb-8 ${className || ''}`}>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </section>
  );
}

// ─── GRID ─────────────────────────────────────────────────────────
interface GridProps {
  columns?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

/**
 * Responsive grid layout with configurable column count.
 *
 * @remarks
 * Supports 1–4 columns with responsive breakpoints.
 * Columns default to 2 and stack vertically on mobile.
 *
 * @param props - Grid properties including column count
 * @returns A CSS grid wrapper
 * @public
 */
export function Grid({ columns = 2, children, className }: GridProps) {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  return (
    <div className={`grid ${colsMap[columns]} gap-4 ${className || ''}`}>
      {children}
    </div>
  );
}
