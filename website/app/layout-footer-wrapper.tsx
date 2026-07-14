'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/presentation/__components';

export function FooterWrapper() {
  const pathname = usePathname();
  const isReadingPage = pathname.includes('/read/');

  if (isReadingPage) return null;

  return <Footer />;
}
