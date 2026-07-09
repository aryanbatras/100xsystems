'use client';

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AdminComponent = dynamic(() => import("@/presentation/features/admin.feature").then(mod => ({ default: mod.Admin })), {
  ssr: false,
  loading: () => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', color: '#9ca3af' }}>Loading editor...</div>
});

export default function EditPage() {
  const params = useParams();
  const [slug, setSlug] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const slugParam = params?.slug as string;
    if (slugParam) {
      setSlug(slugParam);
      setIsReady(true);
    }
  }, [params]);

  if (!isReady) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', color: '#9ca3af' }}>
        Loading...
      </div>
    );
  }

  if (!slug) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', color: '#9ca3af' }}>
        Article slug not found
      </div>
    );
  }

  return <AdminComponent mode="edit" slug={slug} />;
}
