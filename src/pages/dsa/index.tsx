import { GetStaticProps } from 'next';
import { StaticSiteGenerator } from '../../infrastructure/staticSiteGenerator';
export { DSA as default } from '../../presentation/features/dsa.feature';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const dsaContent = await StaticSiteGenerator.fetchDSAProblems();

    return {
      props: {
        dsaContent: {
          ...dsaContent,
          generatedAt: new Date().toISOString()
        }
      },
      revalidate: 3600
    };

  } catch (error) {
    return {
      props: {
        dsaContent: {
          categories: [],
          totalProblems: 0,
          generatedAt: new Date().toISOString(),
          error: 'Failed to generate DSA content'
        }
      }
    };
  }
};
