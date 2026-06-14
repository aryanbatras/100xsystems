/**
 * ## Presentation: Atomic Components
 *
 * Reusable atomic UI components — Button, Card, Badge, Input,
 * Modal, Spinner, StatusBadge, PageHeader, TabBar, Select, DataGrid.
 * These are the smallest building blocks of the UI system.
 *
 * @packageDocumentation
 */

import React from 'react';
import { 
  primaryButton, secondaryButton, destructiveButton, ghostButton,
  card, cardHeader, cardBody,
  modalOverlay, modalContent, modalHeader, modalBody, modalFooter,
  input, label, select,
  badge, badgeSuccess, badgeWarning, badgeError, badgeInfo,
  pageTitle, pageSubtitle, textMuted, textDanger
} from '../_styles/styles.components';

// ─── BUTTON ───────────────────────────────────────────────────────
type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
type ButtonSize = 'sm' | 'default' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

/**
 * Primary interactive button with variant and size support.
 *
 * @remarks
 * Supports four variants: primary, secondary, destructive, ghost.
 * Can show a loading spinner while async operations are in progress.
 *
 * @param props - Button properties including variant, size, and loading state
 * @returns A styled button element
 * @public
 */
export function Button({ children, variant = 'primary', size = 'default', disabled, loading, className, ...props }: ButtonProps) {
  const styleMap: Record<ButtonVariant, string> = {
    primary: primaryButton(),
    secondary: secondaryButton(),
    destructive: destructiveButton(),
    ghost: ghostButton(),
  };
  const sizeMap: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5',
    default: '',
    lg: 'text-base px-6 py-3',
  };
  return (
    <button className={`${styleMap[variant]} ${sizeMap[size]} ${className || ''}`} disabled={disabled || loading} {...props}>
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

/**
 * Content card with optional header section.
 *
 * @remarks
 * Renders as a bordered container with optional header
 * and body sections. Used for grouping related content.
 *
 * @param props - Card properties including optional header
 * @returns A styled card element
 * @public
 */
export function Card({ children, header: headerContent, className }: CardProps) {
  return (
    <div className={`${card()} ${className || ''}`}>
      {headerContent && <div className={cardHeader()}>{headerContent}</div>}
      <div className={cardBody()}>{children}</div>
    </div>
  );
}

// ─── BADGE ────────────────────────────────────────────────────────
type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

/**
 * Colored status badge for labels and indicators.
 *
 * @remarks
 * Variants: success, warning, error, info, default.
 * Used for status indicators, tags, and counts.
 *
 * @param props - Badge properties including variant
 * @returns A styled badge span
 * @public
 */
export function Badge({ variant = 'default', children }: BadgeProps) {
  const styleMap: Record<BadgeVariant, string> = {
    success: badgeSuccess(),
    warning: badgeWarning(),
    error: badgeError(),
    info: badgeInfo(),
    default: badge(),
  };
  return <span className={styleMap[variant]}>{children}</span>;
}

// ─── INPUT ────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

/**
 * Text input with optional label and error message.
 *
 * @remarks
 * Wraps a native input element with consistent styling.
 * Supports all standard HTML input attributes.
 *
 * @param props - Input properties including label and errorMessage
 * @returns A styled input with optional label and error display
 * @public
 */
export function Input({ label: labelText, errorMessage, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {labelText && <label className={label()}>{labelText}</label>}
      <input className={`${input()} ${errorMessage ? 'border-red-500' : ''} ${className || ''}`} {...props} />
      {errorMessage && <span className={textDanger()}>{errorMessage}</span>}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Overlay modal dialog with header, body, and footer.
 *
 * @remarks
 * Controlled by isOpen/onClose. Renders nothing when closed.
 * Clicking the overlay closes the modal.
 *
 * @param props - Modal properties including visibility and close handler
 * @returns A modal overlay with content, or null when closed
 * @public
 */
export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className={modalOverlay()} onClick={onClose}>
      <div className={modalContent()} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className={modalHeader()}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
          </div>
        )}
        <div className={modalBody()}>{children}</div>
        {footer && <div className={modalFooter()}>{footer}</div>}
      </div>
    </div>
  );
}

