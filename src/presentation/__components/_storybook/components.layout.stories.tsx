import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNav } from '../components.layout';

const meta = {
  title: 'Layout',
  component: SidebarNav,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'lessons', label: 'Lessons', icon: '📚', count: 12 },
  { id: 'settings', label: 'Settings', icon: '⚙️', children: [{ id: 'profile', label: 'Profile' }, { id: 'account', label: 'Account' }] },
];

export const Default: Story = { args: { items, header: 'Navigation', activeId: 'overview' } };
export const Collapsed: Story = { args: { items, collapsed: true } };
