import type { Meta, StoryObj } from '@storybook/react';
import { ContactInfoItem } from '../../__components/molecules/ContactInfoItem';

const meta = {
  title: 'Molecules/ContactInfoItem',
  component: ContactInfoItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof ContactInfoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    label: 'Email',
    value: 'admin@100xsystems.dev',
    icon: '✉️',
  },
};

export const Hours: Story = {
  args: {
    label: 'Business Hours',
    value: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
  },
};

export const Social: Story = {
  args: {
    label: 'Follow Us',
    value: (
      <div className="flex gap-2">
        <a href="#" className="text-[#572EFF] text-xs font-medium hover:underline">Twitter</a>
        <a href="#" className="text-[#572EFF] text-xs font-medium hover:underline">GitHub</a>
        <a href="#" className="text-[#572EFF] text-xs font-medium hover:underline">LinkedIn</a>
      </div>
    ),
    icon: '🌐',
  },
};
