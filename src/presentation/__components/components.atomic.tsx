/**
 * ## Atomic Components
 *
 * Smallest UI building blocks — Button, Input, Badge, Card, Tag, Spinner, etc.
 *
 * @packageDocumentation
 */

'use client';

import { forwardRef, useState, useEffect, useCallback, useRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type HTMLAttributes, type ReactNode, type ElementType, type CSSProperties } from 'react';
import { cn } from '@/application/lib/utils';

// ─── Button ────────────────────────────────────────────────────────

const buttonVariants = {
  primary: 'bg-accent text-white hover:bg-accent-hover active:bg-accent-active shadow-sm hover:shadow-md',
  secondary: 'bg-white text-fg-tertiary border border-border hover:bg-surface-secondary active:bg-border hover:border-border-hover',
  ghost: 'text-fg-secondary hover:text-fg-tertiary hover:bg-surface-secondary active:bg-border',
  destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow-md',
  outline: 'border border-white/20 text-white/80 hover:border-white/40 hover:text-white bg-transparent',
  link: 'text-accent underline-offset-4 hover:underline hover:text-accent p-0',
} as const;
const buttonSizes = { sm: 'h-8 px-3 text-xs gap-1.5', default: 'h-10 px-5 text-sm gap-2', lg: 'h-12 px-7 text-base gap-2.5', icon: 'h-10 w-10', 'icon-sm': 'h-8 w-8' } as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean; asChild?: boolean; }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'default', loading, disabled, children, ...props }, ref) => {
  return (
    <button ref={ref} className={cn('inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none', buttonVariants[variant], buttonSizes[size], className)}
      disabled={disabled || loading} {...props}>
      {loading ? <><span className={`inline-block animate-spin rounded-full border-2 ${size === 'sm' ? 'h-3 w-3 border-t-accent' : 'h-4 w-4 border-t-white'} border-white/20`} /><span>{children}</span></> : children}
    </button>
  );
});
Button.displayName = 'Button';

// ─── Input ─────────────────────────────────────────────────────────

const inputVariants = { default: 'border-border focus:border-accent focus:ring-accent/20', error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20', success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20' } as const;
export type InputVariant = keyof typeof inputVariants;
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; errorMessage?: string; successMessage?: string; variant?: InputVariant; leftIcon?: ReactNode; rightIcon?: ReactNode; helperText?: string; fullWidth?: boolean; }

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, errorMessage, successMessage, variant = 'default', leftIcon, rightIcon, helperText, fullWidth = true, id, ...props }, ref) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!errorMessage;
  const hasSuccess = !!successMessage;
  const currentVariant = hasError ? 'error' : hasSuccess ? 'success' : variant;
  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && <label htmlFor={inputId} className="text-[10px] font-semibold uppercase tracking-[0.6px] text-fg-secondary">{label}</label>}
      <div className="relative">
        {leftIcon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-secondary">{leftIcon}</div>}
        <input ref={ref} id={inputId} className={cn('w-full border px-3 py-2 text-sm text-fg placeholder:text-fg-muted bg-white transition-all duration-150 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:text-fg-muted read-only:cursor-default read-only:bg-surface-light', inputVariants[currentVariant], leftIcon && 'pl-10', rightIcon && 'pr-10', className)}
          aria-invalid={hasError} {...props} />
        {rightIcon && <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-fg-secondary">{rightIcon}</div>}
      </div>
      {hasError && <p className="text-xs text-red-500" role="alert">{errorMessage}</p>}
      {hasSuccess && !hasError && <p className="text-xs text-green-600">{successMessage}</p>}
      {helperText && !hasError && <p className="text-xs text-fg-secondary">{helperText}</p>}
    </div>
  );
});
Input.displayName = 'Input';

// ─── Badge ──────────────────────────────────────────────────────────

