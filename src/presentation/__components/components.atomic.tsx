/**
 * ## Atomic Components
 *
 * Smallest UI building blocks — Button, Input, Badge, Card, Tag, Spinner, etc.
 *
 * @packageDocumentation
 */

'use client';

import { forwardRef, useState, useEffect, createElement, type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes, type HTMLAttributes, type ReactNode, type ElementType } from 'react';
import { cn } from '@/application/lib/utils';

// M3E Web Components (Material 3 Expressive) — registered via side-effect imports
import '@m3e/web/loading-indicator';
import '@m3e/web/progress-indicator';

// React wrappers for M3E custom elements (avoids JSX intrinsic type issues)
function M3ELoading(props: Record<string, unknown>) { return createElement('m3e-loading-indicator', props); }
function M3ELinearProgress(props: Record<string, unknown>) { return createElement('m3e-linear-progress-indicator', props); }
function M3ECircularProgress(props: Record<string, unknown>) { return createElement('m3e-circular-progress-indicator', props); }

// ─── Icon ─────────────────────────────────────────────────────────
// Atomic SVG icon component — renders named icons as inline SVGs.

const icons = {
  'chevron-right': <polyline points="9 18 15 12 9 6" />,
  'chevron-down': <polyline points="6 9 12 15 18 9" />,
  'chevron-left': <polyline points="15 18 9 12 15 6" />,
  'x': <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  'search': <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  'check': <polyline points="20 6 9 17 4 12" />,
  'plus': <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  'minus': <line x1="5" y1="12" x2="19" y2="12" />,
  'menu': <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
  'arrow-left': <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
  'arrow-right': <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
  'arrow-up': <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>,
  'arrow-down': <><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></>,
  'external-link': <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
  'info': <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
  'alert-circle': <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
  'user': <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  'star': <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  'folder': <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></>,
  'file': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
  'clock': <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  'settings': <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  'edit': <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" /></>,
  'trash': <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  'heart': <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></>,
  'mail': <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
  'globe': <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  'share': <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></>,
  'download': <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
  'upload': <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>,
  'copy': <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
  'image': <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>,
  'more-vertical': <><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></>,
  'bookmark': <><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></>,
} as const;

export type IconName = keyof typeof icons;

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 16, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}


// ─── Image ─────────────────────────────────────────────────────────
// Atomic image component with loading skeleton, error fallback, and aspect ratio support.

export interface ImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'auto' | '16/9' | '4/3' | '1/1' | '3/2' | '2/3';
  objectFit?: 'cover' | 'contain' | 'fill';
  className?: string;
  fallback?: ReactNode;
}

const aspectRatioClasses: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/2': 'aspect-[3/2]',
  '2/3': 'aspect-[2/3]',
  'auto': '',
};

export function Image({ src, alt, aspectRatio = 'auto', objectFit = 'cover', className, fallback }: ImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className={cn('relative overflow-hidden bg-surface-secondary', aspectRatioClasses[aspectRatio], className)}>
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-border" />
      )}
      {status === 'error' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-fg-muted p-4">
          {fallback ?? (
            <>
              <Icon name="image" size={20} />
              <span className="text-[10px] font-medium uppercase tracking-wider text-center">No image</span>
            </>
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            status === 'loading' ? 'opacity-0' : 'opacity-100',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
          )}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          loading="lazy"
        />
      )}
    </div>
  );
}


// ─── Button ────────────────────────────────────────────────────────

interface Ripple { x: number; y: number; size: number; key: number; }

