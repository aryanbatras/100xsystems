/**
 * ## Animation Components
 *
 * Decorative animation effects — KineticText, CoolMode, NoiseTexture,
 * RippleButton, SpinningText, ScrollVelocity, NumberTicker, BlurFade, AnimatedList.
 *
 * @packageDocumentation
 */

'use client';

import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useId,
  useMemo,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type MouseEvent,
} from 'react';
import styled from 'styled-components';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useInView,
  AnimatePresence,
  type MotionProps,
  type MotionValue,
  type Transition,
  type UseInViewOptions,
  type Variants,
} from 'motion/react';
import { cn } from '@/application/lib/utils';

import type { IconType } from 'react-icons';
import {
  SiGoogle, SiApple, SiMeta, SiNetflix,
  SiOpenai, SiGithub, SiGitlab,
  SiDocker, SiKubernetes, SiVercel,
  SiCloudflare, SiDigitalocean, SiLinux, SiUbuntu, SiNginx,
  SiTypescript, SiJavascript, SiPython, SiRust, SiGo, SiNodedotjs,
  SiReact, SiNextdotjs, SiTailwindcss, SiSvelte, SiVuedotjs, SiAngular,
  SiFigma, SiSlack, SiDiscord, SiNotion, SiLinear, SiSupabase, SiStripe,
  SiRedis, SiPostgresql, SiMongodb, SiGraphql, SiPrisma, SiTrpc,
  SiTurborepo, SiPnpm, SiBun, SiDeno,
  SiAndroid, SiExpo,
  SiX, SiYoutube,
  SiShopify, SiJetbrains, SiCircleci, SiJenkins,
  SiAtlassian, SiJira, SiConfluence, SiDatadog, SiSentry, SiNewrelic,
  SiAuth0, SiClerk, SiPlanetscale, SiRailway, SiFlydotio,
  SiTerraform, SiTesla, SiRaspberrypi, SiArduino, SiSqlite,
  SiElasticsearch, SiKibana, SiGrafana, SiPrometheus,
  SiAnsible, SiPulumi, SiVim, SiNeovim, SiWebpack, SiVite,
  SiStorybook, SiCypress, SiJest, SiVitest,
  SiNpm, SiYarn, SiRubyonrails, SiDjango, SiFlask, SiFastapi,
  SiSwift, SiKotlin, SiFlutter, SiReactquery, SiZod, SiBiome,
  SiSass, SiBootstrap, SiJquery, SiElectron, SiElastic,
} from 'react-icons/si';

// ─── KineticText ────────────────────────────────────────────────────

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface KineticTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: As;
}

