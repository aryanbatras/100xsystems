import { cn } from '@/application/lib/utils';

interface FontSize {
  label: string;
  size: string;
}

const fontSizes: FontSize[] = [
  { label: '4xl', size: '2.25rem' },
  { label: '3xl', size: '1.875rem' },
  { label: '2xl', size: '1.5rem' },
  { label: 'xl', size: '1.25rem' },
  { label: 'lg', size: '1.125rem' },
  { label: 'base', size: '1rem' },
  { label: 'sm', size: '0.875rem' },
  { label: 'xs', size: '0.75rem' },
];

const weights = [300, 400, 500, 600, 700, 800];

export interface TokenTypographyProps {
  className?: string;
}

export function TokenTypography({ className }: TokenTypographyProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-black">Typography</h2>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Name */}
        <div className="py-4">
          <p className="text-5xl font-bold text-black leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            Plus Jakarta Sans
          </p>
        </div>

        {/* Weights */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">Weights</h3>
          <div className="space-y-3">
            {weights.map((w) => (
              <div key={w} className="flex items-baseline gap-5">
                <span className="text-xs text-gray-300 w-6 shrink-0">{w}</span>
                <p
                  className="text-3xl text-black leading-tight"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: w }}
                >
                  abc
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">Sizes</h3>
          <div className="space-y-4">
            {fontSizes.map((s) => (
              <div key={s.label} className="flex items-baseline gap-5">
                <span className="text-xs text-gray-300 w-8 shrink-0">{s.label}</span>
                <p
                  className="text-black leading-tight truncate"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: s.size }}
                >
                  abc
                </p>
                <span className="text-xs text-gray-300 ml-auto shrink-0">{s.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