const buttonVariants = {
  primary: [
    'bg-accent text-white',
    'hover:bg-accent-hover active:bg-accent-active',
    'shadow-sm hover:shadow-md active:shadow-none',
    'transition-all duration-200 ease-out',
  ].join(' '),
  ghost: [
    'relative bg-transparent',
    'text-fg-secondary hover:text-fg',
    'cursor-pointer',
    // Yellow strip on hover
    'after:absolute after:bottom-0 after:left-0',
    'after:h-[3px] after:w-full after:bg-accent-yellow',
    'after:origin-left after:scale-x-0 hover:after:scale-x-100',
    'after:transition-transform after:duration-300 after:ease-out',
    'transition-colors duration-200',
  ].join(' '),
  ripple: [
    'bg-accent-yellow text-black',
    'hover:bg-yellow-400 active:bg-yellow-500',
    'shadow-sm hover:shadow-md active:shadow-none',
    'overflow-hidden relative',
    'transition-all duration-200 ease-out',
  ].join(' '),
  purpleGhost: [
    'relative bg-transparent',
    'text-fg-secondary hover:text-white',
    'cursor-pointer',
    'hover:bg-accent',
    'transition-all duration-200',
  ].join(' '),
  yellowGhost: [
    'relative bg-transparent',
    'text-fg-secondary hover:text-black',
    'cursor-pointer',
    'hover:bg-accent-yellow',
    'transition-all duration-200',
  ].join(' '),
} as const;

const buttonSizes = {
  sm: 'px-6 py-3 text-sm gap-1.5',
  default: 'px-10 py-4 text-sm gap-2',
  lg: 'px-12 py-5 text-base gap-2.5',
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'default', loading, disabled, icon, iconPosition = 'left', children, onClick, ...props }, ref) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const isRipple = variant === 'ripple';
  const btnDisabled = disabled || loading;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isRipple && !btnDisabled) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      setRipples((prev) => [...prev, { x, y, size, key: Date.now() }]);
    }
    onClick?.(event);
  };

  useEffect(() => {
    if (ripples.length === 0) return;
    const last = ripples[ripples.length - 1];
    const t = setTimeout(() => setRipples((prev) => prev.filter((r) => r.key !== last.key)), 600);
    return () => clearTimeout(t);
  }, [ripples]);

  const spinner = (
    <span className="inline-flex shrink-0" style={{ width: 18, height: 18 }}>
      <M3ELoading
        variant="contained"
        aria-label="Loading"
        style={{
          width: '100%',
          height: '100%',
          '--m3e-loading-indicator-active-indicator-color': 'var(--accent)',
          '--m3e-loading-indicator-track-color': 'var(--accent-bg)',
        }}
      />
    </span>
  );

  const content = (
    <span className="inline-flex items-center justify-center gap-2">
      {loading && spinner}
      {icon && iconPosition === 'left' && !loading && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && !loading && <span className="shrink-0">{icon}</span>}
    </span>
  );

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap font-semibold select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        isRipple && 'overflow-hidden',
        className
      )}
      disabled={btnDisabled}
      onClick={handleClick}
      {...props}
    >
      {content}
      {isRipple && ripples.length > 0 && (
        <span className="pointer-events-none absolute inset-0" aria-hidden="true">
          {ripples.map((ripple) => (
            <span
              key={ripple.key}
              className="absolute rounded-full"
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: 'rgba(0,0,0,0.12)',
                animation: 'rippling 600ms ease-out',
                transform: 'scale(0)',
              } as React.CSSProperties}
            />
          ))}
        </span>
      )}
    </button>
  );
});
Button.displayName = 'Button';

// ─── Input ─────────────────────────────────────────────────────────

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, errorMessage, helperText, leftIcon, rightIcon, fullWidth = true, id, ...props }, ref) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!errorMessage;

  return (
    <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-fg-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-transparent border-0 border-b-2 py-3 pr-0',
            'text-lg text-fg placeholder:text-fg-muted',
            'transition-all duration-200 ease-out',
            'focus:outline-none focus:ring-0',
            'disabled:cursor-not-allowed disabled:opacity-40',
            'read-only:cursor-default',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-border focus:border-accent',
            leftIcon && 'pl-8',
            rightIcon && 'pr-8',
            className
          )}
          aria-invalid={hasError}
          {...props}
        />
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-fg-secondary">
            {leftIcon}
          </div>
        )}
        {rightIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-fg-secondary">
            {rightIcon}
          </div>
        )}
      </div>
      {hasError && (
        <p className="text-xs text-red-500 leading-relaxed" role="alert">{errorMessage}</p>
      )}
      {helperText && !hasError && (
        <p className="text-xs text-fg-secondary leading-relaxed">{helperText}</p>
      )}
    </div>
  );
});
Input.displayName = 'Input';

