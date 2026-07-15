'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { useRouter } from 'next/navigation';
import { cn } from '@/application/lib/utils';
import { Breadcrumbs } from '@/presentation/__components';
import type { DependencyGraph, DependencyNode, DependencyEdge } from '@/lib/mdx';

interface DependenciesClientProps {
  graph: DependencyGraph;
}

// ─── Colors by type ─────────────────────────────────────────────────

const typeColors: Record<string, string> = {
  system: '#7c3aed',      // Purple — Systems
  principle: '#f59e0b',   // Amber — Principles
  pattern: '#3b82f6',     // Blue — Patterns
  tool: '#10b981',        // Emerald — Tools
  technology: '#f97316',  // Orange — Technologies
};

const typeLabels: Record<string, string> = {
  system: 'S',
  principle: 'P',
  pattern: 'PT',
  tool: 'T',
  technology: 'TC',
};

const typeBgColors: Record<string, string> = {
  system: 'text-white',
  principle: 'text-black',
  pattern: 'text-white',
  tool: 'text-white',
  technology: 'text-white',
};

// ─── Helpers ────────────────────────────────────────────────────────

function edgeWeightToOpacity(weight: number): number {
  return Math.min(0.15 + weight * 0.08, 0.6);
}

function edgeWeightToWidth(weight: number): number {
  return Math.min(1 + weight * 0.5, 4);
}

// ─── Component ──────────────────────────────────────────────────────

