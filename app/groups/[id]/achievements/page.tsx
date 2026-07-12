import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Achievements',
  description: 'Group achievements on 100xSystems - track your collective progress.',
};

export { GroupAchievements as default } from '@/presentation/features/groups.feature';
