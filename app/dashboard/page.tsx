import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal 100xSystems dashboard - track your learning progress and achievements.',
};

export { DashboardPage as default } from '@/presentation/features/dashboard.feature';
