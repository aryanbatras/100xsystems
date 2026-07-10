/**
 * ## Layout Components
 *
 * Full-width page layout components — Header, SidebarNav, MobileNav, Footer, Dropdown.
 * Uses animated icons from @animateicons/react and Bento grid for dropdown panels.
 *
 * @packageDocumentation
 */

'use client';

import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/application/lib/utils';
import { ScrollVelocityRow } from './components.animations';

import {
  HouseIcon, LayersIcon, LayoutGridIcon, BlocksIcon, LayoutListIcon,
  BookOpenIcon, SearchIcon, SettingsIcon, UserIcon, UsersIcon,
  MenuIcon, XIcon, ChevronDownIcon, ChevronRightIcon,
  CodeIcon, TerminalIcon, GlobeIcon, RocketIcon, StarIcon,
  BrainIcon, SparklesIcon, FlameIcon, HeartIcon, ZapIcon,
  MailIcon, MessageCircleIcon, BellIcon, CompassIcon,
} from '@animateicons/react/lucide';

type AnimatedIconComponent = React.ComponentType<{ size?: number; isAnimated?: boolean; color?: string }>;

// ─── Dropdown ───────────────────────────────────────────────────────

export interface DropdownItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  description?: string;
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

  const cols = items.length <= 4 ? 'grid-cols-2' : items.length <= 9 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} className="inline-flex items-center">
        {trigger}
      </button>
      <AnimatePresence>
        {open && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute top-full mt-3 min-w-[380px] bg-white border border-border shadow-xl z-50',
              align === 'right' ? 'right-0' : 'left-0',
              className,
            )}
          >
            <div className={cn('grid gap-2 p-3', cols)}>
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.href || '#'}
                  className="flex flex-col gap-1.5 p-3 hover:bg-surface-secondary transition-colors group"
                  onClick={() => { onItemSelect?.(item); setOpen(false); }}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon && <span className="shrink-0 text-fg-secondary group-hover:text-accent">{item.icon}</span>}
                    <span className="text-sm font-bold text-fg group-hover:text-accent uppercase tracking-wide">{item.label}</span>
                  </div>
                  {item.description && (
                    <div className="text-xs text-fg-secondary leading-snug pl-0 group-hover:text-fg-tertiary">{item.description}</div>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Header ─────────────────────────────────────────────────────────

export interface HeaderNavItem {
  id: string;
  label: string;
  href?: string;
  children?: Array<{ id: string; label: string; href?: string; description?: string; icon?: ReactNode }>;
}

export interface HeaderProps {
  logo?: ReactNode;
  items: HeaderNavItem[];
  actions?: ReactNode;
  sticky?: boolean;
  className?: string;
}

export function Header({ logo, items, actions, sticky = true, className }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={cn(
      'bg-white z-50',
      sticky && 'sticky top-0',
      className,
    )}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <div className="shrink-0">
            {logo || (
              <div className="flex items-center gap-2">
                <span className="text-2xl lg:text-3xl font-extrabold text-fg tracking-tight uppercase">100X</span>
                <ZapIcon size={22} isAnimated={true} color="#572EFF" />
              </div>
            )}
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {items.map((item) => (
              item.children && item.children.length > 0 ? (
                <Dropdown
                  key={item.id}
                  trigger={
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-fg-secondary hover:text-accent transition-colors uppercase tracking-wider cursor-pointer">
                      {item.label}
                      <ChevronDownIcon size={16} isAnimated={true} />
                    </span>
                  }
                  items={item.children.map(c => ({
                    ...c,
                    icon: c.icon || <RocketIcon size={18} isAnimated={true} />,
                  }))}
                />
              ) : (
                <a
                  key={item.id}
                  href={item.href || '#'}
                  className="px-4 py-2.5 text-sm font-bold text-fg-secondary hover:text-accent transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Actions + mobile toggle */}
          <div className="flex items-center gap-4">
            {actions && <div className="hidden lg:flex items-center gap-3">{actions}</div>}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-fg-secondary hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon size={28} isAnimated={true} /> : <MenuIcon size={28} isAnimated={true} />}
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
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border bg-white overflow-hidden"
          >
            <nav className="px-6 py-4 space-y-1">
              {items.map((item) => (
                <div key={item.id}>
                  <a
                    href={item.href || '#'}
                    className="block px-4 py-3 text-sm font-bold text-fg hover:text-accent uppercase tracking-wider transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="pl-6 space-y-0.5">
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
              ))}
            </nav>
            {actions && <div className="px-6 pb-4 border-t border-border pt-4">{actions}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── SidebarNav (collapsed only, animated icons) ────────────────────

export interface SidebarNavItem {
  id: string;
  label: string;
  Icon?: AnimatedIconComponent;
  href?: string;
  active?: boolean;
}

export interface SidebarNavProps {
  items: SidebarNavItem[];
  activeId?: string;
  onItemClick?: (item: SidebarNavItem) => void;
  className?: string;
}

export function SidebarNav({ items, activeId, onItemClick, className }: SidebarNavProps) {
  return (
    <nav className={cn(
      'flex flex-col items-center gap-0.5 py-3 px-1.5 bg-white border-r border-border min-h-full w-12',
      className,
    )}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        const IconComp = item.Icon;
        return (
          <a
            key={item.id}
            href={item.href || '#'}
            onClick={() => onItemClick?.(item)}
            title={item.label}
            className={cn(
              'flex items-center justify-center w-9 h-9 transition-colors',
              isActive
                ? 'bg-accent text-white'
                : 'text-fg-secondary hover:text-accent hover:bg-accent/10',
            )}
          >
            {IconComp ? (
              <IconComp size={18} isAnimated={!isActive} color={isActive ? '#fff' : undefined} />
            ) : (
              <span className="text-xs font-bold">{item.label[0]}</span>
            )}
          </a>
        );
      })}
    </nav>
  );
}

// ─── MobileNav (Dock-style bottom tab bar) ──────────────────────────

export interface MobileNavItem {
  id: string;
  label: string;
  Icon?: AnimatedIconComponent;
  href?: string;
  badge?: number;
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
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden',
        'flex items-center gap-1 px-4 py-2',
        'bg-white/95 backdrop-blur-md border border-border shadow-xl',
        className,
      )}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const IconComp = item.Icon;
        return (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            isActive={isActive}
            badge={item.badge}
          >
            <a
              href={item.href || '#'}
              onClick={() => onNavigate?.(item)}
              className="flex items-center justify-center w-full h-full"
            >
              {IconComp ? (
                <IconComp size={18} isAnimated={!isActive} color={isActive ? 'var(--accent)' : undefined} />
              ) : (
                <span className="text-xs font-bold">{item.label[0]}</span>
              )}
            </a>
          </DockIcon>
        );
      })}
    </motion.div>
  );
}

