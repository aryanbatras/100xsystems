import type { Metadata } from 'next';
import { Heading, Text, Badge } from '@/presentation/__components';
import { SystemsListing } from '../SystemsListing';
import { getOutsourcedSystems } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Outsourced Systems',
  description: 'Curated resources from across the web. We don\'t own this content — we help you find the best learning materials.',
};

export default function OutsourcedSystemsPage() {
  const outsourced = getOutsourcedSystems();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 text-center">
          <Badge variant="yellow" size="sm" className="mb-4">
            OUTSOURCED SYSTEMS
          </Badge>
          <Heading variant="h1" className="uppercase tracking-tight mb-3">
            Curated from the Web
          </Heading>
          <Text variant="body-lg" className="max-w-2xl mx-auto">
            We don&apos;t own this content. These are the best systems engineering resources from across
            the internet, curated and organized to help you find exactly what you need.
          </Text>
        </div>

        <SystemsListing handcrafted={[]} outsourced={outsourced} />
      </div>
    </div>
  );
}
