import { Metadata } from 'next';
import { ArticlesPage, ArticleItem } from '@/presentation/features/articles.feature';
import { StaticSiteGenerator } from '@/infrastructure/staticSiteGenerator';

async function getArticles(): Promise<ArticleItem[]> {
  try {
    return await StaticSiteGenerator.fetchAllArticlesMetadata();
  } catch (error) {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Articles - 100x Systems',
  description: 'Explore our comprehensive collection of articles on software engineering, system design, and development.',
  openGraph: {
    title: 'Articles - 100x Systems',
    description: 'Explore our comprehensive collection of articles.',
    type: 'website',
  },
};

export default async function ArticlesIndexPage() {
  const articles = await getArticles();
  return <ArticlesPage articles={articles} />;
}
