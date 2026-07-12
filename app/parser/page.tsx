import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Parser',
  description: 'Parse and transform HTML content with the 100xSystems article parser tool.',
};

export { ParserPage as default } from '@/presentation/features/parser.feature';
