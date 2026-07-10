import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNav, Header, MobileNav, Footer } from '../components.layout';

const meta = {
  title: 'Layout',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ─── SidebarNav ──

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'lessons', label: 'Lessons', icon: '📚', count: 12 },
  { id: 'settings', label: 'Settings', icon: '⚙️', children: [{ id: 'profile', label: 'Profile' }, { id: 'account', label: 'Account' }] },
];

export const SidebarDefault: Story = {
  name: 'SidebarNav',
  render: () => (
    <div className="h-screen flex">
      <SidebarNav items={sidebarItems} header="Navigation" activeId="overview" />
      <div className="flex-1 p-8 bg-surface-light">
        <h1 className="text-2xl font-bold text-fg">Page Content</h1>
      </div>
    </div>
  ),
};

export const SidebarCollapsed: Story = {
  name: 'SidebarNav Collapsed',
  render: () => (
    <div className="h-screen flex">
      <SidebarNav items={sidebarItems} collapsed />
      <div className="flex-1 p-8 bg-surface-light">
        <h1 className="text-2xl font-bold text-fg">Page Content</h1>
      </div>
    </div>
  ),
};

// ─── Header ──

const headerItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'roadmaps', label: 'Roadmaps', href: '/roadmaps' },
  { id: 'resources', label: 'Resources', href: '/resources' },
  { id: 'dsa', label: 'DSA', href: '/dsa' },
];

export const HeaderDefault: Story = {
  name: 'Header',
  render: () => (
    <div className="min-h-screen">
      <Header items={headerItems} />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-fg">Page Content</h1>
      </div>
    </div>
  ),
};

// ─── MobileNav ──

const mobileItems = [
  { id: 'home', label: 'Home', href: '/', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg> },
  { id: 'roadmaps', label: 'Roadmaps', href: '/roadmaps', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
  { id: 'resources', label: 'Resources', href: '/resources', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg> },
  { id: 'profile', label: 'Profile', href: '/profile', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>, badge: 3 },
];

export const MobileNavDefault: Story = {
  name: 'MobileNav',
  render: () => (
    <div className="min-h-screen pb-16">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-fg">Page Content</h1>
        <p className="text-fg-secondary mt-2">Mobile nav appears at the bottom on small screens.</p>
      </div>
      <MobileNav items={mobileItems} activeId="home" />
    </div>
  ),
};

// ─── Footer ──

const footerSections = [
  { title: 'Product', links: [{ label: 'Roadmaps', href: '/roadmaps' }, { label: 'Resources', href: '/resources' }, { label: 'DSA', href: '/dsa' }, { label: 'Articles', href: '/articles' }] },
  { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, { label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }] },
  { title: 'Community', links: [{ label: 'GitHub', href: 'https://github.com' }, { label: 'Discord', href: '#' }, { label: 'Twitter', href: '#' }] },
];

export const FooterDefault: Story = {
  name: 'Footer',
  render: () => (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-fg">Page Content</h1>
      </div>
      <Footer sections={footerSections} tagline="Transform Developers into 100xEngineers" copyright="© 2025 100X Systems. All rights reserved." />
    </div>
  ),
};

// ─── Full Layout Demo ──

export const FullLayout: Story = {
  name: 'Full Layout Demo',
  render: () => (
    <div className="min-h-screen flex flex-col">
      <Header items={headerItems} />
      <div className="flex-1 flex">
        <div className="hidden md:block">
          <SidebarNav items={sidebarItems} header="Navigation" activeId="overview" className="h-full" />
        </div>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-fg">Dashboard</h1>
          <p className="text-fg-secondary mt-2">Page content goes here.</p>
        </main>
      </div>
      <Footer sections={footerSections} tagline="100X Systems" copyright="© 2025" />
      <MobileNav items={mobileItems} activeId="home" />
    </div>
  ),
};