export function KineticText({
  text,
  as: Tag = 'h1',
  className,
  style,
  ...rest
}: KineticTextProps) {
  const mergedStyle = {
    '--hover-padding': 'calc(1em / 12)',
    '--text-stroke-width': 'calc(1em * 125 / 6000)',
    ...(style as React.CSSProperties | undefined),
  } as React.CSSProperties;

  return (
    <Tag
      {...rest}
      className={cn('flex flex-wrap font-[300]', className)}
      style={mergedStyle}
    >
      {text.split('').map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="[will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}

// ─── CoolMode ───────────────────────────────────────────────────────

export interface BaseParticle {
  element: HTMLElement | SVGSVGElement;
  left: number;
  size: number;
  top: number;
}

export interface BaseParticleOptions {
  particle?: string;
  size?: number;
}

export interface CoolParticle extends BaseParticle {
  direction: number;
  speedHorz: number;
  speedUp: number;
  spinSpeed: number;
  spinVal: number;
}

export interface CoolParticleOptions extends BaseParticleOptions {
  particleCount?: number;
  speedHorz?: number;
  speedUp?: number;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

const getContainer = () => {
  const id = '_coolMode_effect';
  const existingContainer = document.getElementById(id);
  if (existingContainer) return existingContainer;
  const container = document.createElement('div');
  container.setAttribute('id', id);
  container.setAttribute(
    'style',
    'overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647'
  );
  document.body.appendChild(container);
  return container;
};

let instanceCounter = 0;

const applyParticleEffect = (
  element: HTMLElement,
  options?: CoolParticleOptions
): (() => void) => {
  instanceCounter++;
  const defaultParticle = 'circle';
  const particleType = options?.particle || defaultParticle;
  const sizes = [15, 20, 25, 35, 45];
  const limit = 45;
  let particles: CoolParticle[] = [];
  let autoAddParticle = false;
  let mouseX = 0;
  let mouseY = 0;
  const container = getContainer();

  const appendCircleParticle = (particle: HTMLDivElement, size: number) => {
    const circleSVG = document.createElementNS(SVG_NS, 'svg');
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'cx', (size / 2).toString());
    circle.setAttributeNS(null, 'cy', (size / 2).toString());
    circle.setAttributeNS(null, 'r', (size / 2).toString());
    circle.setAttributeNS(null, 'fill', `hsl(${Math.random() * 360}, 70%, 50%)`);
    circleSVG.appendChild(circle);
    circleSVG.setAttribute('width', size.toString());
    circleSVG.setAttribute('height', size.toString());
    particle.appendChild(circleSVG);
  };

  const appendImageParticle = (particle: HTMLDivElement, imageSrc: string, size: number) => {
    const image = document.createElement('img');
    image.src = imageSrc;
    image.width = size;
    image.height = size;
    image.alt = '';
    image.style.borderRadius = '50%';
    particle.appendChild(image);
  };

  const appendTextParticle = (particle: HTMLDivElement, particleContent: string, size: number) => {
    const fontSizeMultiplier = 3;
    const emojiSize = size * fontSizeMultiplier;
    const content = document.createElement('div');
    content.textContent = particleContent;
    content.style.fontSize = `${emojiSize}px`;
    content.style.lineHeight = '1';
    content.style.textAlign = 'center';
    content.style.width = `${size}px`;
    content.style.height = `${size}px`;
    content.style.display = 'flex';
    content.style.alignItems = 'center';
    content.style.justifyContent = 'center';
    content.style.transform = `scale(${fontSizeMultiplier})`;
    content.style.transformOrigin = 'center';
    particle.appendChild(content);
  };

  function generateParticle() {
    const size = options?.size || sizes[Math.floor(Math.random() * sizes.length)];
    const speedHorz = options?.speedHorz || Math.random() * 10;
    const speedUp = options?.speedUp || Math.random() * 25;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;
    const particle = document.createElement('div');

    if (particleType === 'circle') appendCircleParticle(particle, size);
    else if (particleType.startsWith('http') || particleType.startsWith('/')) appendImageParticle(particle, particleType, size);
    else appendTextParticle(particle, particleType, size);

    particle.style.position = 'absolute';
    particle.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${spinVal}deg)`;
    container.appendChild(particle);
    particles.push({ direction, element: particle, left, size, speedHorz, speedUp, spinSpeed, spinVal, top });
  }

  function refreshParticles() {
    particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;
      if (p.top >= Math.max(window.innerHeight, document.body.clientHeight) + p.size) {
        particles = particles.filter((o) => o !== p);
        p.element.remove();
      }
      p.element.setAttribute('style', `position:absolute;will-change:transform;top:${p.top}px;left:${p.left}px;transform:rotate(${p.spinVal}deg)`);
    });
  }

  let animationFrame: number | undefined;
  let lastParticleTimestamp = 0;
  const particleGenerationDelay = 30;

  function loop() {
    const currentTime = performance.now();
    if (autoAddParticle && particles.length < limit && currentTime - lastParticleTimestamp > particleGenerationDelay) {
      generateParticle();
      lastParticleTimestamp = currentTime;
    }
    refreshParticles();
    animationFrame = requestAnimationFrame(loop);
  }

  loop();

  const isTouchInteraction = 'ontouchstart' in window;
  const tap = isTouchInteraction ? 'touchstart' : 'mousedown';
  const tapEnd = isTouchInteraction ? 'touchend' : 'mouseup';
  const move = isTouchInteraction ? 'touchmove' : 'mousemove';

  const updateMousePosition = (e: Event) => {
    if ('touches' in e) { const te = e as TouchEvent; mouseX = te.touches?.[0].clientX; mouseY = te.touches?.[0].clientY; }
    else { const me = e as globalThis.MouseEvent; mouseX = me.clientX; mouseY = me.clientY; }
  };

  const tapHandler = (e: Event) => { updateMousePosition(e); autoAddParticle = true; };
  const disableAutoAddParticle = () => { autoAddParticle = false; };

  element.addEventListener(move, updateMousePosition, { passive: true });
  element.addEventListener(tap, tapHandler, { passive: true });
  element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
  element.addEventListener('mouseleave', disableAutoAddParticle, { passive: true });

  return () => {
    element.removeEventListener(move, updateMousePosition);
    element.removeEventListener(tap, tapHandler);
    element.removeEventListener(tapEnd, disableAutoAddParticle);
    element.removeEventListener('mouseleave', disableAutoAddParticle);
    const interval = setInterval(() => {
      if (animationFrame && particles.length === 0) {
        cancelAnimationFrame(animationFrame);
        clearInterval(interval);
        if (--instanceCounter === 0) container.remove();
      }
    }, 500);
  };
}

export interface CoolModeProps {
  children: ReactNode;
  options?: CoolParticleOptions;
}

export const CoolMode: React.FC<CoolModeProps> = ({ children, options }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    let cleanup: (() => void) | null = null;
    if (el) cleanup = applyParticleEffect(el, options);
    return () => { if (cleanup) cleanup(); };
  }, [options]);
  return <span ref={ref}>{children}</span>;
};

// ─── NoiseTexture ──────────────────────────────────────────────────

export interface NoiseTextureProps extends ComponentProps<'svg'> {
  className?: string;
  frequency?: number;
  octaves?: number;
  slope?: number;
  noiseOpacity?: number;
}

export function NoiseTexture({
  className,
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}: NoiseTextureProps) {
  const filterId = useId();

  return (
    <svg
      className={cn(
        'pointer-events-none absolute inset-0 z-0 size-full opacity-50 select-none dark:opacity-[0.75]',
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={octaves} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} opacity={noiseOpacity} />
    </svg>
  );
}

// ─── RippleButton ───────────────────────────────────────────────────

export interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, children, rippleColor = '#ffffff', duration = '600ms', onClick, ...props }, ref) => {
    const [buttonRipples, setButtonRipples] = useState<Array<{ x: number; y: number; size: number; key: number }>>([]);

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
      setButtonRipples((prev) => [...prev, { x, y, size, key: Date.now() }]);
    };

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null;
      if (buttonRipples.length > 0) {
        const last = buttonRipples[buttonRipples.length - 1];
        timeout = setTimeout(() => {
          setButtonRipples((prev) => prev.filter((r) => r.key !== last.key));
        }, parseInt(duration));
      }
      return () => { if (timeout) clearTimeout(timeout); };
    }, [buttonRipples, duration]);

    return (
      <button
        className={cn(
          'relative flex cursor-pointer items-center justify-center overflow-hidden border-2 px-4 py-2 text-center',
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className="absolute animate-rippling rounded-full opacity-30"
              key={ripple.key}
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
  }
);
RippleButton.displayName = 'RippleButton';

// ─── SpinningText ───────────────────────────────────────────────────

const BASE_TRANSITION: Transition = { repeat: Infinity, ease: 'linear' };
const BASE_ITEM_VARIANTS: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

export interface SpinningTextProps extends ComponentPropsWithoutRef<'div'> {
  children: string | string[];
  duration?: number;
  reverse?: boolean;
  radius?: number;
  transition?: Transition;
  variants?: { container?: Variants; item?: Variants };
}

export function SpinningText({
  children,
  duration = 10,
  reverse = false,
  radius = 5,
  transition,
  variants,
  className,
  style,
}: SpinningTextProps) {
  if (typeof children !== 'string' && !Array.isArray(children)) {
    throw new Error('children must be a string or an array of strings');
  }

  if (Array.isArray(children)) {
    if (!children.every((child) => typeof child === 'string')) throw new Error('all elements in children array must be strings');
    children = children.join('');
  }

  const letters = children.split('');
  letters.push(' ');

  const finalTransition: Transition = { ...BASE_TRANSITION, ...transition, duration: (transition as { duration?: number })?.duration ?? duration };
  const containerVariants: Variants = { visible: { rotate: reverse ? -360 : 360 }, ...variants?.container };
  const itemVariants: Variants = { ...BASE_ITEM_VARIANTS, ...variants?.item };

  return (
    <motion.div
      className={cn('relative', className)}
      style={style}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
    >
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${index}-${letter}`}
          variants={itemVariants}
          className="absolute top-1/2 left-1/2 inline-block"
          style={{
            '--index': index,
            '--total': letters.length,
            '--radius': radius,
            transform: `translate(-50%, -50%) rotate(calc(360deg / var(--total) * var(--index))) translateY(calc(var(--radius, 5) * -1ch))`,
            transformOrigin: 'center',
          } as React.CSSProperties}
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{children}</span>
    </motion.div>
  );
}

// ─── ScrollVelocity ─────────────────────────────────────────────────

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ScrollVelocityContext = React.createContext<MotionValue<number> | null>(null);

export interface ScrollVelocityContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ScrollVelocityContainer({ children, className, ...props }: ScrollVelocityContainerProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });

  return (
    <ScrollVelocityContext.Provider value={velocityFactor}>
      <div className={cn('relative w-full', className)} {...props}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  );
}

