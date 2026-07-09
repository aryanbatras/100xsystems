import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNav } from '../../__components/organisms/SidebarNav';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/dashboard' },
  {
    id: 'courses', label: 'Courses', icon: '📚', count: 5,
    children: [
      { id: 'js', label: 'JavaScript', icon: '🟨' },
      { id: 'ts', label: 'TypeScript', icon: '🔷' },
      { id: 'react', label: 'React', icon: '⚛️' },
      { id: 'node', label: 'Node.js', icon: '💚' },
    ],
  },
  {
    id: 'resources', label: 'Resources', icon: '📖', count: 12,
    children: [
      { id: 'articles', label: 'Articles', icon: '📄' },
      { id: 'videos', label: 'Videos', icon: '🎥' },
    ],
  },
  { id: 'dsa', label: 'DSA Problems', icon: '🧮', href: '/dsa' },
  { id: 'groups', label: 'Study Groups', icon: '👥', href: '/groups' },
];

const meta = {
  title: 'Organisms/SidebarNav',
  component: SidebarNav,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: menuItems, header: 'Main Menu', activeId: 'dashboard' },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
};

export const WithActiveCourse: Story = {
  args: { items: menuItems, header: 'Main Menu', activeId: 'react' },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
};

export const WithFooter: Story = {
  args: {
    items: menuItems,
    header: 'Navigation',
    activeId: 'dsa',
    footer: (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-[#f0f0ff] flex items-center justify-center text-sm font-medium text-[#572EFF]">U</div>
        <div>
          <p className="text-sm font-medium text-[#0a0a0a]">User Name</p>
          <p className="text-xs text-[#76777d]">Free Plan</p>
        </div>
      </div>
    ),
  },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
};

export const Collapsed: Story = {
  args: { items: menuItems, collapsed: true },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
};
