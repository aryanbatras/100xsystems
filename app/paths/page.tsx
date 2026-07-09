import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Paths',
  description: 'Explore structured learning paths covering software engineering, system design, and more.',
};

export { PathsPage as default } from '@/presentation/features/paths.feature';
