/**
 * Design token display components & AnimatedIcon wrapper.
 */

'use client';

import { cn } from '@/application/lib/utils';
import { Icon, type IconName, Image, type ImageProps } from './components.atomic';

// ─── AnimatedIcon ────────────────────────────────────────────────────
// Animated icon wrapper using @animateicons/react (Lucide animated set).

import * as AnimatedIcons from '@animateicons/react/lucide';

type AnimateIconComponent = typeof AnimatedIcons[keyof typeof AnimatedIcons];

export interface AnimatedIconProps {
  name: string;
  size?: number;
  color?: string;
  isAnimated?: boolean;
  duration?: number;
  className?: string;
}

function toPascalCase(str: string): string {
  return str
    .split(/[-\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

const iconCache = new Map<string, AnimateIconComponent>();

function resolveIcon(name: string): AnimateIconComponent | null {
  if (iconCache.has(name)) return iconCache.get(name)!;
  const pascal = toPascalCase(name);
  const key = pascal.endsWith('Icon') ? pascal : `${pascal}Icon`;
  const component = (AnimatedIcons as Record<string, AnimateIconComponent>)[key];
  if (component) iconCache.set(name, component);
  return component || null;
}

export function AnimatedIcon({ name, size = 20, color, isAnimated = true, duration, className }: AnimatedIconProps) {
  const IconComponent = resolveIcon(name);
  if (!IconComponent) {
    console.warn(`AnimatedIcon "${name}" not found in @animateicons/react/lucide`);
    return null;
  }
  return (
    <span className={cn('inline-flex shrink-0', className)}>
      <IconComponent
        size={size}
        color={color}
        isAnimated={isAnimated}
        duration={duration}
      />
    </span>
  );
}

// ─── TokenColors ────────────────────────────────────────────────────

export interface ColorToken { label: string; variable: string; }
export interface TokenColorsProps { className?: string; }

const paletteColors: ColorToken[] = [
  { label: 'White', variable: 'var(--color-white)' },
  { label: 'Purple', variable: 'var(--color-purple)' },
  { label: 'Yellow', variable: 'var(--color-yellow)' },
];

const semanticColors: ColorToken[] = [
  { label: '--text-primary', variable: 'var(--text-primary)' },
  { label: '--text-secondary', variable: 'var(--text-secondary)' },
  { label: '--text-muted', variable: 'var(--text-muted)' },
  { label: '--bg-primary', variable: 'var(--bg-primary)' },
  { label: '--bg-secondary', variable: 'var(--bg-secondary)' },
  { label: '--bg-muted', variable: 'var(--bg-muted)' },
  { label: '--accent', variable: 'var(--accent)' },
  { label: '--accent-yellow', variable: 'var(--accent-yellow)' },
];

function Swatch({ color }: { color: ColorToken }) {
  const isWhite = color.variable === 'var(--color-white)' || color.variable === 'var(--bg-primary)';
  return (
    <div className="flex items-center gap-4 px-3 py-3">
      <div className="size-10 shrink-0" style={{ backgroundColor: color.variable, outline: isWhite ? '1px solid #e5e7eb' : 'none' }} />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-fg truncate">{color.label}</div>
        <code className="text-xs text-fg-muted truncate font-mono">{color.variable}</code>
      </div>
    </div>
  );
}

export function TokenColors({ className }: TokenColorsProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-4 py-4"><h2 className="text-base font-bold text-fg">Colors</h2></div>
      <div className="px-4 pb-6 space-y-8">
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-3">Palette</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">{paletteColors.map((c) => (<Swatch key={c.label} color={c} />))}</div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-3">Semantic Tokens</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">{semanticColors.map((c) => (<Swatch key={c.label} color={c} />))}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenTypography ────────────────────────────────────────────────

export interface TokenTypographyProps { className?: string; }

const fontSizes = [
  { label: '4xl', size: '2.25rem' }, { label: '3xl', size: '1.875rem' },
  { label: '2xl', size: '1.5rem' }, { label: 'xl', size: '1.25rem' },
  { label: 'lg', size: '1.125rem' }, { label: 'base', size: '1rem' },
  { label: 'sm', size: '0.875rem' }, { label: 'xs', size: '0.75rem' },
];
const weights = [300, 400, 500, 600, 700, 800];

export function TokenTypography({ className }: TokenTypographyProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Typography</h2></div>
      <div className="px-6 py-8 space-y-10">
        <div className="py-4">
          <p className="text-5xl font-bold text-fg leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>Plus Jakarta Sans</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Weights</h3>
          <div className="space-y-3">{weights.map((w) => (
            <div key={w} className="flex items-baseline gap-5">
              <span className="text-xs text-fg-muted w-6 shrink-0">{w}</span>
              <p className="text-3xl text-fg leading-tight" style={{ fontFamily: 'var(--font-sans)', fontWeight: w }}>abc</p>
            </div>
          ))}</div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Sizes</h3>
          <div className="space-y-4">{fontSizes.map((s) => (
            <div key={s.label} className="flex items-baseline gap-5">
              <span className="text-xs text-fg-muted w-8 shrink-0">{s.label}</span>
              <p className="text-fg leading-tight truncate" style={{ fontFamily: 'var(--font-sans)', fontSize: s.size }}>abc</p>
              <span className="text-xs text-fg-muted ml-auto shrink-0">{s.size}</span>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenRadius ────────────────────────────────────────────────────

export interface TokenRadiusProps { className?: string; }

export function TokenRadius({ className }: TokenRadiusProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Rounding</h2></div>
      <div className="px-6 py-10 space-y-10">
        <div className="max-w-xs">
          <div className="inline-flex items-center gap-4 px-5 py-4 border border-border">
            <div className="h-14 w-14 bg-accent shrink-0" />
            <div>
              <div className="text-sm font-medium text-fg">Square</div>
              <code className="text-xs text-fg-muted">rounded-none — 0rem</code>
            </div>
          </div>
          <p className="text-xs text-fg-secondary mt-3 px-1">The design system uses square corners exclusively.</p>
        </div>
      </div>
    </div>
  );
}

// ─── TokenInteractive ──────────────────────────────────────────────

export interface TokenInteractiveProps { className?: string; }

const cursors = [
  { label: 'Pointer', value: 'cursor-pointer', desc: 'Clickable elements' },
  { label: 'Default', value: 'cursor-default', desc: 'Normal arrow' },
  { label: 'Text', value: 'cursor-text', desc: 'Text selection' },
];

const states = [
  { label: 'Default', class: 'bg-white border border-border' },
  { label: 'Hover', class: 'bg-surface-secondary border border-border' },
  { label: 'Focus', class: 'ring-2 ring-accent/40 border border-accent/20' },
  { label: 'Active', class: 'bg-fg text-white' },
  { label: 'Disabled', class: 'bg-surface-muted text-fg-muted' },
];

export function TokenInteractive({ className }: TokenInteractiveProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Interactive States</h2></div>
      <div className="px-6 py-10 space-y-12">
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Cursors</h3>
          <div className="grid grid-cols-3 gap-4">{cursors.map((c) => (
            <div key={c.label} className="border border-border px-5 py-5">
              <div className={`h-12 w-full mb-4 bg-surface-secondary flex items-center justify-center ${c.value}`}><span className="text-xs text-fg-muted">↗</span></div>
              <div className="text-sm font-medium text-fg">{c.label}</div>
              <div className="text-xs text-fg-secondary mt-0.5">{c.desc}</div>
              <code className="text-[10px] text-fg-muted mt-1.5 block">{c.value}</code>
            </div>
          ))}</div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">States</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">{states.map((s) => (
            <div key={s.label} className="border border-border px-5 py-5">
              <div className={`h-12 w-full mb-4 ${s.class}`} />
              <div className="text-sm font-medium text-fg">{s.label}</div>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenLayout ────────────────────────────────────────────────────

export interface TokenLayoutProps { className?: string; }

const breakpoints = [
  { label: 'Desktop', cols: 'grid-cols-4', gap: 'gap-4' },
  { label: 'Tablet', cols: 'grid-cols-2', gap: 'gap-3' },
  { label: 'Mobile', cols: 'grid-cols-1', gap: 'gap-2' },
];

export function TokenLayout({ className }: TokenLayoutProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Layout & Responsive</h2></div>
      <div className="px-6 py-10 space-y-12">
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Grid Adaptation</h3>
          <div className="space-y-8">{breakpoints.map((bp) => (
            <div key={bp.label}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-medium text-fg-muted uppercase tracking-wider">{bp.label}</span>
              </div>
              <div className={`grid ${bp.cols} ${bp.gap}`}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-16 bg-surface-secondary flex items-center justify-center text-xs text-fg-muted">{n}</div>
                ))}
              </div>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenShadows ───────────────────────────────────────────────────

export interface TokenShadowsProps { className?: string; }

const shadowStyle = 'h-20 w-full mb-4 bg-surface-secondary';

export function TokenShadows({ className }: TokenShadowsProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Shadows</h2></div>
      <div className="px-6 py-10 space-y-12">
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Standard</h3>
          <div className="max-w-sm px-5 py-5 bg-white shadow-md border border-border">
            <div className={shadowStyle} />
            <div className="text-sm font-medium text-fg">shadow-md</div>
            <code className="text-xs text-fg-muted mt-1 block">0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)</code>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Custom</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="px-5 py-5 bg-white border border-border" style={{ boxShadow: 'inset 0 2px 8px 0 rgb(0 0 0 / 0.08)' }}>
              <div className={shadowStyle} /><div className="text-sm font-medium text-fg">Inset</div>
              <code className="text-xs text-fg-muted mt-1 block">inset 0 2px 8px 0 rgb(0 0 0 / 0.08)</code>
            </div>
            <div className="px-5 py-5 bg-white border border-border" style={{ boxShadow: '0 8px 32px -8px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.02)' }}>
              <div className={shadowStyle} /><div className="text-sm font-medium text-fg">Layered</div>
              <code className="text-xs text-fg-muted mt-1 block break-all">0 8px 32px -8px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.02)</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenIcon ─────────────────────────────────────────────────────
// Displays all available icons in the design system for visual auditing.
// Shows both static (Icon) and animated (AnimatedIcon) variants side-by-side.

export interface TokenIconProps { className?: string; }

const iconRows = [
  { row: 'Navigation', names: ['chevron-right', 'chevron-down', 'chevron-left', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'menu', 'more-vertical'] },
  { row: 'Actions', names: ['x', 'check', 'plus', 'minus', 'edit', 'trash', 'copy', 'share', 'download', 'upload'] },
  { row: 'Media & Content', names: ['search', 'image', 'file', 'folder', 'star', 'heart', 'bookmark', 'external-link'] },
  { row: 'Info & Status', names: ['info', 'alert-circle', 'clock', 'settings', 'mail', 'user', 'globe'] },
];

export function TokenIcon({ className }: TokenIconProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border">
        <h2 className="text-lg font-bold text-fg">Icons</h2>
        <p className="text-sm text-fg-secondary mt-1">
          Static <code className="text-xs bg-surface-secondary px-1.5 py-0.5">{`<Icon />`}</code> and animated{' '}
          <code className="text-xs bg-surface-secondary px-1.5 py-0.5">{`<AnimatedIcon />`}</code> variants.
        </p>
      </div>
      <div className="px-6 py-8 space-y-12">
        {/* ── Animated icon showcase ── */}
        <div className="rounded-lg bg-surface-secondary p-6">
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-4">Animated Icons (hover to animate)</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {['search', 'user', 'star', 'heart', 'settings', 'mail', 'bell', 'clock', 'bookmark', 'trash', 'edit', 'share', 'download', 'upload', 'external-link', 'globe'].map((name) => (
              <div key={name} className="flex flex-col items-center gap-2 px-3 py-4 bg-white border border-border hover:border-accent/30 transition-colors group">
                <span className="group-hover:scale-110 transition-transform duration-200">
                  <AnimatedIcon name={name} size={22} isAnimated={true} />
                </span>
                <code className="text-[10px] text-fg-muted text-center leading-tight break-all">{name}</code>
              </div>
            ))}
          </div>
        </div>

        {/* ── Static icon inventory ── */}
        {iconRows.map((group) => (
          <div key={group.row}>
            <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-4">{group.row}</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {group.names.map((name) => (
                <div key={name} className="flex flex-col items-center gap-2 px-3 py-4 border border-border hover:border-accent/30 transition-colors">
                  <Icon name={name as IconName} size={20} />
                  <code className="text-[10px] text-fg-muted text-center leading-tight break-all">{name}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ─── TokenImage ─────────────────────────────────────────────────────
// Shows the Image component with different aspect ratio variants.

export interface TokenImageProps { className?: string; }

const aspectRatios: Array<{ label: string; value: ImageProps['aspectRatio']; desc: string }> = [
  { label: 'Auto', value: 'auto', desc: 'Natural image dimensions' },
  { label: '16:9', value: '16/9', desc: 'Widescreen video' },
  { label: '4:3', value: '4/3', desc: 'Standard photo' },
  { label: '1:1', value: '1/1', desc: 'Square / avatar' },
  { label: '3:2', value: '3/2', desc: 'Classic photo' },
  { label: '2:3', value: '2/3', desc: 'Portrait' },
];

export function TokenImage({ className }: TokenImageProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border">
        <h2 className="text-lg font-bold text-fg">Images</h2>
        <p className="text-sm text-fg-secondary mt-1">The <code className="text-xs bg-surface-secondary px-1.5 py-0.5">{`<Image />`}</code> component with aspect ratio variants.</p>
      </div>
      <div className="px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {aspectRatios.map((ar) => (
            <div key={ar.value} className="border border-border">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"
                alt={ar.label}
                aspectRatio={ar.value}
                objectFit="cover"
              />
              <div className="px-4 py-3">
                <div className="text-sm font-medium text-fg">{ar.label}</div>
                <div className="text-xs text-fg-secondary mt-0.5">{ar.desc}</div>
                <code className="text-[10px] text-fg-muted mt-1 block">aspectRatio="{ar.value}"</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─── TokenSpacing ───────────────────────────────────────────────────

export interface TokenSpacingProps { className?: string; }

export function TokenSpacing({ className }: TokenSpacingProps) {
  const spacings = [
    { label: '0', px: '0px' },
    { label: '0.5', px: '2px' },
    { label: '1', px: '4px' },
    { label: '1.5', px: '6px' },
    { label: '2', px: '8px' },
    { label: '2.5', px: '10px' },
    { label: '3', px: '12px' },
    { label: '3.5', px: '14px' },
    { label: '4', px: '16px' },
    { label: '5', px: '20px' },
    { label: '6', px: '24px' },
    { label: '8', px: '32px' },
    { label: '10', px: '40px' },
    { label: '12', px: '48px' },
    { label: '14', px: '56px' },
    { label: '16', px: '64px' },
    { label: '20', px: '80px' },
    { label: '24', px: '96px' },
    { label: '28', px: '112px' },
    { label: '32', px: '128px' },
    { label: '36', px: '144px' },
    { label: '40', px: '160px' },
    { label: '44', px: '176px' },
    { label: '48', px: '192px' },
    { label: '52', px: '208px' },
    { label: '56', px: '224px' },
    { label: '60', px: '240px' },
    { label: '64', px: '256px' },
    { label: '72', px: '288px' },
    { label: '80', px: '320px' },
    { label: '96', px: '384px' },
  ];

  const midPoint = Math.ceil(spacings.length / 2);

  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border">
        <h2 className="text-lg font-bold text-fg">Spacing</h2>
        <p className="text-sm text-fg-secondary mt-1">Padding &amp; margin scale used across all components.</p>
      </div>
      <div className="px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {spacings.map((s) => (
            <div key={s.label} className="border border-border p-4 flex flex-col items-center">
              <div className="w-full bg-accent-bg flex items-center justify-center mb-3" style={{ padding: `${s.label}px` }}>
                <div className="w-full h-2 bg-accent/30" />
              </div>
              <div className="text-sm font-semibold text-fg font-mono">p-{s.label}</div>
              <code className="text-[10px] text-fg-muted mt-0.5">{s.px}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
