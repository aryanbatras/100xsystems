/**
 * ## Animation Components
 *
 * Decorative animation effects — KineticText, CoolMode, and more.
 *
 * @packageDocumentation
 */

'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';

// ─── KineticText ────────────────────────────────────────────────────
// Animates font weight of individual characters on hover.
// Credit: @abdmjd1 (MagicUI)

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
// Particle burst effect on click/tap. Wraps any element.
// Credit: Bankkroll (MagicUI)

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
    circle.setAttributeNS(
      null,
      'fill',
      `hsl(${Math.random() * 360}, 70%, 50%)`
    );
    circleSVG.appendChild(circle);
    circleSVG.setAttribute('width', size.toString());
    circleSVG.setAttribute('height', size.toString());
    particle.appendChild(circleSVG);
  };

  const appendImageParticle = (
    particle: HTMLDivElement,
    imageSrc: string,
    size: number
  ) => {
    const image = document.createElement('img');
    image.src = imageSrc;
    image.width = size;
    image.height = size;
    image.alt = '';
    image.style.borderRadius = '50%';
    particle.appendChild(image);
  };

  const appendTextParticle = (
    particle: HTMLDivElement,
    particleContent: string,
    size: number
  ) => {
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
    const size =
      options?.size || sizes[Math.floor(Math.random() * sizes.length)];
    const speedHorz = options?.speedHorz || Math.random() * 10;
    const speedUp = options?.speedUp || Math.random() * 25;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;

    const particle = document.createElement('div');

    if (particleType === 'circle') {
      appendCircleParticle(particle, size);
    } else if (
      particleType.startsWith('http') ||
      particleType.startsWith('/')
    ) {
      appendImageParticle(particle, particleType, size);
    } else {
      appendTextParticle(particle, particleType, size);
    }

    particle.style.position = 'absolute';
    particle.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${spinVal}deg)`;

    container.appendChild(particle);

    particles.push({
      direction,
      element: particle,
      left,
      size,
      speedHorz,
      speedUp,
      spinSpeed,
      spinVal,
      top,
    });
  }

  function refreshParticles() {
    particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;

      if (
        p.top >=
        Math.max(window.innerHeight, document.body.clientHeight) + p.size
      ) {
        particles = particles.filter((o) => o !== p);
        p.element.remove();
      }

      p.element.setAttribute(
        'style',
        [
          'position:absolute',
          'will-change:transform',
          `top:${p.top}px`,
          `left:${p.left}px`,
          `transform:rotate(${p.spinVal}deg)`,
        ].join(';')
      );
    });
  }

  let animationFrame: number | undefined;
  let lastParticleTimestamp = 0;
  const particleGenerationDelay = 30;

  function loop() {
    const currentTime = performance.now();
    if (
      autoAddParticle &&
      particles.length < limit &&
      currentTime - lastParticleTimestamp > particleGenerationDelay
    ) {
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

  const updateMousePosition = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      mouseX = e.touches?.[0].clientX;
      mouseY = e.touches?.[0].clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  };

  const tapHandler = (e: MouseEvent | TouchEvent) => {
    updateMousePosition(e);
    autoAddParticle = true;
  };

  const disableAutoAddParticle = () => {
    autoAddParticle = false;
  };

  element.addEventListener(move, updateMousePosition, { passive: true });
  element.addEventListener(tap, tapHandler, { passive: true });
  element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
  element.addEventListener('mouseleave', disableAutoAddParticle, {
    passive: true,
  });

  return () => {
    element.removeEventListener(move, updateMousePosition);
    element.removeEventListener(tap, tapHandler);
    element.removeEventListener(tapEnd, disableAutoAddParticle);
    element.removeEventListener('mouseleave', disableAutoAddParticle);

    const interval = setInterval(() => {
      if (animationFrame && particles.length === 0) {
        cancelAnimationFrame(animationFrame);
        clearInterval(interval);

        if (--instanceCounter === 0) {
          container.remove();
        }
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
    const element = ref.current;
    let cleanup: (() => void) | null = null;

    if (element) {
      cleanup = applyParticleEffect(element, options);
    }

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [options]);

  return <span ref={ref}>{children}</span>;
};
