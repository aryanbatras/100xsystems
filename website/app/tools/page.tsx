import type { Metadata } from 'next';
import { KnowledgeDomainListing } from '../principles/KnowledgeDomainListing';
import { getKnowledgeItems } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Essential tools and platforms for modern software development and infrastructure.',
};

export default function ToolsPage() {
  const items = getKnowledgeItems('tools');

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            Tools
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
            Essential tools and platforms for modern software development and infrastructure.
          </p>
        </div>
        <KnowledgeDomainListing items={items} domain="tools" />
      </div>
    </div>
  );
}
