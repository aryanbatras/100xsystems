/**
 * ## TokenTypography
 *
 * Renders all typography design tokens: font families and font sizes from globals.css.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';

/* ─── Token Data ──────────────────────────────────────────────── */

interface FontFamilyToken {
  label: string;
  variable: string;
  stack: string;
  sample: string;
}

interface FontSizeToken {
  label: string;
  variable: string;
  size: string;
  lineHeight?: string;
}

const fontFamilies: FontFamilyToken[] = [
  { label: 'Sans', variable: 'var(--font-sans)', stack: 'Inter, system-ui, -apple-system, sans-serif', sample: 'The quick brown fox jumps over the lazy dog.' },
  { label: 'Mono', variable: 'var(--font-mono)', stack: 'JetBrains Mono, Fira Code, monospace', sample: 'The quick brown fox jumps over the lazy dog.' },
  { label: 'Display', variable: 'var(--font-display)', stack: 'Inter, system-ui, -apple-system, sans-serif', sample: 'The quick brown fox jumps over the lazy dog.' },
  { label: 'Samsung Sharp Sans', variable: 'var(--font-samsung-sharp)', stack: 'Samsung Sharp Sans, sans-serif', sample: 'The quick brown fox jumps over the lazy dog.' },
];

const fontSizes: FontSizeToken[] = [
  { label: 'xs', variable: 'var(--font-size-xs)', size: '0.75rem' },
  { label: 'sm', variable: 'var(--font-size-sm)', size: '0.875rem' },
  { label: 'base', variable: 'var(--font-size-base)', size: '1rem' },
  { label: 'lg', variable: 'var(--font-size-lg)', size: '1.125rem' },
  { label: 'xl', variable: 'var(--font-size-xl)', size: '1.25rem' },
  { label: '2xl', variable: 'var(--font-size-2xl)', size: '1.5rem' },
  { label: '3xl', variable: 'var(--font-size-3xl)', size: '1.875rem' },
  { label: '4xl', variable: 'var(--font-size-4xl)', size: '2.25rem' },
  { label: '5xl', variable: 'var(--font-size-5xl)', size: '3rem' },
  { label: '6xl', variable: 'var(--font-size-6xl)', size: '3.75rem' },
];

/* ─── Main Component ──────────────────────────────────────────── */

export interface TokenTypographyProps {
  className?: string;
}

/**
 * Displays all typography design tokens: font families and font size scale.
 */
export function TokenTypography({ className }: TokenTypographyProps) {
  return (
    <div className={cn('p-4 bg-[#111] rounded-lg', className)}>
      <h2 className="text-base font-bold text-[#e0e0e0] mb-4">Typography Tokens</h2>

      {/* Font Families */}
      <h3 className="text-sm font-semibold text-[#e0e0e0] mb-2">Font Families</h3>
      <div className="grid gap-2 mb-6">
        {fontFamilies.map((font) => (
          <div key={font.label} className="p-3 rounded-md border border-[#333] bg-[#1a1a1a]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[#e0e0e0]">{font.label}</span>
              <code className="text-[10px] font-mono text-[#666]">{font.variable}</code>
            </div>
            <p
              className="text-sm text-[#ccc] truncate"
              style={{ fontFamily: font.variable }}
            >
              {font.sample}
            </p>
          </div>
        ))}
      </div>

      {/* Font Sizes */}
      <h3 className="text-sm font-semibold text-[#e0e0e0] mb-2">Font Sizes</h3>
      <div className="space-y-1">
        {fontSizes.map((size) => (
          <div key={size.label} className="flex items-center gap-3 p-2 rounded border border-[#333] bg-[#1a1a1a]">
            <span
              className="font-semibold text-[#e0e0e0] leading-tight shrink-0 w-8"
              style={{ fontSize: size.variable }}
            >
              Aa
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-[#ccc]" style={{ fontSize: size.variable }}>{size.label}</span>
            </div>
            <code className="text-[10px] font-mono text-[#666] shrink-0">{size.size}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
