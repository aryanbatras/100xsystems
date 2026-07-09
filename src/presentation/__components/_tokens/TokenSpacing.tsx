/**
 * ## TokenSpacing
 *
 * Renders all spacing design tokens from globals.css.
 * Visualizes each spacing value as a colored bar so the scale is immediately apparent.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';

/* ─── Token Data ──────────────────────────────────────────────── */

interface SpacingToken {
  label: string;
  variable: string;
  value: string;
}

const spacings: SpacingToken[] = [
  { label: 'xs', variable: 'var(--spacing-xs)', value: '0.25rem' },
  { label: 'sm', variable: 'var(--spacing-sm)', value: '0.5rem' },
  { label: 'md', variable: 'var(--spacing-md)', value: '1rem' },
  { label: 'lg', variable: 'var(--spacing-lg)', value: '1.5rem' },
  { label: 'xl', variable: 'var(--spacing-xl)', value: '2rem' },
  { label: '2xl', variable: 'var(--spacing-2xl)', value: '3rem' },
  { label: '3xl', variable: 'var(--spacing-3xl)', value: '4rem' },
  { label: '4xl', variable: 'var(--spacing-4xl)', value: '6rem' },
];

/* ─── Main Component ──────────────────────────────────────────── */

export interface TokenSpacingProps {
  className?: string;
}

/**
 * Displays all spacing design tokens with visual size comparisons.
 */
export function TokenSpacing({ className }: TokenSpacingProps) {
  return (
    <div className={cn('p-4 bg-[#111] rounded-lg', className)}>
      <h2 className="text-base font-bold text-[#e0e0e0] mb-4">Spacing Tokens</h2>
      <div className="space-y-2">
        {spacings.map((space) => (
          <div key={space.label} className="flex items-center gap-3">
            <div className="w-16 shrink-0 text-right">
              <span className="text-xs font-medium text-[#e0e0e0]">{space.label}</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              {/* Visual bar showing the spacing width */}
              <div
                className="h-4 bg-[#572EFF] rounded"
                style={{ width: space.variable }}
              />
              <span className="text-[10px] font-mono text-[#888]">= {space.value}</span>
            </div>
            <code className="text-[10px] font-mono text-[#666] w-40 text-right shrink-0">{space.variable}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
