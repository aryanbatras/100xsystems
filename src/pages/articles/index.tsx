/**
 * Articles page — Framework layer
 * Component lives in src/presentation/features/articles/
 * getStaticProps (SSG) stays here as a Next.js framework concern.
 */
import ArticlesPage from '../../presentation/features/articles';
export default ArticlesPage;

import { GetStaticProps } from 'next';
import { StaticSiteGenerator } from '../../infrastructure/staticSiteGenerator';
import type { ArticleItem } from '../../presentation/features/articles/articles';

export const getStaticProps: GetStaticProps<{ articles: ArticleItem[] }> = async () => {
  try {
    const articles = await StaticSiteGenerator.fetchAllArticlesMetadata();

    return {
      props: { articles },
      revalidate: false,
    };
  } catch (error) {
    return {
      props: { articles: [] },
    };
  }
};
