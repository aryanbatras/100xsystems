/**
 * ## Composite Components
 *
 * Combined molecules and organisms — complex UI sections.
 *
 * @packageDocumentation
 */

'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';
import { Tag, Skeleton, ProgressBar } from './components.atomic';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';



// ─── Breadcrumbs ────────────────────────────────────────────────────

export interface BreadcrumbItem { label: string; href?: string; }
export interface BreadcrumbsProps { items: BreadcrumbItem[]; separator?: ReactNode; className?: string; }

export function Breadcrumbs({ items, separator = '/', className }: BreadcrumbsProps) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-sm', className)}>{items.map((item, index) => {
      const isLast = index === items.length - 1;
      return (<span key={index} className="flex items-center gap-1.5">{index > 0 && <span className="text-fg-muted select-none" aria-hidden="true">{separator}</span>}{item.href && !isLast ? <a href={item.href} className="text-fg-secondary hover:text-accent hover:bg-accent/10 hover:px-1 rounded-sm transition-all">{item.label}</a> : <span className={isLast ? 'text-fg font-medium' : 'text-fg-secondary'} aria-current={isLast ? 'page' : undefined}>{item.label}</span>}</span>);
    })}</nav>
  );
}

// ─── Accordion ──────────────────────────────────────────────────────

export interface AccordionItem { id: string; title: string; content: ReactNode; count?: number; disabled?: boolean; }
export interface AccordionProps { items: AccordionItem[]; multiple?: boolean; defaultOpen?: string[]; variant?: 'default' | 'bordered' | 'separated'; className?: string; }

export function Accordion({ items, multiple = false, defaultOpen = [], variant = 'default', className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));
  const toggle = (id: string) => setOpenIds((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else { if (!multiple) next.clear(); next.add(id); } return next; });
  const variantStyles = { default: 'divide-y divide-accent/20', bordered: 'space-y-3', separated: 'space-y-3' };
  const itemStyles = { default: '', bordered: 'border border-border overflow-hidden', separated: 'border border-border overflow-hidden' };

  return (<div className={cn(variantStyles[variant], className)}>{items.map((item) => {
    const isOpen = openIds.has(item.id);
    return (<div key={item.id} className={itemStyles[variant]}>
      <button type="button" onClick={() => !item.disabled && toggle(item.id)} disabled={item.disabled}
        className={cn('flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-150 hover:bg-accent hover:text-white disabled:opacity-50 disabled:cursor-not-allowed', isOpen && variant !== 'default' && 'border-b border-border')} aria-expanded={isOpen}>
        <span className="text-base font-semibold">{item.title}</span>
        <span className="flex items-center gap-3">{item.count !== undefined && <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-semibold rounded-full bg-accent-bg text-accent">{item.count}</span>}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cn('transition-transform duration-200', isOpen && 'rotate-180')}><polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </button>
      <div className={cn('overflow-hidden transition-all duration-200', isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0')}><div className="px-6 py-5 text-base text-fg-tertiary leading-relaxed">{item.content}</div></div>
    </div>);
  })}</div>);
}

// ─── Alert ──────────────────────────────────────────────────────────

function AlertIcon({ variant }: { variant: keyof typeof alertVariants }) {
  const paths = {
    info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
    success: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    error: <><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>,
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[variant]}
    </svg>
  );
}

const alertVariants = { info: { container: 'bg-accent-bg border-accent text-accent', icon: 'text-accent' }, success: { container: 'bg-accent-bg border-accent text-accent', icon: 'text-accent' }, warning: { container: 'bg-accent-yellow/10 border-accent-yellow text-accent-yellow', icon: 'text-accent-yellow' }, error: { container: 'bg-accent-bg border-accent text-accent', icon: 'text-accent' } } as const;

export interface AlertProps { variant?: keyof typeof alertVariants; title?: string; children: ReactNode; dismissible?: boolean; hideIcon?: boolean; className?: string; }

export function Alert({ variant = 'info', title, children, dismissible = false, hideIcon = false, className }: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className={cn('relative flex items-start gap-4 border-l-4 p-5 text-sm', alertVariants[variant].container, className)} role="alert">
      {!hideIcon && <span className={cn('mt-0.5 shrink-0', alertVariants[variant].icon)}><AlertIcon variant={variant} /></span>}
      <div className="flex-1 min-w-0">{title && <p className="font-semibold mb-1.5 text-base">{title}</p>}<div className="leading-relaxed font-semibold">{children}</div></div>
      {dismissible && <button type="button" onClick={() => setDismissed(true)} className="shrink-0 p-1 rounded hover:opacity-70 transition-opacity text-fg-muted" aria-label="Dismiss">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>}
    </div>
  );
}

// ─── SearchInput ────────────────────────────────────────────────────

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> { value: string; onChange: (value: string) => void; placeholder?: string; showClear?: boolean; onSearch?: (value: string) => void; }

export function SearchInput({ value, onChange, placeholder = 'Search...', showClear = true, onSearch, className, ...props }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-secondary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      </div>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSearch?.(value)} placeholder={placeholder}
        className={cn('w-full border-0 border-b-2 border-border py-4 pl-12 pr-12 text-base text-fg placeholder:text-fg-muted transition-all duration-200 focus:outline-none focus:ring-0 focus:border-accent disabled:cursor-not-allowed disabled:opacity-40 bg-transparent', className)} {...props} />
      {showClear && value && <button type="button" onClick={() => onChange('')} className="absolute right-3 inset-y-0 flex items-center text-fg-secondary hover:text-fg transition-colors" aria-label="Clear search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>}
    </div>
  );
}

