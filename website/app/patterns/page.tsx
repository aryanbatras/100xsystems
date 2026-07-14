import type { Metadata } from 'next';
import { KnowledgeDomainListing } from '../principles/KnowledgeDomainListing';
import { getKnowledgeItems } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Patterns',
  description: 'Design patterns and architectural blueprints for solving common engineering challenges.',
};

export default function PatternsPage() {
  const items = getKnowledgeItems('patterns');

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            Patterns
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
            Design patterns and architectural blueprints for solving common engineering challenges.
          </p>
        </div>
        <KnowledgeDomainListing items={items} domain="patterns" />
      </div>
    </div>
  );
}