const badgeVariants = { default: 'bg-surface-secondary text-fg-tertiary', success: 'bg-green-50 text-green-600', warning: 'bg-amber-50 text-amber-600', error: 'bg-red-50 text-red-600', info: 'bg-blue-50 text-blue-600', brand: 'bg-accent-bg text-accent' } as const;
const badgeSizes = { sm: 'px-1.5 py-0.5 text-[10px]', default: 'px-2.5 py-0.5 text-xs', lg: 'px-3 py-1 text-sm' } as const;
export type BadgeVariant = keyof typeof badgeVariants;
export type BadgeSize = keyof typeof badgeSizes;
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { variant?: BadgeVariant; size?: BadgeSize; dot?: boolean; }

export function Badge({ variant = 'default', size = 'default', dot = false, className, children, ...props }: BadgeProps) {
  const dotColors: Record<string, string> = { default: 'bg-fg-tertiary', success: 'bg-green-600', warning: 'bg-amber-600', error: 'bg-red-600', info: 'bg-blue-600', brand: 'bg-accent' };
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap', badgeVariants[variant], badgeSizes[size], className)} {...props}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} aria-hidden="true" />}
      {children}
    </span>
  );
}

// ─── Tag ────────────────────────────────────────────────────────────

const tagVariants = { default: 'bg-surface-secondary text-fg-tertiary border-border', brand: 'bg-accent-bg text-accent border-accent-bg', success: 'bg-green-50 text-green-600 border-green-200', warning: 'bg-amber-50 text-amber-600 border-amber-200', error: 'bg-red-50 text-red-600 border-red-200', outline: 'bg-transparent text-fg-secondary border-border-hover' } as const;
const tagSizes = { sm: 'px-1.5 py-0.5 text-[10px]', default: 'px-2 py-0.5 text-xs', lg: 'px-3 py-1 text-sm' } as const;
export interface TagProps { variant?: keyof typeof tagVariants; size?: keyof typeof tagSizes; removable?: boolean; onRemove?: () => void; onClick?: () => void; className?: string; children: ReactNode; }