// ─── TabBar ─────────────────────────────────────────────────────────

export interface Tab { id: string; label: string; count?: number; disabled?: boolean; }
export interface TabBarProps { tabs: Tab[]; activeTab: string; onTabChange: (tabId: string) => void; variant?: 'underline' | 'pills' | 'buttons'; className?: string; }

const tabVariants = {
  underline: { container: 'border-b border-border', tab: (a: boolean) => cn('px-6 py-3 text-sm font-medium transition-colors relative', a ? 'text-accent' : 'text-fg-secondary hover:bg-accent hover:text-white rounded-sm transition-colors'), indicator: 'absolute bottom-0 left-0 right-0 h-0.5 bg-accent' },
  pills: { container: 'flex gap-1.5 p-1.5 bg-surface-secondary', tab: (a: boolean) => cn('px-5 py-2.5 text-sm font-medium transition-all', a ? 'bg-white text-fg shadow-sm' : 'text-fg-secondary hover:text-fg-tertiary'), indicator: null },
  buttons: { container: 'flex gap-3', tab: (a: boolean) => cn('px-5 py-2.5 text-sm font-medium border transition-all', a ? 'border-accent bg-accent-bg text-accent' : 'border-border text-fg-secondary hover:border-accent hover:text-accent'), indicator: null },
} as const;

export function TabBar({ tabs, activeTab, onTabChange, variant = 'underline', className }: TabBarProps) {
  const s = tabVariants[variant];
  return (<div className={cn(s.container, className)} role="tablist">{tabs.map((tab) => {
    const isActive = activeTab === tab.id;
    return (<button key={tab.id} role="tab" aria-selected={isActive} disabled={tab.disabled} onClick={() => onTabChange(tab.id)}
      className={cn(s.tab(isActive), tab.disabled && 'opacity-50 cursor-not-allowed', 'relative inline-flex items-center gap-2 whitespace-nowrap')}>
      <span>{tab.label}</span>
      {tab.count !== undefined && <span className={cn('inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-semibold rounded-full', isActive ? 'bg-accent text-white' : 'bg-surface-muted text-fg-secondary')}>{tab.count}</span>}
      {isActive && s.indicator && <div className={s.indicator} />}
    </button>);
  })}</div>);
}

// ─── Pagination ─────────────────────────────────────────────────────

export interface PaginationProps { currentPage: number; totalPages: number; onPageChange: (page: number) => void; totalItems?: number; pageSize?: number; compact?: boolean; className?: string; }

export function Pagination({ currentPage, totalPages, onPageChange, totalItems, pageSize = 25, compact = false, className }: PaginationProps) {
  if (totalPages <= 1) return null;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems || currentPage * pageSize);
  const ghostBtn = 'inline-flex items-center justify-center text-sm font-medium transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1';
  const btn = cn(ghostBtn, compact ? 'h-8 px-3 text-xs' : 'h-9 px-4');
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {totalItems && <span className={cn('text-fg-secondary', compact ? 'text-xs' : 'text-sm')}>Showing {startItem}–{endItem} of {totalItems}</span>}
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} className={cn(btn, currentPage <= 1 ? 'text-fg-muted' : 'text-fg-secondary hover:text-accent hover:bg-accent/10')} aria-label="Previous page">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1"><polyline points="15 18 9 12 15 6" /></svg>{!compact && 'Previous'}
        </button>
        <span className={cn('text-fg-secondary', compact ? 'text-xs px-2' : 'text-sm px-3')}>{compact ? `${currentPage}/${totalPages}` : `Page ${currentPage} of ${totalPages}`}</span>
        <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} className={cn(btn, currentPage >= totalPages ? 'text-fg-muted' : 'text-fg-secondary hover:text-accent hover:bg-accent/10')} aria-label="Next page">
          {!compact && 'Next'}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
}

// ─── FilterBar ──────────────────────────────────────────────────────

export interface FilterBarProps { searchValue: string; onSearchChange: (value: string) => void; searchPlaceholder?: string; onSearch?: (value: string) => void; children?: ReactNode; resultCount?: number; className?: string; }

export function FilterBar({ searchValue, onSearchChange, searchPlaceholder, onSearch, resultCount, children, className }: FilterBarProps) {
  return (<div className={cn('flex flex-wrap items-center gap-3', className)}><div className="min-w-[240px] flex-1"><SearchInput value={searchValue} onChange={onSearchChange} onSearch={onSearch} placeholder={searchPlaceholder} /></div>{children && <div className="flex items-center gap-2">{children}</div>}{resultCount !== undefined && <span className="text-xs text-fg-secondary whitespace-nowrap">{resultCount} result{resultCount !== 1 ? 's' : ''}</span>}</div>);
}

// ─── EmptyState (internal — used by SearchResults) ───────────────-

interface EmptyStateProps { icon?: ReactNode; title: string; description?: string; action?: ReactNode; compact?: boolean; className?: string; }

