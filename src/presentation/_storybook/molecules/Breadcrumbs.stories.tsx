import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../../__components/molecules/Breadcrumbs';

const meta = {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoLevels: Story = {
  args: { items: [{ label: 'Home', href: '/' }, { label: 'Dashboard' }] },
};

export const ThreeLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Roadmaps', href: '/roadmaps' },
      { label: 'System Design Fundamentals' },
    ],
  },
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Articles', href: '/articles' },
      { label: 'Engineering', href: '/articles/engineering' },
      { label: 'Systems Thinking Deep Dive' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'root', href: '/' },
      { label: 'usr', href: '/usr' },
      { label: 'local', href: '/usr/local' },
      { label: 'bin' },
    ],
    separator: '›',
  },
};
