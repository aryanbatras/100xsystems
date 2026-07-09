import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about 100xSystems - our mission, team, and the story behind transforming developers into 100xEngineers.',
  openGraph: {
    title: 'About - 100xSystems',
    description: 'Learn about 100xSystems and our mission.',
  },
};

export { AboutPage as default } from '@/presentation/features/about.feature';
