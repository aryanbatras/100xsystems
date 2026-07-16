'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/presentation/__components';
import type { HeaderNavItem } from '@/presentation/__components';
import type { ReactNode } from 'react';

interface HeaderWrapperProps {
  items: HeaderNavItem[];
  logo: ReactNode;
}

export function HeaderWrapper({ items, logo }: HeaderWrapperProps) {
  const pathname = usePathname();
  const isReadingPage = pathname.includes('/read/') || pathname.startsWith('/cli-docs/');

  if (isReadingPage) return null;

  return <Header items={items} logo={logo} />;
}
