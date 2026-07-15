/**
 * ## MermaidDiagram
 *
 * Interactive Mermaid.js diagram renderer with pan/zoom, dark/light mode support,
 * and graceful error fallback.
 *
 * @packageDocumentation
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import { cn } from '@/application/lib/utils';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
  caption?: string;
}

// ─── Mermaid Initialization ─────────────────────────────────────────

let initialized = false;

function initMermaid(isDark: boolean) {
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'base',
      themeVariables: isDark
        ? {
            primaryColor: '#7c3aed',
            primaryTextColor: '#e2e8f0',
            primaryBorderColor: '#5b21b6',
            lineColor: '#64748b',
            secondaryColor: '#1e293b',
            tertiaryColor: '#0f172a',
            fontSize: '14px',
          }
        : {
            primaryColor: '#7c3aed',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#a78bfa',
            lineColor: '#94a3b8',
            secondaryColor: '#f8fafc',
            tertiaryColor: '#ffffff',
            fontSize: '14px',
          },
      securityLevel: 'loose',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    });
    initialized = true;
  }
}

// ─── Component ──────────────────────────────────────────────────────

export function MermaidDiagram({ chart, className, caption }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [svg, setSvg] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Detect dark mode from reading context or system preference
  useEffect(() => {
    const checkDark = () => {
      // Check for sepia/light mode in reading context via class on parent
      const isSepia = document.querySelector('[class*="bg-amber-50"]');
      if (isSepia) return false;

      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const dark = checkDark();
    setIsDark(dark);

    const listener = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  // Re-render mermaid when theme changes
  useEffect(() => {
    if (!chart.trim()) return;

    let cancelled = false;

    async function render() {
      try {
        setError(null);
        initialized = false;
        initMermaid(isDark);

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);

        if (!cancelled) {
          setSvg(renderedSvg);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
          setSvg(null);
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, isDark]);

  // Pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    e.preventDefault();
  }, [isZoomed, pan.x, pan.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
  }, [isPanning]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const toggleZoom = useCallback(() => {
    if (isZoomed) {
      setPan({ x: 0, y: 0 });
    }
    setIsZoomed(!isZoomed);
  }, [isZoomed]);

  const resetView = useCallback(() => {
    setPan({ x: 0, y: 0 });
    setIsZoomed(false);
  }, []);

  // Error state
  if (error) {
    return (
      <div className={cn('my-8 border border-red-200 bg-red-50 p-4', className)}>
        <div className="flex items-start gap-3">
          <span className="shrink-0 mt-0.5 text-red-400 text-sm font-bold">!</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1">
              Diagram Error
            </p>
            <pre className="text-xs text-red-600 font-mono whitespace-pre-wrap leading-relaxed">
              {error}
            </pre>
            <details className="mt-2">
              <summary className="text-[10px] font-bold uppercase tracking-wider text-red-400 cursor-pointer hover:text-red-500">
                Show source
              </summary>
              <pre className="mt-2 text-xs text-red-600 font-mono whitespace-pre-wrap bg-red-50 p-3">
                {chart}
              </pre>
            </details>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('my-8', className)}>
      <div
        ref={containerRef}
        className={cn(
          'relative border border-gray-100 bg-white overflow-hidden',
          isZoomed ? 'fixed inset-4 z-50 shadow-2xl overflow-auto' : '',
        )}
      >
        {/* Toolbar */}
        <div className={cn(
          'flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50/80',
          isZoomed ? 'sticky top-0 z-10' : '',
        )}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Interactive Diagram
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleZoom}
              className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-accent hover:bg-white transition-all duration-150"
              title={isZoomed ? 'Close fullscreen' : 'Fullscreen'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isZoomed ? (
                  <><line x1="4" y1="4" x2="20" y2="20" /><line x1="4" y1="20" x2="20" y2="4" /></>
                ) : (
                  <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>
                )}
              </svg>
            </button>
            {isZoomed && (
              <button
                onClick={resetView}
                className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-accent hover:bg-white transition-all duration-150"
                title="Reset view"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Diagram Container */}
        <div
          ref={svgContainerRef}
          className={cn(
            'flex items-center justify-center p-6 transition-all duration-200',
            isPanning ? 'cursor-grabbing' : isZoomed ? 'cursor-grab' : 'cursor-default',
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {svg ? (
            <div
              className={cn(
                'transition-transform duration-100',
                isZoomed ? 'scale-150' : 'max-w-full',
              )}
              style={{
                transform: isZoomed
                  ? `translate(${pan.x}px, ${pan.y}px)`
                  : undefined,
              }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="flex items-center gap-3 py-8 text-gray-400">
              <div className="w-5 h-5 border-2 border-gray-200 border-t-accent rounded-full animate-spin" />
              <span className="text-xs font-medium">Rendering diagram...</span>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-xs text-center text-fg-muted mt-3 italic">{caption}</p>
      )}

      {/* Backdrop for fullscreen mode */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={resetView}
        />
      )}
    </div>
  );
}
