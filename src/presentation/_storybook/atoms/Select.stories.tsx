import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../../__components/atoms/Select';

const sampleOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Difficulty', options: sampleOptions },
};

export const WithPlaceholder: Story = {
  args: { label: 'Category', placeholder: 'Select category...', options: sampleOptions },
};

export const WithError: Story = {
  args: { label: 'Language', options: sampleOptions, errorMessage: 'Please select a language' },
};

export const Disabled: Story = {
  args: { label: 'Edition', options: sampleOptions, disabled: true, value: 'beginner' },
};
