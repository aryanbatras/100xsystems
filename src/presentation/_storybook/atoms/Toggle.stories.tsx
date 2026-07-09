import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../../__components/atoms/Toggle';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'default'] },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = { args: { checked: false, onChange: () => {} } };
export const On: Story = { args: { checked: true, onChange: () => {} } };
export const WithLabel: Story = { args: { checked: true, label: 'Notifications', onChange: () => {} } };
export const Small: Story = { args: { checked: true, size: 'sm', onChange: () => {} } };
export const Disabled: Story = { args: { checked: false, disabled: true, label: 'Disabled', onChange: () => {} } };

export const States: Story = {
  args: { checked: false, onChange: () => {} },
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle checked={false} onChange={() => {}} label="Wi-Fi" />
      <Toggle checked={true} onChange={() => {}} label="Bluetooth" />
      <Toggle checked={false} disabled onChange={() => {}} label="Airplane Mode" />
      <Toggle checked={true} size="sm" onChange={() => {}} label="Dark Mode (sm)" />
    </div>
  ),
};