// ─── Textarea ───────────────────────────────────────────────────────

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, errorMessage, helperText, fullWidth = true, id, rows = 4, ...props }, ref) => {
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!errorMessage;

  return (
    <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={textareaId} className="text-sm font-semibold text-fg-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full bg-transparent border-0 border-b-2 py-3 pr-0 resize-none',
            'text-lg text-fg placeholder:text-fg-muted',
            'transition-all duration-200 ease-out',
            'focus:outline-none focus:ring-0',
            'disabled:cursor-not-allowed disabled:opacity-40',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-border focus:border-accent',
            className
          )}
          aria-invalid={hasError}
          {...props}
        />
      </div>
      {hasError && (
        <p className="text-xs text-red-500 leading-relaxed" role="alert">{errorMessage}</p>
      )}
      {helperText && !hasError && (
        <p className="text-xs text-fg-secondary leading-relaxed">{helperText}</p>
      )}
    </div>
  );
});
Textarea.displayName = 'Textarea';

// ─── Badge ──────────────────────────────────────────────────────────

const badgeVariants = {
  purple: 'bg-accent text-white',
  yellow: 'bg-accent-yellow text-black',
  black: 'bg-fg text-white',
} as const;

const badgeSizes = {
  sm: 'px-4 py-1.5 text-xs',
  default: 'px-5 py-2 text-sm font-semibold',
  lg: 'px-6 py-2.5 text-base font-bold',
} as const;

export type BadgeVariant = keyof typeof badgeVariants;
export type BadgeSize = keyof typeof badgeSizes;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export function Badge({ variant = 'purple', size = 'default', dot = false, className, children, ...props }: BadgeProps) {
  const dotColors: Record<BadgeVariant, string> = {
    purple: 'bg-white',
    yellow: 'bg-black',
    black: 'bg-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-medium whitespace-nowrap',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn('h-2 w-2', dotColors[variant])} aria-hidden="true" />
      )}
      {children}
    </span>
  );
}

// ─── Chip / Tag ─────────────────────────────────────────────────────
// MD3-inspired chip component — compact, filled surface, with leading/trailing icon support.

const tagVariants = {
  default: 'bg-surface-secondary text-fg border-0',
  brand: 'bg-accent text-white border-0',
  success: 'bg-accent-yellow text-black border-0',
  outline: 'bg-transparent text-fg-secondary border border-border',
} as const;

const tagSizes = {
  sm: 'px-4 py-1.5 text-xs gap-1',
  default: 'px-5 py-2 text-sm gap-1.5',
  lg: 'px-6 py-2.5 text-base gap-2',
} as const;

export interface TagProps {
  variant?: keyof typeof tagVariants;
  size?: keyof typeof tagSizes;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  selected?: boolean;
  leadingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Tag({
  variant = 'default',
  size = 'default',
  removable = false,
  onRemove,
  onClick,
  selected = false,
  leadingIcon,
  className,
  children,
}: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center font-medium whitespace-nowrap transition-all duration-150',
        tagVariants[variant],
        tagSizes[size],
        selected && variant === 'default' && 'bg-accent-bg text-accent',
        onClick && 'cursor-pointer hover:opacity-80',
        className
      )}
    >
      {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          className="inline-flex items-center justify-center hover:opacity-60 transition-opacity shrink-0"
          aria-label="Remove"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
}

// ─── Spinner (M3E Loading Indicator) ───────────────────────────────

const sizeMap = {
  lg: 48,
  xl: 64,
} as const;

export interface SpinnerProps {
  size?: keyof typeof sizeMap;
  variant?: 'uncontained' | 'contained';
  label?: string;
  className?: string;
}

