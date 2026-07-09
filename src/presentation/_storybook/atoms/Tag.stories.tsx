import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../../__components/atoms/Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'brand', 'success', 'warning', 'error', 'outline'] },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'JavaScript' } };
export const Brand: Story = { args: { variant: 'brand', children: 'React' } };
export const Success: Story = { args: { variant: 'success', children: 'Completed' } };
export const Warning: Story = { args: { variant: 'warning', children: 'In Progress' } };
export const Error: Story = { args: { variant: 'error', children: 'Blocked' } };
export const Removable: Story = { args: { children: 'Filter', removable: true, onRemove: () => {} } };

export const AllVariants: Story = {
  args: { children: 'All' },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Tag {...args}>Default</Tag>
      <Tag variant="brand">Brand</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="outline">Outline</Tag>
      <Tag removable onRemove={() => {}}>Removable</Tag>
    </div>
  ),
};
