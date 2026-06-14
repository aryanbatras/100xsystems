'use client';

import styles from '../_styles/graph-obsidiangraph.module.css';
import dynamic from 'next/dynamic';
import React, { useState, useCallback, useMemo, useRef, useEffect, Component } from 'react';
/**
 * ## Graph
 *
 * Graph feature module.
 * Contains all components, types, and logic for the graph domain.
 *
 * @packageDocumentation
 * @module graph
 */

;



// ============================================================
// Source: ObsidianKnowledgeGraph.tsx
// ============================================================
const Graph = dynamic(() => import('react-graph-vis'), { 
  ssr: false,
  loading: () => <div className={styles.loadingOverlay}><div className={styles.loadingSpinner}></div></div>
});

interface ObsidianKnowledgeGraphProps {
  data?: ObsidianGraphData;
  width?: string;
  height?: string;
  showControls?: boolean;
  showSearch?: boolean;
  showStats?: boolean;
  showFilters?: boolean;
  onNodeSelect?: (node: ObsidianNode) => void;
  onEdgeSelect?: (edge: ObsidianEdge) => void;
}

const ObsidianKnowledgeGraph: React.FC<ObsidianKnowledgeGraphProps> = ({
  data,
  width = '100%',
  height = '100%',
  showControls = true,
  showSearch = true,
  showStats = true,
  showFilters = true,
  onNodeSelect,
  onEdgeSelect,
}) => {
  const networkRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<ObsidianNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<ObsidianEdge | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [nodeFilter, setNodeFilter] = useState('all');
  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Generate sample data if none provided - Enhanced for beautiful Obsidian graph
  const graphData = useMemo(() => {
    if (data) return data;
    
    // Generate larger, more beautiful Obsidian-style sample data
    const nodes: ObsidianNode[] = [
      // Core knowledge management concepts
      { id: '1', label: 'Knowledge Management', type: 'note', size: 28 },
      { id: '2', label: 'Zettelkasten Method', type: 'note', size: 24 },
      { id: '3', label: 'Personal Knowledge Management', type: 'note', size: 22 },
      { id: '4', label: 'Second Brain', type: 'note', size: 26 },
      { id: '5', label: 'Digital Gardens', type: 'note', size: 20 },
      
      // Learning methodologies
      { id: '6', label: 'Spaced Repetition', type: 'note', size: 18 },
      { id: '7', label: 'Active Recall', type: 'note', size: 19 },
      { id: '8', label: 'Feynman Technique', type: 'note', size: 17 },
      { id: '9', label: 'Cornell Notes', type: 'note', size: 16 },
      
      // Tools and platforms
      { id: '10', label: 'Obsidian', type: 'note', size: 30 },
      { id: '11', label: 'Roam Research', type: 'note', size: 25 },
      { id: '12', label: 'Logseq', type: 'note', size: 23 },
      { id: '13', label: 'Notion', type: 'note', size: 27 },
      { id: '14', label: 'Evernote', type: 'note', size: 21 },
      { id: '15', label: 'OneNote', type: 'note', size: 19 },
      { id: '16', label: 'Bear', type: 'note', size: 18 },
      { id: '17', label: 'Craft', type: 'note', size: 20 },
      
      // Tags - more specific and realistic
      { id: '18', label: '#productivity', type: 'tag', size: 14 },
      { id: '19', label: '#learning', type: 'tag', size: 13 },
      { id: '20', label: '#knowledge', type: 'tag', size: 15 },
      { id: '21', label: '#tools', type: 'tag', size: 12 },
      { id: '22', label: '#note-taking', type: 'tag', size: 11 },
      { id: '23', label: '#pkm', type: 'tag', size: 13 },
      { id: '24', label: '#mind-mapping', type: 'tag', size: 12 },
      { id: '25', label: '#workflow', type: 'tag', size: 10 },
      
      // Categories/Folders
      { id: '26', label: '/Daily Notes', type: 'folder', size: 24 },
      { id: '27', label: '/Projects', type: 'folder', size: 22 },
      { id: '28', label: '/Research', type: 'folder', size: 20 },
      { id: '29', label: '/Resources', type: 'folder', size: 18 },
      { id: '30', label: '/Archive', type: 'folder', size: 16 },
      
      // Additional concepts
      { id: '31', label: 'Memory Palace', type: 'note', size: 19 },
      { id: '32', label: 'Mind Palace', type: 'note', size: 18 },
      { id: '33', label: 'Chunking', type: 'note', size: 17 },
      { id: '34', label: 'Interleaving', type: 'note', size: 16 },
      { id: '35', label: 'Progressive Summarization', type: 'note', size: 20 }
    ];

    const edges: ObsidianEdge[] = [
      // Core concept connections
      { id: 'e1', from: '1', to: '2', type: 'link' },
      { id: 'e2', from: '1', to: '3', type: 'link' },
      { id: 'e3', from: '2', to: '4', type: 'link' },
      { id: 'e4', from: '3', to: '5', type: 'link' },
      { id: 'e5', from: '1', to: '6', type: 'link' },
      { id: 'e6', from: '4', to: '7', type: 'link' },
      { id: 'e7', from: '6', to: '8', type: 'link' },
      { id: 'e8', from: '7', to: '9', type: 'link' },
      
      // Tool comparisons and relationships
      { id: 'e9', from: '10', to: '11', type: 'link' },
      { id: 'e10', from: '10', to: '12', type: 'link' },
      { id: 'e11', from: '11', to: '13', type: 'link' },
      { id: 'e12', from: '12', to: '14', type: 'link' },
      { id: 'e13', from: '13', to: '15', type: 'link' },
      { id: 'e14', from: '14', to: '16', type: 'link' },
      { id: 'e15', from: '15', to: '17', type: 'link' },
      { id: 'e16', from: '17', to: '10', type: 'link' },
      
      // Methodology connections
      { id: 'e17', from: '6', to: '18', type: 'link' },
      { id: 'e18', from: '7', to: '19', type: 'link' },
      { id: 'e19', from: '8', to: '20', type: 'link' },
      { id: 'e20', from: '9', to: '21', type: 'link' },
      { id: 'e21', from: '22', to: '23', type: 'link' },
      { id: 'e22', from: '23', to: '24', type: 'link' },
      { id: 'e23', from: '24', to: '25', type: 'link' },
      
      // Folder organization
      { id: 'e24', from: '26', to: '27', type: 'hierarchy' },
      { id: 'e25', from: '27', to: '28', type: 'hierarchy' },
      { id: 'e26', from: '28', to: '29', type: 'hierarchy' },
      { id: 'e27', from: '29', to: '30', type: 'hierarchy' },
      
      // Tag connections
      { id: 'e28', from: '1', to: '18', type: 'tag' },
      { id: 'e29', from: '2', to: '19', type: 'tag' },
      { id: 'e30', from: '3', to: '20', type: 'tag' },
      { id: 'e31', from: '4', to: '21', type: 'tag' },
      { id: 'e32', from: '5', to: '22', type: 'tag' },
      { id: 'e33', from: '6', to: '23', type: 'tag' },
      { id: 'e34', from: '7', to: '24', type: 'tag' },
      { id: 'e35', from: '8', to: '25', type: 'tag' },
      
      // Cross-connections for realistic knowledge graph
      { id: 'e36', from: '31', to: '32', type: 'link' },
      { id: 'e37', from: '32', to: '33', type: 'link' },
      { id: 'e38', from: '33', to: '34', type: 'link' },
      { id: 'e39', from: '31', to: '35', type: 'link' },
      { id: 'e40', from: '35', to: '1', type: 'link' },
      
      // Backlinks for bidirectional feel
      { id: 'e41', from: '2', to: '1', type: 'backlink' },
      { id: 'e42', from: '4', to: '3', type: 'backlink' },
      { id: 'e43', from: '5', to: '4', type: 'backlink' },
      { id: 'e44', from: '10', to: '1', type: 'backlink' },
      { id: 'e45', from: '11', to: '12', type: 'backlink' },
    ];

    return { nodes, edges };
  }, [data]);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    let filteredNodes = [...graphData.nodes];
    let filteredEdges = [...graphData.edges];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredNodes = filteredNodes.filter(node => 
        node.label.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (nodeFilter !== 'all') {
      filteredNodes = filteredNodes.filter(node => node.type === nodeFilter);
    }

    // Filter edges to only include filtered nodes
    const nodeIds = new Set(filteredNodes.map(node => node.id));
    filteredEdges = filteredEdges.filter(edge => 
      nodeIds.has(edge.from) && nodeIds.has(edge.to)
    );

    return { nodes: filteredNodes, edges: filteredEdges };
  }, [graphData, searchTerm, nodeFilter]);

  // Obsidian-style graph options - Enhanced for realistic Obsidian appearance
  const graphOptions: ObsidianGraphOptions = useMemo(() => ({
    nodes: {
      shape: 'dot',
      size: 20,
      font: {
        color: '#cccccc',
        size: 6, // Smaller, more elegant font
        face: 'Samsung Sharp Sans'
      },
      borderWidth: 0.5,
      borderWidthSelected: 2.5, // Keep same border width to prevent font weight changes
      color: {
        border: '#6b7280', // More subtle gray borders
        background: '#1a1a1a',
        highlight: {
          border: '#facc15', // Bright purple highlight
          background: '#2d1b69' // Dark purple background
        },
        hover: {
          border: '#facc15', // Light purple on hover
          background: '#3730a3' // Medium purple background
        }
      },
      scaling: {
        min: 8, // Smaller minimum size
        max: 35 // Slightly smaller maximum
      }
    },
    edges: {
      width: 2.0, // Link thickness 2.0
      color: {
        color: '#4b5563', // More subtle gray
        highlight: '#facc15', // Bright purple for highlighted
        hover: '#facc15' // Light purple on hover
      },
      smooth: {
        enabled: true,
        type: 'continuous',
        roundness: 0.2, // Slightly less curved for cleaner look
        forceDirection: 'none' // Prevent edge direction bias
      },
      arrows: {
        to: {
          enabled: false,
          scaleFactor: 0.8
        }
      }
    },
    physics: {
      enabled: physicsEnabled,
      stabilization: {
        enabled: true,
        iterations: 150, // Fewer iterations for faster stabilization
        updateInterval: 50
      },
      barnesHut: {
        gravitationalConstant: -5000, // Repel force 5000
        centralGravity: 0.00, // Center force 0.00
        springLength: 200, // Link distance 200
        springConstant: 0.01, // Link force 0.01
        damping: 0.15, // More damping for smoother movement
        avoidOverlap: 0.5 // Better overlap prevention
      }
    },
    interaction: {
      hover: true,
      tooltipDelay: 100, // Faster tooltip appearance
      hideEdgesOnDrag: false,
      hideNodesOnDrag: false,
      navigationButtons: false,
      keyboard: true
    },
    layout: {
      improvedLayout: true,
      clusterThreshold: 150,
      randomSeed: 42 // Consistent random seed for reproducible layouts
    }
  }), [physicsEnabled]);

  // Enhanced event handlers with exact Obsidian hover behavior
  const events = useMemo(() => {
    const eventHandlers: { [key: string]: (params: any) => void } = {
      select: (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = filteredData.nodes.find(n => n.id === nodeId);
          if (node) {
            setSelectedNode(node);
            onNodeSelect?.(node);
          }
        } else if (params.edges.length > 0) {
          const edgeId = params.edges[0];
          const edge = filteredData.edges.find(e => e.id === edgeId);
          if (edge) {
            setSelectedEdge(edge);
            onEdgeSelect?.(edge);
          }
        } else {
          setSelectedNode(null);
          setSelectedEdge(null);
        }
      },
      click: (params) => {
        // Handle click events
      },
      doubleClick: (params) => {
        // Handle double click to focus on node
        if (params.nodes.length > 0 && networkRef.current) {
          networkRef.current.focus(params.nodes[0], {
            scale: 1.5,
            animation: {
              duration: 1000,
              easingFunction: 'easeInOutQuad'
            }
          });
        }
      },
      hoverNode: (params) => {
        // Exact Obsidian behavior: highlight connected nodes, fade others
        if (params.node && networkRef.current) {
          const nodeId = params.node;
          
          // Find all connected nodes
          const connectedNodeIds = new Set<string>();
          connectedNodeIds.add(nodeId);
          
          filteredData.edges.forEach(edge => {
            if (edge.from === nodeId) {
              connectedNodeIds.add(edge.to);
            }
            if (edge.to === nodeId) {
              connectedNodeIds.add(edge.from);
            }
          });
          
          // Update all nodes: highlight connected ones, fade others
          const allNodeIds = networkRef.current.body.data.nodes.getIds();
          allNodeIds.forEach((id: string) => {
            const isConnected = connectedNodeIds.has(id);
            networkRef.current.body.data.nodes.update({
              id: id,
              opacity: isConnected ? 1.0 : 0.15, // Fade non-connected to 15%
              borderWidth: 1.5, // Keep consistent border width
              color: {
                border: isConnected ? '#8b5cf6' : '#4b5563',
                background: isConnected ? '#2d1b69' : '#1a1a1a'
              }
            });
          });
          
          // Update all edges: highlight connected ones, fade others
          const allEdgeIds = networkRef.current.body.data.edges.getIds();
          allEdgeIds.forEach((id: string) => {
            const edge = filteredData.edges.find(e => e.id === id);
            const isConnected = edge && (edge.from === nodeId || edge.to === nodeId);
            networkRef.current.body.data.edges.update({
              id: id,
              opacity: isConnected ? 1.0 : 0.1, // Fade non-connected edges to 10%
              width: isConnected ? 1.5 : 0.8,
              color: {
                color: isConnected ? '#8b5cf6' : '#4b5563'
              }
            });
          });
        }
      },
      blurNode: (params) => {
        // Restore all nodes and edges to full opacity
        if (networkRef.current) {
          const allNodeIds = networkRef.current.body.data.nodes.getIds();
          const allEdgeIds = networkRef.current.body.data.edges.getIds();
          
          // Restore all nodes
          allNodeIds.forEach((id: string) => {
            networkRef.current.body.data.nodes.update({
              id: id,
              opacity: 1.0,
              borderWidth: 1.5,
              color: {
                border: '#6b7280',
                background: '#1a1a1a'
              }
            });
          });
          
          // Restore all edges
          allEdgeIds.forEach((id: string) => {
            networkRef.current.body.data.edges.update({
              id: id,
              opacity: 0.6,
              width: 1.5,
              color: {
                color: '#4b5563'
              }
            });
          });
        }
      },
      dragStart: (params) => {
        // When dragging starts, maintain hover state
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          // Trigger hover behavior to maintain highlighting
          setTimeout(() => {
            if (networkRef.current) {
              networkRef.current.emit('hoverNode', { node: nodeId });
            }
          }, 0);
        }
      },
      dragging: (params) => {
        // While dragging, maintain highlight state
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          // Continuously emit hover to maintain highlighting during drag
          if (networkRef.current) {
            networkRef.current.emit('hoverNode', { node: nodeId });
          }
        }
      },
      dragEnd: (params) => {
        // When dragging ends, clear hover state
        if (networkRef.current) {
          networkRef.current.emit('blurNode', { node: params.nodes[0] });
        }
      },
      zoom: (params) => {
        // Handle zoom events
      }
    };
    return eventHandlers;
  }, [filteredData, onNodeSelect, onEdgeSelect]);

  // Control functions
  const handleZoomIn = useCallback(() => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale * 1.2 });
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale * 0.8 });
    }
  }, []);

  const handleFit = useCallback(() => {
    if (networkRef.current) {
      networkRef.current.fit({
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  }, []);

  const handleTogglePhysics = useCallback(() => {
    setPhysicsEnabled(prev => !prev);
  }, []);

  const handleResetView = useCallback(() => {
    if (networkRef.current) {
      networkRef.current.fit();
      setPhysicsEnabled(true);
      setSearchTerm('');
      setNodeFilter('all');
    }
  }, []);

  const handleFocusNode = useCallback((nodeId: string) => {
    if (networkRef.current) {
      networkRef.current.focus(nodeId, {
        scale: 2,
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  }, []);

  // Network reference callback
  const handleNetworkReady = useCallback((network: any) => {
    networkRef.current = network;
    setIsLoading(false);
    
    // Customize node appearance based on type
    network.on('beforeDrawing', (ctx: any) => {
      // Add custom drawing if needed
    });
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const nodeTypes = new Set(filteredData.nodes.map(n => n.type));
    const edgeTypes = new Set(filteredData.edges.map(e => e.type));
    
    return {
      totalNodes: filteredData.nodes.length,
      totalEdges: filteredData.edges.length,
      nodeTypes: nodeTypes.size,
      edgeTypes: edgeTypes.size,
      notes: filteredData.nodes.filter(n => n.type === 'note').length,
      tags: filteredData.nodes.filter(n => n.type === 'tag').length,
      folders: filteredData.nodes.filter(n => n.type === 'folder').length,
    };
  }, [filteredData]);

  return (
    <div className={styles.graphContainer} style={{ width, height }}>
      <Graph
        graph={filteredData}
        options={graphOptions}
        events={events}
        style={{ width: '100%', height: '100%' }}
        getNetwork={handleNetworkReady}
      />
    </div>
  );
};

export default ObsidianKnowledgeGraph;



// ============================================================
// Source: types.ts
// ============================================================
export interface ObsidianNode {
  id: string;
  label: string;
  title?: string;
  type: 'note' | 'tag' | 'folder' | 'attachment';
  color?: {
    background: string;
    border: string;
    highlight: string;
    hover: string;
  };
  size?: number;
  font?: {
    color: string;
    size: number;
    face: string;
  };
  borderWidth?: number;
  shape?: 'dot' | 'square' | 'triangle' | 'star' | 'database' | 'box' | 'ellipse' | 'circle' | 'icon';
  image?: string;
  value?: number;
  level?: number;
  x?: number;
  y?: number;
  fixed?: {
    x?: boolean;
    y?: boolean;
  };
  physics?: boolean;
  hidden?: boolean;
  chosen?: {
    node?: boolean;
    edge?: boolean;
  };
  chosenValue?: number;
  scaling?: {
    min?: number;
    max?: number;
    label?: {
      enabled?: boolean;
      min?: number;
      max?: number;
      maxVisible?: number;
      drawThreshold?: number;
    };
  };
}

export interface ObsidianEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  type: 'link' | 'backlink' | 'tag' | 'hierarchy';
  color?: {
    color: string;
    highlight: string;
    hover: string;
  };
  width?: number;
  length?: number;
  dashes?: boolean | number[];
  arrows?: {
    to?: {
      enabled: boolean;
      scaleFactor?: number;
      type?: 'arrow' | 'bar' | 'circle' | 'curve' | 'box' | 'crow' | 'diamond' | 'inv_curve' | 'inv_triangle' | 'triangle' | 'vee';
    };
    from?: {
      enabled: boolean;
      scaleFactor?: number;
      type?: 'arrow' | 'bar' | 'circle' | 'curve' | 'box' | 'crow' | 'diamond' | 'inv_curve' | 'inv_triangle' | 'triangle' | 'vee';
    };
    middle?: {
      enabled: boolean;
      scaleFactor?: number;
      type?: 'arrow' | 'bar' | 'circle' | 'curve' | 'box' | 'crow' | 'diamond' | 'inv_curve' | 'inv_triangle' | 'triangle' | 'vee';
    };
  };
  smooth?: {
    enabled: boolean;
    type?: 'continuous' | 'discrete' | 'diagonalCross' | 'straightCross' | 'horizontal' | 'vertical' | 'curvedCW' | 'curvedCCW';
    roundness?: number;
    forceDirection?: 'none' | 'horizontal' | 'vertical' | 'radial';
  };
  physics?: boolean;
  hidden?: boolean;
  chosen?: {
    edge?: boolean;
  };
  chosenValue?: number;
  value?: number;
  selfReferenceSize?: number;
  selfReference?: {
    size?: number;
    angle?: number;
    render?: 'circle' | 'loop';
  };
}

export interface ObsidianGraphData {
  nodes: ObsidianNode[];
  edges: ObsidianEdge[];
}

export interface ObsidianGraphOptions {
  nodes: {
    shape: string;
    size: number;
    font: {
      color: string;
      size: number;
      face: string;
    };
    borderWidth: number;
    borderWidthSelected: number;
    color: {
      border: string;
      background: string;
      highlight: {
        border: string;
        background: string;
      };
      hover: {
        border: string;
        background: string;
      };
    };
    scaling: {
      min: number;
      max: number;
    };
  };
  edges: {
    width: number;
    color: {
      color: string;
      highlight: string;
      hover: string;
    };
    smooth: {
      enabled: boolean;
      type: string;
      roundness: number;
    };
    arrows: {
      to: {
        enabled: boolean;
        scaleFactor: number;
      };
    };
  };
  physics: {
    enabled: boolean;
    stabilization: {
      enabled: boolean;
      iterations: number;
      updateInterval: number;
    };
    barnesHut: {
      gravitationalConstant: number;
      centralGravity: number;
      springLength: number;
      springConstant: number;
      damping: number;
      avoidOverlap: number;
    };
  };
  interaction: {
    hover: boolean;
    tooltipDelay: number;
    hideEdgesOnDrag: boolean;
    hideNodesOnDrag: boolean;
    navigationButtons: boolean;
    keyboard: boolean;
  };
  layout: {
    improvedLayout: boolean;
    clusterThreshold: number;
  };
}

export interface GraphEventHandlers {
  select?: (params: { nodes: string[]; edges: string[] }) => void;
  click?: (params: { nodes: string[]; edges: string[]; event: MouseEvent }) => void;
  doubleClick?: (params: { nodes: string[]; edges: string[]; event: MouseEvent }) => void;
  hoverNode?: (params: { node: string }) => void;
  blurNode?: (params: { node: string }) => void;
  hoverEdge?: (params: { edge: string }) => void;
  blurEdge?: (params: { edge: string }) => void;
  dragStart?: (params: { nodes: string[]; event: MouseEvent }) => void;
  dragging?: (params: { nodes: string[]; event: MouseEvent }) => void;
  dragEnd?: (params: { nodes: string[]; event: MouseEvent }) => void;
  zoom?: (params: { scale: number; pointer: { x: number; y: number } }) => void;
  showPopup?: (params: { id: string; dom: HTMLElement }) => void;
  hidePopup?: () => void;
}

export interface ObsidianGraphControls {
  zoomIn: () => void;
  zoomOut: () => void;
  fit: () => void;
  togglePhysics: () => void;
  resetView: () => void;
  focusNode: (nodeId: string) => void;
  getNetwork: () => any;
}