// ─── SPINNER ──────────────────────────────────────────────────────
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Animated loading spinner.
 *
 * @remarks
 * Three sizes: sm, md (default), lg.
 * Uses Tailwind's animate-spin for smooth rotation.
 *
 * @param props - Spinner properties including size
 * @returns An animated loading spinner
 * @public
 */
export function Spinner({ size = 'md' }: SpinnerProps) {
  const sizeMap = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' };
  return (
    <div className={`${sizeMap[size]} animate-spin rounded-full border-2 border-gray-300 border-t-[#572EFF]`} />
  );
}

// ─── STATUS BADGE (by status code) ───────────────────────────────
interface StatusBadgeProps {
  statusCode?: string | null;
  label?: string;
}

const STATUS_VARIANTS: Record<string, BadgeVariant> = {
  '00': 'info',
  '01': 'warning',
  '17': 'success',
  '19': 'error',
};

/**
 * Status code badge that maps codes to colored badges.
 *
 * @remarks
 * Maps known status codes to preset badge variants:
 * '00' → info, '01' → warning, '17' → success, '19' → error.
 *
 * @param props - Status badge properties
 * @returns A colored badge, or null if no data provided
 * @public
 */
export function StatusBadge({ statusCode, label }: StatusBadgeProps) {
  if (!statusCode && !label) return null;
  const variant = statusCode ? (STATUS_VARIANTS[statusCode] || 'info') : 'default';
  return <Badge variant={variant}>{label || statusCode}</Badge>;
}

// ─── PAGE HEADER ──────────────────────────────────────────────────
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

/**
 * Page-level header with title, optional subtitle, and action area.
 *
 * @remarks
 * Provides consistent page heading layout across all pages.
 * Actions slot accepts buttons or other controls.
 *
 * @param props - Page header properties
 * @returns A page header layout
 * @public
 */
export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className={pageTitle()}>{title}</h1>
        {subtitle && <p className={pageSubtitle()}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// ─── TAB BAR ──────────────────────────────────────────────────────
interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

/**
 * Horizontal tab bar for switching between views.
 *
 * @remarks
 * Shows labels with optional badge counts.
 * Active tab is highlighted with an underline accent.
 *
 * @param props - Tab bar properties
 * @returns A horizontal tab navigation bar
 * @public
 */
export function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-[#572EFF] border-b-2 border-[#572EFF]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── SELECT ───────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
}

/**
 * Dropdown select component with optional label.
 *
 * @remarks
 * Renders a native select element with consistent styling.
 * Accepts an array of value/label options.
 *
 * @param props - Select properties including options array
 * @returns A styled select dropdown
 * @public
 */
export function Select({ label: labelText, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {labelText && <label className={label()}>{labelText}</label>}
      <select className={`${select()} ${className || ''}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

// ─── DATA GRID ────────────────────────────────────────────────────
interface StatCard {
  label: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface DataGridProps {
  stats: StatCard[];
}

/**
 * Responsive stats grid for displaying metric cards.
 *
 * @remarks
 * Arranges stat cards in a responsive grid (1–4 columns).
 * Each card shows a label, value, optional icon, and trend indicator.
 *
 * @param props - Data grid properties with stats array
 * @returns A responsive grid of stat cards
 * @public
 */
export function DataGrid({ stats }: DataGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white border border-[#e5e5e5] rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.6px] text-[#76777d]">{stat.label}</span>
            {stat.icon && <span className="text-lg">{stat.icon}</span>}
          </div>
          <div className="mt-2 text-2xl font-semibold text-black">{stat.value}</div>
          {stat.trend && (
            <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-400'}`}>
              {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'} {stat.trend}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
