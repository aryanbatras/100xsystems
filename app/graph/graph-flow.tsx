'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Handle,
  Position,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import styles from '@/presentation/_styles/css/graph.module.css';

interface NodeData extends Record<string, unknown> {
  label: string;
  type: 'roadmap' | 'article';
  description?: string;
  estimatedTime?: string;
  tags?: string[];
  skills?: string[];
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export type CustomNode = Node<NodeData>;

function RoadmapNode({ data }: { data: NodeData }) {
  return (
    <div className={styles.roadmapNode}>
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <div className={styles.nodeHeader}>
        <span className={styles.nodeType}>Roadmap</span>
        {data.category && <span className={styles.category}>{data.category}</span>}
      </div>
      <div className={styles.nodeTitle}>{data.label}</div>
      {data.description && <div className={styles.nodeDescription}>{data.description}</div>}
      {data.estimatedTime && <div className={styles.nodeMeta}>⏱️ {data.estimatedTime}</div>}
      {data.skills && data.skills.length > 0 && (
        <div className={styles.nodeSkills}>
          {data.skills.slice(0, 3).map((skill: string) => <span key={skill} className={styles.skill}>{skill}</span>)}
          {data.skills.length > 3 && <span className={styles.more}>+{data.skills.length - 3}</span>}
        </div>
      )}
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
}

function ArticleNode({ data }: { data: NodeData }) {
  return (
    <div className={styles.articleNode}>
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <div className={styles.nodeHeader}>
        <span className={styles.nodeType}>Article</span>
        {data.difficulty && <span className={`${styles.difficulty} ${styles[data.difficulty]}`}>{data.difficulty}</span>}
      </div>
      <div className={styles.nodeTitle}>{data.label}</div>
      {data.description && <div className={styles.nodeDescription}>{data.description}</div>}
      {data.tags && data.tags.length > 0 && (
        <div className={styles.nodeTags}>
          {data.tags.slice(0, 2).map((tag: string) => <span key={tag} className={styles.tag}>{tag}</span>)}
          {data.tags.length > 2 && <span className={styles.more}>+{data.tags.length - 2}</span>}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  );
}

const nodeTypes = { roadmap: RoadmapNode, article: ArticleNode };

export function KnowledgeGraphFlow({ initialNodes, initialEdges }: { initialNodes: CustomNode[]; initialEdges: Edge[] }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: 'all' as 'all' | 'roadmap' | 'article', category: 'all' as string, difficulty: 'all' as string });
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const onConnect = useCallback((params: Connection) => setEdges(ed => addEdge(params, ed)), [setEdges]);
  const onNodeClick = useCallback((_event: React.MouseEvent, node: CustomNode) => setSelectedNode(node), []);

  const filteredNodes = useMemo(() => {
    let filtered = nodes;
    if (filters.type !== 'all') filtered = filtered.filter(n => n.data.type === filters.type);
    if (filters.category !== 'all') filtered = filtered.filter(n => n.data.type === 'roadmap' ? n.data.category === filters.category : true);
    if (filters.difficulty !== 'all') filtered = filtered.filter(n => n.data.type === 'article' ? n.data.difficulty === filters.difficulty : true);
    if (searchTerm) filtered = filtered.filter(n =>
      n.data.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.data.tags && (n.data.tags as string[]).some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (n.data.skills && (n.data.skills as string[]).some(s => s.toLowerCase().includes(searchTerm.toLowerCase())))
    );
    return filtered;
  }, [nodes, filters, searchTerm]);

  const filteredEdges = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    return edges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target)).map(e => ({
      ...e,
      style: { stroke: '#1a1a1a', strokeWidth: 2 },
    }));
  }, [edges, filteredNodes]);

  const categories = useMemo(() => Array.from(new Set(nodes.map(n => n.data.category).filter(Boolean))), [nodes]);
  const difficulties = useMemo(() => Array.from(new Set(nodes.map(n => n.data.difficulty).filter(Boolean))), [nodes]);

  const resetFilters = useCallback(() => { setFilters({ type: 'all', category: 'all', difficulty: 'all' }); setSearchTerm(''); }, []);
  const handleFitView = useCallback(() => fitView({ padding: 0.2, duration: 800 }), [fitView]);

  useEffect(() => { setTimeout(() => handleFitView(), 100); }, [filteredNodes.length, filteredEdges.length, handleFitView]);

  return (
    <div className={styles.graphContainer}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <button className={styles.toggleButton} onClick={() => zoomIn()}>🔍+ Zoom In</button>
          <button className={styles.toggleButton} onClick={() => zoomOut()}>🔍- Zoom Out</button>
          <button className={styles.controlButton} onClick={handleFitView}>📐 Fit to Screen</button>
          <button className={styles.controlButton} onClick={resetFilters}>🔄 Reset Filters</button>
        </div>
        <div className={styles.controlGroup}>
          <input type="text" placeholder="Search nodes..." className={styles.searchInput} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className={styles.controlGroup}>
          <select className={styles.select} value={filters.type} onChange={e => setFilters(prev => ({ ...prev, type: e.target.value as 'all' | 'roadmap' | 'article' }))}>
            <option value="all">All Types</option><option value="roadmap">Roadmaps</option><option value="article">Articles</option>
          </select>
          <select className={styles.select} value={filters.category} onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))} disabled={filters.type === 'article'}>
            <option value="all">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select className={styles.select} value={filters.difficulty} onChange={e => setFilters(prev => ({ ...prev, difficulty: e.target.value }))} disabled={filters.type === 'roadmap'}>
            <option value="all">All Difficulties</option>
            {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
          </select>
        </div>
      </div>
      <div className={styles.graphMain}>
        <div className={styles.graphVisualization}>
          <ReactFlow nodes={filteredNodes} edges={filteredEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={onNodeClick} nodeTypes={nodeTypes} fitView attributionPosition="bottom-left">
            <Background color="#1a1a1a" gap={16} />
            <Controls className={styles.controlsPanel} />
          </ReactFlow>
        </div>
        {selectedNode && (
          <div className={styles.nodeDetails}>
            <button className={styles.closeButton} onClick={() => setSelectedNode(null)}>✕</button>
            <h3>{selectedNode.data.label}</h3>
            <div className={styles.nodeMeta}>
              <span className={`${styles.nodeType} ${styles[selectedNode.data.type as string]}`}>{selectedNode.data.type}</span>
              {selectedNode.data.difficulty && <span className={`${styles.difficulty} ${styles[selectedNode.data.difficulty as string]}`}>{selectedNode.data.difficulty}</span>}
              {selectedNode.data.category && <span className={styles.category}>{selectedNode.data.category}</span>}
            </div>
            {selectedNode.data.description && <p className={styles.description}>{selectedNode.data.description}</p>}
            {selectedNode.data.estimatedTime && <div className={styles.metaItem}><strong>Estimated Time:</strong> {selectedNode.data.estimatedTime}</div>}
            {selectedNode.data.tags && (selectedNode.data.tags as string[]).length > 0 && (
              <div className={styles.metaItem}>
                <strong>Tags:</strong>
                <div className={styles.tags}>{(selectedNode.data.tags as string[]).map((tag: string) => <span key={tag} className={styles.tag}>{tag}</span>)}</div>
              </div>
            )}
            {selectedNode.data.skills && (selectedNode.data.skills as string[]).length > 0 && (
              <div className={styles.metaItem}>
                <strong>Skills:</strong>
                <div className={styles.tags}>{(selectedNode.data.skills as string[]).map((s: string) => <span key={s} className={styles.tag}>{s}</span>)}</div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.analytics}>
        <div className={styles.analyticsGrid}>
          <div className={styles.analyticsItem}><div className={styles.analyticsNumber}>{nodes.filter(n => n.data.type === 'roadmap').length}</div><div className={styles.analyticsLabel}>ROADMAPS</div></div>
          <div className={styles.analyticsItem}><div className={styles.analyticsNumber}>{nodes.filter(n => n.data.type === 'article').length}</div><div className={styles.analyticsLabel}>ARTICLES</div></div>
          <div className={styles.analyticsItem}><div className={styles.analyticsNumber}>{filteredNodes.length}</div><div className={styles.analyticsLabel}>VISIBLE NODES</div></div>
          <div className={styles.analyticsItem}><div className={styles.analyticsNumber}>{filteredEdges.length}</div><div className={styles.analyticsLabel}>CONNECTIONS</div></div>
        </div>
      </div>
    </div>
  );
}
