import { cn } from '@/application/lib/utils';

export interface TokenLayoutProps {
  className?: string;
}

const breakpoints = [
  { label: 'Desktop', icon: '🖥', cols: 'grid-cols-4', gap: 'gap-4', show: true },
  { label: 'Tablet', icon: '📱', cols: 'grid-cols-2', gap: 'gap-3', show: true },
  { label: 'Mobile', icon: '📱', cols: 'grid-cols-1', gap: 'gap-2', show: true },
];

export function TokenLayout({ className }: TokenLayoutProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-black">Layout &amp; Responsive</h2>
      </div>
      <div className="px-6 py-10 space-y-12">

        {/* Responsive grid demo */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">Grid Adaptation</h3>
          <div className="space-y-8">
            {breakpoints.map((bp) => (
              <div key={bp.label}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{bp.label}</span>
                  <span className="text-[10px] text-gray-300">
                    {bp.label === 'Desktop' ? '≥ 1024px' : bp.label === 'Tablet' ? '640–1023px' : '< 640px'}
                  </span>
                </div>
                <div className={`grid ${bp.cols} ${bp.gap}`}>
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="h-16 bg-gray-100 rounded-sm flex items-center justify-center text-xs text-gray-500">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-[11px] text-gray-400 mt-2">
              Same 4 items reflowing across breakpoints: 4 columns → 2 columns → 1 column.
            </p>
          </div>
        </div>

        {/* Sidebar layout */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">Sidebar + Content</h3>
          <div className="space-y-6">
            {/* Desktop */}
            <div>
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2 block">Desktop</span>
              <div className="grid grid-cols-[200px_1fr] gap-4">
                <div className="h-24 bg-gray-100 rounded-sm flex items-center justify-center text-xs text-gray-500">Sidebar</div>
                <div className="h-24 bg-gray-50 rounded-sm flex items-center justify-center text-xs text-gray-500">Content</div>
              </div>
            </div>
            {/* Tablet */}
            <div>
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2 block">Tablet</span>
              <div className="grid grid-cols-[160px_1fr] gap-3">
                <div className="h-20 bg-gray-100 rounded-sm flex items-center justify-center text-xs text-gray-500">Sidebar</div>
                <div className="h-20 bg-gray-50 rounded-sm flex items-center justify-center text-xs text-gray-500">Content</div>
              </div>
            </div>
            {/* Mobile */}
            <div>
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2 block">Mobile</span>
              <div className="space-y-2">
                <div className="h-10 bg-gray-100 rounded-sm flex items-center justify-center text-xs text-gray-500">Toggle nav</div>
                <div className="h-24 bg-gray-50 rounded-sm flex items-center justify-center text-xs text-gray-500">Content stacks below</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content widths */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">Content Max-Widths</h3>
          <div className="max-w-sm h-8 bg-gray-50 rounded-sm relative overflow-hidden mb-2">
            <div className="h-full w-full max-w-2xl bg-purple/20 flex items-center px-3">
              <span className="text-[10px] text-purple font-medium">max-w-2xl — article body</span>
            </div>
          </div>
          <div className="max-w-md h-8 bg-gray-50 rounded-sm relative overflow-hidden mb-2">
            <div className="h-full w-full max-w-4xl bg-purple/10 flex items-center px-3">
              <span className="text-[10px] text-purple font-medium">max-w-4xl — dashboards</span>
            </div>
          </div>
          <div className="max-w-lg h-8 bg-gray-50 rounded-sm relative overflow-hidden">
            <div className="h-full w-full max-w-7xl bg-purple/15 flex items-center px-3">
              <span className="text-[10px] text-purple font-medium">max-w-7xl — full layouts</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Each width constrains content proportionally and collapses to full-width on smaller screens.
          </p>
        </div>

      </div>
    </div>
  );
}
