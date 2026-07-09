import type { Meta, StoryObj } from '@storybook/react';
import { TokenRadius } from '../../__components/_tokens/TokenRadius';

const meta = {
  title: 'Tokens/Rounding',
  component: TokenRadius,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem 1.5rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TokenRadius>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