export function DependenciesClient({ graph }: DependenciesClientProps) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Track resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: Math.max(600, window.innerHeight - 300),
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Render D3 graph
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Create a container group for zoom/pan
    const g = svg.append('g');

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.7));

    // Build simulation
    const simulation = d3.forceSimulation<DependencyNode>(graph.nodes)
      .force('link', d3.forceLink<DependencyNode, DependencyEdge>(graph.edges)
        .id((d) => d.id)
        .distance((d) => 80 + d.weight * 20)
        .strength(0.3),
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(0, 0))
      .force('collision', d3.forceCollide<DependencyNode>().radius(40));

    // Draw edges
    const link = g.append('g')
      .selectAll('line')
      .data(graph.edges)
      .join('line')
      .attr('stroke', '#d1d5db')
      .attr('stroke-opacity', (d) => edgeWeightToOpacity(d.weight))
      .attr('stroke-width', (d) => edgeWeightToWidth(d.weight))
      .attr('stroke-linecap', 'round');

    // Draw edge labels (for "prerequisite" edges)
    const linkLabel = g.append('g')
      .selectAll('text')
      .data(graph.edges.filter((d) => d.label === 'prerequisite'))
      .join('text')
      .text('requires')
      .attr('font-size', '8px')
      .attr('fill', '#9ca3af')
      .attr('text-anchor', 'middle')
      .attr('dy', '-4');

    // Draw nodes
    const node = g.append('g')
      .selectAll('g')
      .data(graph.nodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, DependencyNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any,
      );

    // Node circles
    node.append('circle')
      .attr('r', (d) => d.type === 'system' ? 16 : 10)
      .attr('fill', (d) => typeColors[d.type] || '#6b7280')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('transition', 'r 0.15s ease');

    // Node type labels
    node.append('text')
      .text((d) => typeLabels[d.type] || '?')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', (d) => typeBgColors[d.type] || 'white')
      .attr('font-size', (d) => d.type === 'system' ? '10px' : '8px')
      .attr('font-weight', 'bold')
      .attr('pointer-events', 'none');

    // Node title labels
    const nodeLabel = node.append('text')
      .text((d) => d.title.length > 20 ? d.title.slice(0, 18) + '…' : d.title)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => d.type === 'system' ? 30 : 22)
      .attr('fill', '#1e293b')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('pointer-events', 'none')
      .style('opacity', 0.8)
      .style('transition', 'opacity 0.15s ease');

    // Interactive behavior
    node
      .on('mouseenter', function (event, d) {

        // Highlight this node and its connections
        const connectedIds = new Set<string>();
        connectedIds.add(d.id);
        graph.edges.forEach((e) => {
          if (e.source === d.id || e.target === d.id) {
            connectedIds.add(e.source as string);
            connectedIds.add(e.target as string);
          }
        });

        node.selectAll('circle')
          .attr('opacity', (n: any) => connectedIds.has(n.id) ? 1 : 0.15);

        node.selectAll('text:not(.type-label)')
          .attr('opacity', (n: any) => connectedIds.has(n.id) ? 1 : 0.1);

        link
          .attr('stroke-opacity', (l: any) =>
            l.source.id === d.id || l.target.id === d.id
              ? Math.min(0.4 + l.weight * 0.1, 0.8)
              : 0.04,
          );

        // Enlarge this node
        d3.select(this).select('circle')
          .attr('r', d.type === 'system' ? 22 : 14);

        nodeLabel
          .filter((n: any) => n.id === d.id)
          .style('opacity', 1);
      })
      .on('mouseleave', function () {
        node.selectAll('circle').attr('opacity', 1);
        node.selectAll('text')      .attr('opacity', 0.8);
        node.selectAll('circle')
          .attr('r', (n: any) => n.type === 'system' ? 16 : 10);
        link.attr('stroke-opacity', (l: any) => edgeWeightToOpacity(l.weight));
      })
      .on('click', function (event, d) {
        setSelectedNode(d);
        // Navigate on double-click or click detail button
      });

    // Double-click to navigate
    node.on('dblclick', function (event, d) {
      router.push(d.href);
    });

    // Simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkLabel
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Return cleanup
    return () => {
      simulation.stop();
    };
  }, [graph, dimensions]);

  const handleNodeNavigate = useCallback(() => {
    if (selectedNode) {
      router.push(selectedNode.href);
    }
  }, [selectedNode, router]);

  const handleNodeClose = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const typeLegend = [
    { type: 'system', label: 'Systems', color: typeColors.system },
    { type: 'principle', label: 'Principles', color: typeColors.principle },
    { type: 'pattern', label: 'Patterns', color: typeColors.pattern },
    { type: 'tool', label: 'Tools', color: typeColors.tool },
    { type: 'technology', label: 'Technologies', color: typeColors.technology },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumbs items={[{ label: 'Dependency Graph', href: '/dependencies' }]} />
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-accent text-white">
              Visualization
            </span>
            <span className="text-xs text-fg-muted">·</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-fg-muted">
              {graph.stats.systemCount} systems · {graph.stats.kbItemCount} references · {graph.stats.edgeCount} connections
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-fg">
            Learning Dependency Graph
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-2xl">
            Explore how systems and knowledge base entries connect. Nodes represent systems or concepts;
            edges show prerequisite relationships. <strong>Drag</strong> to rearrange, <strong>scroll</strong> to zoom,
            <strong> hover</strong> to highlight, <strong>double-click</strong> to navigate.
          </p>
        </div>

        {/* Graph + Detail Panel */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Graph */}
          <div
            ref={containerRef}
            className={cn(
              'flex-1 bg-white border border-gray-100 relative overflow-hidden',
              selectedNode ? 'lg:w-2/3' : 'w-full',
            )}
          >
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              className="w-full"
            />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-3">
              {typeLegend.map((item) => (
                <div key={item.type} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[10px] font-medium text-fg-muted uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 border border-gray-100 text-[10px] font-bold uppercase tracking-wider text-fg-muted">
              {graph.nodes.length} nodes · {graph.edges.length} edges
            </div>
          </div>

          {/* Detail Panel */}
          {selectedNode && (
            <div className="lg:w-1/3 bg-white border border-gray-100 p-6 h-fit sticky top-28">
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-1"
                  style={{
                    backgroundColor: typeColors[selectedNode.type] || '#6b7280',
                    color: selectedNode.type === 'principle' ? '#000' : '#fff',
                  }}
                >
                  {selectedNode.type}
                </span>
                <button
                  onClick={handleNodeClose}
                  className="p-1 text-fg-muted hover:text-fg transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <h3 className="text-lg font-extrabold tracking-tight text-fg mb-2">
                {selectedNode.title}
              </h3>

              {selectedNode.description && (
                <p className="text-sm text-fg-secondary leading-relaxed mb-4">
                  {selectedNode.description}
                </p>
              )}

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-fg-muted">Difficulty</span>
                  <span className="font-semibold text-fg">{selectedNode.difficulty}</span>
                </div>
                {selectedNode.type === 'system' && (
                  <div className="flex justify-between text-xs">
                    <span className="text-fg-muted">Lessons</span>
                    <span className="font-semibold text-fg">{selectedNode.lessonCount}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleNodeNavigate}
                  className="flex-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent/90 transition-colors"
                >
                  View {selectedNode.type === 'system' ? 'System' : 'Entry'}
                </button>
              </div>

              {/* Connected nodes */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mb-3">
                  Connected to
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {graph.edges
                    .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((edge) => {
                      const connectedId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const connected = graph.nodes.find((n) => n.id === connectedId);
                      if (!connected) return null;
                      return (
                        <button
                          key={`${edge.source}-${edge.target}`}
                          onClick={() => setSelectedNode(connected)}
                          className="text-[10px] font-medium px-2 py-1 bg-gray-100 text-fg-secondary hover:bg-accent hover:text-white transition-colors"
                        >
                          {connected.title}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '↗', label: 'Drag', desc: 'Move nodes' },
            { icon: '🔍', label: 'Scroll', desc: 'Zoom in/out' },
            { icon: '👆', label: 'Hover', desc: 'Highlight connections' },
            { icon: '🖱', label: 'Double-click', desc: 'Navigate to node' },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-gray-100 px-4 py-3 text-center">
              <span className="text-lg block mb-1">{item.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-fg block">{item.label}</span>
              <span className="text-[10px] text-fg-muted">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
