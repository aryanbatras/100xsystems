import { Metadata } from 'next';
import { StaticSiteGenerator } from '@/infrastructure/staticSiteGenerator';
import { KnowledgeGraphFlow, CustomNode } from './graph-flow';
import { ReactFlowProvider } from '@xyflow/react';
import { Edge } from '@xyflow/react';
import styles from '@/presentation/_styles/css/graph.module.css';

export const metadata: Metadata = {
  title: 'Knowledge Graph - 100x Systems',
  description: 'Interactive visualization of learning roadmaps and articles relationships',
  openGraph: {
    title: 'Knowledge Graph - 100x Systems',
    description: 'Interactive visualization of learning roadmaps and articles relationships',
    type: 'website',
  },
};

async function getGraphData() {
  try {
    const knowledgeGraph = await StaticSiteGenerator.buildKnowledgeGraph();
    const nodes: CustomNode[] = [];
    const edges: Edge[] = [];
    const positions = new Map<string, { x: number; y: number }>();
    let currentY = 0;
    const rowHeight = 150;
    const nodeSpacing = 250;
    const categorySpacing = 400;

    Object.entries(knowledgeGraph.roadmaps || {}).forEach(([roadmapSlug, roadmap], roadmapIndex) => {
      const x = roadmapIndex * categorySpacing;
      const y = currentY;
      positions.set(roadmapSlug, { x, y });
      nodes.push({
        id: roadmapSlug,
        position: { x, y },
        data: {
          label: (roadmap as any).title || roadmapSlug,
          type: 'roadmap',
          description: (roadmap as any).description,
          category: (roadmap as any).category,
          skills: (roadmap as any).skills,
          estimatedTime: (roadmap as any).estimatedTime,
        },
        type: 'roadmap',
      });
      currentY += rowHeight;
    });

    let articleIndex = 0;
    Object.entries(knowledgeGraph.articles || {}).forEach(([articleSlug, article]) => {
      const roadmapSlug = (article as any).roadmaps?.[0];
      const roadmapPosition = roadmapSlug ? positions.get(roadmapSlug) : undefined;
      if (roadmapPosition) {
        const x = roadmapPosition.x + nodeSpacing + (articleIndex % 3) * 150;
        const y = roadmapPosition.y + Math.floor(articleIndex / 3) * 100;
        positions.set(articleSlug, { x, y });
        nodes.push({
          id: articleSlug,
          position: { x, y },
          data: {
            label: articleSlug,
            type: 'article',
            description: `Article in ${(article as any).section || 'unknown'}`,
            difficulty: (article as any).difficulty,
            tags: (article as any).tags,
          },
          type: 'article',
        });
        edges.push({ id: `${roadmapSlug}-${articleSlug}`, source: roadmapSlug, target: articleSlug });
        articleIndex++;
      }
    });

    return { nodes, edges };
  } catch (error) {
    return { nodes: [] as CustomNode[], edges: [] as Edge[] };
  }
}

export default async function GraphPage() {
  const { nodes, edges } = await getGraphData();

  return (
    <ReactFlowProvider>
      <div className={styles.graphContainer}>
        <div className={styles.graphWrapper}>
          <header className={styles.graphHeader}>
            <h1>Knowledge Graph</h1>
            <p className={styles.graphDescription}>
              Interactive visualization of learning roadmaps and articles relationships.
              Explore connections between different learning paths and discover related content.
            </p>
          </header>
          <KnowledgeGraphFlow initialNodes={nodes} initialEdges={edges} />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