export interface ScrollVelocityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  scrollReactivity?: boolean;
}

export function ScrollVelocityRow(props: ScrollVelocityRowProps) {
  const sharedVelocityFactor = useContext(ScrollVelocityContext);
  if (sharedVelocityFactor) {
    return <ScrollVelocityRowImpl {...props} velocityFactor={sharedVelocityFactor} />;
  }
  return <ScrollVelocityRowLocal {...props} />;
}

interface ScrollVelocityRowImplProps extends ScrollVelocityRowProps {
  velocityFactor: MotionValue<number>;
}

function ScrollVelocityRowImpl({
  children, baseVelocity = 5, direction = 1, className, velocityFactor, scrollReactivity = true, ...props
}: ScrollVelocityRowImplProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [numCopies, setNumCopies] = useState(1);
  const baseX = useMotionValue(0);
  const baseDirectionRef = useRef<number>(direction >= 0 ? 1 : -1);
  const currentDirectionRef = useRef<number>(direction >= 0 ? 1 : -1);
  const unitWidth = useMotionValue(0);
  const isInViewRef = useRef(true);
  const isPageVisibleRef = useRef(true);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const block = blockRef.current;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let mq: MediaQueryList | null = null;
    const handleVisibility = () => { isPageVisibleRef.current = document.visibilityState === 'visible'; };
    const handlePRM = () => { if (mq) prefersReducedMotionRef.current = mq.matches; };

    if (container && block) {
      const updateSizes = () => {
        const cw = container.offsetWidth || 0;
        const bw = block.scrollWidth || 0;
        unitWidth.set(bw);
        setNumCopies((prev) => {
          const next = bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 1;
          return prev === next ? prev : next;
        });
      };
      updateSizes();
      ro = new ResizeObserver(updateSizes);
      ro.observe(container);
      ro.observe(block);
      io = new IntersectionObserver(([entry]) => { isInViewRef.current = entry.isIntersecting; });
      io.observe(container);
      document.addEventListener('visibilitychange', handleVisibility, { passive: true });
      handleVisibility();
      mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', handlePRM);
      handlePRM();
    }
    return () => {
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      if (mq) mq.removeEventListener('change', handlePRM);
    };
  }, [children, unitWidth]);

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const w = Number(bw) || 1;
    const offset = Number(v) || 0;
    return `${-wrap(0, w, offset)}px`;
  });

  useAnimationFrame((_, delta) => {
    if (!isInViewRef.current || !isPageVisibleRef.current) return;
    const dt = delta / 1000;
    const vf = scrollReactivity ? velocityFactor.get() : 0;
    const absVf = Math.min(5, Math.abs(vf));
    const speedMultiplier = prefersReducedMotionRef.current ? 1 : 1 + absVf;
    if (absVf > 0.1) currentDirectionRef.current = baseDirectionRef.current * (vf >= 0 ? 1 : -1);
    const bw = unitWidth.get() || 0;
    if (bw <= 0) return;
    const pixelsPerSecond = (bw * baseVelocity) / 100;
    baseX.set(baseX.get() + currentDirectionRef.current * pixelsPerSecond * speedMultiplier * dt);
  });

  return (
    <div ref={containerRef} className={cn('w-full overflow-hidden whitespace-nowrap', className)} {...props}>
      <motion.div className="inline-flex transform-gpu items-center will-change-transform select-none" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <div key={i} ref={i === 0 ? blockRef : null} aria-hidden={i !== 0} className="inline-flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ScrollVelocityRowLocal(props: ScrollVelocityRowProps) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, { damping: 50, stiffness: 400 });
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });
  return <ScrollVelocityRowImpl {...props} velocityFactor={localVelocityFactor} />;
}

// ─── NumberTicker ───────────────────────────────────────────────────

export interface NumberTickerProps extends ComponentPropsWithoutRef<'span'> {
  value: number;
  startValue?: number;
  direction?: 'up' | 'down';
  delay?: number;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : startValue);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isInView) {
      timer = setTimeout(() => { motionValue.set(direction === 'down' ? startValue : value); }, delay * 1000);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [motionValue, isInView, delay, value, direction, startValue]);

  useEffect(() =>
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
      }
    }),
  [springValue, decimalPlaces]);

  return (
    <span
      ref={ref}
      className={cn('inline-block tracking-wider text-black tabular-nums dark:text-white', className)}
      {...props}
    >
      {startValue}
    </span>
  );
}

// ─── BlurFade ───────────────────────────────────────────────────────

type MarginType = UseInViewOptions['margin'];

const getFilter = (v: Variants[string]) => (typeof v === 'function' ? undefined : v.filter);

