import type { Metadata } from 'next';
import { Heading, Text, Badge } from '@/presentation/__components';
import { SearchPageClient } from './SearchPageClient';
import { getAllTags } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Search - Engineering Resources',
  description: 'Discover the best curated engineering resources organized by topic. Find YouTube channels, blogs, courses, and tools.',
};

export default function SearchPage() {
  const tags = getAllTags();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="purple" size="sm" className="mb-4">
            CURATED RESOURCES
          </Badge>
          <Heading variant="h1" className="uppercase tracking-tight mb-3">
            Discover Great Engineering Content
          </Heading>
          <Text variant="body-lg" className="max-w-2xl mx-auto">
            Hand-picked resources from across the web. No algorithms, no clutter — just the best
            engineering content curated by topic.
          </Text>
        </div>

        {/* Resource Sections — client component handles interactivity */}
        <SearchPageClient tags={tags} />
      </div>
    </div>
  );
}
