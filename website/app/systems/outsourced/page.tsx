import type { Metadata } from 'next';
import { getOutsourcedSystems } from '@/lib/mdx';
import { SystemsListing } from '../SystemsListing';

export const metadata: Metadata = {
  title: 'Outsourced Systems',
  description: 'Curated resources from across the web. We help you find the best learning materials.',
};

export default function OutsourcedSystemsPage() {
  const outsourced = getOutsourcedSystems();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            Outsourced Systems
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
            Curated resources from across the web. We help you find the best learning materials.
          </p>
        </div>
        <SystemsListing systems={outsourced} />
      </div>
    </div>
  );
}
