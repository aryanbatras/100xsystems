import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader } from '../../__components/atoms/Card';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Content container with optional header, body, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hoverable: { control: 'boolean' },
    noPadding: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a basic card with no header or footer.',
    className: 'w-80',
  },
};

export const WithHeader: Story = {
  args: {
    header: <CardHeader title="Getting Started" subtitle="Learn the basics" />,
    children: 'Card content goes here. Build projects that matter.',
    className: 'w-80',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <CardHeader title="Java Foundations" subtitle="12 lessons" />,
    children: 'Learn Java from scratch with hands-on projects.',
    footer: <span className="text-xs text-[#76777d]">Last updated: Jan 2025</span>,
    className: 'w-80',
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    header: <CardHeader title="Clickable Card" subtitle="Hover to see effect" />,
    children: 'This card has a hover effect.',
    className: 'w-80',
  },
};

export const WithActions: Story = {
  args: {
    header: (
      <CardHeader
        title="Course Progress"
        subtitle="75% complete"
        actions={<span className="text-xs text-[#572EFF] font-medium">View</span>}
      />
    ),
    children: 'Continue where you left off.',
    className: 'w-80',
  },
};
