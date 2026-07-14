import type { Metadata } from 'next';
import { SystemsListing } from './SystemsListing';
import { getAllSystems } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Systems',
  description: 'Build real software systems, one chapter at a time.',
};

export default function SystemsPage() {
  const systems = getAllSystems();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            Systems
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
            Build real software systems, one chapter at a time. Each system is a complete learning path.
          </p>
        </div>

        <SystemsListing systems={systems} />
      </div>
    </div>
  );
}
