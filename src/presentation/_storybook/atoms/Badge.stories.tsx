import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/presentation/__components/ui/badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline', 'purple'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'default', children: 'Default' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Purple: Story = {
  args: { variant: 'purple', children: 'Purple' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="purple">Purple</Badge>
    </div>
  ),
};