export interface BlurFadeProps extends MotionProps {
  children: ReactNode;
  className?: string;
  variant?: { hidden: { y: number }; visible: { y: number } };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = 'down',
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']: direction === 'right' || direction === 'down' ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
  };
  const combinedVariants = variant ?? defaultVariants;
  const hiddenFilter = getFilter(combinedVariants.hidden);
  const visibleFilter = getFilter(combinedVariants.visible);
  const shouldTransitionFilter = hiddenFilter != null && visibleFilter != null && hiddenFilter !== visibleFilter;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: 'easeOut',
          ...(shouldTransitionFilter ? { filter: { duration } } : {}),
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── AnimatedList ───────────────────────────────────────────────────

export function AnimatedListItem({ children }: { children: ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null;
      if (index < childrenArray.length - 1) {
        timeout = setTimeout(() => setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length), delay);
      }
      return () => { if (timeout) clearTimeout(timeout); };
    }, [index, delay, childrenArray.length]);

    const itemsToShow = useMemo(() => childrenArray.slice(0, index + 1).reverse(), [index, childrenArray]);

    return (
      <div className={cn('flex flex-col items-center gap-4', className)} {...props}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>{item}</AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);
AnimatedList.displayName = 'AnimatedList';

// ─── SkewButton (styled-components) ─────────────────────────────────

const SkewButtonWrapper = styled.div`
  .cta {
    display: flex;
    padding: 11px 33px;
    text-decoration: none;
    font-size: 25px;
    color: white;
    background: #6225e6;
    transition: 1s;
    box-shadow: 6px 6px 0 black;
    transform: skewX(-15deg);
    border: none;
    cursor: pointer;
  }
  .cta:focus { outline: none; }
  .cta:hover { transition: 0.5s; box-shadow: 10px 10px 0 #fbc638; }
  .cta .second { transition: 0.5s; margin-right: 0px; }
  .cta:hover .second { transition: 0.5s; margin-right: 45px; }
  .span { transform: skewX(15deg); }
  .second { width: 20px; margin-left: 30px; position: relative; top: 12%; }
  .one { transition: 0.4s; transform: translateX(-60%); }
  .two { transition: 0.5s; transform: translateX(-30%); }
  .cta:hover .three { animation: color_anim 1s infinite 0.2s; }
  .cta:hover .one { transform: translateX(0%); animation: color_anim 1s infinite 0.6s; }
  .cta:hover .two { transform: translateX(0%); animation: color_anim 1s infinite 0.4s; }
  @keyframes color_anim {
    0% { fill: white; }
    50% { fill: #fbc638; }
    100% { fill: white; }
  }
`;

export function SkewButton() {
  return (
    <SkewButtonWrapper>
      <button className="cta">
        <span className="span">NEXT</span>
        <span className="second">
          <svg width="50px" height="20px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="arrow" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
              <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF" />
              <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF" />
              <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF" />
            </g>
          </svg>
        </span>
      </button>
    </SkewButtonWrapper>
  );
}

// ─── GooeyCheckbox (styled-components) ──────────────────────────────

const GooeyCheckboxWrapper = styled.div`
  .checkbox-wrapper-12 { position: relative; }
  .checkbox-wrapper-12 > svg { position: absolute; top: -130%; left: -170%; width: 110px; pointer-events: none; }
  .checkbox-wrapper-12 * { box-sizing: border-box; }
  .checkbox-wrapper-12 input[type="checkbox"] {
    -webkit-appearance: none; -moz-appearance: none; appearance: none;
    -webkit-tap-highlight-color: transparent; cursor: pointer; margin: 0;
  }
  .checkbox-wrapper-12 input[type="checkbox"]:focus { outline: 0; }
  .checkbox-wrapper-12 .cbx { width: 24px; height: 24px; top: calc(100px - 12px); left: calc(100px - 12px); }
  .checkbox-wrapper-12 .cbx input {
    position: absolute; top: 0; left: 0; width: 24px; height: 24px;
    border: 2px solid #bfbfc0; border-radius: 50%;
  }
  .checkbox-wrapper-12 .cbx label {
    width: 24px; height: 24px; background: none; border-radius: 50%;
    position: absolute; top: 0; left: 0; transform: translate3d(0,0,0); pointer-events: none;
  }
  .checkbox-wrapper-12 .cbx svg {
    position: absolute; top: 5px; left: 4px; z-index: 1; pointer-events: none;
  }
  .checkbox-wrapper-12 .cbx svg path {
    stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;
    stroke-dasharray: 19; stroke-dashoffset: 19;
    transition: stroke-dashoffset 0.3s ease; transition-delay: 0.2s;
  }
  .checkbox-wrapper-12 .cbx input:checked + label { animation: splash-12 0.6s ease forwards; }
  .checkbox-wrapper-12 .cbx input:checked + label + svg path { stroke-dashoffset: 0; }
  @keyframes splash-12 {
    40% {
      background: #866efb;
      box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb,
                  0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
    }
    100% {
      background: #866efb;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent,
                  0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
`;

export function GooeyCheckbox() {
  return (
    <GooeyCheckboxWrapper>
      <div className="checkbox-wrapper-12">
        <div className="cbx">
          <input defaultChecked type="checkbox" id="cbx-12" />
          <label htmlFor="cbx-12" />
          <svg fill="none" viewBox="0 0 15 14" height={14} width={15}>
            <path d="M2 8.36364L6.23077 12L13 2" />
          </svg>
        </div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo-12">
              <feGaussianBlur result="blur" stdDeviation={4} in="SourceGraphic" />
              <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur" />
              <feBlend in2="goo-12" in="SourceGraphic" />
            </filter>
          </defs>
        </svg>
      </div>
    </GooeyCheckboxWrapper>
  );
}

// ─── ExpandInput (styled-components) ────────────────────────────────

