import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Announcements',
  description: 'Group announcements on 100xSystems - stay updated with your learning community.',
};

export { GroupAnnouncements as default } from '@/presentation/features/groups.feature';
