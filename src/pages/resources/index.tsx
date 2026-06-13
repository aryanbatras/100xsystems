/**
 * Resources page — Framework layer
 * Component lives in src/presentation/resources/
 * getStaticProps (SSG) stays here as a Next.js framework concern.
 */
import ResourcesPage from '../../presentation/resources';
export default ResourcesPage;

import { GetStaticProps } from 'next';
import { StaticSiteGenerator } from '../../infrastructure/staticSiteGenerator';
import { Resource } from '../../application/types/resources';
import type { ResourcesCategoryInfo } from '../../presentation/resources/resources';

export const getStaticProps: GetStaticProps<{
  resources: Resource[];
  categories: Record<string, ResourcesCategoryInfo>;
}> = async () => {
  try {
    const [resources, categories] = await Promise.all([
      StaticSiteGenerator.fetchAllResources(),
      StaticSiteGenerator.fetchResourceCategories(),
    ]);

    return {
      props: { resources, categories },
    };
  } catch (error) {
    return {
      props: { resources: [], categories: {} },
    };
  }
};
