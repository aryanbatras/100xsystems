/**
 * ## TokenShadows
 *
 * Renders all shadow/elevation design tokens from globals.css.
 * Shows each shadow applied to a card so the visual effect is clear.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';

/* ─── Token Data ──────────────────────────────────────────────── */

interface ShadowToken {
  label: string;
  variable: string;
  value: string;
}

const shadows: ShadowToken[] = [
  { label: 'sm', variable: 'var(--shadow-sm)', value: '0 1px 2px rgb(0 0 0 / 0.3)' },
  { label: 'md', variable: 'var(--shadow-md)', value: '0 4px 16px rgb(0 0 0 / 0.4)' },
  { label: 'lg', variable: 'var(--shadow-lg)', value: '0 8px 32px rgb(0 0 0 / 0.5)' },
  { label: 'glow', variable: 'var(--shadow-glow)', value: '0 0 20px rgb(255 255 255 / 0.05)' },
];

/* ─── Main Component ──────────────────────────────────────────── */

export interface TokenShadowsProps {
  className?: string;
}

/**
 * Displays all shadow/elevation design tokens with visual examples.
 */
export function TokenShadows({ className }: TokenShadowsProps) {
  return (
    <div className={cn('p-4 bg-[#111] rounded-lg', className)}>
      <h2 className="text-base font-bold text-[#e0e0e0] mb-4">Shadow Tokens</h2>
      <div className="grid grid-cols-2 gap-4">
        {shadows.map((shadow) => (
          <div key={shadow.label} className="rounded-md border border-[#333] bg-[#1a1a1a] overflow-hidden">
            <div
              className="h-24 m-4 rounded bg-[#222] flex items-center justify-center"
              style={{ boxShadow: shadow.variable }}
            >
              <span className="text-xs font-medium text-[#888]">{shadow.label}</span>
            </div>
            <div className="px-4 pb-3">
              <div className="text-xs font-medium text-[#e0e0e0] mb-0.5">{shadow.label}</div>
              <code className="text-[9px] font-mono text-[#666] block truncate">{shadow.variable}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
