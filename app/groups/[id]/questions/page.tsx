import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Questions',
  description: 'Group Q&A on 100xSystems - ask and answer questions with your learning community.',
};

export { GroupQuestions as default } from '@/presentation/features/groups.feature';
