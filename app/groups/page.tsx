import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Groups',
  description: 'Join learning groups, collaborate with peers, and discuss topics on 100xSystems.',
};

export { GroupsPage as default } from '@/presentation/features/groups.feature';
