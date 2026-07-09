import type { Meta, StoryObj } from '@storybook/react';
import { InfoRow } from '../../__components/molecules/InfoRow';

const meta = {
  title: 'Molecules/InfoRow',
  component: InfoRow,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof InfoRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Email', value: 'user@example.com' } };
export const Inline: Story = { args: { label: 'Status', value: 'Active', variant: 'inline' } };
export const Compact: Story = { args: { label: 'Role', value: 'Admin', variant: 'compact' } };
export const AllVariants: Story = {
  args: { label: 'Sample', value: 'Value' },
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-[#a3a3a3] mb-2">Default variant:</p>
        <InfoRow label="Full Name" value="John Doe" />
        <InfoRow label="Member Since" value="January 2024" />
        <InfoRow label="Status" value={<span className="text-[#16a34a]">Active</span>} />
      </div>
      <div>
        <p className="text-xs text-[#a3a3a3] mb-2">Inline variant:</p>
        <InfoRow label="Difficulty" value="Intermediate" variant="inline" />
        <InfoRow label="Duration" value="8 hours" variant="inline" />
      </div>
      <div>
        <p className="text-xs text-[#a3a3a3] mb-2">Compact variant:</p>
        <InfoRow label="Role" value="Student" variant="compact" />
        <InfoRow label="Progress" value="75%" variant="compact" />
      </div>
    </div>
  ),
};
