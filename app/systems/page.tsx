import type { Metadata } from 'next';
import { Heading, Text, Badge } from '@/presentation/__components';
import { SystemsListing } from './SystemsListing';
import { getHandcraftedSystems, getOutsourcedSystems } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Systems',
  description: 'Explore our curated collection of software systems — from handcrafted tutorials to the best outsourced resources.',
};

export default function SystemsPage() {
  const handcrafted = getHandcraftedSystems();
  const outsourced = getOutsourcedSystems();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="purple" size="sm" className="mb-4">
            100X SYSTEMS
          </Badge>
          <Heading variant="h1" className="uppercase tracking-tight mb-3">
            Software Systems
          </Heading>
          <Text variant="body-lg" className="max-w-2xl mx-auto">
            Master software engineering by building real systems. Each system is a complete learning path
            designed to take you from concept to production-ready implementation.
          </Text>
        </div>

        <SystemsListing handcrafted={handcrafted} outsourced={outsourced} />
      </div>
    </div>
  );
}
