import { cn } from '@/application/lib/utils';

const smootherOptions = [
  { label: 'smooth', value: '0.8', desc: 'Duration (s) for scroll catch-up' },
  { label: 'smoothTouch', value: '0', desc: 'Smoothing on touch devices' },
  { label: 'effects', value: 'true / false', desc: 'Enable data-speed & data-lag' },
  { label: 'normalizeScroll', value: 'true / false', desc: 'Force JS-thread scrolling' },
  { label: 'ease', value: '"expo"', desc: 'Easing function for scroll movement' },
];

const speedValues = [
  { label: 'data-speed', value: '0.5', desc: 'Half scroll speed — parallax back' },
  { label: 'data-speed', value: '1', desc: 'Normal scroll speed' },
  { label: 'data-speed', value: '2', desc: 'Double scroll speed — parallax forward' },
];

const gsapMethods = [
  { label: 'gsap.to()', desc: 'Animate from current state → target values' },
  { label: 'gsap.from()', desc: 'Animate from target values → current state' },
  { label: 'gsap.fromTo()', desc: 'Full control over start & end states' },
  { label: 'gsap.timeline()', desc: 'Sequence and chain multiple tweens' },
];

const gsapEases = [
  { label: 'power1.out', value: 'cubic-bezier(0.18, 0.89, 0.32, 1.27)' },
  { label: 'power2.out', value: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  { label: 'power3.out', value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
  { label: 'power4.out', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { label: 'expo.out', value: 'cubic-bezier(0.19, 1, 0.22, 1)' },
  { label: 'elastic.out', value: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' },
];

export interface TokenMotionProps {
  className?: string;
}

export function TokenMotion({ className }: TokenMotionProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-black">Motion</h2>
      </div>
      <div className="px-6 py-10 space-y-12">

        {/* ScrollSmoother Config */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            ScrollSmoother
          </h3>
          <p className="text-[11px] text-gray-400 mb-5">
            <code className="text-[10px] bg-gray-100 px-1">ScrollSmoother.create({'{ ... }'})</code>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {smootherOptions.map((opt) => (
              <div key={opt.label} className="border border-gray-100 px-5 py-5">
                <div className="text-sm font-medium text-black font-['JetBrains_Mono']">{opt.label}</div>
                <code className="text-xs text-purple mt-1 block">{opt.value}</code>
                <p className="text-[11px] text-gray-400 mt-1.5">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Parallax Speed */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            Parallax Speeds
          </h3>
          <p className="text-[11px] text-gray-400 mb-5">
            Requires <code className="text-[10px] text-gray-500">effects: true</code> — apply <code className="text-[10px] text-gray-500">data-speed</code> to elements
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {speedValues.map((s) => (
              <div key={s.value} className="border border-gray-100 px-5 py-5">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm font-medium text-black font-['JetBrains_Mono']">{s.label}</span>
                  <code className="text-xs text-purple">= {s.value}</code>
                </div>
                <p className="text-[11px] text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Methods */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            Motion API
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gsapMethods.map((m) => (
              <div key={m.label} className="border border-gray-100 px-5 py-5">
                <div className="text-sm font-medium text-black font-['JetBrains_Mono']">{m.label}</div>
                <p className="text-[11px] text-gray-400 mt-1.5">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Easing */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            Easing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gsapEases.map((e) => (
              <div key={e.label} className="border border-gray-100 px-5 py-5">
                <div className="text-sm font-medium text-black font-['JetBrains_Mono']">{e.label}</div>
                <code className="text-[10px] text-gray-400 mt-1 block truncate">{e.value}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Setup */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-4">Setup</h3>
          <div className="bg-gray-50 rounded-sm px-5 py-4 font-['JetBrains_Mono'] text-xs leading-relaxed text-gray-600">
            <p className="text-gray-400">// Install</p>
            <p className="mt-1">npm install gsap</p>
            <p className="mt-3 text-gray-400">// ScrollSmoother + ScrollTrigger</p>
            <p className="mt-1">import {'{'} ScrollSmoother, ScrollTrigger {'}'} from 'gsap/ScrollSmoother';</p>
            <p>import {'{'} gsap {'}'} from 'gsap';</p>
            <p className="mt-3 text-gray-400">// Register &amp; create</p>
            <p>gsap.registerPlugin(ScrollSmoother, ScrollTrigger);</p>
            <p className="mt-1">ScrollSmoother.create({'{{'}</p>
            <p className="ml-4">smooth: 0.8,</p>
            <p className="ml-4">effects: true,</p>
            <p className="ml-4">ease: 'expo',</p>
            <p>{'}})'};</p>
          </div>
        </div>

      </div>
    </div>
  );
}
