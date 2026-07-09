import { cn } from '@/application/lib/utils';

const motionComponents = [
  { label: 'motion.div', desc: 'Animated wrapper for <div>' },
  { label: 'motion.span', desc: 'Animated wrapper for <span>' },
  { label: 'motion.button', desc: 'Animated wrapper for <button>' },
  { label: 'motion.img', desc: 'Animated wrapper for <img>' },
  { label: 'motion.ul', desc: 'Animated wrapper for <ul>' },
  { label: 'motion.section', desc: 'Animated wrapper for <section>' },
];

const animationProps = [
  { label: 'initial', desc: 'Starting state on mount' },
  { label: 'animate', desc: 'Target state to animate toward' },
  { label: 'exit', desc: 'State on unmount (needs AnimatePresence)' },
  { label: 'transition', desc: 'Physics/timing config' },
  { label: 'variants', desc: 'Named animation states — reusable' },
  { label: 'layout', desc: 'Auto-animate layout shifts' },
  { label: 'layoutId', desc: 'Shared element transitions' },
];

const springParams = [
  { label: 'type', value: '"spring"', desc: 'Spring physics mode' },
  { label: 'stiffness', value: '100–300', desc: 'Spring tension (higher = stiffer)' },
  { label: 'damping', value: '10–30', desc: 'Resistance (higher = less bounce)' },
  { label: 'mass', value: '0.5–2', desc: 'Weight (higher = slower)' },
  { label: 'bounce', value: '0–1', desc: 'Overshoot amount' },
];

const gestureHandlers = [
  { label: 'whileHover', desc: 'Animate on pointer enter' },
  { label: 'whileTap', desc: 'Animate on press/click' },
  { label: 'whileFocus', desc: 'Animate on keyboard focus' },
  { label: 'whileInView', desc: 'Animate on viewport enter' },
  { label: 'whileDrag', desc: 'Animate while being dragged' },
  { label: 'drag', desc: 'Enable drag interaction' },
];

const scrollApis = [
  { label: 'useScroll()', desc: 'Track scrollY / scrollYProgress' },
  { label: 'useTransform()', desc: 'Map one motion value to another' },
  { label: 'useSpring()', desc: 'Smooth a motion value with spring' },
  { label: 'useVelocity()', desc: 'Track velocity of a motion value' },
];

const exitAnimations = [
  { label: 'AnimatePresence', desc: 'Keep DOM for exit animations on unmount' },
];

export interface TokenFramerMotionProps {
  className?: string;
}

export function TokenFramerMotion({ className }: TokenFramerMotionProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-black">Framer Motion</h2>
      </div>
      <div className="px-6 py-10 space-y-12">

        {/* Motion Components */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            Motion Components
          </h3>
          <p className="text-[11px] text-gray-400 mb-5">
            Prefix any HTML/SVG element: <code className="text-[10px] bg-gray-100 px-1">{'<motion.div />'}</code>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {motionComponents.map((mc) => (
              <div key={mc.label} className="border border-gray-100 px-4 py-4">
                <div className="text-sm font-medium text-black font-['JetBrains_Mono']">{mc.label}</div>
                <p className="text-[11px] text-gray-400 mt-1">{mc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Animation Props */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            Animation Props
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {animationProps.map((p) => (
              <div key={p.label} className="border border-gray-100 px-5 py-5">
                <div className="text-sm font-medium text-black font-['JetBrains_Mono']">{p.label}</div>
                <p className="text-[11px] text-gray-400 mt-1.5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spring Physics */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            Spring Physics
          </h3>
          <p className="text-[11px] text-gray-400 mb-5">
            Default for motion & layout animations — <code className="text-[10px] text-gray-500">{'transition: { type: "spring" }'}</code>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {springParams.map((s) => (
              <div key={s.label} className="border border-gray-100 px-5 py-5">
                <div className="text-sm font-medium text-black font-['JetBrains_Mono']">{s.label}</div>
                <code className="text-xs text-purple mt-1 block">{s.value}</code>
                <p className="text-[11px] text-gray-400 mt-1.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gestures */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            Gesture Handlers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gestureHandlers.map((g) => (
              <div key={g.label} className="border border-gray-100 px-5 py-5">
                <div className="text-sm font-medium text-black font-['JetBrains_Mono']">{g.label}</div>
                <p className="text-[11px] text-gray-400 mt-1.5">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll API */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            Scroll &amp; Hooks
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {scrollApis.map((s) => (
              <div key={s.label} className="border border-gray-100 px-5 py-5">
                <div className="text-sm font-medium text-black font-['JetBrains_Mono']">{s.label}</div>
                <p className="text-[11px] text-gray-400 mt-1.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exit Animations */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-5">
            Exit Animations
          </h3>
          <div className="max-w-sm">
            {exitAnimations.map((e) => (
              <div key={e.label} className="border border-gray-100 px-5 py-5">
                <div className="text-sm font-medium text-black font-['JetBrains_Mono']">{e.label}</div>
                <p className="text-[11px] text-gray-400 mt-1.5">{e.desc}</p>
                <code className="text-[10px] text-gray-400 mt-2 block">{'<AnimatePresence>{isOpen && <motion.div exit={{ opacity: 0 }} />}</AnimatePresence>'}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Setup */}
        <div>
          <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-4">Setup</h3>
          <div className="bg-gray-50 rounded-sm px-5 py-4 font-['JetBrains_Mono'] text-xs leading-relaxed text-gray-600">
            <p className="text-gray-400">// Install</p>
            <p className="mt-1">npm install motion</p>
            <p className="mt-3 text-gray-400">// Import</p>
            <p className="mt-1">import {'{'} motion, AnimatePresence {'}'} from 'motion/react';</p>
            <p className="mt-3 text-gray-400">// Client component (Next.js App Router)</p>
            <p className="mt-1">import {'{'} motion {'}'} from 'motion/react-client';</p>
            <p className="mt-4 text-gray-400">// Basic example</p>
            <p>{'<'}<span className="text-purple">motion.div</span></p>
            <p className="ml-4">initial={'{{'} opacity: 0, y: 20 {'}}'}</p>
            <p className="ml-4">animate={'{{'} opacity: 1, y: 0 {'}}'}</p>
            <p className="ml-4">transition={'{{'} type: 'spring', stiffness: 200, damping: 20 {'}}'}</p>
            <p>{'>'}</p>
            <p className="ml-4">Content</p>
            <p>{'<'}/<span className="text-purple">motion.div</span>{'>'}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
