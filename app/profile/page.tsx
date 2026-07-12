import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your 100xSystems profile - manage your account settings and learning preferences.',
};

export { ProfilePage as default } from '@/presentation/features/profile.feature';
