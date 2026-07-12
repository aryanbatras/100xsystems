import { Metadata } from 'next';
import { ResourcesPage as ResourcesPageComponent, ResourcesCategoryInfo } from '@/presentation/features/resources.feature';
import { StaticSiteGenerator } from '@/infrastructure/staticSiteGenerator';
import { Resource } from '@/application/types/resources';

async function getResourcesData() {
  try {
    const [resources, categories] = await Promise.all([
      StaticSiteGenerator.fetchAllResources(),
      StaticSiteGenerator.fetchResourceCategories(),
    ]);
    return { resources, categories };
  } catch (error) {
    return { resources: [] as Resource[], categories: {} as Record<string, ResourcesCategoryInfo> };
  }
}

export const metadata: Metadata = {
  title: 'Resources - 100x Systems',
  description: 'Curated learning resources including articles, videos, courses, and tools for software engineers.',
};

export default async function ResourcesIndexPage() {
  const { resources, categories } = await getResourcesData();
  return <ResourcesPageComponent resources={resources} categories={categories} />;
}
