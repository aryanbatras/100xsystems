import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Resources',
  description: 'Shared resources for your learning group on 100xSystems.',
};

export { GroupResources as default } from '@/presentation/features/groups.feature';
