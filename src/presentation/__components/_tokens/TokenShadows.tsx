import { cn } from '@/application/lib/utils';

export interface TokenShadowsProps {
  className?: string;
}

const shadowStyle = 'h-20 w-full mb-4 bg-gray-50 rounded-sm';

export function TokenShadows({ className }: TokenShadowsProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-black">Shadows</h2>
      </div>
      <div className="px-6 py-10 space-y-12">

        {/* Standard */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">Standard</h3>
          <div className="max-w-sm px-5 py-5 bg-white shadow-md border border-gray-100">
            <div className={shadowStyle} />
            <div className="text-sm font-medium text-black">shadow-md</div>
            <code className="text-xs text-gray-300 mt-1 block">
              0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
            </code>
          </div>
        </div>

        {/* Custom Combinations */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">Custom</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Inset shadow */}
            <div className="px-5 py-5 bg-white border border-gray-100" style={{ boxShadow: 'inset 0 2px 8px 0 rgb(0 0 0 / 0.08)' }}>
              <div className={shadowStyle} />
              <div className="text-sm font-medium text-black">Inset</div>
              <code className="text-xs text-gray-300 mt-1 block">
                inset 0 2px 8px 0 rgb(0 0 0 / 0.08)
              </code>
              <p className="text-xs text-gray-400 mt-2">Inner depth for cards &amp; modals</p>
            </div>

            {/* Layered onset shadow */}
            <div className="px-5 py-5 bg-white border border-gray-100" style={{ boxShadow: '0 8px 32px -8px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.02)' }}>
              <div className={shadowStyle} />
              <div className="text-sm font-medium text-black">Layered Onset</div>
              <code className="text-xs text-gray-300 mt-1 block break-all">
                0 8px 32px -8px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.02)
              </code>
              <p className="text-xs text-gray-400 mt-2">Elevation with subtle border definition</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
