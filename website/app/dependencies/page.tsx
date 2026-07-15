import { Metadata } from 'next';
import { getDependencyGraph } from '@/lib/mdx';
import { DependenciesClient } from './DependenciesClient';

export const metadata: Metadata = {
  title: 'Dependency Graph — 100x Systems',
  description: 'Visual dependency graph showing prerequisite relationships between systems and knowledge base entries.',
};

export default async function DependenciesPage() {
  const graph = getDependencyGraph();

  return <DependenciesClient graph={graph} />;
}