function EmptyState({ icon, title, description, action, compact = false, className }: EmptyStateProps) {
  return (<div className={cn('flex flex-col items-center justify-center text-center', compact ? 'py-8 gap-2' : 'py-16 gap-4', className)}>
    {icon && <div className={cn('text-border-hover', compact ? 'text-2xl' : 'text-4xl')}>{icon}</div>}
    <h3 className={cn('font-semibold text-fg', compact ? 'text-sm' : 'text-base')}>{title}</h3>
    {description && <p className={cn('text-fg-secondary max-w-sm', compact ? 'text-xs' : 'text-sm')}>{description}</p>}
    {action && <div className="mt-2">{action}</div>}
  </div>);
}

// ─── DataGrid ───────────────────────────────────────────────────────

export interface StatCardData { label: string; value: string | number; icon?: string; trend?: 'up' | 'down' | 'neutral'; trendText?: string; }
export interface DataGridProps { stats: StatCardData[]; columns?: 1 | 2 | 3 | 4; compact?: boolean; className?: string; }

export function DataGrid({ stats, columns = 4, compact = false, className }: DataGridProps) {
  if (stats.length === 0) return null;
  const colsMap = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' };
  const trendColors = { up: 'text-accent', down: 'text-accent', neutral: 'text-fg-secondary' };
  const trendIcons = { up: '↑', down: '↓', neutral: '→' };
  return (<div className={cn('grid gap-5', colsMap[columns], className)}>{stats.map((stat, i) => (<div key={i} className={cn('border border-border bg-white', compact ? 'p-4' : 'p-5')}>
    <div className="flex items-center justify-between mb-1.5"><span className={cn('font-bold uppercase tracking-[0.6px] text-fg-secondary', compact ? 'text-xs' : 'text-xs')}>{stat.label}</span>{stat.icon && <span className={compact ? 'text-lg' : 'text-lg'}>{stat.icon}</span>}</div>
    <div className={cn('font-semibold text-fg', compact ? 'text-xl' : 'text-2xl')}>{stat.value}</div>
    {stat.trend && <div className={cn('mt-1.5 flex items-center gap-1 text-xs', trendColors[stat.trend])}><span>{trendIcons[stat.trend]}</span>{stat.trendText && <span>{stat.trendText}</span>}</div>}
  </div>))}</div>);
}

// ─── CodeBlock ──────────────────────────────────────────────────────

export interface CodeBlockProps { code: string; language?: string; showLineNumbers?: boolean; showCopy?: boolean; header?: string; className?: string; }

export function CodeBlock({ code, language = 'typescript', showLineNumbers = true, showCopy = true, header, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  return (<div className={cn('border border-border overflow-hidden', className)}>
    {(header || language || showCopy) && <div className="flex items-center justify-between gap-3 bg-surface-light border-b border-border px-5 py-3">
      <div className="flex items-center gap-3 min-w-0">{language && <span className="text-xs font-bold uppercase tracking-[1px] text-fg-muted">{language}</span>}{header && <span className="text-sm text-fg-secondary truncate">{header}</span>}</div>
      {showCopy && <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} }} className="flex items-center gap-1.5 text-xs text-fg-secondary hover:text-fg transition-colors shrink-0" aria-label={copied ? 'Copied' : 'Copy code'}>
        {copied ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>Copied</> : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Copy</>}
      </button>}
    </div>}
    <div className="overflow-x-auto">
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        showLineNumbers={showLineNumbers}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: '13px', lineHeight: '1.6' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  </div>);
}

// ─── Timeline ───────────────────────────────────────────────────────

export interface TimelineStep { number: string; title: string; description: string; icon?: string; }
export interface TimelineProps { steps: TimelineStep[]; activeStep?: number; variant?: 'default' | 'numbered' | 'compact'; className?: string; }

const timelineVariants = { default: { connector: 'w-px bg-border', dot: 'w-3 h-3 bg-accent ring-4 ring-white' }, numbered: { connector: 'w-0.5 bg-border', dot: 'w-8 h-8 bg-accent-bg text-accent border-2 border-accent-bg' }, compact: { connector: 'w-px bg-border', dot: 'w-2 h-2 bg-border-hover' } };

export function Timeline({ steps, activeStep = -1, variant = 'default', className }: TimelineProps) {
  if (steps.length === 0) return null;
  return (<div className={cn('space-y-0', className)}>{steps.map((step, index) => {
    const isActive = index === activeStep;
    const isCompleted = activeStep !== -1 && index < activeStep;
    const isLast = index === steps.length - 1;
    return (<div key={index} className="flex gap-4">
      <div className="flex flex-col items-center">
        {variant === 'numbered' ? <div className={cn('flex items-center justify-center rounded-full text-sm font-semibold shrink-0', timelineVariants.numbered.dot, isActive && 'bg-accent text-white border-accent', isCompleted && 'bg-green-500 text-white border-green-500')}>{step.number}</div>
          : <div className={cn('rounded-full shrink-0 mt-1.5', timelineVariants.default.dot, isActive && 'bg-accent', isCompleted && 'bg-green-500')} />}
        {!isLast && <div className={cn('flex-1 w-px min-h-[24px]', timelineVariants[variant].connector)} />}
      </div>
      <div className={cn('pb-8', isLast && 'pb-0')}><h3 className="text-sm font-semibold text-fg">{step.title}</h3><p className="mt-1 text-xs text-fg-secondary leading-relaxed">{step.description}</p></div>
    </div>);
  })}</div>);
}

