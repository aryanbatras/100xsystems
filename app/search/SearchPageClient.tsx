'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/application/lib/utils';
import { Heading, Text, Badge, Icon, Button } from '@/presentation/__components';
import type { TagSearchData, ResourceItem } from '@/lib/mdx';

interface SearchPageClientProps {
  tags: TagSearchData[];
}

type ResourceCategory = 'youtube' | 'websites' | 'articles' | 'courses' | 'books' | 'tools';

const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  youtube: 'YouTube Channels',
  websites: 'Websites',
  articles: 'Articles & Blogs',
  courses: 'Courses',
  books: 'Books',
  tools: 'Tools & Platforms',
};

export function SearchPageClient({ tags }: SearchPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeTagData = selectedTag ? tags.find((t) => t.tag === selectedTag) : null;

  // Filter tags based on search query
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return tags;
    const q = searchQuery.toLowerCase();
    return tags.filter(
      (tag) =>
        tag.displayName.toLowerCase().includes(q) ||
        tag.tag.toLowerCase().includes(q)
    );
  }, [tags, searchQuery]);

  const hasItems = (tag: TagSearchData, category: ResourceCategory): boolean => {
    return (tag[category]?.length ?? 0) > 0;
  };

  // Resource Card Component
  function ResourceCard({ item, category }: { item: ResourceItem; category: ResourceCategory }) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-5 transition-all duration-200 hover:bg-accent hover:text-white"
      >
        <h4 className="text-sm font-bold text-fg group-hover:text-white transition-colors mb-1.5">
          {item.title}
        </h4>
        <p className="text-xs text-fg-secondary group-hover:text-white/70 transition-colors leading-relaxed mb-3">
          {item.description}
        </p>
        <span className="inline-block text-[10px] font-medium text-fg-muted group-hover:text-white/50 transition-colors truncate max-w-full">
          {item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
      </a>
    );
  }

  // Tag Card Component — borderless, just the name, purple on hover
  function TagCard({ tag, onClick }: { tag: TagSearchData; onClick: () => void }) {
    return (
      <button
        onClick={onClick}
        className="group text-left px-6 py-5 transition-all duration-200 hover:bg-accent hover:text-white"
      >
        <span className="text-base font-bold uppercase tracking-wider text-fg group-hover:text-white transition-colors">
          {tag.displayName}
        </span>
      </button>
    );
  }

  return (
    <div className="space-y-16">
      {/* Search Bar */}
      {!selectedTag ? (
        <div className="mb-4">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tags..."
              className="w-full px-5 py-3 text-sm bg-transparent border-b-2 border-fg-muted text-fg placeholder:text-fg-muted outline-none transition-colors focus:border-accent"
              autoFocus
            />
          </div>
        </div>
      ) : null}

      {/* Tags Grid — borderless cards, just tag names */}
      {!selectedTag ? (
        <div>
          {filteredTags.length === 0 ? (
            <div className="text-center py-12">
              <Text variant="muted">No tags match &ldquo;{searchQuery}&rdquo;</Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTags.map((tag) => (
                <TagCard
                  key={tag.tag}
                  tag={tag}
                  onClick={() => { setSelectedTag(tag.tag); setSearchQuery(''); }}
                />
              ))}
            </div>
          )}
        </div>
      ) : activeTagData ? (
        <div>
          {/* Tag Header — back button + tag name */}
          <div className="mb-8">
            <button
              onClick={() => { setSelectedTag(null); }}
              className="text-xs font-semibold text-fg-muted hover:text-accent transition-colors mb-3 block"
            >
              &larr; All Tags
            </button>
            <h2 className="text-2xl font-extrabold text-fg uppercase tracking-tight">
              {activeTagData.displayName}
            </h2>
            {activeTagData.description && (
              <p className="text-sm text-fg-secondary mt-1 max-w-xl">
                {activeTagData.description}
              </p>
            )}
          </div>

          {/* Resource Sections — no category icons, borderless purple hover cards */}
          <div className="space-y-12">
            {(Object.keys(CATEGORY_LABELS) as ResourceCategory[])
              .filter((cat) => hasItems(activeTagData, cat))
              .map((cat) => {
                const items = activeTagData[cat] || [];
                return (
                  <section key={cat}>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-4">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 bg-white">
                      {items.map((item: ResourceItem, idx: number) => (
                        <div key={idx} className="bg-white">
                          <ResourceCard item={item} category={cat} />
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        </div>
      ) : null}

      {/* Footer CTA */}
      <div className="text-center pt-10">
        <Text variant="muted" className="mb-4">
          Can&apos;t find what you&apos;re looking for?
        </Text>
        <Button variant="purpleGhost" onClick={() => window.open('https://github.com/100xsystems', '_blank')}>
          Check out great engineering blogs from our community
        </Button>
      </div>
    </div>
  );
}
