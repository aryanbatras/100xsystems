import dynamic from 'next/dynamic';

// Dynamically import Admin component with SSR disabled
const Admin = dynamic(() => import("../../components/admin/Admin"), {
  ssr: false
});

export default function AdminPage() {
  return <Admin />;
}