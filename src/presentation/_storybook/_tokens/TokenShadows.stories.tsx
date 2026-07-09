import type { Meta, StoryObj } from '@storybook/react';
import { TokenShadows } from '../../__components/_tokens/TokenShadows';

const meta = {
  title: 'Tokens/Shadows',
  component: TokenShadows,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem 1.5rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TokenShadows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
