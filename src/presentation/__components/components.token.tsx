/**
 * ## Token Display Components
 *
 * Design token display components for visual auditing in Storybook.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/application/lib/utils';

// ─── TokenColors ────────────────────────────────────────────────────

export interface ColorToken { label: string; variable: string; }
export interface TokenColorsProps { className?: string; }

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
      <div className="size-10 shrink-0" style={{ backgroundColor: color.variable, outline: isWhite ? '1px solid #e5e7eb' : 'none' }} />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-fg truncate">{color.label}</div>
        <code className="text-xs text-fg-muted truncate font-mono">{color.variable}</code>
      </div>
    </div>
  );
}

export function TokenColors({ className }: TokenColorsProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-4 py-4"><h2 className="text-base font-bold text-fg">Colors</h2></div>
      <div className="px-4 pb-6 space-y-8">
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-3">Palette</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">{paletteColors.map((c) => (<Swatch key={c.label} color={c} />))}</div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-3">Semantic Tokens</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">{semanticColors.map((c) => (<Swatch key={c.label} color={c} />))}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenTypography ────────────────────────────────────────────────

export interface TokenTypographyProps { className?: string; }

const fontSizes = [
  { label: '4xl', size: '2.25rem' }, { label: '3xl', size: '1.875rem' },
  { label: '2xl', size: '1.5rem' }, { label: 'xl', size: '1.25rem' },
  { label: 'lg', size: '1.125rem' }, { label: 'base', size: '1rem' },
  { label: 'sm', size: '0.875rem' }, { label: 'xs', size: '0.75rem' },
];
const weights = [300, 400, 500, 600, 700, 800];

export function TokenTypography({ className }: TokenTypographyProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Typography</h2></div>
      <div className="px-6 py-8 space-y-10">
        <div className="py-4">
          <p className="text-5xl font-bold text-fg leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>Plus Jakarta Sans</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Weights</h3>
          <div className="space-y-3">{weights.map((w) => (
            <div key={w} className="flex items-baseline gap-5">
              <span className="text-xs text-fg-muted w-6 shrink-0">{w}</span>
              <p className="text-3xl text-fg leading-tight" style={{ fontFamily: 'var(--font-sans)', fontWeight: w }}>abc</p>
            </div>
          ))}</div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Sizes</h3>
          <div className="space-y-4">{fontSizes.map((s) => (
            <div key={s.label} className="flex items-baseline gap-5">
              <span className="text-xs text-fg-muted w-8 shrink-0">{s.label}</span>
              <p className="text-fg leading-tight truncate" style={{ fontFamily: 'var(--font-sans)', fontSize: s.size }}>abc</p>
              <span className="text-xs text-fg-muted ml-auto shrink-0">{s.size}</span>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenRadius ────────────────────────────────────────────────────

export interface TokenRadiusProps { className?: string; }

export function TokenRadius({ className }: TokenRadiusProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Rounding</h2></div>
      <div className="px-6 py-10 space-y-10">
        <div className="max-w-xs">
          <div className="inline-flex items-center gap-4 px-5 py-4 border border-border">
            <div className="h-14 w-14 bg-accent shrink-0" />
            <div>
              <div className="text-sm font-medium text-fg">Square</div>
              <code className="text-xs text-fg-muted">rounded-none — 0rem</code>
            </div>
          </div>
          <p className="text-xs text-fg-secondary mt-3 px-1">The design system uses square corners exclusively.</p>
        </div>
      </div>
    </div>
  );
}

// ─── TokenInteractive ──────────────────────────────────────────────

export interface TokenInteractiveProps { className?: string; }

const cursors = [
  { label: 'Pointer', value: 'cursor-pointer', desc: 'Clickable elements' },
  { label: 'Default', value: 'cursor-default', desc: 'Normal arrow' },
  { label: 'Text', value: 'cursor-text', desc: 'Text selection' },
];

const states = [
  { label: 'Default', class: 'bg-white border border-border' },
  { label: 'Hover', class: 'bg-surface-secondary border border-border' },
  { label: 'Focus', class: 'ring-2 ring-accent/40 border border-accent/20' },
  { label: 'Active', class: 'bg-fg text-white' },
  { label: 'Disabled', class: 'bg-surface-muted text-fg-muted' },
];

export function TokenInteractive({ className }: TokenInteractiveProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Interactive States</h2></div>
      <div className="px-6 py-10 space-y-12">
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Cursors</h3>
          <div className="grid grid-cols-3 gap-4">{cursors.map((c) => (
            <div key={c.label} className="border border-border px-5 py-5">
              <div className={`h-12 w-full mb-4 bg-surface-secondary flex items-center justify-center ${c.value}`}><span className="text-xs text-fg-muted">↗</span></div>
              <div className="text-sm font-medium text-fg">{c.label}</div>
              <div className="text-xs text-fg-secondary mt-0.5">{c.desc}</div>
              <code className="text-[10px] text-fg-muted mt-1.5 block">{c.value}</code>
            </div>
          ))}</div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">States</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">{states.map((s) => (
            <div key={s.label} className="border border-border px-5 py-5">
              <div className={`h-12 w-full mb-4 ${s.class}`} />
              <div className="text-sm font-medium text-fg">{s.label}</div>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenLayout ────────────────────────────────────────────────────

export interface TokenLayoutProps { className?: string; }

const breakpoints = [
  { label: 'Desktop', cols: 'grid-cols-4', gap: 'gap-4' },
  { label: 'Tablet', cols: 'grid-cols-2', gap: 'gap-3' },
  { label: 'Mobile', cols: 'grid-cols-1', gap: 'gap-2' },
];

export function TokenLayout({ className }: TokenLayoutProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Layout & Responsive</h2></div>
      <div className="px-6 py-10 space-y-12">
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Grid Adaptation</h3>
          <div className="space-y-8">{breakpoints.map((bp) => (
            <div key={bp.label}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-medium text-fg-muted uppercase tracking-wider">{bp.label}</span>
              </div>
              <div className={`grid ${bp.cols} ${bp.gap}`}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-16 bg-surface-secondary flex items-center justify-center text-xs text-fg-muted">{n}</div>
                ))}
              </div>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenShadows ───────────────────────────────────────────────────

export interface TokenShadowsProps { className?: string; }

const shadowStyle = 'h-20 w-full mb-4 bg-surface-secondary';

export function TokenShadows({ className }: TokenShadowsProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border"><h2 className="text-lg font-bold text-fg">Shadows</h2></div>
      <div className="px-6 py-10 space-y-12">
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Standard</h3>
          <div className="max-w-sm px-5 py-5 bg-white shadow-md border border-border">
            <div className={shadowStyle} />
            <div className="text-sm font-medium text-fg">shadow-md</div>
            <code className="text-xs text-fg-muted mt-1 block">0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)</code>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-5">Custom</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="px-5 py-5 bg-white border border-border" style={{ boxShadow: 'inset 0 2px 8px 0 rgb(0 0 0 / 0.08)' }}>
              <div className={shadowStyle} /><div className="text-sm font-medium text-fg">Inset</div>
              <code className="text-xs text-fg-muted mt-1 block">inset 0 2px 8px 0 rgb(0 0 0 / 0.08)</code>
            </div>
            <div className="px-5 py-5 bg-white border border-border" style={{ boxShadow: '0 8px 32px -8px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.02)' }}>
              <div className={shadowStyle} /><div className="text-sm font-medium text-fg">Layered</div>
              <code className="text-xs text-fg-muted mt-1 block break-all">0 8px 32px -8px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.02)</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TokenMotion (GSAP) ────────────────────────────────────────────

export interface TokenMotionProps { className?: string; }

const scrollTriggers = [
  { label: 'fadeIn', code: `gsap.from(el, {\n  scrollTrigger: el,\n  opacity: 0,\n  y: 40,\n  duration: 0.8,\n  ease: 'power2.out',\n})`, desc: 'Fade in + slide up on scroll' },
  { label: 'staggerReveal', code: `gsap.from(items, {\n  scrollTrigger: container,\n  opacity: 0,\n  y: 30,\n  stagger: 0.12,\n  duration: 0.6,\n  ease: 'power3.out',\n})`, desc: 'Stagger children into view' },
  { label: 'parallax', code: `gsap.to(el, {\n  scrollTrigger: {\n    trigger: el,\n    start: 'top bottom',\n    end: 'bottom top',\n    scrub: 1.5,\n  },\n  y: -80,\n  ease: 'none',\n})`, desc: 'Parallax scrub tied to scroll' },
];

const gsapEases = [
  { label: 'power2.out', value: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  { label: 'power3.out', value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
  { label: 'power4.out', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { label: 'expo.out', value: 'cubic-bezier(0.19, 1, 0.22, 1)' },
  { label: 'elastic.out', value: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' },
];

export function TokenMotion({ className }: TokenMotionProps) {
  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border">
        <h2 className="text-lg font-bold text-fg">GSAP Motion</h2>
        <p className="text-sm text-fg-secondary mt-1">Scroll-driven &amp; timeline-heavy animations. Paired with Framer Motion for UI interactions.</p>
      </div>
      <div className="px-6 py-10 space-y-14">
        <section>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-1">ScrollTrigger Patterns</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{scrollTriggers.map((st) => (
            <div key={st.label} className="border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-surface-secondary"><span className="text-sm font-semibold text-fg font-mono">{st.label}</span></div>
              <pre className="px-4 py-3 text-[11px] leading-relaxed text-fg-tertiary font-mono overflow-x-auto whitespace-pre">{st.code}</pre>
              <div className="px-4 py-2 border-t border-border"><p className="text-xs text-fg-secondary">{st.desc}</p></div>
            </div>
          ))}</div>
        </section>
        <section>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-1">Easing Curves</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{gsapEases.map((e) => (
            <div key={e.label} className="border border-border p-4">
              <div className="h-12 mb-3 bg-surface-secondary overflow-hidden relative">
                <div className="absolute inset-0 bg-accent/10" style={{ clipPath: `polygon(0% 100%, 100% 0%, 100% 100%)` }} />
              </div>
              <div className="text-sm font-medium text-fg font-mono">{e.label}</div>
              <code className="text-[10px] text-fg-muted mt-1 block truncate">{e.value}</code>
            </div>
          ))}</div>
        </section>
        <section>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-4">Setup</h3>
          <div className="bg-surface-secondary border border-border px-5 py-4 font-mono text-xs leading-relaxed text-fg-tertiary">
{`// Install
npm install gsap @gsap/react

// ScrollTrigger fade-in (React component)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register & use
gsap.registerPlugin(ScrollTrigger);
useGSAP(() => {
  gsap.from('.fade-in', {
    scrollTrigger: '.fade-in',
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.out',
  });
});`}
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── TokenFramerMotion ─────────────────────────────────────────────

export interface TokenFramerMotionProps { className?: string; }

const presets = {
  gentle: { type: 'spring' as const, stiffness: 200, damping: 25, mass: 1 },
  smooth: { type: 'spring' as const, stiffness: 250, damping: 22, mass: 1 },
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 15, mass: 1 },
};

const springTokens = [
  { label: 'gentle', stiffness: 200, damping: 25, mass: 1, desc: 'Subtle entrance — cards, modals' },
  { label: 'smooth', stiffness: 250, damping: 22, mass: 1, desc: 'Default — buttons, toggles, menus' },
  { label: 'bouncy', stiffness: 300, damping: 15, mass: 1, desc: 'Playful — badges, notifications' },
];

export function TokenFramerMotion({ className }: TokenFramerMotionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const items = ['Explore Courses', 'Track Progress', 'Join Community', 'Earn Certificates'];

  return (
    <div className={cn('bg-white', className)}>
      <div className="px-6 py-5 border-b border-border">
        <h2 className="text-lg font-bold text-fg">Framer Motion</h2>
        <p className="text-sm text-fg-secondary mt-1">UI animations — entry/exit, gestures, staggered children. Polished & smooth.</p>
      </div>
      <div className="px-6 py-10 space-y-14">
        <section>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-1">Spring Presets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{springTokens.map((s) => (
            <motion.div key={s.label} className="border border-border p-5" whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }} transition={presets.gentle}>
              <div className="h-3 w-full mb-4" style={{ backgroundColor: 'var(--accent)' }} />
              <div className="text-sm font-semibold text-fg font-mono">{s.label}</div>
              <div className="flex gap-3 mt-1.5 text-xs text-fg-muted font-mono"><span>stiffness: {s.stiffness}</span><span>damping: {s.damping}</span></div>
              <p className="text-xs text-fg-secondary mt-2">{s.desc}</p>
            </motion.div>
          ))}</div>
        </section>
        <section>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-1">Entry / Exit</h3>
          <div className="border border-border p-6">
            <button onClick={() => setIsVisible(!isVisible)} className="px-4 py-2 bg-accent text-white text-sm font-medium hover:bg-accent-hover active:bg-accent-active transition-colors">
              {isVisible ? 'Hide Card' : 'Show Card'}
            </button>
            <div className="mt-4 relative min-h-[120px]">
              <AnimatePresence mode="wait">
                {isVisible && (
                  <motion.div key="card" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.97 }} transition={presets.smooth}
                    className="p-5 bg-surface-secondary border border-border max-w-sm">
                    <h4 className="text-sm font-semibold text-fg">Welcome Back</h4>
                    <p className="text-xs text-fg-secondary mt-1">Your progress syncs across all devices.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-1">Gesture Animations</h3>
          <div className="flex flex-wrap gap-4">
            {['hover', 'tap', 'lift'].map((gesture) => (
              <motion.button key={gesture} whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }} whileTap={{ y: 0, scale: 0.98 }} transition={presets.smooth}
                className="px-5 py-3 bg-surface-secondary border border-border text-sm font-medium text-fg">{gesture}</motion.button>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-1">Staggered Children</h3>
          <div className="border border-border p-6">
            <div className="flex flex-wrap gap-3">{items.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 16 }} animate={{ opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.5 : 1, y: 0 }}
                transition={{ ...presets.gentle, delay: i * 0.08 }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} whileHover={{ y: -2 }}
                className="px-4 py-3 bg-surface-secondary border border-border text-sm text-fg cursor-default">{item}</motion.div>
            ))}</div>
          </div>
        </section>
        <section>
          <h3 className="text-xs font-medium text-fg-muted uppercase tracking-widest mb-4">Setup</h3>
          <div className="bg-surface-secondary border border-border px-5 py-4 font-mono text-xs leading-relaxed text-fg-tertiary">
{`// Install
npm install motion

// Import
import { motion, AnimatePresence } from 'motion/react';

// Spring preset (recommended default)
const spring = { type: 'spring', stiffness: 250, damping: 22 };

// Usage
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
/>`}
          </div>
        </section>
      </div>
    </div>
  );
}
