import { cn } from '@/application/lib/utils';

export interface TokenInteractiveProps {
  className?: string;
}

const cursors = [
  { label: 'Pointer', value: 'cursor-pointer', desc: 'Clickable elements' },
  { label: 'Default', value: 'cursor-default', desc: 'Normal arrow' },
  { label: 'Text', value: 'cursor-text', desc: 'Text selection' },
];

const states = [
  { label: 'Default', desc: 'Resting state', class: 'bg-white border border-gray-100' },
  { label: 'Hover', desc: 'Cursor over element', class: 'bg-gray-50 border border-gray-100' },
  { label: 'Focus', desc: 'Keyboard/click focus', class: 'ring-2 ring-purple/40 border border-purple/20' },
  { label: 'Active', desc: 'Press/mousedown', class: 'bg-black text-white' },
  { label: 'Disabled', desc: 'Non-interactive', class: 'bg-gray-100 text-gray-400' },
];

export function TokenInteractive({ className }: TokenInteractiveProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-black">Interactive States</h2>
      </div>

      <div className="px-6 py-10 space-y-12">

        {/* Cursors */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">Cursors</h3>
          <div className="grid grid-cols-3 gap-4">
            {cursors.map((c) => (
              <div key={c.label} className="border border-gray-100 px-5 py-5">
                <div className={`h-12 w-full mb-4 bg-gray-50 flex items-center justify-center ${c.value} rounded-sm`}>
                  <span className="text-xs text-gray-400">↗</span>
                </div>
                <div className="text-sm font-medium text-black">{c.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{c.desc}</div>
                <code className="text-[10px] text-gray-300 mt-1.5 block">{c.value}</code>
              </div>
            ))}
          </div>
        </div>

        {/* States */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">States</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {states.map((s) => (
              <div key={s.label} className="border border-gray-100 px-5 py-5">
                <div className={`h-12 w-full mb-4 rounded-sm ${s.class}`} />
                <div className="text-sm font-medium text-black">{s.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
