import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Discussions',
  description: 'Group discussions on 100xSystems - engage with your learning community.',
};

export { GroupDiscussions as default } from '@/presentation/features/groups.feature';
