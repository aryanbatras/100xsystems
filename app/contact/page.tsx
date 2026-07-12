import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the 100xSystems team. We are here to help with your learning journey.',
};

export { ContactPage as default } from '@/presentation/features/contact.feature';
