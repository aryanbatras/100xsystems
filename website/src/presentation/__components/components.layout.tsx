/**
 * ## Layout Components
 *
 * Full-width page layout components — Header, SidebarNav, MobileNav, Footer, Dropdown.
 * Uses @animateicons/react/lucide for sidebar/dock animated icons, and the atomic Button
 * component for all interactive actions.
 *
 * @packageDocumentation
 */

'use client';

import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/application/lib/utils';
import { Button } from './components.atomic';
import { AnimatedIcon } from './components.token';

// ─── Dropdown — Borderless Bento with Inset Shadow ──────────────────
// No border, inset shadow, no padding on container, flush to trigger corners.
// All text UPPERCASE, bigger, bolder.

export interface DropdownItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  description?: string;
  featured?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
  onItemSelect?: (item: DropdownItem) => void;
}

export function Dropdown({ trigger, items, align = 'left', className, onItemSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} className="inline-flex items-center">
        {trigger}
      </button>
      <AnimatePresence>
        {open && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: align === 'right' ? 'top right' : 'top left' }}
            className={cn(
              'absolute top-full z-[999] w-max max-w-[calc(100vw-2rem)]',
              'shadow-[inset_0_1px_3px_rgba(0,0,0,0.06),0_10px_30px_-10px_rgba(0,0,0,0.15)]',
              align === 'right' ? 'right-0' : 'left-0',
              className,
            )}
          >
            {/* Single-column vertical dropdown — no border, no padding on container */}
            <div className="bg-accent-bg p-0 min-w-[220px]">
              <div className="flex flex-col">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={item.href || '#'}
                    className="group flex items-center gap-3 px-5 py-4 transition-all duration-200 bg-white hover:bg-accent hover:text-white"
                    onClick={() => { onItemSelect?.(item); setOpen(false); }}
                  >
                    {item.icon && (
                      <span className="shrink-0 text-fg group-hover:text-white transition-colors">
                        {item.icon}
                      </span>
                    )}
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold tracking-wide text-sm text-fg group-hover:text-white transition-colors">
                        {item.label.toUpperCase()}
                      </span>
                      {item.description && (
                        <span className="text-xs leading-relaxed text-fg-secondary group-hover:text-white/80 transition-colors uppercase tracking-wide font-medium">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Header ─────────────────────────────────────────────────────────
// "100X SYSTEMS" big text. Nav links: ghost hover (yellow underline), active = yellow button.
// Sign In = purpleGhost Button atom.

export interface HeaderNavItem {
  id: string;
  label: string;
  href?: string;
  children?: Array<{ id: string; label: string; href?: string; description?: string; icon?: ReactNode; featured?: boolean }>;
}

export interface HeaderProps {
  logo?: ReactNode;
  items: HeaderNavItem[];
  actions?: ReactNode;
  sticky?: boolean;
  activeId?: string;
  className?: string;
}

export function Header({ logo, items, actions, sticky = false, activeId, className }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={cn(
      'bg-white/95 backdrop-blur-sm relative z-50',
      sticky && 'sticky top-0',
      className,
    )}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo — "100X SYSTEMS", uppercase */}
          <div className="shrink-0">
            {logo || (
              <span className="text-2xl lg:text-3xl font-extrabold text-fg tracking-tight select-none uppercase">
                100X SYSTEMS
              </span>
            )}
          </div>

          {/* Desktop nav — ghost hover behavior (yellow underline), active = yellow button */}
          <nav className="hidden lg:flex items-center gap-1">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return item.children && item.children.length > 0 ? (
                <Dropdown
                  key={item.id}
                  trigger={
                    <span className={cn(
                      'inline-flex items-center gap-1.5 px-5 py-4 text-base font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 relative',
                      isActive
                        ? 'bg-accent-yellow text-black'
                        : 'text-fg-secondary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out hover:text-fg',
                    )}>
                      {item.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  }
                  items={item.children.map(c => ({
                    ...c,
                    icon: c.icon,
                  }))}
                />
              ) : (
                <a
                  key={item.id}
                  href={item.href || '#'}
                  className={cn(
                    'px-5 py-4 text-base font-bold uppercase tracking-wider transition-all duration-200 relative',
                    isActive
                      ? 'bg-accent-yellow text-black'
                      : 'text-fg-secondary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out hover:text-fg',
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions + mobile toggle */}
          <div className="flex items-center gap-3">
            {actions && <div className="hidden lg:flex items-center gap-2">{actions}</div>}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-fg-secondary hover:text-fg transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden border-t border-border bg-white overflow-hidden"
          >
            <nav className="px-6 py-4 space-y-0.5">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <div key={item.id}>
                    <a
                      href={item.href || '#'}
                      className={cn(
                        'block px-4 py-3 text-base font-bold uppercase tracking-wider transition-colors',
                        isActive ? 'bg-accent-yellow text-black' : 'text-fg hover:text-accent',
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                    {item.children && (
                      <div className="pl-6 space-y-0.5 border-l border-border ml-4">
                        {item.children.map((child) => (
                          <a
                            key={child.id}
                            href={child.href || '#'}
                            className="block px-4 py-2.5 text-sm text-fg-secondary hover:text-accent transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            {actions && <div className="px-6 pb-4 border-t border-border pt-4 flex gap-2">{actions}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── SidebarNav — Expandable, Flush Left, with Text Labels ────────
// Default: narrow icon strip flush to left edge.
// Hover: expands to show text labels alongside icons.
// No gap between items. Dock magnification + text reveal.

export interface SidebarNavItem {
  id: string;
  label: string;
  iconName?: string;
  href?: string;
}

export interface SidebarNavProps {
  items: SidebarNavItem[];
  activeId?: string;
  onItemClick?: (item: SidebarNavItem) => void;
  className?: string;
}

export function SidebarNav({ items, activeId, onItemClick, className }: SidebarNavProps) {
  const mouseY = useMotionValue(Infinity);
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // After remount, check if mouse is already over the sidebar and expand
  useEffect(() => {
    if (!navRef.current) return;
    const onMove = (e: MouseEvent) => {
      const rect = navRef.current?.getBoundingClientRect();
      if (rect && e.clientX >= rect.left && e.clientX <= rect.right) {
        setExpanded(true);
      }
    };
    document.addEventListener('mousemove', onMove, { once: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  // Prevent GSAP ScrollSmoother from stealing wheel events on the sidebar
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.stopPropagation();
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  return (
    <nav
      ref={navRef}
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => { mouseY.set(Infinity); setExpanded(false); }}
      onMouseEnter={() => setExpanded(true)}
      className={cn(
        'flex flex-col bg-white h-full overflow-y-auto hide-scrollbar transition-all duration-300 ease-out',
        expanded ? 'w-72' : 'w-[60px]',
        className,
      )}
    >
      <div className="flex flex-col items-start pt-4">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={item.href || '#'}
              onClick={(e) => { e.preventDefault(); onItemClick?.(item); }}
              className={cn(
                'flex items-center gap-3 w-full transition-all duration-200 group',
                isActive
                  ? 'bg-accent-yellow text-black'
                  : 'text-fg-secondary hover:bg-accent hover:text-white',
                expanded ? 'px-4 py-3' : 'px-[19px] py-3',
              )}
            >
              {/* Icon with magnification */}
              <SidebarIcon
                mouseY={mouseY}
                isActive={isActive}
              >
                {item.iconName ? (
                  <AnimatedIcon
                    name={item.iconName}
                    size={22}
                    color={isActive ? '#000000' : undefined}
                    isAnimated={true}
                  />
                ) : (
                  <span className={cn(
                    'text-xs font-bold',
                    isActive ? 'text-black' : 'text-fg-secondary',
                  )}>
                    {item.label[0]}
                  </span>
                )}
              </SidebarIcon>

              {/* Label — fades in on hover */}
              <span className={cn(
                'text-[11px] font-bold whitespace-nowrap transition-all duration-200',
                expanded
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 pointer-events-none',
                isActive ? 'text-black' : 'text-fg-secondary group-hover:text-white',
              )}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

// ─── SidebarIcon (magnification on hover — matches dock behavior) ───

interface SidebarIconProps {
  mouseY: MotionValue<number>;
  isActive?: boolean;
  children: ReactNode;
}

function SidebarIcon({ mouseY, isActive, children }: SidebarIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const size = 44;
  const magnification = 62;
  const dist = 120;

  const distanceCalc = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const sizeTransform = useTransform(distanceCalc, [-dist, 0, dist], [size, magnification, size]);
  const scaleSize = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (      <motion.div
        ref={ref}
        style={{ width: scaleSize, height: scaleSize }}
        className={cn(
          'flex items-center justify-center shrink-0 transition-colors duration-150',
          isActive
            ? 'text-black'
            : 'text-fg-secondary group-hover:text-white',
        )}
      >
      {children}
    </motion.div>
  );
}

// ─── MobileNav (Dock) — Borderless, Inset Shadow, with Dividers ────
// No gap between items. Dividers between sections. Purple bg + white on hover.

export interface MobileNavItem {
  id: string;
  label: string;
  iconName?: string;
  href?: string;
  badge?: number;
  dividerAfter?: boolean;
}

export interface MobileNavProps {
  items: MobileNavItem[];
  activeId?: string;
  onNavigate?: (item: MobileNavItem) => void;
  className?: string;
}

export function MobileNav({ items, activeId, onNavigate, className }: MobileNavProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
        'flex items-center px-3 py-2',
        'bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.12)]',
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = activeId === item.id;
        return (
          <React.Fragment key={item.id}>
            {item.dividerAfter && idx < items.length - 1 && (
              <div className="w-px h-6 bg-border mx-1.5" />
            )}
            <DockIcon
              mouseX={mouseX}
              isActive={isActive}
              badge={item.badge}
            >
              <a
                href={item.href || '#'}
                onClick={() => onNavigate?.(item)}
                className="flex items-center justify-center w-full h-full"
              >
                {item.iconName ? (
                  <AnimatedIcon
                    name={item.iconName}
                    size={22}
                    color={isActive ? '#000000' : undefined}
                    isAnimated={true}
                  />
                ) : (
                  <span className="text-xs font-bold">{item.label[0]}</span>
                )}
              </a>
            </DockIcon>
          </React.Fragment>
        );
      })}
    </motion.div>
  );
}

// ─── DockIcon (magnification on hover) ──────────────────────────────
// Purple bg + white on hover/active. Magnification effect.

interface DockIconProps {
  mouseX: MotionValue<number>;
  isActive?: boolean;
  badge?: number;
  children: ReactNode;
}

function DockIcon({ mouseX, isActive, badge, children }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const size = 44;
  const magnification = 62;
  const dist = 120;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distanceCalc, [-dist, 0, dist], [size, magnification, size]);
  const scaleSize = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize }}
      className={cn(
        'relative flex items-center justify-center transition-colors duration-150',
        isActive
          ? 'bg-accent-yellow text-black'
          : 'text-fg-secondary hover:bg-accent hover:text-white',
      )}
    >
      {children}
      {badge && badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-accent text-white text-[10px] font-bold flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </motion.div>
  );
}

// ─── Footer — 90/10 Split: Purple CTA + Compact Nav Links ───────────
// Footer container is exactly min-h-screen.
// Purple section uses flex-1 (~90%), bottom nav uses auto height (~10%).
// Content in purple section is centered within its flex-1 space.

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('min-h-screen flex flex-col', className)}>
      {/* Purple CTA Section — flex-1 fills remaining space (~90%) */}
      <div className="flex-1 bg-accent text-white flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="flex flex-col items-center gap-4 lg:gap-6">
            <img
              src="/assets/cubix/images/many-cubix-on-a-holy-tree.png"
              alt="Cubix community"
              className="w-full max-w-[400px] lg:max-w-[500px] h-auto object-contain"
            />

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Understand the systems.
            </h2>

            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-md">
              Don&apos;t just use technology.
              Build it. Understand it. Improve it.
            </p>

            <a
              href="/systems"
              className="inline-flex items-center gap-3 px-10 py-4 text-white text-sm font-bold uppercase tracking-wider transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-accent-yellow after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Start Building
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Nav Section — compact, ~10% of screen */}
      <div className="bg-surface-secondary py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center flex-wrap justify-center gap-2">
              <Button variant="purpleGhost" size="default" onClick={() => window.location.href = '/systems'}>SYSTEMS</Button>
              <Button variant="purpleGhost" size="default" onClick={() => window.location.href = '/languages'}>LANGUAGES</Button>
              <Button variant="purpleGhost" size="default" onClick={() => window.location.href = '/search'}>SEARCH</Button>
            </div>

            <div className="flex items-center gap-2">
              <a href="https://github.com/100xsystems" target="_blank" rel="noopener noreferrer" className="p-1.5 text-fg-secondary transition-all duration-200 hover:text-accent" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-fg-secondary transition-colors">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/100xsystems/" target="_blank" rel="noopener noreferrer" className="p-1.5 text-fg-secondary transition-all duration-200 hover:text-accent" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </a>
              <a href="mailto:admin@100xsystems.dev" className="p-1.5 text-fg-secondary transition-all duration-200 hover:text-accent" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>

            <span className="text-[10px] font-semibold text-fg-muted select-none uppercase tracking-wider">
              &copy; {currentYear} 100XSYSTEMS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