const ExpandInputWrapper = styled.div`
  .input-wrapper { display: flex; align-items: center; justify-content: center; gap: 15px; position: relative; }
  .input {
    border-style: none; height: 50px; width: 50px; padding: 10px; outline: none; border-radius: 50%;
    transition: .5s ease-in-out; background-color: #7e4fd4; box-shadow: 0px 0px 3px #f3f3f3;
    padding-right: 40px; color: #fff;
  }
  .input::placeholder, .input { font-family: 'Trebuchet MS','Lucida Sans Unicode','Lucida Grande','Lucida Sans',Arial,sans-serif; font-size: 17px; }
  .input::placeholder { color: #8f8f8f; }
  .icon {
    display: flex; align-items: center; justify-content: center; position: absolute; right: 0px;
    cursor: pointer; width: 50px; height: 50px; outline: none; border-style: none; border-radius: 50%;
    pointer-events: painted; background-color: transparent; transition: .2s linear;
  }
  .icon svg { transition: .3s ease-in-out; }
  .input:focus ~ .icon svg { stroke: #1a1a1a; }
  .icon:focus ~ .input, .input:focus {
    box-shadow: none; width: 250px; border-radius: 0px;
    background-color: transparent; border-bottom: 3px solid #7e4fd4;
    color: #1a1a1a;
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
  }
`;

export function ExpandInput() {
  return (
    <ExpandInputWrapper>
      <div className="input-wrapper">
        <button className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#ffffff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#ffffff" d="M22 22L20 20" />
          </svg>
        </button>
        <input placeholder="search.." className="input" name="text" type="text" />
      </div>
    </ExpandInputWrapper>
  );
}

// ─── BookLoader (styled-components) ─────────────────────────────────

const BookLoaderWrapper = styled.div`
  .book, .book__pg-shadow, .book__pg { animation: cover 5s ease-in-out infinite; }
  .book {
    background-color: hsl(268, 90%, 65%); border-radius: 0.25em;
    box-shadow: 0 0.25em 0.5em hsla(0,0%,0%,0.3), 0 0 0 0.25em hsl(278,100%,57%) inset;
    padding: 0.25em; perspective: 37.5em; position: relative; width: 8em; height: 6em;
    transform: translate3d(0,0,0); transform-style: preserve-3d;
  }
  .book__pg-shadow, .book__pg { position: absolute; left: 0.25em; width: calc(50% - 0.25em); }
  .book__pg-shadow {
    animation-name: shadow;
    background-image: linear-gradient(-45deg, hsla(0,0%,0%,0) 50%, hsla(0,0%,0%,0.3) 50%);
    filter: blur(0.25em); top: calc(100% - 0.25em); height: 3.75em;
    transform: scaleY(0); transform-origin: 100% 0%;
  }
  .book__pg {
    animation-name: pg1; background-color: hsl(223,10%,100%);
    background-image: linear-gradient(90deg, hsla(223,10%,90%,0) 87.5%, hsl(223,10%,90%));
    height: calc(100% - 0.5em); transform-origin: 100% 50%;
  }
  .book__pg--2, .book__pg--3, .book__pg--4 {
    background-image: repeating-linear-gradient(hsl(223,10%,10%) 0 0.125em, hsla(223,10%,10%,0) 0.125em 0.5em),
      linear-gradient(90deg, hsla(223,10%,90%,0) 87.5%, hsl(223,10%,90%));
    background-repeat: no-repeat; background-position: center;
    background-size: 2.5em 4.125em, 100% 100%;
  }
  .book__pg--2 { animation-name: pg2; }
  .book__pg--3 { animation-name: pg3; }
  .book__pg--4 { animation-name: pg4; }
  .book__pg--5 { animation-name: pg5; }

  @keyframes cover {
    from,5%,45%,55%,95%,to { animation-timing-function: ease-out; background-color: hsl(278,84%,67%); }
    10%,40%,60%,90% { animation-timing-function: ease-in; background-color: hsl(271,90%,45%); }
  }
  @keyframes shadow {
    from,10.01%,20.01%,30.01%,40.01% { animation-timing-function: ease-in; transform: translate3d(0,0,1px) scaleY(0) rotateY(0); }
    5%,15%,25%,35%,45%,55%,65%,75%,85%,95% { animation-timing-function: ease-out; transform: translate3d(0,0,1px) scaleY(0.2) rotateY(90deg); }
    10%,20%,30%,40%,50%,to { animation-timing-function: ease-out; transform: translate3d(0,0,1px) scaleY(0) rotateY(180deg); }
    50.01%,60.01%,70.01%,80.01%,90.01% { animation-timing-function: ease-in; transform: translate3d(0,0,1px) scaleY(0) rotateY(180deg); }
    60%,70%,80%,90%,to { animation-timing-function: ease-out; transform: translate3d(0,0,1px) scaleY(0) rotateY(0); }
  }
  @keyframes pg1 {
    from,to { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(0.4deg); }
    10%,15% { animation-timing-function: ease-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(180deg); }
    20%,80% { animation-timing-function: ease-in; background-color: hsl(223,10%,45%); transform: translate3d(0,0,1px) rotateY(180deg); }
    85%,90% { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(180deg); }
  }
  @keyframes pg2 {
    from,to { animation-timing-function: ease-in; background-color: hsl(223,10%,45%); transform: translate3d(0,0,1px) rotateY(0.3deg); }
    5%,10% { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(0.3deg); }
    20%,25% { animation-timing-function: ease-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(179.9deg); }
    30%,70% { animation-timing-function: ease-in; background-color: hsl(223,10%,45%); transform: translate3d(0,0,1px) rotateY(179.9deg); }
    75%,80% { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(179.9deg); }
    90%,95% { animation-timing-function: ease-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(0.3deg); }
  }
  @keyframes pg3 {
    from,10%,90%,to { animation-timing-function: ease-in; background-color: hsl(223,10%,45%); transform: translate3d(0,0,1px) rotateY(0.2deg); }
    15%,20% { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(0.2deg); }
    30%,35% { animation-timing-function: ease-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(179.8deg); }
    40%,60% { animation-timing-function: ease-in; background-color: hsl(223,10%,45%); transform: translate3d(0,0,1px) rotateY(179.8deg); }
    65%,70% { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(179.8deg); }
    80%,85% { animation-timing-function: ease-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(0.2deg); }
  }
  @keyframes pg4 {
    from,20%,80%,to { animation-timing-function: ease-in; background-color: hsl(223,10%,45%); transform: translate3d(0,0,1px) rotateY(0.1deg); }
    25%,30% { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(0.1deg); }
    40%,45% { animation-timing-function: ease-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(179.7deg); }
    50% { animation-timing-function: ease-in; background-color: hsl(223,10%,45%); transform: translate3d(0,0,1px) rotateY(179.7deg); }
    55%,60% { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(179.7deg); }
    70%,75% { animation-timing-function: ease-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(0.1deg); }
  }
  @keyframes pg5 {
    from,30%,70%,to { animation-timing-function: ease-in; background-color: hsl(223,10%,45%); transform: translate3d(0,0,1px) rotateY(0); }
    35%,40% { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(0deg); }
    50% { animation-timing-function: ease-in-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(179.6deg); }
    60%,65% { animation-timing-function: ease-out; background-color: hsl(223,10%,100%); transform: translate3d(0,0,1px) rotateY(0); }
  }
`;

