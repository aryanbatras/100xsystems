/**
 * Articles page — Framework layer
 * Component lives in src/presentation/articles/
 * getStaticProps (SSG) stays here as a Next.js framework concern.
 */
import ArticlesPage from '../../presentation/articles';
export default ArticlesPage;

import { GetStaticProps } from 'next';
import { StaticSiteGenerator } from '../../infrastructure/staticSiteGenerator';
import type { ArticleItem } from '../../presentation/articles/articles';

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