// ─── DockIcon (magnification on hover) ──────────────────────────────

interface DockIconProps {
  mouseX: MotionValue<number>;
  isActive?: boolean;
  badge?: number;
  children: ReactNode;
}

function DockIcon({ mouseX, isActive, badge, children }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const size = 40;
  const magnification = 52;
  const dist = 100;
  const padding = 6;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distanceCalc, [-dist, 0, dist], [size, magnification, size]);
  const scaleSize = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        'relative flex items-center justify-center transition-colors',
        isActive ? 'bg-accent/10' : 'hover:bg-surface-secondary',
      )}
    >
      {children}
      {badge && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-3.5 px-0.5 bg-accent text-white text-[9px] font-bold flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </motion.div>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────

export interface FooterSection {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
  tagline?: string;
  marqueeText?: string;
  className?: string;
}

export function Footer({ sections = [], copyright, tagline, marqueeText, className }: FooterProps) {
  const displayMarquee = marqueeText || '100X SYSTEMS — TRANSFORM DEVELOPERS INTO 100XENGINEERS — ';

  return (
    <footer className={cn('bg-black', className)}>
      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-white/10 py-4">
        <ScrollVelocityRow baseVelocity={4} direction={1} className="text-sm font-bold text-white/30 uppercase tracking-[0.3em]">
          <span className="mx-8 shrink-0">{displayMarquee}</span>
        </ScrollVelocityRow>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top section */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        {(tagline || copyright) && (
          <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {tagline && (
              <div className="flex items-center gap-3">
                <span className="text-xl font-extrabold text-white tracking-tight uppercase">100X</span>
                <span className="text-sm text-white/50">{tagline}</span>
              </div>
            )}
            {copyright && <p className="text-xs text-white/30">{copyright}</p>}
          </div>
        )}
      </div>
    </footer>
  );
}
