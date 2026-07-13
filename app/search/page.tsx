import type { Metadata } from 'next';
import { Heading, Text, Badge, Tag, Icon } from '@/presentation/__components';
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

        {/* Browse by Tag */}
        <div className="mb-10">
          <Heading variant="h4" className="uppercase tracking-wider mb-4 text-center">
            Browse by Topic
          </Heading>
          <div className="flex flex-wrap justify-center gap-3">
            {tags.length === 0 ? (
              <Text variant="muted">No tags available yet. Check back soon!</Text>
            ) : (
              tags.map((tag) => (
                <Tag
                  key={tag.tag}
                  variant="brand"
                  size="lg"
                  className="cursor-pointer hover:opacity-80 transition-opacity text-base px-6 py-3"
                  onClick={() => {
                    document.getElementById(`section-${tag.tag}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {tag.displayName}
                </Tag>
              ))
            )}
          </div>
        </div>

        {/* Resource Sections */}
        <SearchPageClient tags={tags} />
      </div>
    </div>
  );
}
