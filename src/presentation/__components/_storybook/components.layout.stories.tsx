import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNav, Header, MobileNav, Footer, Dropdown } from '../components.layout';
import { Button } from '../components.atomic';
import {
  HouseIcon, LayersIcon, LayoutGridIcon, BlocksIcon, LayoutListIcon,
  BookOpenIcon, SearchIcon, SettingsIcon, UserIcon, UsersIcon,
  RocketIcon, CodeIcon, TerminalIcon, GlobeIcon, StarIcon,
  BrainIcon, SparklesIcon, FlameIcon, HeartIcon, ZapIcon, BellIcon,
  ChevronDownIcon,
} from '@animateicons/react/lucide';

const meta = {
  title: 'Layout',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ─── Dropdown ──

export const DropdownDemo: Story = {
  name: 'Dropdown',
  render: () => (
    <div className="p-8">
      <Dropdown
        trigger={
          <span className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-fg-secondary hover:text-accent uppercase tracking-wider cursor-pointer">
            ROADMAP
            <ChevronDownIcon size={16} isAnimated={true} />
          </span>
        }
        items={[
          { id: 'dsa', label: 'DSA', description: 'Data structures & algorithms practice', icon: <CodeIcon size={18} isAnimated={true} /> },
          { id: 'system-design', label: 'System Design', description: 'Scalable architecture patterns', icon: <LayersIcon size={18} isAnimated={true} /> },
          { id: 'web-dev', label: 'Web Dev', description: 'Full-stack development paths', icon: <GlobeIcon size={18} isAnimated={true} /> },
          { id: 'ai-ml', label: 'AI / ML', description: 'Machine learning & AI fundamentals', icon: <BrainIcon size={18} isAnimated={true} /> },
        ]}
      />
    </div>
  ),
};

// ─── Header ──

const headerItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'courses', label: 'Courses', href: '/courses' },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'roadmap', label: 'Roadmap', children: [
    { id: 'dsa', label: 'DSA', href: '/roadmaps/dsa', description: 'Data structures & algorithms', icon: <CodeIcon size={18} isAnimated={true} /> },
    { id: 'system-design', label: 'System Design', href: '/roadmaps/system-design', description: 'Scalable architecture patterns', icon: <LayersIcon size={18} isAnimated={true} /> },
    { id: 'web-dev', label: 'Web Dev', href: '/roadmaps/web-dev', description: 'Full-stack development paths', icon: <GlobeIcon size={18} isAnimated={true} /> },
    { id: 'ai-ml', label: 'AI / ML', href: '/roadmaps/ai-ml', description: 'Machine learning & AI', icon: <BrainIcon size={18} isAnimated={true} /> },
  ]},
];

export const HeaderDemo: Story = {
  name: 'Header',
  render: () => (
    <div className="min-h-screen">
      <Header
        items={headerItems}
        actions={<Button variant="ripple" size="sm">Sign In</Button>}
      />
      <div className="p-12">
        <h1 className="text-4xl font-extrabold text-fg uppercase tracking-tight">Page Content</h1>
        <p className="text-fg-secondary mt-4 text-lg">Header with tall height, no border, animated icons, and bento dropdown.</p>
      </div>
    </div>
  ),
};

// ─── SidebarNav ──

const sidebarItems = [
  { id: 'home', label: 'Home', Icon: HouseIcon, href: '/' },
  { id: 'roadmaps', label: 'Roadmaps', Icon: LayersIcon, href: '/roadmaps' },
  { id: 'resources', label: 'Resources', Icon: BookOpenIcon, href: '/resources' },
  { id: 'dsa', label: 'DSA', Icon: CodeIcon, href: '/dsa' },
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutGridIcon, href: '/dashboard' },
  { id: 'settings', label: 'Settings', Icon: SettingsIcon, href: '/settings' },
];

export const SidebarDemo: Story = {
  name: 'SidebarNav',
  render: () => (
    <div className="h-screen flex">
      <SidebarNav items={sidebarItems} activeId="home" />
      <div className="flex-1 p-8 bg-surface-light">
        <h1 className="text-2xl font-bold text-fg">Page Content</h1>
        <p className="text-fg-secondary mt-2">Compact sidebar with animated icons.</p>
      </div>
    </div>
  ),
};

// ─── MobileNav (Dock) ──

const mobileItems = [
  { id: 'home', label: 'Home', Icon: HouseIcon, href: '/' },
  { id: 'roadmaps', label: 'Roadmaps', Icon: LayersIcon, href: '/roadmaps' },
  { id: 'resources', label: 'Resources', Icon: BookOpenIcon, href: '/resources' },
  { id: 'notifications', label: 'Alerts', Icon: BellIcon, href: '#', badge: 5 },
  { id: 'profile', label: 'Profile', Icon: UserIcon, href: '/profile' },
];

export const MobileNavDemo: Story = {
  name: 'MobileNav (Dock)',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="min-h-[600px] pb-24">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-fg">Page Content</h1>
        <p className="text-fg-secondary mt-2">Dock-style bottom navigation with magnification effect. Hover over icons to see the dock effect.</p>
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

export const FooterDemo: Story = {
  name: 'Footer',
  render: () => (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-fg">Page Content</h1>
      </div>
      <Footer
        sections={footerSections}
        tagline="Transform Developers into 100xEngineers"
        copyright="© 2025 100X Systems. All rights reserved."
      />
    </div>
  ),
};

// ─── Full Layout Demo ──

export const FullLayout: Story = {
  name: 'Full Layout Demo',
  render: () => (
    <div className="min-h-screen flex flex-col">
      <Header
        items={headerItems}
        actions={<Button variant="ripple" size="sm">Sign In</Button>}
      />
      <div className="flex-1 flex">
        <div className="hidden lg:block">
          <SidebarNav items={sidebarItems} activeId="home" className="h-full" />
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
