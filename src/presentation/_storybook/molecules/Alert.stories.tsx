import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../../__components/molecules/Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    dismissible: { control: 'boolean' },
    hideIcon: { control: 'boolean' },
  },
  decorators: [(Story) => <div className="w-full max-w-lg"><Story /></div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { variant: 'info', children: 'Your profile is 75% complete. Add a bio to finish it.' },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Published!',
    children: 'Your article has been published successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Your session will expire in 5 minutes. Please save your work.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Upload Failed',
    children: 'The file exceeds the maximum size limit of 10MB.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    children: 'New features available! Check out the updated dashboard.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    hideIcon: true,
    children: 'Changes saved successfully.',
  },
};