export function BookLoader() {
  return (
    <BookLoaderWrapper>
      <div className="book">
        <div className="book__pg-shadow" />
        <div className="book__pg" />
        <div className="book__pg book__pg--2" />
        <div className="book__pg book__pg--3" />
        <div className="book__pg book__pg--4" />
        <div className="book__pg book__pg--5" />
      </div>
    </BookLoaderWrapper>
  );
}

// ─── IconAnimatedGridPattern ────────────────────────────────────────
// Each icon/dark-square independently: fade in → hold → fade out → reposition → repeat.
// Staggered delays mean ~4-5 elements are visible at any given moment.
// Icons and dark squares never overlap (shared occupied-cells tracker).

import {
  ReactDark, Nextjs, Vue, Angular, Svelte, TypeScript, JavaScript, Python,
  RustDark, GoLight, Nodejs, Docker, Kubernetes, GitHubDark, GitLab,
  PostgreSQL, Redis, GraphQL, Figma, TailwindCSS, Vite, PrismaDark,
  Supabase, Firebase, VercelDark, Netlify, Cloudflare, Nginx, Linux,
  Ubuntu, Terraform,   Slack, Discord, Notion, Sentry, Grafana,
  DenoLight, Bun, PnpmDark, Yarn, Swift, Kotlin, Flutter, Android,
  AppleLight, Google, Microsoft, Meta, Netflix, OpenAIDark, Stripe,
  Auth0, Datadog, Expo, Shopify, Django, FastAPI, NestJS, Laravel,
  Spring, Storybook, Cypress, Jest, DigitalOcean, GoogleCloud,
  MicrosoftAzure,   Git, ApacheKafkaDark, WordPress,
} from '@ridemountainpig/svgl-react';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const ICON_LIST: Array<{ Component: IconComponent; label: string }> = [
  { Component: ReactDark, label: 'React' },
  { Component: Nextjs, label: 'Next.js' },
  { Component: Vue, label: 'Vue.js' },
  { Component: Angular, label: 'Angular' },
  { Component: Svelte, label: 'Svelte' },
  { Component: TypeScript, label: 'TypeScript' },
  { Component: JavaScript, label: 'JavaScript' },
  { Component: Python, label: 'Python' },
  { Component: RustDark, label: 'Rust' },
  { Component: GoLight, label: 'Go' },
  { Component: Nodejs, label: 'Node.js' },
  { Component: Docker, label: 'Docker' },
  { Component: Kubernetes, label: 'Kubernetes' },
  { Component: GitHubDark, label: 'GitHub' },
  { Component: GitLab, label: 'GitLab' },
  { Component: PostgreSQL, label: 'PostgreSQL' },
  { Component: Redis, label: 'Redis' },
  { Component: GraphQL, label: 'GraphQL' },
  { Component: Figma, label: 'Figma' },
  { Component: TailwindCSS, label: 'Tailwind' },
  { Component: Vite, label: 'Vite' },
  { Component: PrismaDark, label: 'Prisma' },
  { Component: Supabase, label: 'Supabase' },
  { Component: Firebase, label: 'Firebase' },
  { Component: VercelDark, label: 'Vercel' },
  { Component: Netlify, label: 'Netlify' },
  { Component: Cloudflare, label: 'Cloudflare' },
  { Component: Nginx, label: 'Nginx' },
  { Component: Linux, label: 'Linux' },
  { Component: Ubuntu, label: 'Ubuntu' },
  { Component: Terraform, label: 'Terraform' },
  { Component: Slack, label: 'Slack' },
  { Component: Discord, label: 'Discord' },
  { Component: Notion, label: 'Notion' },
  { Component: Sentry, label: 'Sentry' },
  { Component: Grafana, label: 'Grafana' },
  { Component: DenoLight, label: 'Deno' },
  { Component: Bun, label: 'Bun' },
  { Component: PnpmDark, label: 'pnpm' },
  { Component: Yarn, label: 'Yarn' },
  { Component: Swift, label: 'Swift' },
  { Component: Kotlin, label: 'Kotlin' },
  { Component: Flutter, label: 'Flutter' },
  { Component: Android, label: 'Android' },
  { Component: AppleLight, label: 'Apple' },
  { Component: Google, label: 'Google' },
  { Component: Microsoft, label: 'Microsoft' },
  { Component: Meta, label: 'Meta' },
  { Component: Netflix, label: 'Netflix' },
  { Component: OpenAIDark, label: 'OpenAI' },
  { Component: Stripe, label: 'Stripe' },
  { Component: Auth0, label: 'Auth0' },
  { Component: Datadog, label: 'Datadog' },
  { Component: Expo, label: 'Expo' },
  { Component: Shopify, label: 'Shopify' },
  { Component: Django, label: 'Django' },
  { Component: FastAPI, label: 'FastAPI' },
  { Component: NestJS, label: 'NestJS' },
  { Component: Laravel, label: 'Laravel' },
  { Component: Spring, label: 'Spring' },
  { Component: Storybook, label: 'Storybook' },
  { Component: Cypress, label: 'Cypress' },
  { Component: Jest, label: 'Jest' },
  { Component: DigitalOcean, label: 'DigitalOcean' },
  { Component: GoogleCloud, label: 'Google Cloud' },
  { Component: MicrosoftAzure, label: 'Azure' },
  { Component: Git, label: 'Git' },
  { Component: ApacheKafkaDark, label: 'Kafka' },
  { Component: WordPress, label: 'WordPress' },
];

