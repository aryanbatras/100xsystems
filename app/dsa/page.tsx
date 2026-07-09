import { Metadata } from 'next';
import { StaticSiteGenerator } from '@/infrastructure/staticSiteGenerator';
import { DSA } from '@/presentation/features/dsa.feature';

async function getDSAContent() {
  try {
    const dsaContent = await StaticSiteGenerator.fetchDSAProblems();
    return {
      ...dsaContent,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      // Use any for flexibility since DSA types may differ between fetch and component
      sections: [],
      totalProblems: 0,
      generatedAt: new Date().toISOString(),
      error: 'Failed to generate DSA content',
    } as any;
  }
}

export const metadata: Metadata = {
  title: 'DSA - 100x Systems',
  description: 'Data Structures and Algorithms problems and solutions.',
};

export default async function DSAPage() {
  const dsaContent = await getDSAContent();
  return <DSA dsaContent={dsaContent} />;
}
