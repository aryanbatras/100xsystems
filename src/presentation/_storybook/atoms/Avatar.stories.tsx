import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../__components/atoms/Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'default', 'lg', 'xl'] },
    status: { control: 'select', options: [undefined, 'online', 'away', 'busy', 'offline'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { initials: 'JD', size: 'default' },
};

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?u=john', alt: 'John', initials: 'JD' },
};

export const WithStatus: Story = {
  args: { initials: 'AB', status: 'online', size: 'lg' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="default" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
    </div>
  ),
};
