import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Admin component with SSR disabled
const Admin = dynamic(() => import("../../../presentation/components/admin/Admin"), {
  ssr: false,
  loading: () => <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '50vh',
    color: '#9ca3af'
  }}>Loading editor...</div>
});

export default function EditPage() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady && router.query.slug) {
      setSlug(router.query.slug as string);
      setIsReady(true);
    }
  }, [router.isReady, router.query]);

  if (!isReady) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '50vh',
        color: '#9ca3af'
      }}>
        Loading...
      </div>
    );
  }

  if (!slug) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '50vh',
        color: '#9ca3af'
      }}>
        Article slug not found
      </div>
    );
  }

  return (
    <Admin 
      mode="edit" 
      slug={slug}
    />
  );
}
