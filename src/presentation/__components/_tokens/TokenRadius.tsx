import { cn } from '@/application/lib/utils';

export interface TokenRadiusProps {
  className?: string;
}

export function TokenRadius({ className }: TokenRadiusProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-black">Rounding</h2>
      </div>
      <div className="px-6 py-10 space-y-10">
        {/* The only rounding we use */}
        <div className="max-w-xs">
          <div className="inline-flex items-center gap-4 px-5 py-4 border border-gray-100">
            <div className="h-14 w-14 bg-purple rounded-sm shrink-0" />
            <div>
              <div className="text-sm font-medium text-black">rounded-sm</div>
              <code className="text-xs text-gray-300">0.125rem</code>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 px-1">
            The only rounding in the system. Everything else is square.
          </p>
        </div>

        {/* Reference: square */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-4">Default: Square</h3>
          <div className="inline-flex items-center gap-4 px-5 py-4 border border-gray-100">
            <div className="h-14 w-14 bg-purple shrink-0" />
            <div>
              <div className="text-sm font-medium text-black">rounded-none</div>
              <code className="text-xs text-gray-300">0rem</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