export function Spinner({ size = 'lg', variant = 'uncontained', label = 'Loading...', className }: SpinnerProps) {
  const px = sizeMap[size];

  return (
    <div
      className={cn('inline-flex items-center justify-center', className)}
      role="status"
      aria-label={label}
      style={{ width: px, height: px }}
    >
      <M3ELoading
        variant={variant}
        aria-label={label}
        style={{
          width: '100%',
          height: '100%',
          '--m3e-loading-indicator-active-indicator-color': 'var(--accent)',
          '--m3e-loading-indicator-track-color': 'var(--accent-bg)',
        }}
      />
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
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, label, errorMessage, helperText, options, placeholder, fullWidth = true, id, ...props }, ref) => {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!errorMessage;

  return (
    <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold text-fg-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full appearance-none bg-transparent border-0 border-b-2 py-3 pr-8',
            'text-lg text-fg',
            'transition-all duration-200 ease-out',
            'focus:outline-none focus:ring-0',
            'disabled:cursor-not-allowed disabled:opacity-40',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-border focus:border-accent',
            className
          )}
          aria-invalid={hasError}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-fg-muted" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {hasError && (
        <p className="text-xs text-red-500 leading-relaxed" role="alert">{errorMessage}</p>
      )}
      {helperText && !hasError && (
        <p className="text-xs text-fg-secondary leading-relaxed">{helperText}</p>
      )}
    </div>
  );
});
Select.displayName = 'Select';

// ─── Toggle ─────────────────────────────────────────────────────────

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'default';
  className?: string;
}

export function Toggle({ checked, onChange, label, disabled = false, size = 'default', className }: ToggleProps) {
  const trackH = size === 'sm' ? 'h-5' : 'h-6';
  const trackW = size === 'sm' ? 'w-9' : 'w-11';
  const thumb = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const tx = size === 'sm' ? 'translate-x-4' : 'translate-x-5';

  return (
    <label className={cn('inline-flex items-center gap-3', disabled && 'opacity-40 cursor-not-allowed', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer items-center',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed',
          trackH, trackW,
          checked ? 'bg-accent' : 'bg-border'
        )}
      >
        <span
          className={cn(
            'inline-block bg-white shadow-sm transition-transform duration-200',
            thumb,
            checked && tx
          )}
        />
      </button>
      {label && <span className="text-sm text-fg select-none">{label}</span>}
    </label>
  );
}

// ─── ProgressBar (M3E Linear Progress Indicator) ───────────────────
// Supports determinate, indeterminate, buffer, and query modes via m3e-linear-progress-indicator.

const progressHeightMap = { sm: '4px', default: '6px', lg: '10px' } as const;

export type ProgressMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  size?: keyof typeof progressHeightMap;
  mode?: ProgressMode;
  bufferValue?: number;
  showLabel?: boolean;
  variant?: 'flat' | 'wavy';
  className?: string;
}

