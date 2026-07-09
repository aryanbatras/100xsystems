import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dashboard',
  description: 'AI-powered learning assistant and dashboard on 100xSystems.',
};

export { NewAIDashboard as default } from '@/presentation/features/newAIDashboard.feature';
