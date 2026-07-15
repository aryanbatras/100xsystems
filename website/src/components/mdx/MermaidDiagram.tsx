/**
 * ## MermaidDiagram
 *
 * Mermaid.js diagram renderer.
 *
 * @packageDocumentation
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { cn } from '@/application/lib/utils';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
  caption?: string;
}

// ─── Mermaid Initialization ─────────────────────────────────────────

let initialized = false;

function initMermaid() {
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      themeVariables: {
        primaryColor: '#f0f0ff',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#6366f1',
        lineColor: '#94a3b8',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#ffffff',
        fontSize: '48px',
        mainBkg: '#ffffff',
        nodeBorder: '#ffffff  ',
        clusterBkg: '#f0f0ff',
        clusterBorder: '#f0f0ff',
        titleColor: '#1e293b',
      },
      flowchart: {
        nodeSpacing: 300,
        rankSpacing: 200,
        htmlLabels: true,
      },
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    });
    initialized = true;
  }
}

// ─── Component ──────────────────────────────────────────────────────

export function MermaidDiagram({ chart, className, caption }: MermaidDiagramProps) {
  const [error, setError] = useState<string | null>(null);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    if (!chart.trim()) return;

    let cancelled = false;

    async function render() {
      try {
        setError(null);
        initMermaid();

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);

        if (!cancelled) {
          const cleanedSvg = renderedSvg
            .replace(/\s+width="[^"]*"/, ' width="100%"')
            .replace(/\s+height="[^"]*"/, '');
          setSvg(cleanedSvg);
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
  }, [chart]);

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
      <div className="w-full overflow-x-auto border-2 p-5 bg-white">
        {svg ? (
          <div
            className="w-full mx-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="flex items-center justify-center gap-3 py-12 text-gray-400">
            <div className="w-5 h-5 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
            <span className="text-sm font-medium">Rendering diagram...</span>
          </div>
        )}
      </div>
      {caption && (
        <p className="text-xs text-center text-gray-500 mt-3 italic">{caption}</p>
      )}
    </div>
  );
}
