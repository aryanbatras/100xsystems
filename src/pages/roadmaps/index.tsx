/**
 * Roadmaps page — Framework layer
 * Component lives in src/presentation/features/roadmaps/
 * getStaticProps (SSG) stays here as a Next.js framework concern.
 */
export { RoadmapsPage as default } from '../../presentation/features/roadmaps.feature';

import { GetStaticProps } from 'next';
import { StaticSiteGenerator, KnowledgeGraph } from '../../infrastructure/staticSiteGenerator';

export const getStaticProps: GetStaticProps<{ knowledgeGraph: KnowledgeGraph }> = async () => {
  try {
    const knowledgeGraph = await StaticSiteGenerator.buildKnowledgeGraph();

    return {
      props: { knowledgeGraph },
      revalidate: false,
    };
  } catch (error) {
    return {
      props: {
        knowledgeGraph: {
          roadmaps: {},
          articles: {},
          relationships: {
            byRoadmap: {},
            bySection: {},
            byTag: {},
            byDifficulty: {},
            byCategory: {},
            bySkill: {},
            byTechnology: {},
            prerequisites: {},
            related: {},
          },
          analytics: {
            totalRoadmaps: 0,
            totalArticles: 0,
            averageDifficulty: 0,
            mostPopularSkills: [],
            learningPaths: [],
          },
        } as KnowledgeGraph,
      },
    };
  }
};
