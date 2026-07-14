'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/presentation/__components';

export function FooterWrapper() {
  const pathname = usePathname();
  const isChapterPage = pathname.includes('/chapters/');

  if (isChapterPage) return null;

  return <Footer />;
}