export function ProgressBar({ value, max = 100, size = 'default', mode: explicitMode, bufferValue, showLabel = false, variant = 'flat', className }: ProgressBarProps) {
  const isIndeterminate = explicitMode === 'indeterminate' || (explicitMode === undefined && value === undefined);
  const isQuery = explicitMode === 'query';
  const mode: ProgressMode = explicitMode ?? (value === undefined ? 'indeterminate' : 'determinate');
  const displayValue = (mode === 'determinate' || mode === 'buffer') && value !== undefined ? value : 0;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex-1">
        <M3ELinearProgress
          mode={mode}
          variant={variant}
          value={displayValue}
          max={max}
          buffer-value={bufferValue}
          aria-label={isIndeterminate ? 'Loading...' : isQuery ? 'Searching...' : `${Math.round(displayValue)}% complete`}
          style={{
            height: progressHeightMap[size],
            '--m3e-linear-progress-indicator-active-indicator-color': 'var(--accent)',
            '--m3e-linear-progress-indicator-track-color': 'var(--bg-muted)',
          }}
        />
      </div>
      {showLabel && !isIndeterminate && !isQuery && value !== undefined && (
        <span className="text-xs font-medium text-fg-secondary min-w-[3ch] text-right tabular-nums">
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
}

// ─── CircularProgress (M3E Circular Progress Indicator) ────────────
// Supports determinate (value) and indeterminate modes, plus flat/wavy variants.

export interface CircularProgressProps {
  value?: number;
  max?: number;
  size?: number;
  indeterminate?: boolean;
  variant?: 'flat' | 'wavy';
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function CircularProgress({ value, max = 100, size = 48, indeterminate = false, variant = 'flat', label, showValue = false, className }: CircularProgressProps) {
  const isIndet = indeterminate || value === undefined;
  const displayValue = isIndet ? 0 : value;

  return (
    <div
      className={cn('inline-flex flex-col items-center gap-2', className)}
    >
      <div style={{ width: size, height: size }}>
        <M3ECircularProgress
          indeterminate={isIndet}
          value={displayValue}
          max={max}
          variant={variant}
          aria-label={label ?? (isIndet ? 'Loading...' : `${Math.round(displayValue)}% complete`)}
          style={{
            width: '100%',
            height: '100%',
            '--m3e-circular-progress-indicator-active-indicator-color': 'var(--accent)',
            '--m3e-circular-progress-indicator-track-color': 'var(--bg-muted)',
          }}
        >
          {showValue && !isIndet && (
            <span className="text-xs font-semibold text-fg-secondary tabular-nums">
              {Math.round(displayValue)}%
            </span>
          )}
        </M3ECircularProgress>
      </div>
    </div>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────────
// shadcn-inspired skeleton: a pure <div> with animate-pulse and our design token colors.
// Accepts all HTML div attributes — use className for sizing.

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** @deprecated Use className="w-* h-*" instead */
  width?: string;
  /** @deprecated Use className="w-* h-*" instead */
  height?: string;
  /** @deprecated Use className="inline-block" instead */
  inline?: boolean;
}

export function Skeleton({ width, height, inline, className, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-border',
        inline && 'inline-block',
        className
      )}
      style={{ ...(width && { width }), ...(height && { height }), ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

// ─── SkeletonBlock (text lines) ─────────────────────────────────────
// A preset for rendering multiple skeleton text lines + optional avatar.

export interface SkeletonBlockProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  avatar?: boolean;
}

export function SkeletonBlock({ lines = 3, avatar = false, className, ...props }: SkeletonBlockProps) {
  return (
    <div className={cn('flex gap-4', className)} {...props}>
      {avatar && <Skeleton className="size-10 shrink-0" />}
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <Skeleton key={i} className={`h-3 ${i === lines - 2 ? 'w-1/2' : 'w-full'}`} />
        ))}
      </div>
    </div>
  );
}

// ─── SkeletonCard ───────────────────────────────────────────────────
// A preset for a card-shaped skeleton with image area, title, and description lines.

export interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
  image?: boolean;
  lines?: number;
}

export function SkeletonCard({ image = true, lines = 3, className, ...props }: SkeletonCardProps) {
  return (
    <div className={cn('border border-border p-6', className)} {...props}>
      {image && <Skeleton className="w-full h-40 mb-4" />}
      <Skeleton className="h-5 w-2/3 mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3 mb-2 ${i === lines - 1 ? 'w-1/2' : 'w-full'}`} />
      ))}
    </div>
  );
}

// ─── SkeletonTable ──────────────────────────────────────────────────
// A preset for a table-shaped skeleton with header and rows.

export interface SkeletonTableProps extends HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
}

export function SkeletonTable({ rows = 5, columns = 4, className, ...props }: SkeletonTableProps) {
  return (
    <div className={cn('border border-border', className)} {...props}>
      {/* Header */}
      <div className="flex gap-4 border-b border-border px-4 py-3">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 border-b border-border last:border-b-0 px-4 py-3">
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} className={`h-3 flex-1 ${c === columns - 1 ? 'w-1/3' : ''}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── SkeletonForm ───────────────────────────────────────────────────
// A preset for a form-shaped skeleton with multiple field rows.

export interface SkeletonFormProps extends HTMLAttributes<HTMLDivElement> {
  fields?: number;
}

export function SkeletonForm({ fields = 3, className, ...props }: SkeletonFormProps) {
  return (
    <div className={cn('space-y-6', className)} {...props}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-32" />
    </div>
  );
}
// ─── (end of file)
