/**
 * ## TokenRadius
 *
 * Renders all border radius design tokens from globals.css.
 * Applies each radius to a square so the rounding is visually clear.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';

/* ─── Token Data ──────────────────────────────────────────────── */

interface RadiusToken {
  label: string;
  variable: string;
  value: string;
}

const radii: RadiusToken[] = [
  { label: 'sm', variable: 'var(--radius-sm)', value: '4px' },
  { label: 'md', variable: 'var(--radius-md)', value: '8px' },
  { label: 'lg', variable: 'var(--radius-lg)', value: '12px' },
];

/* ─── Main Component ──────────────────────────────────────────── */

export interface TokenRadiusProps {
  className?: string;
}

/**
 * Displays all border radius design tokens with visual examples.
 */
export function TokenRadius({ className }: TokenRadiusProps) {
  return (
    <div className={cn('p-4 bg-[#111] rounded-lg', className)}>
      <h2 className="text-base font-bold text-[#e0e0e0] mb-4">Border Radius Tokens</h2>
      <div className="flex gap-6">
        {radii.map((radius) => (
          <div key={radius.label} className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 bg-[#572EFF]"
              style={{ borderRadius: radius.variable }}
            />
            <div className="text-center">
              <div className="text-xs font-medium text-[#e0e0e0]">{radius.label}</div>
              <code className="text-[10px] font-mono text-[#666]">{radius.variable}</code>
              <div className="text-[9px] font-mono text-[#888]">{radius.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
