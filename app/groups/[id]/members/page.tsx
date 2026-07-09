import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Members',
  description: 'Group members on 100xSystems - see who is in your learning community.',
};

export { GroupMembers as default } from '@/presentation/features/groups.feature';
