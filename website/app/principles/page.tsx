import type { Metadata } from 'next';
import { KnowledgeDomainListing } from './KnowledgeDomainListing';
import { getKnowledgeItems } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Principles',
  description: 'Foundational software engineering principles that guide architectural decisions and code quality.',
};

export default function PrinciplesPage() {
  const items = getKnowledgeItems('principles');

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            Principles
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
            Foundational software engineering principles that guide architectural decisions and code quality.
          </p>
        </div>
        <KnowledgeDomainListing items={items} domain="principles" />
      </div>
    </div>
  );
}
