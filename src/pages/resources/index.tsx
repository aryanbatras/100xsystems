/**
 * Resources page — Framework layer
 * Component lives in src/presentation/features/resources/
 * getStaticProps (SSG) stays here as a Next.js framework concern.
 */
export { ResourcesPage as default } from '../../presentation/features/resources.feature';

import { GetStaticProps } from 'next';
import { StaticSiteGenerator } from '../../infrastructure/staticSiteGenerator';
import { Resource } from '../../application/types/resources';
import type { ResourcesCategoryInfo } from '../../presentation/features/resources.feature';

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
