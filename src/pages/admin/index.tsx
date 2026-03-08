import dynamic from 'next/dynamic';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

// Dynamically import Admin component with SSR disabled
const Admin = dynamic(() => import("../../components/admin/Admin"), {
  ssr: false
});

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <Admin />
    </ProtectedRoute>
  );
}