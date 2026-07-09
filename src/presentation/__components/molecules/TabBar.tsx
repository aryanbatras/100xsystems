/**
 * ## TabBar
 *
 * Horizontal tab navigation for switching between views.
 * Built from scratch for the 100xSystems design system.
 *
 * @packageDocumentation
 */

'use client';

import { cn } from '@/application/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────

export interface Tab {
  /** Unique identifier for the tab */
  id: string;
  /** Display label */
  label: string;
  /** Optional badge count */
  count?: number;
  /** Disabled state */
  disabled?: boolean;
}

export interface TabBarProps {
  /** Array of tab definitions */
  tabs: Tab[];
  /** Currently active tab ID */
  activeTab: string;
  /** Tab change handler */
  onTabChange: (tabId: string) => void;
  /** Visual variant */
  variant?: 'underline' | 'pills' | 'buttons';
  /** Additional class names */
  className?: string;
}

// ─── Variant Styles ────────────────────────────────────────────────

const variantStyles = {
  underline: {
    container: 'border-b border-[#e5e5e5]',
    tab: (active: boolean) =>
      cn(
        'px-4 py-2.5 text-sm font-medium transition-colors relative',
        active
          ? 'text-[#572EFF]'
          : 'text-[#76777d] hover:text-[#45464d]',
      ),
    indicator: 'absolute bottom-0 left-0 right-0 h-0.5 bg-[#572EFF] rounded-full',
  },
  pills: {
    container: 'flex gap-1 p-1 bg-[#f5f5f5] rounded-lg',
    tab: (active: boolean) =>
      cn(
        'px-4 py-2 text-sm font-medium rounded-md transition-all',
        active
          ? 'bg-white text-[#0a0a0a] shadow-sm'
          : 'text-[#76777d] hover:text-[#45464d]',
      ),
    indicator: null,
  },
  buttons: {
    container: 'flex gap-2',
    tab: (active: boolean) =>
      cn(
        'px-4 py-2 text-sm font-medium rounded-lg border transition-all',
        active
          ? 'border-[#572EFF] bg-[#f0f0ff] text-[#572EFF]'
          : 'border-[#e5e5e5] text-[#76777d] hover:border-[#d4d4d4] hover:text-[#45464d]',
      ),
    indicator: null,
  },
} as const;

// ─── Component ──────────────────────────────────────────────────────

/**
 * Horizontal tab bar for switching between views.
 *
 * @remarks
 * Three visual variants: underline (default), pills, buttons.
 * Supports badge counts and disabled tabs.
 *
 * @example
 * ```tsx
 * const tabs = [
 *   { id: 'overview', label: 'Overview' },
 *   { id: 'lessons', label: 'Lessons', count: 12 },
 * ];
 *
 * <TabBar tabs={tabs} activeTab="overview" onTabChange={setTab} />
 * ```
 */
export function TabBar({
  tabs,
  activeTab,
  onTabChange,
  variant = 'underline',
  className,
}: TabBarProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn(styles.container, className)} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            disabled={tab.disabled}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              styles.tab(isActive),
              tab.disabled && 'opacity-50 cursor-not-allowed',
              'relative inline-flex items-center gap-2 whitespace-nowrap',
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5',
                  'text-[10px] font-semibold rounded-full',
                  isActive
                    ? 'bg-[#572EFF] text-white'
                    : 'bg-[#f0f0f0] text-[#76777d]',
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && styles.indicator && <div className={styles.indicator} />}
          </button>
        );
      })}
    </div>
  );
}
