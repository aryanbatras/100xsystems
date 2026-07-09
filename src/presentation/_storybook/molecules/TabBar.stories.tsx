import type { Meta, StoryObj } from '@storybook/react';
import { TabBar } from '../../__components/molecules/TabBar';

const meta = {
  title: 'Molecules/TabBar',
  component: TabBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Horizontal tab navigation for switching between views.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pills', 'buttons'],
    },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'lessons', label: 'Lessons', count: 12 },
  { id: 'projects', label: 'Projects', count: 3 },
  { id: 'resources', label: 'Resources' },
];

export const Underline: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'overview',
    onTabChange: () => {},
    variant: 'underline',
  },
};

export const Pills: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'lessons',
    onTabChange: () => {},
    variant: 'pills',
  },
};

export const Buttons: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'projects',
    onTabChange: () => {},
    variant: 'buttons',
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { id: 'active', label: 'Active' },
      { id: 'disabled', label: 'Coming Soon', disabled: true },
    ],
    activeTab: 'active',
    onTabChange: () => {},
  },
};
