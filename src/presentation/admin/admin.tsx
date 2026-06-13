/**
 * ## Presentation: Admin Page
 *
 * Admin panel for creating, editing, and managing
 * published articles and content.
 *
 * @packageDocumentation
 */

'use client';
import dynamic from 'next/dynamic';
import { ProtectedRoute } from '../../presentation/components/auth/ProtectedRoute';

/**
 * Dynamically import Admin component with SSR disabled (Quill editor needs browser DOM).
 */
const Admin = dynamic(() => import("../../presentation/components/admin/Admin"), {
  ssr: false
});

/**
 * Admin page — article creation and editing interface.
 *
 * @remarks
 * Protected by admin authorization. Loads the Quill-based editor dynamically to
 * avoid SSR issues with DOM-dependent rich text editing.
 */
export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <Admin />
    </ProtectedRoute>
  );
}
