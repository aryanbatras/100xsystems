/**
 * ## Animation Components
 *
 * Decorative animation effects — KineticText, CoolMode, NoiseTexture,
 * InteractiveGridPattern, AnimatedGridPattern, RippleButton, SpinningText,
 * ScrollVelocity, NumberTicker, BlurFade, AnimatedList.
 *
 * @packageDocumentation
 */

'use client';

import React, {
  useContext,
  useEffect,
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

// ─── InteractiveGridPattern ─────────────────────────────────────────

export interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn('absolute inset-0 h-full w-full border border-gray-400/30', className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              'stroke-gray-400/30 transition-all duration-100 ease-in-out not-[&:hover]:duration-1000',
              hoveredSquare === index ? 'fill-gray-300/30' : 'fill-transparent',
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}

// ─── AnimatedGridPattern ────────────────────────────────────────────

type Square = { id: number; pos: [number, number]; iteration: number };

export interface AnimatedGridPatternProps extends ComponentPropsWithoutRef<'svg'> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Square[]>([]);

  const getPos = useCallback((): [number, number] => [
    Math.floor((Math.random() * dimensions.width) / width),
    Math.floor((Math.random() * dimensions.height) / height),
  ], [dimensions, width, height]);

  const generateSquares = useCallback((count: number) =>
    Array.from({ length: count }, (_, i) => ({ id: i, pos: getPos(), iteration: 0 })), [getPos]);

  const updateSquarePosition = useCallback((squareId: number) => {
    setSquares((currentSquares) => {
      const current = currentSquares[squareId];
      if (!current || current.id !== squareId) return currentSquares;
      const next = currentSquares.slice();
      next[squareId] = { ...current, pos: getPos(), iteration: current.iteration + 1 };
      return next;
    });
  }, [getPos]);

  useEffect(() => {
    if (dimensions.width && dimensions.height) setSquares(generateSquares(numSquares));
  }, [dimensions, generateSquares, numSquares]);

  useEffect(() => {
    const el = containerRef.current;
    let ro: ResizeObserver | null = null;
    if (el) {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDimensions((d) =>
            d.width === entry.contentRect.width && d.height === entry.contentRect.height
              ? d : { width: entry.contentRect.width, height: entry.contentRect.height }
          );
        }
      });
      ro.observe(el);
    }
    return () => { if (ro) ro.disconnect(); };
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30', className)}
      {...props}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [sx, sy], id: sqId, iteration }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{ duration, repeat: 1, delay: index * 0.1, repeatType: 'reverse', repeatDelay }}
            onAnimationComplete={() => updateSquarePosition(sqId)}
            key={`${sqId}-${iteration}`}
            width={width - 1}
            height={height - 1}
            x={sx * width + 1}
            y={sy * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
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

// ─── ServerLoader (styled-components) ───────────────────────────────

const ServerLoaderWrapper = styled.div`
  #svg-global { zoom: 1.2; overflow: visible; }
  @keyframes fade-particles { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(-40px); opacity: 0; } }
  #particles { animation: fade-particles 5s infinite alternate; }
  .particle { animation: floatUp linear infinite; }
  .p1 { animation-duration: 2.2s; animation-delay: 0s; }
  .p2 { animation-duration: 2.5s; animation-delay: 0.3s; }
  .p3 { animation-duration: 2s; animation-delay: 0.6s; }
  .p4 { animation-duration: 2.8s; animation-delay: 0.2s; }
  .p5 { animation-duration: 2.3s; animation-delay: 0.4s; }
  .p6 { animation-duration: 3s; animation-delay: 0.1s; }
  .p7 { animation-duration: 2.1s; animation-delay: 0.5s; }
  .p8 { animation-duration: 2.6s; animation-delay: 0.2s; }
  .p9 { animation-duration: 2.4s; animation-delay: 0.3s; }
  @keyframes bounce-lines { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  #line-v1, #line-v2, #node-server, #panel-rigth, #reflectores, #particles { animation: bounce-lines 3s ease-in-out infinite alternate; }
  #line-v2 { animation-delay: 0.2s; }
  #node-server, #panel-rigth, #reflectores, #particles { animation-delay: 0.4s; }
`;

export function ServerLoader() {
  return (
    <ServerLoaderWrapper>
      <svg id="svg-global" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 136" height={136} width={94}>
        <path stroke="#4B22B5" d="M87.3629 108.433L49.1073 85.3765C47.846 84.6163 45.8009 84.6163 44.5395 85.3765L6.28392 108.433C5.02255 109.194 5.02255 110.426 6.28392 111.187L44.5395 134.243C45.8009 135.004 47.846 135.004 49.1073 134.243L87.3629 111.187C88.6243 110.426 88.6243 109.194 87.3629 108.433Z" id="line-v1" />
        <path stroke="#5728CC" d="M91.0928 95.699L49.2899 70.5042C47.9116 69.6734 45.6769 69.6734 44.2986 70.5042L2.49568 95.699C1.11735 96.5298 1.11735 97.8767 2.49568 98.7074L44.2986 123.902C45.6769 124.733 47.9116 124.733 49.2899 123.902L91.0928 98.7074C92.4712 97.8767 92.4712 96.5298 91.0928 95.699Z" id="line-v2" />
        <g id="node-server">
          <path fill="url(#paint0_linear_204_217)" d="M2.48637 72.0059L43.8699 96.9428C45.742 98.0709 48.281 97.8084 50.9284 96.2133L91.4607 71.7833C92.1444 71.2621 92.4197 70.9139 92.5421 70.1257V86.1368C92.5421 86.9686 92.0025 87.9681 91.3123 88.3825C84.502 92.4724 51.6503 112.204 50.0363 113.215C48.2352 114.343 45.3534 114.343 43.5523 113.215C41.9261 112.197 8.55699 91.8662 2.08967 87.926C1.39197 87.5011 1.00946 86.5986 1.00946 85.4058V70.1257C1.11219 70.9289 1.49685 71.3298 2.48637 72.0059Z" />
          <path stroke="url(#paint2_linear_204_217)" fill="url(#paint1_linear_204_217)" d="M91.0928 68.7324L49.2899 43.5375C47.9116 42.7068 45.6769 42.7068 44.2986 43.5375L2.49568 68.7324C1.11735 69.5631 1.11735 70.91 2.49568 71.7407L44.2986 96.9356C45.6769 97.7663 47.9116 97.7663 49.2899 96.9356L91.0928 71.7407C92.4712 70.91 92.4712 69.5631 91.0928 68.7324Z" />
          <mask height={41} width={67} y={50} x={13} maskUnits="userSpaceOnUse" style={{maskType: 'luminance'}} id="mask0_204_217">
            <path fill="white" d="M78.3486 68.7324L49.0242 51.0584C47.6459 50.2276 45.4111 50.2276 44.0328 51.0584L14.7084 68.7324C13.3301 69.5631 13.3301 70.91 14.7084 71.7407L44.0328 89.4148C45.4111 90.2455 47.6459 90.2455 49.0242 89.4148L78.3486 71.7407C79.7269 70.91 79.727 69.5631 78.3486 68.7324Z" />
          </mask>
          <g mask="url(#mask0_204_217)">
            <path fill="#332C94" d="M78.3486 68.7324L49.0242 51.0584C47.6459 50.2276 45.4111 50.2276 44.0328 51.0584L14.7084 68.7324C13.3301 69.5631 13.3301 70.91 14.7084 71.7407L44.0328 89.4148C45.4111 90.2455 47.6459 90.2455 49.0242 89.4148L78.3486 71.7407C79.7269 70.91 79.727 69.5631 78.3486 68.7324Z" />
            <mask height={29} width={48} y={56} x={23} maskUnits="userSpaceOnUse" style={{maskType: 'luminance'}} id="mask1_204_217">
              <path fill="white" d="M68.9898 68.7324L49.0242 56.699C47.6459 55.8683 45.4111 55.8683 44.0328 56.699L24.0673 68.7324C22.6889 69.5631 22.6889 70.91 24.0673 71.7407L44.0328 83.7741C45.4111 84.6048 47.6459 84.6048 49.0242 83.7741L68.9898 71.7407C70.3681 70.91 70.3681 69.5631 68.9898 68.7324Z" />
            </mask>
            <g mask="url(#mask1_204_217)">
              <path fill="#5E5E5E" d="M68.9898 68.7324L49.0242 56.699C47.6459 55.8683 45.4111 55.8683 44.0328 56.699L24.0673 68.7324C22.6889 69.5631 22.6889 70.91 24.0673 71.7407L44.0328 83.7741C45.4111 84.6048 47.6459 84.6048 49.0242 83.7741L68.9898 71.7407C70.3681 70.91 70.3681 69.5631 68.9898 68.7324Z" />
              <path fill="#71B1C6" d="M70.1311 69.3884L48.42 56.303C47.3863 55.6799 45.7103 55.6799 44.6765 56.303L22.5275 69.6523C21.4938 70.2754 21.4938 71.2855 22.5275 71.9086L44.2386 84.994C45.2723 85.617 46.9484 85.617 47.9821 84.994L70.1311 71.6446C71.1648 71.0216 71.1648 70.0114 70.1311 69.3884Z" />
              <path fill="#80C0D4" d="M70.131 70.8923L48.4199 57.8069C47.3862 57.1839 45.7101 57.1839 44.6764 57.8069L22.5274 71.1562C21.4937 71.7793 21.4937 72.7894 22.5274 73.4125L44.2385 86.4979C45.2722 87.1209 46.9482 87.1209 47.982 86.4979L70.131 73.1486C71.1647 72.5255 71.1647 71.5153 70.131 70.8923Z" />
              <path fill="#89D3EB" d="M69.751 72.1675L48.4199 59.3111C47.3862 58.6881 45.7101 58.6881 44.6764 59.3111L23.2004 72.2548C22.1667 72.8779 22.1667 73.888 23.2004 74.5111L44.5315 87.3674C45.5653 87.9905 47.2413 87.9905 48.2751 87.3674L69.751 74.4238C70.7847 73.8007 70.7847 72.7905 69.751 72.1675Z" />
              <path fill="#97E6FF" d="M68.5091 72.9231L48.4199 60.8153C47.3862 60.1922 45.7101 60.1922 44.6764 60.8153L24.8146 72.7861C23.7808 73.4091 23.7808 74.4193 24.8146 75.0424L44.9038 87.1502C45.9375 87.7733 47.6135 87.7733 48.6473 87.1502L68.5091 75.1794C69.5428 74.5563 69.5428 73.5462 68.5091 72.9231Z" />
              <path fill="#97E6FF" d="M66.6747 73.3219L48.4199 62.3197C47.3862 61.6966 45.7101 61.6966 44.6764 62.3197L26.4412 73.3101C25.4075 73.9332 25.4075 74.9433 26.4412 75.5664L44.696 86.5686C45.7297 87.1917 47.4058 87.1917 48.4395 86.5686L66.6747 75.5782C67.7084 74.9551 67.7084 73.945 66.6747 73.3219Z" />
            </g>
            <path strokeWidth="0.5" stroke="#F4F4F4" d="M68.9898 68.7324L49.0242 56.699C47.6459 55.8683 45.4111 55.8683 44.0328 56.699L24.0673 68.7324C22.6889 69.5631 22.6889 70.91 24.0673 71.7407L44.0328 83.7741C45.4111 84.6048 47.6459 84.6048 49.0242 83.7741L68.9898 71.7407C70.3681 70.91 70.3681 69.5631 68.9898 68.7324Z" />
          </g>
        </g>
        <g id="particles">
          <path fill="url(#paint3_linear_204_217)" d="M43.5482 32.558C44.5429 32.558 45.3493 31.7162 45.3493 30.6778C45.3493 29.6394 44.5429 28.7976 43.5482 28.7976C42.5535 28.7976 41.7471 29.6394 41.7471 30.6778C41.7471 31.7162 42.5535 32.558 43.5482 32.558Z" className="particle p1" />
          <path fill="url(#paint4_linear_204_217)" d="M50.0323 48.3519C51.027 48.3519 51.8334 47.5101 51.8334 46.4717C51.8334 45.4333 51.027 44.5915 50.0323 44.5915C49.0375 44.5915 48.2311 45.4333 48.2311 46.4717C48.2311 47.5101 49.0375 48.3519 50.0323 48.3519Z" className="particle p2" />
          <path fill="url(#paint5_linear_204_217)" d="M40.3062 62.6416C41.102 62.6416 41.7471 61.9681 41.7471 61.1374C41.7471 60.3067 41.102 59.6332 40.3062 59.6332C39.5104 59.6332 38.8653 60.3067 38.8653 61.1374C38.8653 61.9681 39.5104 62.6416 40.3062 62.6416Z" className="particle p3" />
          <path fill="url(#paint6_linear_204_217)" d="M50.7527 73.9229C52.1453 73.9229 53.2743 72.7444 53.2743 71.2906C53.2743 69.8368 52.1453 68.6583 50.7527 68.6583C49.3601 68.6583 48.2311 69.8368 48.2311 71.2906C48.2311 72.7444 49.3601 73.9229 50.7527 73.9229Z" className="particle p4" />
          <path fill="url(#paint7_linear_204_217)" d="M48.5913 76.9312C49.1882 76.9312 49.672 76.4262 49.672 75.8031C49.672 75.1801 49.1882 74.675 48.5913 74.675C47.9945 74.675 47.5107 75.1801 47.5107 75.8031C47.5107 76.4262 47.9945 76.9312 48.5913 76.9312Z" className="particle p5" />
          <path fill="url(#paint8_linear_204_217)" d="M52.9153 67.1541C53.115 67.1541 53.2768 66.9858 53.2768 66.7781C53.2768 66.5704 53.115 66.402 52.9153 66.402C52.7156 66.402 52.5538 66.5704 52.5538 66.7781C52.5538 66.9858 52.7156 67.1541 52.9153 67.1541Z" className="particle p6" />
          <path fill="url(#paint9_linear_204_217)" d="M52.1936 43.8394C52.7904 43.8394 53.2743 43.3344 53.2743 42.7113C53.2743 42.0883 52.7904 41.5832 52.1936 41.5832C51.5967 41.5832 51.1129 42.0883 51.1129 42.7113C51.1129 43.3344 51.5967 43.8394 52.1936 43.8394Z" className="particle p7" />
          <path fill="url(#paint10_linear_204_217)" d="M57.2367 29.5497C57.8335 29.5497 58.3173 29.0446 58.3173 28.4216C58.3173 27.7985 57.8335 27.2935 57.2367 27.2935C56.6398 27.2935 56.156 27.7985 56.156 28.4216C56.156 29.0446 56.6398 29.5497 57.2367 29.5497Z" className="particle p8" />
          <path fill="url(#paint11_linear_204_217)" d="M43.9084 34.8144C44.3063 34.8144 44.6289 34.4777 44.6289 34.0623C44.6289 33.647 44.3063 33.3102 43.9084 33.3102C43.5105 33.3102 43.188 33.647 43.188 34.0623C43.188 34.4777 43.5105 34.8144 43.9084 34.8144Z" className="particle p9" />
        </g>
        <g id="reflectores">
          <path fillOpacity="0.2" fill="url(#paint12_linear_204_217)" d="M49.2037 57.0009L68.7638 68.7786C69.6763 69.3089 69.7967 69.9684 69.794 70.1625V13.7383C69.7649 13.5587 69.6807 13.4657 69.4338 13.3096L48.4832 0.601307C46.9202 -0.192595 46.0788 -0.208238 44.6446 0.601307L23.6855 13.2118C23.1956 13.5876 23.1966 13.7637 23.1956 14.4904L23.246 70.1625C23.2948 69.4916 23.7327 69.0697 25.1768 68.2447L43.9084 57.0008C44.8268 56.4344 45.3776 56.2639 46.43 56.2487C47.5299 56.2257 48.1356 56.4222 49.2037 57.0009Z" />
          <path fillOpacity="0.2" fill="url(#paint13_linear_204_217)" d="M48.8867 27.6696C49.9674 26.9175 68.6774 14.9197 68.6774 14.9197C69.3063 14.5327 69.7089 14.375 69.7796 13.756V70.1979C69.7775 70.8816 69.505 71.208 68.7422 71.7322L48.9299 83.6603C48.2003 84.1258 47.6732 84.2687 46.5103 84.2995C45.3295 84.2679 44.8074 84.1213 44.0907 83.6603L24.4348 71.8149C23.5828 71.3313 23.2369 71.0094 23.2316 70.1979L23.1884 13.9816C23.1798 14.8398 23.4982 15.3037 24.7518 16.0874C24.7518 16.0874 42.7629 26.9175 44.2038 27.6696C45.6447 28.4217 46.0049 28.4217 46.5452 28.4217C47.0856 28.4217 47.806 28.4217 48.8867 27.6696Z" />
        </g>
        <g id="panel-rigth">
          <mask fill="white" id="path-26-inside-1_204_217">
            <path d="M72 91.8323C72 90.5121 72.9268 88.9068 74.0702 88.2467L87.9298 80.2448C89.0731 79.5847 90 80.1198 90 81.44V81.44C90 82.7602 89.0732 84.3656 87.9298 85.0257L74.0702 93.0275C72.9268 93.6876 72 93.1525 72 91.8323V91.8323Z" />
          </mask>
          <path fill="#91DDFB" d="M72 91.8323C72 90.5121 72.9268 88.9068 74.0702 88.2467L87.9298 80.2448C89.0731 79.5847 90 80.1198 90 81.44V81.44C90 82.7602 89.0732 84.3656 87.9298 85.0257L74.0702 93.0275C72.9268 93.6876 72 93.1525 72 91.8323V91.8323Z" />
          <path mask="url(#path-26-inside-1_204_217)" fill="#489CB7" d="M72 89.4419L90 79.0496L72 89.4419ZM90.6928 81.44C90.6928 82.9811 89.6109 84.8551 88.2762 85.6257L74.763 93.4275C73.237 94.3085 72 93.5943 72 91.8323V91.8323C72 92.7107 72.9268 92.8876 74.0702 92.2275L87.9298 84.2257C88.6905 83.7865 89.3072 82.7184 89.3072 81.84L90.6928 81.44ZM72 94.2227V89.4419V94.2227ZM88.2762 80.0448C89.6109 79.2742 90.6928 79.8989 90.6928 81.44V81.44C90.6928 82.9811 89.6109 84.8551 88.2762 85.6257L87.9298 84.2257C88.6905 83.7865 89.3072 82.7184 89.3072 81.84V81.84C89.3072 80.5198 88.6905 79.8056 87.9298 80.2448L88.2762 80.0448Z" />
          <mask fill="white" id="path-28-inside-2_204_217">
            <path d="M67 94.6603C67 93.3848 67.8954 91.8339 69 91.1962V91.1962C70.1046 90.5584 71 91.0754 71 92.3509V92.5129C71 93.7884 70.1046 95.3393 69 95.977V95.977C67.8954 96.6147 67 96.0978 67 94.8223V94.6603Z" />
          </mask>
          <path fill="#91DDFB" d="M67 94.6603C67 93.3848 67.8954 91.8339 69 91.1962V91.1962C70.1046 90.5584 71 91.0754 71 92.3509V92.5129C71 93.7884 70.1046 95.3393 69 95.977V95.977C67.8954 96.6147 67 96.0978 67 94.8223V94.6603Z" />
          <path mask="url(#path-28-inside-2_204_217)" fill="#489CB7" d="M67 92.3509L71 90.0415L67 92.3509ZM71.6928 92.5129C71.6928 94.0093 70.6423 95.8288 69.3464 96.577L69.3464 96.577C68.0505 97.3252 67 96.7187 67 95.2223V94.8223C67 95.6559 67.8954 95.8147 69 95.177L69 95.177C69.7219 94.7602 70.3072 93.7465 70.3072 92.9129L71.6928 92.5129ZM67 97.1317V92.3509V97.1317ZM69.2762 91.0367C70.6109 90.2661 71.6928 90.8908 71.6928 92.4319V92.5129C71.6928 94.0093 70.6423 95.8288 69.3464 96.577L69 95.177C69.7219 94.7602 70.3072 93.7465 70.3072 92.9129V92.7509C70.3072 91.4754 69.7219 90.7794 69 91.1962L69.2762 91.0367Z" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" y2="92.0933" x2="92.5421" y1="92.0933" x1="1.00946" id="paint0_linear_204_217">
            <stop stopColor="#5727CC" /><stop stopColor="#4354BF" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="91.1638" x2="6.72169" y1={70} x1="92.5" id="paint1_linear_204_217">
            <stop stopColor="#4559C4" /><stop stopColor="#332C94" offset="0.29" /><stop stopColor="#5727CB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="85.0762" x2="3.55544" y1={70} x1="92.5" id="paint2_linear_204_217">
            <stop stopColor="#91DDFB" /><stop stopColor="#8841D5" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="32.558" x2="43.5482" y1="28.7976" x1="43.5482" id="paint3_linear_204_217">
            <stop stopColor="#5927CE" /><stop stopColor="#91DDFB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="48.3519" x2="50.0323" y1="44.5915" x1="50.0323" id="paint4_linear_204_217">
            <stop stopColor="#5927CE" /><stop stopColor="#91DDFB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="62.6416" x2="40.3062" y1="59.6332" x1="40.3062" id="paint5_linear_204_217">
            <stop stopColor="#5927CE" /><stop stopColor="#91DDFB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="73.9229" x2="50.7527" y1="68.6583" x1="50.7527" id="paint6_linear_204_217">
            <stop stopColor="#5927CE" /><stop stopColor="#91DDFB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="76.9312" x2="48.5913" y1="74.675" x1="48.5913" id="paint7_linear_204_217">
            <stop stopColor="#5927CE" /><stop stopColor="#91DDFB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="67.1541" x2="52.9153" y1="66.402" x1="52.9153" id="paint8_linear_204_217">
            <stop stopColor="#5927CE" /><stop stopColor="#91DDFB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="43.8394" x2="52.1936" y1="41.5832" x1="52.1936" id="paint9_linear_204_217">
            <stop stopColor="#5927CE" /><stop stopColor="#91DDFB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="29.5497" x2="57.2367" y1="27.2935" x1="57.2367" id="paint10_linear_204_217">
            <stop stopColor="#5927CE" /><stop stopColor="#91DDFB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="34.8144" x2="43.9084" y1="33.3102" x1="43.9084" id="paint11_linear_204_217">
            <stop stopColor="#5927CE" /><stop stopColor="#91DDFB" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="16.0743" x2="62.9858" y1="88.5145" x1="67.8638" id="paint12_linear_204_217">
            <stop stopColor="#97E6FF" /><stop stopOpacity={0} stopColor="white" offset={1} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" y2="39.4139" x2="31.4515" y1="88.0938" x1="36.2597" id="paint13_linear_204_217">
            <stop stopColor="#97E6FF" /><stop stopOpacity={0} stopColor="white" offset={1} />
          </linearGradient>
        </defs>
      </svg>
    </ServerLoaderWrapper>
  );
}

// ─── GlobeLoader (styled-components) ────────────────────────────────

const GlobeLoaderWrapper = styled.div`
  .section-center { position: absolute; top: 50%; left: 0; z-index: 10; transform: translateY(-50%); width: 100%; margin: 0 auto; text-align: center; transition: all 500ms linear; }
  .section-path {
    position: relative; width: 238px; height: 76px; border-radius: 35px; margin: 0 auto; text-align: center;
    background-color: #e6e6e6;
    box-shadow: inset -2px 20px 10px 0 rgba(0,0,0,.06), inset -2px 30px 10px 0 rgba(0,0,0,.04);
    border: 3px groove rgba(225,225,225,0.07); overflow: hidden; transition: all 300ms linear;
  }
  .globe { position: relative; width: 66px; height: 66px; overflow: hidden; margin-top: 2px; margin-left: 2px; border-radius: 50%; box-shadow: 0 10px 40px rgba(0,0,0,0.65); animation: rotateBall 4s ease infinite; transition: all 300ms linear; }
  @keyframes rotateBall { 0% { transform: translateX(0); } 50% { transform: translateX(162px); } 100% { transform: translateX(0); } }
  .globe:after {
    position: absolute; width: 5px; height: 12px; background-color: rgba(255,255,255,0.1);
    content: ''; left: 40px; top: 15px; border-radius: 50%; z-index: 2;
    box-shadow: 0 0 14px 7px rgba(255,255,255,0.1);
  }
  .globe:before {
    position: absolute; width: 100%; height: 100%; content: ''; left: 0; top: 0; border-radius: 50%; z-index: 1;
    box-shadow: inset 0 0 15px #1a252f; opacity: 0.4; transition: all 300ms linear;
  }
  .globe .wrapper { position: absolute; width: 528px; height: 528px; top: 0; left: -462px; animation: moveBall 4s ease infinite; }
  @keyframes moveBall { 0% { left: -462px; } 50% { left: 0; } 100% { left: -462px; } }
  .globe .wrapper span { position: absolute; width: 33px; height: 528px; top: 0; left: 0; background-color: #5c477d; box-shadow: inset 0 0 25px #5c487c; }
  .globe .wrapper span:nth-child(2) { left: 33px; background-color: #503e6d; }
  .globe .wrapper span:nth-child(3) { left: 66px; }
  .globe .wrapper span:nth-child(4) { left: 99px; background-color: #503e6d; }
  .globe .wrapper span:nth-child(5) { left: 132px; }
  .globe .wrapper span:nth-child(6) { left: 165px; background-color: #503e6d; }
  .globe .wrapper span:nth-child(7) { left: 198px; }
  .globe .wrapper span:nth-child(8) { left: 231px; background-color: #503e6d; }
  .globe .wrapper span:nth-child(9) { left: 264px; }
  .globe .wrapper span:nth-child(10) { left: 297px; background-color: #503e6d; }
  .globe .wrapper span:nth-child(11) { left: 330px; }
  .globe .wrapper span:nth-child(12) { left: 363px; background-color: #503e6d; }
  .globe .wrapper span:nth-child(13) { left: 396px; }
  .globe .wrapper span:nth-child(14) { left: 429px; background-color: #503e6d; }
  .globe .wrapper span:nth-child(15) { left: 462px; }
  .globe .wrapper span:nth-child(16) { left: 495px; background-color: #503e6d; }
`;

export function GlobeLoader() {
  return (
    <GlobeLoaderWrapper>
      <div className="section-center">
        <div className="section-path">
          <div className="globe">
            <div className="wrapper">
              {Array.from({ length: 16 }).map((_, i) => <span key={i} />)}
            </div>
          </div>
        </div>
      </div>
    </GlobeLoaderWrapper>
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
  .icon:focus ~ .input, .input:focus {
    box-shadow: none; width: 250px; border-radius: 0px;
    background-color: transparent; border-bottom: 3px solid #7e4fd4;
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
  }
`;

export function ExpandInput() {
  return (
    <ExpandInputWrapper>
      <div className="input-wrapper">
        <button className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M22 22L20 20" />
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
  numIcons = 50,
  maxOpacity = 0.2,
  iconSize = 28,
  duration = 6,
  repeatDelay = 2,
}: IconAnimatedGridPatternProps) {
  const svgId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [bgSquares, setBgSquares] = useState<Array<{ id: number; pos: [number, number]; iteration: number }>>([]);
  const [iconSquares, setIconSquares] = useState<Array<{ id: number; pos: [number, number]; iconIdx: number; iteration: number }>>([]);
  const occRef = useRef<Set<string>>(new Set());

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
    const bg: Array<{ id: number; pos: [number, number]; iteration: number }> = [];
    const icons: Array<{ id: number; pos: [number, number]; iconIdx: number; iteration: number }> = [];

    for (let i = 0; i < 60; i++) bg.push({ id: i, pos: pickPos(), iteration: 0 });
    for (let i = 0; i < numIcons; i++) icons.push({ id: i, pos: pickPos(), iconIdx: rand(ICON_LIST.length), iteration: 0 });

    setBgSquares(bg);
    setIconSquares(icons);
  }, [cols, rows, numIcons, pickPos]);

  // Reposition a single dark square when its animation completes
  const repositionBg = useCallback((id: number) => {
    setBgSquares((prev) => {
      const next = prev.slice();
      const sq = next[id];
      if (!sq) return prev;
      occRef.current.delete(`${sq.pos[0]},${sq.pos[1]}`);
      next[id] = { ...sq, pos: pickPos(), iteration: sq.iteration + 1 };
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
      next[id] = { ...ic, pos: pickPos(), iconIdx: rand(ICON_LIST.length), iteration: ic.iteration + 1 };
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
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 h-full w-full overflow-hidden', className)}
      style={{ transform: 'rotate(-2deg) scale(1.1)', transformOrigin: 'center' }}
    >
      {/* SVG grid lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30"
      >
        <defs>
          <pattern id={svgId} width={width} height={height} patternUnits="userSpaceOnUse" x={-1} y={-1}>
            <path d={`M.5 ${height}V.5H${width}`} fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${svgId})`} />
      </svg>

      {/* Dark squares — each independently fades in/out then repositions */}
      {bgSquares.map((sq, idx) => (
        <motion.div
          key={`bg-${sq.id}-${sq.iteration}`}
          className="absolute"
          style={{
            left: sq.pos[0] * width + 1,
            top: sq.pos[1] * height + 1,
            width: width - 1,
            height: height - 1,
            backgroundColor: 'currentColor',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: maxOpacity }}
          transition={{
            duration,
            repeat: 1,
            delay: idx * 0.1,
            repeatType: 'reverse',
            repeatDelay,
          }}
          onAnimationComplete={() => repositionBg(sq.id)}
        />
      ))}

      {/* Icons — each independently fades in/out then repositions */}
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
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration,
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
    </div>
  );
}
