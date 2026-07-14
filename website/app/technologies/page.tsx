import type { Metadata } from 'next';
import { KnowledgeDomainListing } from '../principles/KnowledgeDomainListing';
import { getKnowledgeItems } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Technologies',
  description: 'Key technologies, frameworks, and platforms driving the software industry.',
};

export default function TechnologiesPage() {
  const items = getKnowledgeItems('technologies');

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            Technologies
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
            Key technologies, frameworks, and platforms driving the software industry.
          </p>
        </div>
        <KnowledgeDomainListing items={items} domain="technologies" />
      </div>
    </div>
  );
}
