import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNav, Header, MobileNav, Footer, Dropdown } from '../components.layout';
import { Button } from '../components.atomic';

const meta = {
  title: 'Layout',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ─── Dropdown — Borderless Bento, Inset Shadow, UPPERCASE ──

export const DropdownDemo: Story = {
  name: 'Dropdown',
  render: () => (
    <div className="min-h-[600px] p-8 bg-surface-secondary flex flex-col items-center gap-8">
      <p className="text-sm text-fg-muted uppercase tracking-wider">SINGLE-COLUMN DROPDOWN — INSET SHADOW, UPPERCASE TEXT</p>
      <Dropdown
        trigger={
          <span className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-bold uppercase tracking-wider text-fg-secondary hover:text-fg transition-colors cursor-pointer border border-border">
            ROADMAPS
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
          </span>
        }
        items={[
          { id: 'dsa', label: 'DSA', description: 'Data structures & algorithms practice', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
          { id: 'system-design', label: 'SYSTEM DESIGN', description: 'Scalable architecture patterns', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
          { id: 'web-dev', label: 'WEB DEV', description: 'Full-stack development paths', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
          { id: 'ai-ml', label: 'AI / ML', description: 'Machine learning & AI fundamentals', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v13a2.5 2.5 0 0 1-5 0V12H5a2.5 2.5 0 0 1 0-5h2V4.5A2.5 2.5 0 0 1 9.5 2z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v13a2.5 2.5 0 0 0 5 0V12h2a2.5 2.5 0 0 0 0-5h-2V4.5A2.5 2.5 0 0 0 14.5 2z" /></svg> },
        ]}
      />
    </div>
  ),
};

// ─── Header — UPPERCASE, Ghost Hover, Active=Yellow, 100X SYSTEMS ──

const headerItems = [
  { id: 'home', label: 'HOME', href: '/' },
  { id: 'courses', label: 'COURSES', href: '/courses' },
  { id: 'pricing', label: 'PRICING', href: '/pricing' },
  { id: 'about', label: 'ABOUT', href: '/about' },
  { id: 'roadmap', label: 'ROADMAP', children: [
    { id: 'dsa', label: 'DSA', href: '/roadmaps/dsa', description: 'Data structures & algorithms', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
    { id: 'system-design', label: 'SYSTEM DESIGN', href: '/roadmaps/system-design', description: 'Scalable architecture patterns', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
    { id: 'web-dev', label: 'WEB DEV', href: '/roadmaps/web-dev', description: 'Full-stack development paths', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
    { id: 'ai-ml', label: 'AI / ML', href: '/roadmaps/ai-ml', description: 'Machine learning & AI', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v13a2.5 2.5 0 0 1-5 0V12H5a2.5 2.5 0 0 1 0-5h2V4.5A2.5 2.5 0 0 1 9.5 2z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v13a2.5 2.5 0 0 0 5 0V12h2a2.5 2.5 0 0 0 0-5h-2V4.5A2.5 2.5 0 0 0 14.5 2z" /></svg> },
  ]},
];

export const HeaderDemo: Story = {
  name: 'Header',
  render: () => (
    <div className="min-h-screen">
      <Header
        items={headerItems}
        activeId="home"
        actions={
          <Button variant="purpleGhost" size="default">SIGN IN</Button>
        }
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <h1 className="text-3xl font-bold text-fg tracking-tight uppercase">PAGE CONTENT</h1>
        <p className="text-fg-secondary mt-3 text-lg uppercase tracking-wider">"100X SYSTEMS" LOGO — GHOST HOVER YELLOW UNDERLINE — ACTIVE=YELLOW BUTTON — SIGN IN=PURPLE GHOST</p>
      </div>
    </div>
  ),
};

// ─── SidebarNav — Borderless with Shadow, No Gap, Animated Icons ──

export const SidebarDemo: Story = {
  name: 'SidebarNav',
  render: () => (
    <div className="h-screen flex">
      <SidebarNav
        items={[
          { id: 'home', label: 'Home', iconName: 'house', href: '/' },
          { id: 'roadmaps', label: 'Roadmaps', iconName: 'compass', href: '/roadmaps' },
          { id: 'resources', label: 'Resources', iconName: 'book-open', href: '/resources' },
          { id: 'dsa', label: 'DSA', iconName: 'code', href: '/dsa' },
          { id: 'dashboard', label: 'Dashboard', iconName: 'layout-grid', href: '/dashboard' },
          { id: 'settings', label: 'Settings', iconName: 'settings', href: '/settings' },
        ]}
        activeId="home"
      />
      <div className="flex-1 p-8 bg-surface-light">
        <h1 className="text-3xl font-bold text-fg tracking-tight uppercase">SIDEBAR CONTENT</h1>
        <p className="text-fg-secondary mt-2 uppercase tracking-wider text-sm">BORDERLESS — SHADOW — NO GAP — ANIMATED ICONS</p>
      </div>
    </div>
  ),
};

// ─── MobileNav (Dock) — Borderless, Inset Shadow, Dividers ──

export const MobileNavDemo: Story = {
  name: 'MobileNav (Dock)',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="min-h-[600px] pb-24 bg-surface-light">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-fg uppercase tracking-tight">PAGE CONTENT</h1>
        <p className="text-fg-secondary mt-2 uppercase tracking-wider text-xs">BORDERLESS DOCK — INSET SHADOW — DIVIDER BEFORE PROFILE — ANIMATED ICONS</p>
      </div>
      <MobileNav
        items={[
          { id: 'home', label: 'Home', iconName: 'house', href: '/' },
          { id: 'roadmaps', label: 'Roadmaps', iconName: 'compass', href: '/roadmaps' },
          { id: 'resources', label: 'Resources', iconName: 'book-open', href: '/resources' },
          { id: 'alerts', label: 'Alerts', iconName: 'bell', href: '#', badge: 5 },
          { id: 'profile', label: 'Profile', iconName: 'user', href: '/profile', dividerAfter: true },
        ]}
        activeId="home"
      />
    </div>
  ),
};

// ─── Footer — Purple Ghost Links ──

export const FooterDemo: Story = {
  name: 'Footer',
  render: () => (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <h1 className="text-3xl font-bold text-fg tracking-tight uppercase">PAGE CONTENT</h1>
      </div>
      <Footer />
    </div>
  ),
};

// ─── Full Layout Demo — Improved ──

export const FullLayout: Story = {
  name: 'Full Layout Demo',
  render: () => (
    <div className="min-h-screen flex flex-col">
      <Header
        items={headerItems}
        activeId="home"
        actions={
          <Button variant="purpleGhost" size="default">SIGN IN</Button>
        }
      />
      <div className="flex-1 flex">
        <div className="hidden lg:block">
          <SidebarNav
            items={[
              { id: 'home', label: 'Home', iconName: 'house' },
              { id: 'roadmaps', label: 'Roadmaps', iconName: 'compass' },
              { id: 'resources', label: 'Resources', iconName: 'book-open' },
              { id: 'dsa', label: 'DSA', iconName: 'code' },
              { id: 'dashboard', label: 'Dashboard', iconName: 'layout-grid' },
              { id: 'settings', label: 'Settings', iconName: 'settings' },
            ]}
            activeId="home"
            className="h-full"
          />
        </div>
        <main className="flex-1 p-10 bg-surface-light">
          <h1 className="text-3xl font-bold text-fg tracking-tight uppercase">DASHBOARD</h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border p-6 bg-white">
              <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-2">TOTAL MODULES</p>
              <p className="text-3xl font-bold text-fg">12</p>
            </div>
            <div className="border border-border p-6 bg-white">
              <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-2">COMPLETED</p>
              <p className="text-3xl font-bold text-fg">8</p>
            </div>
            <div className="border border-border p-6 bg-white">
              <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-2">STREAK</p>
              <p className="text-3xl font-bold text-fg">7 DAYS</p>
            </div>
          </div>
          <p className="text-fg-secondary mt-8 uppercase tracking-wider text-sm">FULL LAYOUT — HEADER + SIDEBAR + DOCK + FOOTER</p>
        </main>
      </div>
      <Footer />
      <MobileNav
        items={[
          { id: 'home', label: 'Home', iconName: 'house' },
          { id: 'roadmaps', label: 'Roadmaps', iconName: 'compass' },
          { id: 'resources', label: 'Resources', iconName: 'book-open' },
          { id: 'profile', label: 'Profile', iconName: 'user', dividerAfter: true },
        ]}
        activeId="home"
      />
    </div>
  ),
};
