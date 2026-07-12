import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Dashboard',
  description: 'Your personalized learning dashboard on 100xSystems.',
};

export { UserDashboard as default } from '@/presentation/features/userDashboard.feature';
