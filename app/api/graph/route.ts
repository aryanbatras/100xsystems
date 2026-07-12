import { NextRequest, NextResponse } from 'next/server';
import { StaticSiteGenerator } from '@/infrastructure/staticSiteGenerator';

interface GraphNode {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    type: 'roadmap' | 'article';
    description?: string;
    category?: string;
    difficulty?: string;
    skills?: string[];
    technologies?: string[];
    estimatedTime?: string;
    tags?: string[];
    level?: number;
  };
  type: string;
  style?: React.CSSProperties;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  data?: { label?: string; type: string };
  type?: string;
  style?: React.CSSProperties;
  animated?: boolean;
}

export async function GET() {
  try {
    const knowledgeGraph = await StaticSiteGenerator.buildKnowledgeGraph();

    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    const analytics = {
      totalNodes: 0,
      totalEdges: 0,
      categories: {} as Record<string, number>,
      difficulties: {} as Record<string, number>,
      roadmaps: 0,
      articles: 0,
      edgesByType: {} as Record<string, number>,
    };

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
          label: roadmap.title,
          type: 'roadmap',
          description: roadmap.description,
          category: roadmap.category,
          skills: roadmap.skills,
          technologies: roadmap.technologies,
          estimatedTime: roadmap.estimatedTime,
          level: roadmap.level,
        },
        type: 'roadmap',
        style: {
          background: getCategoryColor(roadmap.category),
          border: '2px solid #1a192b',
          borderRadius: '8px',
          padding: '12px',
          minWidth: '200px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#ffffff',
        },
      });
      analytics.roadmaps++;
      analytics.categories[roadmap.category] = (analytics.categories[roadmap.category] || 0) + 1;
      currentY += rowHeight;
    });

    Object.entries(knowledgeGraph.articles || {}).forEach(([articleSlug, article], articleIndex) => {
      const roadmapSlug = article.roadmaps?.[0];
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
            description: `Article in ${article.section}`,
            difficulty: article.difficulty,
            tags: article.tags,
            skills: [],
            technologies: [],
          },
          type: 'article',
          style: {
            background: getDifficultyColor(article.difficulty),
            border: '2px solid #1a192b',
            borderRadius: '6px',
            padding: '8px',
            minWidth: '150px',
            fontSize: '12px',
            color: '#ffffff',
          },
        });
        analytics.articles++;
        analytics.difficulties[article.difficulty] = (analytics.difficulties[article.difficulty] || 0) + 1;

        edges.push({
          id: `${roadmapSlug}-${articleSlug}`,
          source: roadmapSlug,
          target: articleSlug,
          data: { label: 'contains', type: 'contains' },
          type: 'smoothstep',
          style: { stroke: '#1a1a1a', strokeWidth: 3 },
          animated: true,
        });
      }
    });

    // Prerequisite edges
    Object.entries(knowledgeGraph.relationships?.prerequisites || {}).forEach(([articleSlug, prerequisites]) => {
      (prerequisites as string[]).forEach(prereqSlug => {
        if (positions.has(articleSlug) && positions.has(prereqSlug)) {
          edges.push({
            id: `${prereqSlug}-${articleSlug}-prereq`,
            source: prereqSlug,
            target: articleSlug,
            data: { label: 'prerequisite', type: 'prerequisite' },
            type: 'smoothstep',
            style: { stroke: '#6b7280', strokeWidth: 2 },
            animated: true,
          });
        }
      });
    });

    // Related article edges
    Object.entries(knowledgeGraph.relationships?.related || {}).forEach(([articleSlug, related]) => {
      (related as string[]).forEach(relatedSlug => {
        if (positions.has(articleSlug) && positions.has(relatedSlug)) {
          edges.push({
            id: `${articleSlug}-${relatedSlug}-related`,
            source: articleSlug,
            target: relatedSlug,
            data: { label: 'related', type: 'related' },
            type: 'smoothstep',
            style: { stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5,5' },
            animated: false,
          });
        }
      });
    });

    analytics.totalNodes = nodes.length;
    analytics.totalEdges = edges.length;

    return NextResponse.json({ nodes, edges, analytics });
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to generate knowledge graph',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function getCategoryColor(category?: string): string {
  return '#ffffff';
}

function getDifficultyColor(difficulty?: string): string {
  return '#ffffff';
}
