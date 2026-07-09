/**
 * ## RippleButton
 *
 * An animated button with a ripple effect on click for user engagement.
 * Adapted from @magicui/ripple-button by @Sidd5arth.
 *
 * @packageDocumentation
 */

'use client';

import React, { MouseEvent, useEffect, useState, forwardRef } from 'react';
import { cn } from '@/application/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────

export interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color of the rippling waves (full CSS color value, e.g. "#ffffff" or "rgba(...)") */
  rippleColor?: string;
  /** Duration of one ripple animation (e.g. "600ms") */
  duration?: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  key: number;
}

// ─── Component ──────────────────────────────────────────────────────

/**
 * Button with a click-activated ripple wave effect.
 *
 * @remarks
 * The ripple originates at the click point and expands outward, then fades.
 * Customize the ripple color and animation duration via props.
 *
 * @example
 * ```tsx
 * <RippleButton>Click Me</RippleButton>
 * <RippleButton rippleColor="rgba(124, 58, 237, 0.3)" duration="800ms">
 *   Purple Ripple
 * </RippleButton>
 * ```
 */
export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      className,
      children,
      rippleColor = '#ffffff',
      duration = '600ms',
      onClick,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    };

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple: Ripple = { x, y, size, key: Date.now() };
      setRipples((prev) => [...prev, newRipple]);
    };

    useEffect(() => {
      if (ripples.length === 0) return;

      const lastRipple = ripples[ripples.length - 1];
      const timeout = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.key !== lastRipple.key));
      }, parseInt(duration));

      return () => clearTimeout(timeout);
    }, [ripples, duration]);

    return (
      <button
        ref={ref}
        className={cn(
          'relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 px-4 py-2 text-center',
          'bg-background text-primary',
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0">
          {ripples.map((ripple) => (
            <span
              key={ripple.key}
              className="absolute rounded-full opacity-30 animate-rippling"
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: 'scale(0)',
                '--duration': duration,
              } as React.CSSProperties}
            />
          ))}
        </span>
      </button>
    );
  },
);

RippleButton.displayName = 'RippleButton';
