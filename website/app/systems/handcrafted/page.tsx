import type { Metadata } from 'next';
import { getHandcraftedSystems } from '@/lib/mdx';
import { SystemsListing } from '../SystemsListing';

export const metadata: Metadata = {
  title: 'Handcrafted Systems',
  description: 'Systems we built from scratch with complete tutorials. Learn by building production-grade software.',
};

export default function HandcraftedSystemsPage() {
  const handcrafted = getHandcraftedSystems();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            Handcrafted Systems
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
            Systems we built from scratch with complete tutorials. Learn by building production-grade software.
          </p>
        </div>
        <SystemsListing systems={handcrafted} />
      </div>
    </div>
  );
}