export function Tag({ variant = 'default', size = 'default', removable = false, onRemove, onClick, className, children }: TagProps) {
  return (
    <span onClick={onClick} className={cn('inline-flex items-center gap-1 rounded-md border font-medium whitespace-nowrap transition-colors duration-150', tagVariants[variant], tagSizes[size], onClick && 'cursor-pointer', removable && 'pr-1', className)}>
      {children}
      {removable && <button type="button" onClick={(e) => { e.stopPropagation(); onRemove?.(); }} className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-black/10 transition-colors" aria-label="Remove">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>}
    </span>
  );
}

// ─── Spinner ────────────────────────────────────────────────────────

export interface SpinnerProps { size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl'; label?: string; variant?: 'brand' | 'neutral' | 'white'; className?: string; }

export function Spinner({ size = 'default', variant = 'brand', label = 'Loading...', className }: SpinnerProps) {
  const sizeMap = { xs: 'h-3 w-3', sm: 'h-4 w-4', default: 'h-6 w-6', lg: 'h-8 w-8', xl: 'h-12 w-12' };
  const borderMap = { xs: 'border-2', sm: 'border-2', default: 'border-[2.5px]', lg: 'border-[3px]', xl: 'border-[4px]' };
  const colorMap = { brand: 'border-accent-bg border-t-accent', neutral: 'border-border border-t-fg-secondary', white: 'border-white/20 border-t-white' };
  return (
    <div className={cn('inline-flex items-center justify-center', className)} role="status" aria-label={label}>
      <div className={cn('animate-spin rounded-full', sizeMap[size], borderMap[size], colorMap[variant])} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

// ─── Card + CardHeader ──────────────────────────────────────────────

export interface CardProps { header?: ReactNode; footer?: ReactNode; noPadding?: boolean; hoverable?: boolean; onClick?: () => void; className?: string; children?: ReactNode; as?: ElementType; }

export function Card({ children, header, footer, noPadding = false, hoverable = false, className, onClick, as }: CardProps) {
  const Tag: ElementType = as || (onClick ? 'button' : 'div');
  const extraProps: Record<string, unknown> = {};
  if (onClick) { extraProps.onClick = onClick; extraProps.type = 'button'; }
  return (
    <Tag className={cn('border border-border bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]', hoverable && 'transition-all duration-200 hover:shadow-md hover:border-border-hover', onClick && 'cursor-pointer text-left w-full', className)} {...extraProps}>
      {header && <div className="border-b border-border px-6 py-4">{header}</div>}
      <div className={cn(noPadding ? '' : 'px-6 py-5')}>{children}</div>
      {footer && <div className="border-t border-border px-6 py-4">{footer}</div>}
    </Tag>
  );
}

export interface CardHeaderProps { title: string; subtitle?: string; actions?: ReactNode; className?: string; }

export function CardHeader({ title, subtitle, actions, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between', className)}>
      <div className="min-w-0 flex-1"><h3 className="text-sm font-semibold text-fg truncate">{title}</h3>{subtitle && <p className="mt-0.5 text-xs text-fg-secondary">{subtitle}</p>}</div>
      {actions && <div className="ml-4 flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

// ─── Typography (Heading, Text, Divider) ────────────────────────────

const headingVariants = { h1: 'text-[2.25rem] font-bold leading-tight tracking-tight text-fg', h2: 'text-[1.875rem] font-semibold leading-tight tracking-tight text-fg', h3: 'text-[1.5rem] font-semibold leading-snug text-fg', h4: 'text-[1.25rem] font-semibold leading-snug text-fg', h5: 'text-[1.125rem] font-medium leading-snug text-fg', h6: 'text-[1rem] font-medium leading-snug text-fg' } as const;
const textVariants = { body: 'text-sm leading-relaxed text-fg-tertiary', 'body-lg': 'text-base leading-relaxed text-fg-tertiary', 'body-sm': 'text-xs leading-normal text-fg-secondary', caption: 'text-[10px] font-medium uppercase tracking-wider text-fg-secondary', muted: 'text-xs text-fg-secondary', code: 'text-sm font-mono leading-normal text-fg' } as const;
export type HeadingVariant = keyof typeof headingVariants;
export type TextVariant = keyof typeof textVariants;
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> { variant?: HeadingVariant; as?: ElementType; children: ReactNode; }
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> { variant?: TextVariant; as?: ElementType; children: ReactNode; }

export function Heading({ variant = 'h1', as, className, children, ...props }: HeadingProps) {
  const Tag = as || variant;
  return <Tag className={cn(headingVariants[variant], className)} {...props}>{children}</Tag>;
}

export function Text({ variant = 'body', as, className, children, ...props }: TextProps) {
  const Tag = as || 'p';
  const isCode = variant === 'code';
  return <Tag className={cn(textVariants[variant], isCode && 'bg-surface-secondary rounded px-1.5 py-0.5', className)} {...props}>{children}</Tag>;
}

export interface DividerProps { className?: string; label?: string; }
export function Divider({ label, className }: DividerProps) {
  if (label) return (<div className={cn('flex items-center gap-3', className)}><div className="flex-1 border-t border-border" /><span className="text-xs text-fg-secondary">{label}</span><div className="flex-1 border-t border-border" /></div>);
  return <hr className={cn('border-t border-border', className)} />;
}

// ─── Select ─────────────────────────────────────────────────────────

export interface SelectOption { value: string; label: string; }
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> { label?: string; errorMessage?: string; helperText?: string; options: SelectOption[]; placeholder?: string; fullWidth?: boolean; }

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, label, errorMessage, helperText, options, placeholder, fullWidth = true, id, ...props }, ref) => {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && <label htmlFor={selectId} className="text-[10px] font-semibold uppercase tracking-[0.6px] text-fg-secondary">{label}</label>}
      <select ref={ref} id={selectId} className={cn('w-full border px-3 py-2 text-sm text-fg bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:border-accent focus:ring-accent/20 disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:text-fg-muted', errorMessage ? 'border-red-500' : 'border-border', className)} aria-invalid={!!errorMessage} {...props}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
      </select>
      {errorMessage && <p className="text-xs text-red-500" role="alert">{errorMessage}</p>}
      {helperText && !errorMessage && <p className="text-xs text-fg-secondary">{helperText}</p>}
    </div>
  );
});
Select.displayName = 'Select';

// ─── Toggle ─────────────────────────────────────────────────────────

export interface ToggleProps { checked: boolean; onChange: (checked: boolean) => void; label?: string; disabled?: boolean; size?: 'sm' | 'default'; className?: string; }

export function Toggle({ checked, onChange, label, disabled = false, size = 'default', className }: ToggleProps) {
  const st = size === 'sm' ? { track: 'h-5 w-9', thumb: 'h-4 w-4', tx: 'translate-x-4' } : { track: 'h-6 w-11', thumb: 'h-5 w-5', tx: 'translate-x-5' };
  return (
    <label className={cn('inline-flex items-center gap-3', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={() => !disabled && onChange(!checked)}
        className={cn('relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed', st.track, checked ? 'bg-accent' : 'bg-border-hover')}>
        <span className={cn('inline-block rounded-full bg-white shadow-sm transition-transform duration-200', st.thumb, checked && st.tx)} />
      </button>
      {label && <span className="text-sm text-fg-tertiary select-none">{label}</span>}
    </label>
  );
}

// ─── ProgressBar ────────────────────────────────────────────────────

const progressColors = { brand: 'bg-accent', success: 'bg-green-500', warning: 'bg-amber-500', error: 'bg-red-500', neutral: 'bg-fg-secondary' } as const;
const progressSizes = { sm: 'h-1', default: 'h-2', lg: 'h-3' } as const;
export interface ProgressBarProps { value?: number; variant?: keyof typeof progressColors; size?: keyof typeof progressSizes; showLabel?: boolean; className?: string; }

export function ProgressBar({ value, variant = 'brand', size = 'default', showLabel = false, className }: ProgressBarProps) {
  const isIndeterminate = value === undefined;
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('w-full overflow-hidden bg-surface-muted', progressSizes[size])} role="progressbar" aria-valuenow={!isIndeterminate ? value : undefined} aria-valuemin={0} aria-valuemax={100} aria-label={isIndeterminate ? 'Loading...' : value + '% complete'}>
        <div className={cn('h-full transition-all duration-500 ease-out', progressColors[variant], isIndeterminate && 'animate-pulse w-1/2')} style={!isIndeterminate ? { width: (Math.min(100, Math.max(0, value))) + '%' } : undefined} />
      </div>
      {showLabel && !isIndeterminate && <span className="text-xs font-medium text-fg-secondary min-w-[3ch] text-right tabular-nums">{Math.round(value)}%</span>}
    </div>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────────

export interface SkeletonProps { width?: string; height?: string; rounded?: 'sm' | 'default' | 'lg' | 'full'; className?: string; inline?: boolean; }
const skeletonRounded = { sm: 'rounded-sm', default: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' } as const;

export function Skeleton({ width, height = '1rem', rounded = 'default', inline = false, className }: SkeletonProps) {
  return <div className={cn('animate-pulse bg-border', skeletonRounded[rounded], inline ? 'inline-block' : 'block', className)} style={{ width: width || undefined, height }} aria-hidden="true" />;
}

export interface SkeletonBlockProps { lines?: number; avatar?: boolean; className?: string; }
export function SkeletonBlock({ lines = 3, avatar = false, className }: SkeletonBlockProps) {
  return (
    <div className={cn('flex gap-4 p-4', className)}>
      {avatar && <Skeleton width="40px" height="40px" rounded="full" />}
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        {Array.from({ length: lines - 1 }).map((_, i) => (<Skeleton key={i} className={`h-3 ${i === lines - 2 ? 'w-1/2' : 'w-full'}`} />))}
      </div>
    </div>
  );
}

// ─── Modal ──────────────────────────────────────────────────────────

const modalSizes = { sm: 'max-w-sm', default: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl', full: 'max-w-[95vw]' } as const;
export interface ModalProps { isOpen: boolean; onClose: () => void; title?: string; children: ReactNode; footer?: ReactNode; size?: keyof typeof modalSizes; closeOnOverlay?: boolean; closeOnEscape?: boolean; }

export function Modal({ isOpen, onClose, title, children, footer, size = 'default', closeOnOverlay = true, closeOnEscape = true }: ModalProps) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) { setVisible(true); requestAnimationFrame(() => setAnimating(true)); }
    else { setAnimating(false); const t = setTimeout(() => setVisible(false), 200); return () => clearTimeout(t); }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (closeOnEscape && e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [isOpen, closeOnEscape, onClose]);

  if (!visible) return null;

  return (
    <div ref={overlayRef} className={cn('fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ease-in-out', animating ? 'bg-black/30 backdrop-blur-sm' : 'bg-transparent')}
      onClick={(e) => { if (closeOnOverlay && e.target === overlayRef.current) onClose(); }} role="dialog" aria-modal="true" aria-label={title}>
      <div className={cn('relative w-full rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto transition-all duration-200 ease-out mx-4', modalSizes[size], animating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4')}>
        {title && <div className="flex items-center justify-between border-b border-border px-6 py-4"><h2 className="text-lg font-semibold text-fg">{title}</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-fg-secondary hover:text-fg hover:bg-surface-secondary transition-colors" aria-label="Close modal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>}
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

// ─── Avatar ─────────────────────────────────────────────────────────

const avatarSizes = { xs: 'h-6 w-6 text-[8px]', sm: 'h-8 w-8 text-xs', default: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base', xl: 'h-16 w-16 text-xl' } as const;
export interface AvatarProps { src?: string; alt?: string; initials?: string; size?: keyof typeof avatarSizes; className?: string; status?: 'online' | 'away' | 'busy' | 'offline'; }
const statusColors = { online: 'bg-green-500', away: 'bg-amber-500', busy: 'bg-red-500', offline: 'bg-fg-muted' };

export function Avatar({ src, alt = '', initials, size = 'default', status, className }: AvatarProps) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? <img src={src} alt={alt} className={cn('rounded-full object-cover', avatarSizes[size])}
        onError={(e) => { (e.currentTarget).style.display = 'none'; const fb = (e.currentTarget).nextElementSibling; if (fb) (fb as HTMLElement).style.display = 'flex'; }} /> : null}
      <div className={cn('rounded-full bg-accent-bg text-accent font-medium items-center justify-center', src ? 'hidden' : 'flex', avatarSizes[size])}>{initials || '?'}</div>
      {status && <span className={cn('absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white', statusColors[status])} aria-label={status} />}
    </div>
  );
}

// ─── RippleButton ───────────────────────────────────────────────────

interface Ripple { x: number; y: number; size: number; key: number; }
export interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { rippleColor?: string; duration?: string; }

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(({ className, children, rippleColor = '#ffffff', duration = '600ms', onClick, ...props }, ref) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    setRipples((prev) => [...prev, { x, y, size, key: Date.now() }]);
    onClick?.(event);
  };
  useEffect(() => {
    if (ripples.length === 0) return;
    const last = ripples[ripples.length - 1];
    const t = setTimeout(() => setRipples((prev) => prev.filter((r) => r.key !== last.key)), parseInt(duration));
    return () => clearTimeout(t);
  }, [ripples, duration]);

  return (
    <button ref={ref} className={cn('relative flex cursor-pointer items-center justify-center overflow-hidden border-2 px-4 py-2 text-center bg-background text-primary', className)} onClick={handleClick} {...props}>
      <div className="relative z-10">{children}</div>
      <span className="pointer-events-none absolute inset-0">{ripples.map((ripple) => (
        <span key={ripple.key} className="absolute rounded-full opacity-30 animate-rippling" style={{ width: `${ripple.size}px`, height: `${ripple.size}px`, top: `${ripple.y}px`, left: `${ripple.x}px`, backgroundColor: rippleColor, transform: 'scale(0)' } as CSSProperties} />
      ))}</span>
    </button>
  );
});
RippleButton.displayName = 'RippleButton';
