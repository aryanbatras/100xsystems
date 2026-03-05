import { NextApiRequest, NextApiResponse } from 'next';
import { StaticSiteGenerator } from '../../core/infrastructure/staticSiteGenerator';

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
  data?: {
    label?: string;
    type: string;
  };
  type?: string;
  style?: React.CSSProperties;
  animated?: boolean;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  analytics: {
    totalNodes: number;
    totalEdges: number;
    categories: Record<string, number>;
    difficulties: Record<string, number>;
    roadmaps: number;
    articles: number;
    edgesByType: Record<string, number>;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('🔗 Building knowledge graph for React Flow...');
    
    // Build the knowledge graph using existing infrastructure
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
    };

    // Position tracking for layout
    const positions = new Map<string, { x: number; y: number }>();
    let currentY = 0;
    const rowHeight = 150;
    const nodeSpacing = 250;
    const categorySpacing = 400;

    // Create roadmap nodes
    Object.entries(knowledgeGraph.roadmaps).forEach(([roadmapSlug, roadmap], roadmapIndex) => {
      const x = roadmapIndex * categorySpacing;
      const y = currentY;
      
      positions.set(roadmapSlug, { x, y });
      
      const node: GraphNode = {
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
      };
      
      nodes.push(node);
      analytics.roadmaps++;
      analytics.categories[roadmap.category] = (analytics.categories[roadmap.category] || 0) + 1;
      
      currentY += rowHeight;
    });

    // Create article nodes and connect them to roadmaps
    Object.entries(knowledgeGraph.articles).forEach(([articleSlug, article], articleIndex) => {
      // Find which roadmap this article belongs to
      const roadmapSlug = article.roadmaps[0]; // Use first roadmap
      const roadmapPosition = positions.get(roadmapSlug);
      
      if (roadmapPosition) {
        const x = roadmapPosition.x + nodeSpacing + (articleIndex % 3) * 150;
        const y = roadmapPosition.y + Math.floor(articleIndex / 3) * 100;
        
        positions.set(articleSlug, { x, y });
        
        const node: GraphNode = {
          id: articleSlug,
          position: { x, y },
          data: {
            label: articleSlug, // Use slug as label since title is not in manifest
            type: 'article',
            description: `Article in ${article.section}`,
            difficulty: article.difficulty,
            tags: article.tags,
            skills: [], // Not in manifest
            technologies: [], // Not in manifest
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
        };
        
        nodes.push(node);
        analytics.articles++;
        analytics.difficulties[article.difficulty] = (analytics.difficulties[article.difficulty] || 0) + 1;
        
        // Create edge from roadmap to article
        const edge: GraphEdge = {
          id: `${roadmapSlug}-${articleSlug}`,
          source: roadmapSlug,
          target: articleSlug,
          data: {
            label: 'contains',
            type: 'contains',
          },
          type: 'smoothstep',
          style: {
            stroke: '#1a1a1a',
            strokeWidth: 3,
          },
          animated: true,
        };
        
        edges.push(edge);
      }
    });

    // Add prerequisite relationships
    Object.entries(knowledgeGraph.relationships.prerequisites || {}).forEach(([articleSlug, prerequisites]) => {
      prerequisites.forEach(prereqSlug => {
        if (positions.has(articleSlug) && positions.has(prereqSlug)) {
          const edge: GraphEdge = {
            id: `${prereqSlug}-${articleSlug}-prereq`,
            source: prereqSlug,
            target: articleSlug,
            data: {
              label: 'prerequisite',
              type: 'prerequisite',
            },
            type: 'smoothstep',
            style: {
              stroke: '#6b7280',
              strokeWidth: 2,
            },
            animated: true,
          };
          
          edges.push(edge);
        }
      });
    });

    // Add related article relationships
    Object.entries(knowledgeGraph.relationships.related || {}).forEach(([articleSlug, related]) => {
      related.forEach(relatedSlug => {
        if (positions.has(articleSlug) && positions.has(relatedSlug)) {
          const edge: GraphEdge = {
            id: `${articleSlug}-${relatedSlug}-related`,
            source: articleSlug,
            target: relatedSlug,
            data: {
              label: 'related',
              type: 'related',
            },
            type: 'smoothstep',
            style: {
              stroke: '#3b82f6',
              strokeWidth: 1,
              strokeDasharray: '5,5',
            },
            animated: false,
          };
          
          edges.push(edge);
        }
      });
    });

    // Add skill-based connections between articles (using tags as skills proxy)
    const skillConnections = new Map<string, string[]>();
    Object.entries(knowledgeGraph.articles).forEach(([articleSlug, article]) => {
      if (article.tags) {
        article.tags.forEach((tag: string) => {
          if (!skillConnections.has(tag)) {
            skillConnections.set(tag, []);
          }
          skillConnections.get(tag)!.push(articleSlug);
        });
      }
    });

    // Create edges between articles with shared skills (tags)
    skillConnections.forEach((articles, skill) => {
      if (articles.length > 1) {
        for (let i = 0; i < articles.length - 1; i++) {
          for (let j = i + 1; j < articles.length; j++) {
            const sourceArticle = articles[i];
            const targetArticle = articles[j];
            
            if (positions.has(sourceArticle) && positions.has(targetArticle)) {
              const edge: GraphEdge = {
                id: `${sourceArticle}-${targetArticle}-skill-${skill}`,
                source: sourceArticle,
                target: targetArticle,
                data: {
                  label: `shared skill: ${skill}`,
                  type: 'skill',
                },
                type: 'smoothstep',
                style: {
                  stroke: '#10b981',
                  strokeWidth: 1,
                  strokeDasharray: '2,2',
                },
                animated: false,
              };
              
              edges.push(edge);
            }
          }
        }
      }
    });

    // Add technology-based connections between articles (using tags as tech proxy)
    const techConnections = new Map<string, string[]>();
    Object.entries(knowledgeGraph.articles).forEach(([articleSlug, article]) => {
      if (article.tags) {
        article.tags.forEach((tag: string) => {
          if (!techConnections.has(tag)) {
            techConnections.set(tag, []);
          }
          techConnections.get(tag)!.push(articleSlug);
        });
      }
    });

    // Create edges between articles with shared technologies (tags)
    techConnections.forEach((articles, tech) => {
      if (articles.length > 1) {
        for (let i = 0; i < articles.length - 1; i++) {
          for (let j = i + 1; j < articles.length; j++) {
            const sourceArticle = articles[i];
            const targetArticle = articles[j];
            
            if (positions.has(sourceArticle) && positions.has(targetArticle)) {
              const edge: GraphEdge = {
                id: `${sourceArticle}-${targetArticle}-tech-${tech}`,
                source: sourceArticle,
                target: targetArticle,
                data: {
                  label: `shared tech: ${tech}`,
                  type: 'technology',
                },
                type: 'smoothstep',
                style: {
                  stroke: '#f59e0b',
                  strokeWidth: 1,
                  strokeDasharray: '3,3',
                },
                animated: false,
              };
              
              edges.push(edge);
            }
          }
        }
      }
    });

    // Add category-based connections between roadmaps
    const roadmapCategories = new Map<string, string[]>();
    Object.entries(knowledgeGraph.roadmaps).forEach(([roadmapSlug, roadmap]) => {
      if (roadmap.category) {
        if (!roadmapCategories.has(roadmap.category)) {
          roadmapCategories.set(roadmap.category, []);
        }
        roadmapCategories.get(roadmap.category)!.push(roadmapSlug);
      }
    });

    // Create edges between roadmaps in the same category
    roadmapCategories.forEach((roadmaps, category) => {
      if (roadmaps.length > 1) {
        for (let i = 0; i < roadmaps.length - 1; i++) {
          for (let j = i + 1; j < roadmaps.length; j++) {
            const sourceRoadmap = roadmaps[i];
            const targetRoadmap = roadmaps[j];
            
            if (positions.has(sourceRoadmap) && positions.has(targetRoadmap)) {
              const edge: GraphEdge = {
                id: `${sourceRoadmap}-${targetRoadmap}-category-${category}`,
                source: sourceRoadmap,
                target: targetRoadmap,
                data: {
                  label: `same category: ${category}`,
                  type: 'category',
                },
                type: 'smoothstep',
                style: {
                  stroke: '#8b5cf6',
                  strokeWidth: 1.5,
                  strokeDasharray: '8,4',
                },
                animated: false,
              };
              
              edges.push(edge);
            }
          }
        }
      }
    });

    // Add difficulty progression connections between articles
    const difficultyProgression = {
      'beginner': 'intermediate',
      'intermediate': 'advanced',
      'advanced': null
    };

    Object.entries(knowledgeGraph.articles).forEach(([articleSlug, article]) => {
      const currentDifficulty = article.difficulty;
      const nextDifficulty = difficultyProgression[currentDifficulty as keyof typeof difficultyProgression];
      
      if (nextDifficulty && positions.has(articleSlug)) {
        // Find articles with the next difficulty level
        Object.entries(knowledgeGraph.articles).forEach(([targetSlug, targetArticle]) => {
          if (targetArticle.difficulty === nextDifficulty && positions.has(targetSlug)) {
            const edge: GraphEdge = {
              id: `${articleSlug}-${targetSlug}-progression`,
              source: articleSlug,
              target: targetSlug,
              data: {
                label: 'difficulty progression',
                type: 'progression',
              },
              type: 'smoothstep',
              style: {
                stroke: '#22c55e',
                strokeWidth: 1,
                strokeDasharray: '10,5',
              }
            }
            
            edges.push(edge);
          }
        })
      }
    })


    // Update analytics
    analytics.totalNodes = nodes.length;
    analytics.totalEdges = edges.length;

  console.log(`✅ Generated React Flow graph with ${nodes.length} nodes and ${edges.length} edges`);

    return res.status(200).json({
      nodes,
      edges,
      analytics,
    });
  } catch (error: any) {
    console.error('❌ Error generating graph:', error);
    return res.status(500).json({ 
      error: 'Failed to generate knowledge graph',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function getCategoryColor(category?: string): string {
  const colors: Record<string, string> = {
    foundation: '#ffffff',
    frontend: '#ffffff', 
    backend: '#ffffff',
    devops: '#ffffff',
    mobile: '#ffffff',
    ai: '#ffffff',
    database: '#ffffff',
    security: '#ffffff',
  };
  return colors[category || 'foundation'];
}

function getDifficultyColor(difficulty?: string): string {
  const colors: Record<string, string> = {
    beginner: '#ffffff',
    intermediate: '#ffffff',
    advanced: '#ffffff',
  };
  return colors[difficulty || 'beginner'];
}
