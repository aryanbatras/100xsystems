import { Metadata } from 'next';
import { RoadmapsPage } from '@/presentation/features/roadmaps.feature';
import { StaticSiteGenerator, KnowledgeGraph } from '@/infrastructure/staticSiteGenerator';

async function getKnowledgeGraph(): Promise<KnowledgeGraph> {
  try {
    return await StaticSiteGenerator.buildKnowledgeGraph();
  } catch (error) {
    return {
      roadmaps: {},
      articles: {},
      relationships: {
        byRoadmap: {}, bySection: {}, byTag: {}, byDifficulty: {}, byCategory: {}, bySkill: {}, byTechnology: {}, prerequisites: {}, related: {},
      },
      analytics: {
        totalRoadmaps: 0, totalArticles: 0, averageDifficulty: 0, mostPopularSkills: [], learningPaths: [],
      },
    } as KnowledgeGraph;
  }
}

export const metadata: Metadata = {
  title: 'Roadmaps - 100x Systems',
  description: 'Explore our structured learning roadmaps covering software engineering, system design, and more.',
};

export default async function RoadmapsIndexPage() {
  const knowledgeGraph = await getKnowledgeGraph();
  return <RoadmapsPage knowledgeGraph={knowledgeGraph} />;
}
