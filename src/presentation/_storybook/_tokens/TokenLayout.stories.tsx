import type { Meta, StoryObj } from '@storybook/react';
import { TokenLayout } from '../../__components/_tokens/TokenLayout';

const meta = {
  title: 'Tokens/Layout & Spacing',
  component: TokenLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem 1.5rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TokenLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
