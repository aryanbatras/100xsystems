'use client';

import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Heading, Text, Badge, Tag, Icon, Button } from '@/presentation/__components';
import type { TagSearchData } from '@/lib/mdx';

interface SearchPageClientProps {
  tags: TagSearchData[];
}

type ResourceCategory = 'youtube' | 'websites' | 'articles' | 'courses' | 'books' | 'tools';

const CATEGORY_CONFIG: Record<ResourceCategory, { label: string; icon: string; color: string }> = {
  youtube: { label: 'YouTube Channels', icon: '▶️', color: 'bg-red-50 border-red-200 text-red-700' },
  websites: { label: 'Websites', icon: '🌐', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  articles: { label: 'Articles & Blogs', icon: '📝', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  courses: { label: 'Courses', icon: '🎓', color: 'bg-green-50 border-green-200 text-green-700' },
  books: { label: 'Books', icon: '📚', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  tools: { label: 'Tools & Platforms', icon: '🔧', color: 'bg-slate-50 border-slate-200 text-slate-700' },
};

export function SearchPageClient({ tags }: SearchPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | null>(null);

  const activeTagData = selectedTag ? tags.find((t) => t.tag === selectedTag) : null;

  const hasCategoryItems = (tag: TagSearchData, category: ResourceCategory): boolean => {
    return (tag[category]?.length ?? 0) > 0;
  };

  return (
    <div className="space-y-16">
      {/* Tag Selection Header */}
      {!selectedTag ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tags.map((tag) => {
            const categories = (Object.keys(CATEGORY_CONFIG) as ResourceCategory[])
              .filter((cat) => hasCategoryItems(tag, cat));
            return (
              <button
                key={tag.tag}
                onClick={() => setSelectedTag(tag.tag)}
                className="group text-left border border-border bg-white p-5 transition-all duration-200 hover:border-accent hover:shadow-[0_0_16px_-4px_rgba(98,37,230,0.1)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="purple" size="sm">{tag.displayName}</Badge>
                </div>
                <p className="text-xs text-fg-secondary mb-3 line-clamp-2">
                  {tag.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <span key={cat} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-surface-secondary text-fg-muted">
                      {CATEGORY_CONFIG[cat].icon} {CATEGORY_CONFIG[cat].label.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      ) : activeTagData ? (
        <div>
          {/* Tag Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="purple" size="default">{activeTagData.displayName}</Badge>
                <button
                  onClick={() => { setSelectedTag(null); setActiveCategory(null); }}
                  className="text-xs text-fg-muted hover:text-fg-secondary transition-colors"
                >
                  ← All Topics
                </button>
              </div>
              <Text variant="body" className="text-fg-secondary">{activeTagData.description}</Text>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(Object.keys(CATEGORY_CONFIG) as ResourceCategory[])
              .filter((cat) => hasCategoryItems(activeTagData, cat))
              .map((cat) => (
                <Tag
                  key={cat}
                  variant={activeCategory === cat ? 'brand' : 'outline'}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className="cursor-pointer"
                >
                  {CATEGORY_CONFIG[cat].icon} {CATEGORY_CONFIG[cat].label}
                </Tag>
              ))}
          </div>

          {/* Resource Sections */}
          <div className="space-y-10">
            {(Object.keys(CATEGORY_CONFIG) as ResourceCategory[])
              .filter((cat) => !activeCategory || cat === activeCategory)
              .map((cat) => {
                const items = activeTagData[cat] || [];
                if (items.length === 0) return null;
                const config = CATEGORY_CONFIG[cat];

                return (
                  <section key={cat}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg">{config.icon}</span>
                      <Heading variant="h4" className="uppercase tracking-wider">
                        {config.label}
                      </Heading>
                      <span className="text-xs text-fg-muted">({items.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {items.map((url: string, idx: number) => (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-3 border border-border bg-white transition-all duration-200 hover:border-accent hover:shadow-sm"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-fg-secondary truncate group-hover:text-accent transition-colors">
                              {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </p>
                          </div>
                          <Icon name="external-link" size={12} className="text-fg-muted shrink-0" />
                        </a>
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        </div>
      ) : null}

      {/* Footer CTA */}
      <div className="text-center border-t border-border pt-10">
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
