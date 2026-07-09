import { cn } from '@/application/lib/utils';

export interface ColorToken {
  label: string;
  variable: string;
}

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
      <div
        className="size-10 shrink-0"
        style={{ backgroundColor: color.variable, outline: isWhite ? '1px solid #e5e7eb' : 'none' }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-black truncate">{color.label}</div>
        <code className="text-xs text-gray-400 truncate font-['JetBrains_Mono']">{color.variable}</code>
      </div>
    </div>
  );
}

export interface TokenColorsProps {
  className?: string;
}

export function TokenColors({ className }: TokenColorsProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-4 py-4">
        <h2 className="text-base font-bold text-black">Colors</h2>
      </div>
      <div className="px-4 pb-6 space-y-8">
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Palette</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {paletteColors.map((c) => (<Swatch key={c.label} color={c} />))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Semantic Tokens</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
            {semanticColors.map((c) => (<Swatch key={c.label} color={c} />))}
          </div>
        </div>
      </div>
    </div>
  );
}
