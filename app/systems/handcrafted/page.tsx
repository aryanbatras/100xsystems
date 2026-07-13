import type { Metadata } from 'next';
import { Heading, Text, Badge } from '@/presentation/__components';
import { SystemsListing } from '../SystemsListing';
import { getHandcraftedSystems } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Handcrafted Systems',
  description: 'Systems we built from scratch with complete tutorials. Learn by building production-grade software.',
};

export default function HandcraftedSystemsPage() {
  const handcrafted = getHandcraftedSystems();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 text-center">
          <Badge variant="purple" size="sm" className="mb-4">
            HANDCRAFTED SYSTEMS
          </Badge>
          <Heading variant="h1" className="uppercase tracking-tight mb-3">
            Built by 100xSystems
          </Heading>
          <Text variant="body-lg" className="max-w-2xl mx-auto">
            These systems are built and documented by us from scratch. Each comes with complete tutorials,
            code examples, and templates — everything you need to build and understand them deeply.
          </Text>
        </div>

        <SystemsListing handcrafted={handcrafted} outsourced={[]} />
      </div>
    </div>
  );
}