// ─── ArticleCard ────────────────────────────────────────────────────

export interface ArticleCardProps { slug: string; title: string; description?: string | null; date?: string | null; category?: string; readTime?: number; onClick?: () => void; className?: string; }

export function ArticleCard({ slug, title, description, date, category, readTime, onClick, className }: ArticleCardProps) {
  return (<article className={cn('group border border-border bg-white p-6 transition-all duration-200 hover:border-accent hover:shadow-sm', onClick && 'cursor-pointer', className)} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
    <div className="flex items-center gap-4 mb-3">{category && <span className="text-xs font-semibold text-accent">{category}</span>}{date && <span className="text-xs text-fg-muted">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}{readTime && <span className="text-xs text-fg-muted">{readTime} min read</span>}</div>
    <h2 className="text-base font-semibold text-fg group-hover:text-accent transition-colors duration-150">{title}</h2>
    {description && <p className="mt-2 text-sm text-fg-secondary leading-relaxed line-clamp-2">{description}</p>}
    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150">Read article<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>
  </article>);
}

// ─── DifficultyBadge ────────────────────────────────────────────────

const difficultyMap = { Beginner: 'bg-accent-bg text-accent border-accent', Intermediate: 'bg-accent-bg text-accent border-accent', Advanced: 'bg-fg text-white border-fg', Theory: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow', Easy: 'bg-accent-bg text-accent border-accent', Medium: 'bg-accent-bg text-accent border-accent', Hard: 'bg-fg text-white border-fg' } as const;
export interface DifficultyBadgeProps { level: keyof typeof difficultyMap; size?: 'sm' | 'default'; className?: string; }

export function DifficultyBadge({ level, size = 'default', className }: DifficultyBadgeProps) {
  return <span className={cn('inline-flex items-center rounded-none uppercase border-0 font-medium whitespace-nowrap', size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs', difficultyMap[level] || difficultyMap.Beginner, className)}>{level}</span>;
}

// ─── InfoRow ────────────────────────────────────────────────────────

export interface InfoRowProps { label: string; value: ReactNode; variant?: 'default' | 'compact' | 'inline'; className?: string; }

export function InfoRow({ label, value, variant = 'default', className }: InfoRowProps) {
  if (variant === 'inline') return <div className={cn('flex items-center gap-3 text-base', className)}><span className="text-fg-secondary">{label}:</span><span className="text-fg font-medium">{value}</span></div>;
  if (variant === 'compact') return <div className={cn('flex items-center justify-between py-2', className)}><span className="text-sm text-fg-secondary">{label}</span><span className="text-sm text-fg font-medium">{value}</span></div>;
  return <div className={cn('py-4 border-b border-border last:border-b-0', className)}><span className="text-xs font-bold uppercase tracking-[1px] text-fg-muted block mb-1.5">{label}</span><div className="text-base text-fg leading-relaxed">{value}</div></div>;
}

// ─── FeatureCard ────────────────────────────────────────────────────

const fcVariants = { default: 'bg-white border border-border', bordered: 'bg-white border-2 border-accent-bg', elevated: 'bg-white border border-border hover:shadow-sm' } as const;
export interface FeatureCardProps { icon?: ReactNode; title: string; description: string; number?: string | number; variant?: keyof typeof fcVariants; className?: string; }

export function FeatureCard({ icon, title, description, number, variant = 'default', className }: FeatureCardProps) {
  return (<div className={cn('p-6 transition-all duration-200 hover:border-accent/20', fcVariants[variant], className)}>{number && <span className="text-xs font-bold uppercase tracking-[1px] text-fg-muted mb-3 block">{String(number).padStart(2, '0')}</span>}{icon && <div className="mb-4 text-3xl">{icon}</div>}<h3 className="text-base font-semibold text-fg mb-2">{title}</h3><p className="text-sm text-fg-secondary leading-relaxed">{description}</p></div>);
}

// ─── StatCard ───────────────────────────────────────────────────────

const scVariants = { default: 'p-5 border border-border bg-white', compact: 'p-4 border border-border bg-white', hero: 'p-6 border-0 bg-accent-bg' } as const;
export interface StatCardProps { value: string | number; label: string; icon?: string; trend?: 'up' | 'down' | 'neutral'; trendText?: string; variant?: keyof typeof scVariants; className?: string; }

export function StatCard({ value, label, icon, trend, trendText, variant = 'default', className }: StatCardProps) {
  const tc = { up: 'text-accent', down: 'text-accent', neutral: 'text-fg-secondary' };
  const ti = { up: '↑', down: '↓', neutral: '→' };
  return (<div className={cn(scVariants[variant], className)}><div className="flex items-center justify-between mb-1.5"><span className="text-xs font-bold uppercase tracking-[0.6px] text-fg-secondary">{label}</span>{icon && <span className="text-lg">{icon}</span>}</div><div className={cn('font-semibold text-fg', variant === 'hero' ? 'text-3xl' : 'text-2xl')}>{value}</div>{trend && <div className={cn('mt-1.5 flex items-center gap-1 text-xs', tc[trend])}><span>{ti[trend]}</span>{trendText && <span>{trendText}</span>}</div>}</div>);
}

// ─── StreakCard ─────────────────────────────────────────────────────

export interface StreakCardProps { currentStreak: number; longestStreak: number; totalDays?: number; lastActivityDate?: string; showUpdate?: boolean; onUpdate?: () => void; className?: string; }

function streakEmoji(days: number): string { if (days >= 100) return '🔥🔥🔥'; if (days >= 50) return '🔥🔥'; if (days >= 10) return '🔥'; if (days >= 1) return '✨'; return '🌱'; }

export function StreakCard({ currentStreak, longestStreak, totalDays, lastActivityDate, showUpdate = false, onUpdate, className }: StreakCardProps) {
  return (<div className={cn('border border-border bg-white p-5', className)}>
    <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-semibold text-fg">Learning Streak</h3>{showUpdate && onUpdate && <button type="button" onClick={onUpdate} className="text-[10px] font-medium text-accent hover:text-accent transition-colors">Update Today</button>}</div>
    <div className="flex items-center gap-4"><span className="text-3xl">{streakEmoji(currentStreak)}</span><div className="flex items-center gap-6"><div className="text-center"><div className="text-2xl font-bold text-fg">{currentStreak}</div><div className="text-[10px] text-fg-secondary">Current Streak</div></div><div className="w-px h-10 bg-border" /><div className="text-center"><div className="text-2xl font-bold text-fg">{longestStreak}</div><div className="text-[10px] text-fg-secondary">Longest Streak</div></div></div></div>
    {(totalDays || lastActivityDate) && <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">{totalDays !== undefined && <div className="text-center"><div className="text-sm font-semibold text-fg">{totalDays}</div><div className="text-[10px] text-fg-secondary">Total Days</div></div>}{lastActivityDate && <div className="text-[10px] text-fg-muted">Last: {new Date(lastActivityDate).toLocaleDateString()}</div>}</div>}
  </div>);
}

// ─── ComingSoonCard ─────────────────────────────────────────────────

export interface ComingSoonCardProps { icon: string; title: string; description: string; badgeText?: string; onClick?: () => void; className?: string; }

export function ComingSoonCard({ icon, title, description, badgeText = 'Coming Soon', onClick, className }: ComingSoonCardProps) {
  return (<div className={cn('border border-border bg-white p-6 text-center transition-all duration-200 hover:border-accent/30', onClick && 'cursor-pointer', className)} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
    <div className="text-4xl mb-4">{icon}</div><h3 className="text-base font-semibold text-fg mb-2">{title}</h3><p className="text-sm text-fg-secondary mb-4 leading-relaxed">{description}</p>
    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent-bg text-accent text-xs font-medium">{badgeText}</span>
  </div>);
}

// ─── ModuleCard ─────────────────────────────────────────────────────

export type ModuleStatus = 'not-started' | 'in-progress' | 'completed';
export interface ModuleCardProps { title: string; description: string; progress: number; completedLessons: number; totalLessons: number; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; estimatedTime: string; status: ModuleStatus; onClick?: () => void; className?: string; }

const statusStyles: Record<ModuleStatus, string> = { 'not-started': 'bg-surface-secondary text-fg-secondary', 'in-progress': 'bg-accent-bg text-accent', 'completed': 'bg-accent text-white' };

export function ModuleCard({ title, description, progress, completedLessons, totalLessons, difficulty, estimatedTime, status, onClick, className }: ModuleCardProps) {
  return (<div className={cn('border-0 rounded-none border-border bg-white p-6 transition-all duration-200 hover:border-border-hover hover:shadow-sm', onClick && 'cursor-pointer', className)} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
    <div className="flex items-start justify-between gap-4 mb-3"><h3 className="text-base font-semibold text-fg">{title}</h3><DifficultyBadge level={difficulty} size="sm" /></div>
    <p className="text-sm text-fg-secondary mb-4 line-clamp-2 leading-relaxed">{description}</p>
    <div className="mb-4"><div className="flex justify-between text-sm text-fg-secondary mb-1.5"><span>{completedLessons}/{totalLessons} lessons</span><span>{progress}%</span></div><ProgressBar value={progress} size="sm" /></div>
    <div className="flex items-center justify-between"><span className="text-xs text-fg-muted">{estimatedTime}</span><span className={cn('inline-flex items-center px-3 py-3 rounded-mnone border-0 lowercase text-xs font-small', statusStyles[status])}>{status.replace('-', ' ')}</span></div>
  </div>);
}

// ─── UserCard ───────────────────────────────────────────────────────

export interface UserCardProps { avatarSrc?: string; name: string; username?: string; bio?: string; tags?: string[]; meta?: string; variant?: 'default' | 'compact' | 'detailed'; onClick?: () => void; className?: string; }

export function UserCard({ avatarSrc, name, username, bio, tags, meta, variant = 'default', onClick, className }: UserCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (<div className={cn('flex items-start gap-3 transition-colors duration-150', onClick && 'cursor-pointer hover:bg-surface-light', variant === 'compact' ? 'p-2' : 'p-4', className)} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
    <div className={cn('shrink-0 bg-accent-bg text-accent font-medium flex items-center justify-center', variant === 'compact' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm')}>{initials}</div>
    <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="text-sm font-semibold text-fg truncate">{name}</span>{username && <span className="text-xs text-fg-secondary truncate">@{username}</span>}</div>{variant === 'detailed' && bio && <p className="mt-0.5 text-xs text-fg-secondary line-clamp-2">{bio}</p>}{tags && tags.length > 0 && <div className="mt-1.5 flex flex-wrap gap-1">{tags.slice(0, 3).map((tag) => <Tag key={tag} variant="brand" size="sm">{tag}</Tag>)}</div>}{meta && <p className="mt-1 text-[10px] text-fg-muted">{meta}</p>}</div>
  </div>);
}

// ─── MemberCard ─────────────────────────────────────────────────────

export interface SocialLink { label: string; url: string; }
export interface MemberCardProps { avatarUrl?: string; name: string; username?: string; role?: string; bio?: string; socialLinks?: SocialLink[]; joinedDate?: string; tags?: string[]; className?: string; }

export function MemberCard({ avatarUrl, name, username, role, bio, socialLinks, joinedDate, tags, className }: MemberCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (<div className={cn('border border-border bg-white p-4', className)}><div className="flex items-start gap-3">
    <div className="shrink-0 h-10 w-10 bg-accent-bg text-accent text-sm font-medium flex items-center justify-center">{initials}</div>
    <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><h4 className="text-sm font-semibold text-fg">{name}</h4>{role && <span className="text-[10px] font-medium uppercase tracking-wider text-accent">{role}</span>}</div>{username && <p className="text-xs text-fg-secondary">@{username}</p>}{bio && <p className="mt-1 text-xs text-fg-secondary leading-relaxed">{bio}</p>}{tags && tags.length > 0 && <div className="mt-2 flex flex-wrap gap-1">{tags.slice(0, 3).map((tag) => <Tag key={tag} variant="brand" size="sm">{tag}</Tag>)}</div>}{socialLinks && socialLinks.length > 0 && <div className="mt-2 flex gap-3">{socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-fg-secondary hover:text-accent transition-colors">{link.label}</a>)}</div>}{joinedDate && <p className="mt-1 text-[10px] text-fg-muted">Joined {new Date(joinedDate).toLocaleDateString()}</p>}</div>
  </div></div>);
}

// ─── GroupCard ──────────────────────────────────────────────────────

export interface GroupCardProps { name: string; description?: string; memberCount: number; maxMembers?: number; avatarUrl?: string; tags?: string[]; isPrivate?: boolean; welcomeMessage?: string; createdAt?: string; roadmapSlug?: string; membership?: 'admin' | 'member' | 'none'; onJoin?: () => void; onLeave?: () => void; onEdit?: () => void; onClick?: () => void; className?: string; }

export function GroupCard({ name, description, memberCount, maxMembers, avatarUrl, tags, isPrivate, welcomeMessage, createdAt, roadmapSlug, membership = 'none', onJoin, onLeave, onEdit, onClick, className }: GroupCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (<div className={cn('border border-border bg-white p-5 transition-all duration-200 hover:border-border-hover hover:shadow-sm', onClick && 'cursor-pointer', className)} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
    <div className="flex items-start gap-3 mb-3"><div className="shrink-0 h-10 w-10 bg-accent-bg text-accent text-sm font-medium flex items-center justify-center">{initials}</div><div className="flex-1 min-w-0"><h3 className="text-sm font-semibold text-fg">{name}</h3>{description && <p className="text-xs text-fg-secondary mt-0.5 line-clamp-2">{description}</p>}</div></div>
    <div className="flex flex-wrap items-center gap-3 mb-3"><span className="text-xs text-fg-secondary">{memberCount} {memberCount === 1 ? 'member' : 'members'}{maxMembers && ` / ${maxMembers} max`}</span>{isPrivate && <span className="text-[10px] font-medium uppercase tracking-wider text-amber-500">Private</span>}{roadmapSlug && <span className="text-[10px] text-fg-secondary">📚 {roadmapSlug}</span>}{tags && tags.length > 0 && <div className="flex flex-wrap gap-1">{tags.slice(0, 3).map((tag) => <Tag key={tag} variant="brand" size="sm">{tag}</Tag>)}</div>}</div>
    {welcomeMessage && <div className="mb-3 p-3 bg-surface-light text-xs text-fg-secondary italic border border-border">&ldquo;{welcomeMessage}&rdquo;</div>}
    <div className="flex items-center justify-between pt-3 border-t border-border"><div className="flex gap-2">{membership === 'none' && onJoin && <button type="button" onClick={(e) => { e.stopPropagation(); onJoin(); }} className="bg-accent px-4 py-1.5 text-xs text-white font-medium hover:bg-accent-hover transition-colors">Join</button>}{membership === 'member' && onLeave && <button type="button" onClick={(e) => { e.stopPropagation(); onLeave(); }} className="border border-border px-4 py-1.5 text-xs text-fg-secondary font-medium hover:bg-surface-secondary transition-colors">Leave</button>}{membership === 'admin' && onEdit && <button type="button" onClick={(e) => { e.stopPropagation(); onEdit(); }} className="border border-border px-4 py-1.5 text-xs text-fg-secondary font-medium hover:bg-surface-secondary transition-colors">Edit</button>}</div>{createdAt && <span className="text-[10px] text-fg-muted">Created {new Date(createdAt).toLocaleDateString()}</span>}</div>
  </div>);
}

// ─── RoadmapCard ────────────────────────────────────────────────────

export interface RoadmapCardProps { title: string; description: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; estimatedTime: string; articleCount?: number; sectionCount: number; sections: string[]; href?: string; onClick?: () => void; className?: string; }

export function RoadmapCard({ title, description, difficulty, estimatedTime, articleCount, sectionCount, sections, href, onClick, className }: RoadmapCardProps) {
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href } : {};
  return (<Wrapper className={cn('group block border border-border bg-white p-5 transition-all duration-200 hover:border-border-hover hover:shadow-sm', className)} onClick={onClick} {...wrapperProps}>
    <div className="flex items-start justify-between gap-3 mb-2"><h2 className="text-sm font-semibold text-fg group-hover:text-accent transition-colors">{title}</h2><div className="flex items-center gap-2 shrink-0"><DifficultyBadge level={difficulty} size="sm" /><span className="text-[10px] text-fg-muted whitespace-nowrap">{estimatedTime}</span></div></div>
    <p className="text-xs text-fg-secondary mb-4 line-clamp-2">{description}</p>
    <div className="flex gap-4 mb-3">{articleCount !== undefined && <div><div className="text-sm font-semibold text-fg">{articleCount}</div><div className="text-[10px] text-fg-secondary">Articles</div></div>}<div><div className="text-sm font-semibold text-fg">{sectionCount}</div><div className="text-[10px] text-fg-secondary">Sections</div></div></div>
    {sections.length > 0 && <div className="pt-3 border-t border-border"><div className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted mb-2">Sections:</div><div className="flex flex-wrap gap-1">{sections.slice(0, 4).map((section) => <Tag key={section} variant="default" size="sm">{section}</Tag>)}{sections.length > 4 && <Tag size="sm">+{sections.length - 4} more</Tag>}</div></div>}
    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">Start Learning<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>
  </Wrapper>);
}

// ─── SearchResults ──────────────────────────────────────────────────

export interface SearchResultItem { id: string; title: string; description?: string; url?: string; category?: string; tags?: string[]; date?: string; icon?: string; meta?: Array<{ label: string; value: string }>; }
export interface SearchResultsProps { results: SearchResultItem[]; query: string; totalResults?: number; loading?: boolean; availableTags?: string[]; selectedTags?: string[]; onTagToggle?: (tag: string) => void; onClearFilters?: () => void; currentPage?: number; totalPages?: number; onPageChange?: (page: number) => void; className?: string; }

export function SearchResults({ results, query, totalResults, loading = false, availableTags, selectedTags = [], onTagToggle, onClearFilters, currentPage, totalPages, onPageChange, className }: SearchResultsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  if (loading) return (<div className={cn('space-y-3', className)}>{[1,2,3,4,5].map((_, i) => (<div key={i} className="animate-pulse border border-border p-4 space-y-2"><div className="h-4 bg-border w-3/4" /><div className="h-3 bg-surface-muted w-full" /><div className="h-3 bg-surface-muted w-1/2" /></div>))}</div>);
  if (results.length === 0) return <div className={className}><EmptyState icon="🔍" title={query ? `No results for "${query}"` : 'No results'} description={query ? 'Try different keywords.' : 'No items match your filters.'} action={query || selectedTags.length > 0 ? <button type="button" onClick={onClearFilters} className="text-sm text-accent hover:text-accent underline underline-offset-2 transition-colors">Clear filters</button> : undefined} /></div>;
  return (<div className={cn('space-y-4', className)}>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-fg-secondary">{totalResults !== undefined ? <>{totalResults} result{totalResults !== 1 ? 's' : ''} found</> : <>{results.length} result{results.length !== 1 ? 's' : ''} found</>}{query && <> for &ldquo;<span className="font-medium text-fg-tertiary">{query}</span>&rdquo;</>}</p>
      {selectedTags.length > 0 && <div className="flex items-center gap-1.5 flex-wrap"><span className="text-xs text-fg-muted">Filters:</span>{selectedTags.map((tag) => <Tag key={tag} variant="brand" size="sm" removable onRemove={() => onTagToggle?.(tag)}>{tag}</Tag>)}<button type="button" onClick={onClearFilters} className="text-xs text-fg-secondary hover:text-fg-tertiary underline underline-offset-2 transition-colors">Clear all</button></div>}
    </div>
    {availableTags && availableTags.length > 0 && <div className="flex flex-wrap gap-1.5">{availableTags.map((tag) => <Tag key={tag} variant={selectedTags.includes(tag) ? 'brand' : 'default'} size="sm" className="cursor-pointer" onClick={() => onTagToggle?.(tag)}>{tag}</Tag>)}</div>}
    <div className="space-y-2">{results.map((result) => (<a key={result.id} href={result.url} className={cn('block border border-border p-4 transition-all duration-150 hover:border-border-hover hover:shadow-sm', hoveredId === result.id && 'border-border-hover')} onMouseEnter={() => setHoveredId(result.id)} onMouseLeave={() => setHoveredId(null)}>
      <div className="flex items-start gap-3">{result.icon && <span className="shrink-0 text-xl mt-0.5">{result.icon}</span>}<div className="flex-1 min-w-0"><div className="flex items-center gap-2"><h3 className="text-sm font-medium text-fg truncate">{result.title}</h3>{result.category && <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-fg-secondary">{result.category}</span>}</div>{result.description && <p className="mt-0.5 text-xs text-fg-secondary line-clamp-2">{result.description}</p>}<div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">{result.meta?.map((m, i) => <span key={i} className="text-[10px] text-fg-muted whitespace-nowrap">{m.value}</span>)}{result.date && <span className="text-[10px] text-fg-muted">{new Date(result.date).toLocaleDateString()}</span>}{result.tags?.slice(0, 3).map((tag) => <Tag key={tag} size="sm" variant="outline">{tag}</Tag>)}</div></div></div>
    </a>))}</div>
    {currentPage !== undefined && totalPages !== undefined && onPageChange && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />}
  </div>);
}

// ─── FaqItem ────────────────────────────────────────────────────────

export interface FaqItemProps { question: string; answer: string; defaultOpen?: boolean; className?: string; }

export function FaqItem({ question, answer, defaultOpen = false, className }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (<div className={cn('border border-border mb-4 last:mb-0', className)}>
    <button type="button" onClick={() => setOpen(!open)} className={cn('flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-light', open && 'border-b border-border')} aria-expanded={open}>
      <span className="text-base font-semibold text-fg flex-1 leading-snug">{question}</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cn('shrink-0 text-fg-muted transition-transform duration-200', open && 'rotate-180')}><polyline points="6 9 12 15 18 9" /></svg>
    </button>
    <div className={cn('overflow-hidden transition-all duration-200', open ? 'max-h-[2000px]' : 'max-h-0')}><div className="px-6 py-5"><p className="text-base text-fg-tertiary leading-relaxed">{answer}</p></div></div>
  </div>);
}

// ─── ContactInfoItem ────────────────────────────────────────────────

export interface ContactInfoItemProps { label: string; value: ReactNode; icon?: string; className?: string; }

export function ContactInfoItem({ label, value, icon, className }: ContactInfoItemProps) {
  return (<div className={cn('py-5 border-b border-border last:border-b-0', className)}><div className="flex items-start gap-4">{icon && <span className="text-xl mt-0.5 shrink-0 text-accent">{icon}</span>}<div><span className="text-xs font-bold uppercase tracking-[1px] text-fg-muted block mb-1.5">{label}</span><div className="text-base text-fg leading-relaxed">{value}</div></div></div></div>);
}

// ─── ProblemCard ────────────────────────────────────────────────────

export interface ProblemCardProps { order: number; title: string; difficulty: 'Easy' | 'Medium' | 'Hard' | 'Theory'; description?: string; examples?: string[]; timeComplexity?: string; spaceComplexity?: string; leetcodeUrl?: string; className?: string; }

export function ProblemCard({ order, title, difficulty, description, examples, timeComplexity, spaceComplexity, leetcodeUrl, className }: ProblemCardProps) {
  const [expanded, setExpanded] = useState(false);
  return (<div className={cn('border border-border bg-white overflow-hidden transition-all duration-200', className)}>
    <button type="button" onClick={() => setExpanded(!expanded)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface-light transition-colors" aria-expanded={expanded}>
      <span className="text-[10px] font-mono text-fg-muted w-8 shrink-0">{String(order).padStart(3, '0')}</span>
      <span className="flex-1 text-sm font-medium text-fg">{title}</span><DifficultyBadge level={difficulty} size="sm" />
      {leetcodeUrl && <a href={leetcodeUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[10px] font-medium text-accent hover:text-accent transition-colors shrink-0">Solve →</a>}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cn('text-fg-muted transition-transform duration-200 shrink-0', expanded && 'rotate-180')}><polyline points="6 9 12 15 18 9" /></svg>
    </button>
    <div className={cn('overflow-hidden transition-all duration-200', expanded ? 'max-h-[2000px]' : 'max-h-0')}><div className="border-t border-border px-4 py-3 space-y-3">
      {description && <div><h5 className="text-[10px] font-semibold uppercase tracking-wider text-fg-secondary mb-1">Description</h5><p className="text-xs text-fg-tertiary leading-relaxed">{description}</p></div>}
      {examples && examples.length > 0 && <div><h5 className="text-[10px] font-semibold uppercase tracking-wider text-fg-secondary mb-1">Examples</h5>{examples.map((ex, i) => <pre key={i} className="text-xs bg-surface-secondary p-2 mb-1 overflow-x-auto">{ex}</pre>)}</div>}
      {(timeComplexity || spaceComplexity) && <div className="flex gap-4">{timeComplexity && <div><span className="text-[10px] font-semibold uppercase tracking-wider text-fg-secondary">Time: </span><code className="text-xs text-accent">{timeComplexity}</code></div>}{spaceComplexity && <div><span className="text-[10px] font-semibold uppercase tracking-wider text-fg-secondary">Space: </span><code className="text-xs text-accent">{spaceComplexity}</code></div>}</div>}
    </div></div>
  </div>);
}
