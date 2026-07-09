/**
 * ## TokenColors
 *
 * Renders all design token color swatches from the global CSS custom properties.
 * Displays brand palette, neutral palette, semantic background/text colors, and accent colors.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';

/* ─── Token Data ──────────────────────────────────────────────── */
// These match the CSS custom properties and Tailwind @theme defined in globals.css

export interface ColorToken {
  label: string;
  variable: string;
  hexPreview?: string;
}

const brandColors: ColorToken[] = [
  { label: 'Brand 50', variable: 'var(--color-brand-50)', hexPreview: '#f0f0ff' },
  { label: 'Brand 100', variable: 'var(--color-brand-100)', hexPreview: '#e0e0ff' },
  { label: 'Brand 200', variable: 'var(--color-brand-200)', hexPreview: '#c4b5ff' },
  { label: 'Brand 300', variable: 'var(--color-brand-300)', hexPreview: '#a78bfa' },
  { label: 'Brand 400', variable: 'var(--color-brand-400)', hexPreview: '#8b5cf6' },
  { label: 'Brand 500', variable: 'var(--color-brand-500)', hexPreview: '#572eff' },
  { label: 'Brand 600', variable: 'var(--color-brand-600)', hexPreview: '#4625cc' },
  { label: 'Brand 700', variable: 'var(--color-brand-700)', hexPreview: '#3a1fa8' },
  { label: 'Brand 800', variable: 'var(--color-brand-800)', hexPreview: '#2d1985' },
  { label: 'Brand 900', variable: 'var(--color-brand-900)', hexPreview: '#201361' },
];

const neutralColors: ColorToken[] = [
  { label: 'Neutral 50', variable: 'var(--color-neutral-50)', hexPreview: '#fafafa' },
  { label: 'Neutral 100', variable: 'var(--color-neutral-100)', hexPreview: '#f5f5f5' },
  { label: 'Neutral 150', variable: 'var(--color-neutral-150)', hexPreview: '#efefef' },
  { label: 'Neutral 200', variable: 'var(--color-neutral-200)', hexPreview: '#e5e5e5' },
  { label: 'Neutral 300', variable: 'var(--color-neutral-300)', hexPreview: '#d4d4d4' },
  { label: 'Neutral 400', variable: 'var(--color-neutral-400)', hexPreview: '#a3a3a3' },
  { label: 'Neutral 500', variable: 'var(--color-neutral-500)', hexPreview: '#76777d' },
  { label: 'Neutral 600', variable: 'var(--color-neutral-600)', hexPreview: '#5c5d63' },
  { label: 'Neutral 700', variable: 'var(--color-neutral-700)', hexPreview: '#45464d' },
  { label: 'Neutral 800', variable: 'var(--color-neutral-800)', hexPreview: '#2d2e33' },
  { label: 'Neutral 900', variable: 'var(--color-neutral-900)', hexPreview: '#0a0a0a' },
];

const semanticColors: ColorToken[] = [
  { label: '--bg-primary', variable: 'var(--bg-primary)', hexPreview: '#000000' },
  { label: '--bg-secondary', variable: 'var(--bg-secondary)', hexPreview: '#212121' },
  { label: '--bg-muted', variable: 'var(--bg-muted)', hexPreview: '#2e2e2e' },
  { label: '--bg-card', variable: 'var(--bg-card)', hexPreview: '#262626' },
  { label: '--text-primary', variable: 'var(--text-primary)', hexPreview: '#ffffff' },
  { label: '--text-secondary', variable: 'var(--text-secondary)', hexPreview: '#cccccc' },
  { label: '--text-muted', variable: 'var(--text-muted)', hexPreview: '#999999' },
  { label: '--text-accent', variable: 'var(--text-accent)', hexPreview: '#ffffff' },
  { label: '--text-inverse', variable: 'var(--text-inverse)', hexPreview: '#000000' },
  { label: '--border-color', variable: 'var(--border-color)', hexPreview: '#404040' },
  { label: '--border-light', variable: 'var(--border-light)', hexPreview: '#333333' },
  { label: '--accent-primary', variable: 'var(--accent-primary)', hexPreview: '#e8e0ff' },
  { label: '--accent-hover', variable: 'var(--accent-hover)', hexPreview: '#ffffff' },
  { label: '--accent-yellow', variable: 'var(--accent-yellow)', hexPreview: '#facc15' },
];

/* ─── Sub-components ──────────────────────────────────────────── */

interface SwatchGridProps {
  title: string;
  colors: ColorToken[];
  className?: string;
}

function ColorSwatch({ color, className }: { color: ColorToken; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 p-2 rounded-md border border-[#333] bg-[#1a1a1a]', className)}>
      <div
        className="w-10 h-10 rounded border border-[#444] shrink-0"
        style={{ backgroundColor: color.variable }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-[#e0e0e0] truncate">{color.label}</div>
        <div className="text-[10px] font-mono text-[#888] truncate">{color.variable}</div>
      </div>
      {color.hexPreview && (
        <code className="text-[10px] font-mono text-[#666] shrink-0">{color.hexPreview}</code>
      )}
    </div>
  );
}

function SwatchGrid({ title, colors, className }: SwatchGridProps) {
  return (
    <div className={cn('mb-6', className)}>
      <h3 className="text-sm font-semibold text-[#e0e0e0] mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {colors.map((color) => (
          <ColorSwatch key={color.label} color={color} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */

export interface TokenColorsProps {
  className?: string;
}

/**
 * Displays all color design tokens from the design system.
 * Shows brand palette, neutral palette, and semantic colors.
 */
export function TokenColors({ className }: TokenColorsProps) {
  return (
    <div className={cn('p-4 bg-[#111] rounded-lg', className)}>
      <h2 className="text-base font-bold text-[#e0e0e0] mb-4">Color Tokens</h2>
      <SwatchGrid title="Brand Palette" colors={brandColors} />
      <SwatchGrid title="Neutral Palette" colors={neutralColors} />
      <SwatchGrid title="Semantic Colors" colors={semanticColors} />
    </div>
  );
}