export interface IconAnimatedGridPatternProps {
  className?: string;
  width?: number;
  height?: number;
  numIcons?: number;
  maxOpacity?: number;
  iconSize?: number;
  duration?: number;
  repeatDelay?: number;
}

export function IconAnimatedGridPattern({
  className,
  width = 80,
  height = 80,
  numIcons = 16,
  maxOpacity = 0.2,
  iconSize = 46,
  duration = 4,
  repeatDelay = 1,
}: IconAnimatedGridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [bgSquares, setBgSquares] = useState<Array<{ id: number; pos: [number, number]; iteration: number; colorVariant: 'purple' | 'yellow' }>>([]);
  const [iconSquares, setIconSquares] = useState<Array<{ id: number; pos: [number, number]; iconIdx: number; iteration: number }>>([]);
  const occRef = useRef<Set<string>>(new Set());

  // ── Glassy color presets (purple accent & yellow accent) ─────────
  const GLASS_COLORS = {
    purple: {
      background: 'linear-gradient(135deg, rgba(98,37,230,0.28) 0%, rgba(98,37,230,0.12) 40%, rgba(130,70,255,0.22) 70%, rgba(98,37,230,0.30) 100%)',
      boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.08), 0 2px 8px rgba(98,37,230,0.15)',
    },
    yellow: {
      background: 'linear-gradient(135deg, rgba(251,198,56,0.30) 0%, rgba(251,198,56,0.12) 40%, rgba(255,215,80,0.22) 70%, rgba(251,198,56,0.32) 100%)',
      boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.06), 0 2px 8px rgba(251,198,56,0.15)',
    },
  } as const;

  type GlassVariant = keyof typeof GLASS_COLORS;
  const pickColor = (): GlassVariant => 'yellow';

  // ── Slow diagonal drift ─────────────────────────────────────────
  const diagOffset = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    const speed = 0.0015 // px per ms ≈ 3 px/s — very slow diagonal drift
    diagOffset.set(diagOffset.get() + delta * speed);
  });

  const [hoveredCell, setHoveredCell] = useState<{ col: number; row: number } | null>(null);
  const hoveredCellRef = useRef<{ col: number; row: number } | null>(null);

  // ── Trailing fade-out effect ────────────────────────────────────
  const [trailCells, setTrailCells] = useState<Array<{ col: number; row: number; id: number }>>([]);
  const trailIdRef = useRef(0);
  const addTrail = useCallback((col: number, row: number) => {
    const id = trailIdRef.current++;
    setTrailCells((prev) => [...prev, { col, row, id }]);
  }, []);
  const removeTrail = useCallback((id: number) => {
    setTrailCells((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const cols = dims.w > 0 ? Math.ceil(dims.w / width) + 2 : 0;
  const rows = dims.h > 0 ? Math.ceil(dims.h / height) + 2 : 0;

  const rand = (max: number) => Math.floor(Math.random() * max);

  const pickPos = useCallback((): [number, number] => {
    let attempts = 0;
    let cx: number, cy: number, key: string;
    do {
      cx = rand(cols);
      cy = rand(rows);
      key = `${cx},${cy}`;
      attempts++;
    } while (occRef.current.has(key) && attempts < 300);
    occRef.current.add(key);
    return [cx, cy];
  }, [cols, rows]);

  // Generate initial positions
  useEffect(() => {
    if (cols === 0 || rows === 0) return;
    occRef.current.clear();
    const bg: Array<{ id: number; pos: [number, number]; iteration: number; colorVariant: 'purple' | 'yellow' }> = [];
    const icons: Array<{ id: number; pos: [number, number]; iconIdx: number; iteration: number }> = [];

    for (let i = 0; i < 60; i++) bg.push({ id: i, pos: pickPos(), iteration: 0, colorVariant: pickColor() });
    for (let i = 0; i < numIcons; i++) icons.push({ id: i, pos: pickPos(), iconIdx: i % ICON_LIST.length, iteration: 0 });

    setBgSquares(bg);
    setIconSquares(icons);
  }, [cols, rows, numIcons, pickPos]);

  // Reposition a single glass square when its animation completes
  const repositionBg = useCallback((id: number) => {
    setBgSquares((prev) => {
      const next = prev.slice();
      const sq = next[id];
      if (!sq) return prev;
      occRef.current.delete(`${sq.pos[0]},${sq.pos[1]}`);
      next[id] = { ...sq, pos: pickPos(), iteration: sq.iteration + 1, colorVariant: 'yellow' };
      return next;
    });
  }, [pickPos]);

  // Reposition a single icon when its animation completes
  const repositionIcon = useCallback((id: number) => {
    setIconSquares((prev) => {
      const next = prev.slice();
      const ic = next[id];
      if (!ic) return prev;
      occRef.current.delete(`${ic.pos[0]},${ic.pos[1]}`);
      next[id] = { ...ic, pos: pickPos(), iconIdx: (ic.iconIdx + 1) % ICON_LIST.length, iteration: ic.iteration + 1 };
      return next;
    });
  }, [pickPos]);

  // Observe container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setDims((d) =>
          d.w === e.contentRect.width && d.h === e.contentRect.height
            ? d
            : { w: e.contentRect.width, h: e.contentRect.height }
        );
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={cn('pointer-events-auto absolute inset-0 h-full w-full overflow-hidden', className)}
      style={{
        x: diagOffset,
        y: diagOffset,
        rotate: -2,
        scale: 1.1,
        transformOrigin: 'center',
      }}
      onMouseMove={(e) => {
        if (!containerRef.current || dims.w === 0) return;
        const rect = containerRef.current.getBoundingClientRect();
        const preLeft = rect.left + (rect.width - dims.w) / 2;
        const preTop = rect.top + (rect.height - dims.h) / 2;
        const col = Math.floor((e.clientX - preLeft - 1) / width);
        const row = Math.floor((e.clientY - preTop - 1) / height);
        if (col >= 0 && row >= 0 && col < cols && row < rows) {
          const prev = hoveredCellRef.current;
          if (prev && (prev.col !== col || prev.row !== row)) {
            addTrail(prev.col, prev.row);
          }
          hoveredCellRef.current = { col, row };
          setHoveredCell({ col, row });
        }
      }}
      onMouseLeave={() => {
        const prev = hoveredCellRef.current;
        if (prev) addTrail(prev.col, prev.row);
        hoveredCellRef.current = null;
        setHoveredCell(null);
      }}
    >
      {bgSquares.map((sq, idx) => {
        const isHovered = hoveredCell !== null && hoveredCell.col === sq.pos[0] && hoveredCell.row === sq.pos[1];
        const glass = GLASS_COLORS[isHovered ? 'purple' : sq.colorVariant];
        return (
          <motion.div
            key={`bg-${sq.id}-${sq.iteration}`}
            className="absolute"
            style={{
              left: sq.pos[0] * width + 1,
              top: sq.pos[1] * height + 1,
              width: width - 1,
              height: height - 1,
              background: glass.background,
              boxShadow: glass.boxShadow,
            } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration,
              ease: [0.4, 0, 0.2, 1],
              repeat: 1,
              delay: idx * 0.1,
              repeatType: 'reverse',
              repeatDelay,
            }}
            onAnimationComplete={() => repositionBg(sq.id)}
          />
        );
      })}

      {trailCells.map((tc) => (
        <motion.div
          key={`trail-${tc.id}`}
          className="absolute"
          style={{
            left: tc.col * width + 1,
            top: tc.row * height + 1,
            width: width - 1,
            height: height - 1,
            background: GLASS_COLORS.purple.background,
            boxShadow: GLASS_COLORS.purple.boxShadow,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onAnimationComplete={() => removeTrail(tc.id)}
        />
      ))}

      {hoveredCell && !bgSquares.some(sq => sq.pos[0] === hoveredCell.col && sq.pos[1] === hoveredCell.row) && (
        <div
          className="absolute"
          style={{
            left: hoveredCell.col * width + 1,
            top: hoveredCell.row * height + 1,
            width: width - 1,
            height: height - 1,
            background: GLASS_COLORS.purple.background,
            boxShadow: GLASS_COLORS.purple.boxShadow,
          }}
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.85) 75%, rgba(255,255,255,1) 100%)',
        }}
      />

      {iconSquares.map((ic, idx) => {
        const { Component, label } = ICON_LIST[ic.iconIdx % ICON_LIST.length];
        return (
          <motion.div
            key={`icon-${ic.id}-${ic.iteration}`}
            className="absolute flex items-center justify-center"
            style={{
              left: ic.pos[0] * width + (width - iconSize) / 2,
              top: ic.pos[1] * height + (height - iconSize) / 2,
              width: iconSize,
              height: iconSize,
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration,
              ease: [0.16, 1, 0.3, 1],
              repeat: 1,
              delay: idx * 0.12,
              repeatType: 'reverse',
              repeatDelay,
            }}
            onAnimationComplete={() => repositionIcon(ic.id)}
            title={label}
          >
            <Component width={iconSize} height={iconSize} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── PixelImage ─────────────────────────────────────────────────────

type PixelGrid = { rows: number; cols: number };

const DEFAULT_PIXEL_GRIDS: Record<string, PixelGrid> = {
  '6x4': { rows: 4, cols: 6 },
  '8x8': { rows: 8, cols: 8 },
  '8x3': { rows: 3, cols: 8 },
  '4x6': { rows: 6, cols: 4 },
  '3x8': { rows: 8, cols: 3 },
};

type PredefinedPixelGridKey = keyof typeof DEFAULT_PIXEL_GRIDS;

export interface PixelImageProps {
  src: string;
  grid?: PredefinedPixelGridKey;
  customGrid?: PixelGrid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number;
  maxAnimationDelay?: number;
  colorRevealDelay?: number;
  className?: string;
}

export const PixelImage = ({
  src,
  grid = '6x4',
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (g?: PixelGrid) => {
      if (!g) return false;
      return (
        Number.isInteger(g.rows) &&
        Number.isInteger(g.cols) &&
        g.rows >= MIN_GRID &&
        g.cols >= MIN_GRID &&
        g.rows <= MAX_GRID &&
        g.cols <= MAX_GRID
      );
    };
    return isValidGrid(customGrid) ? customGrid! : DEFAULT_PIXEL_GRIDS[grid];
  }, [customGrid, grid]);

  useEffect(() => {
    setIsVisible(true);
    const colorTimeout = setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);
    return () => clearTimeout(colorTimeout);
  }, [colorRevealDelay]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`;
      const delay = Math.random() * maxAnimationDelay;
      return { clipPath, delay };
    });
  }, [rows, cols, maxAnimationDelay]);

  return (
    <div className={cn('relative h-72 w-72 select-none md:h-96 md:w-96', className)}>
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 transition-all ease-out',
            isVisible ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt={`Pixel image piece ${index + 1}`}
            className={cn(
              'z-1 rounded-[2.5rem] object-cover',
              grayscaleAnimation && (showColor ? 'grayscale-0' : 'grayscale'),
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : 'none',
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};

// ─── Highlighter ────────────────────────────────────────────────────

import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';

type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

export interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  className?: string;
}

export function Highlighter({
  children,
  action = 'highlight',
  color = '#ffd1dc',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  const isInViewResult = useInView(elementRef, {
    once: true,
    margin: '-10%',
  });

  const shouldShow = !isView || isInViewResult;

  useLayoutEffect(() => {
    const element = elementRef.current;
    let annotation: RoughAnnotation | null = null;
    let resizeObserver: ResizeObserver | null = null;

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      };

      const currentAnnotation = annotate(element, annotationConfig);
      annotation = currentAnnotation;
      currentAnnotation.show();

      resizeObserver = new ResizeObserver(() => {
        currentAnnotation.hide();
        currentAnnotation.show();
      });

      resizeObserver.observe(element);
      resizeObserver.observe(document.body);
    }

    return () => {
      annotation?.remove();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span ref={elementRef} className={cn('relative inline-block bg-transparent', className)}>
      {children}
    </span>
  );
}

// ─── WordRotate ─────────────────────────────────────────────────────

export interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          className={cn(className)}
          {...motionProps}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
