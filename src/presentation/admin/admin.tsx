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

/**
 * Dynamically import Admin component with SSR disabled (Quill editor needs browser DOM).
 */
const Admin = dynamic(() => import("../../presentation/components/admin/Admin"), {
  ssr: false
});

/**
 * Admin page — article creation and editing interface.
 */
export default function AdminPage() {
  return <Admin />;
}
