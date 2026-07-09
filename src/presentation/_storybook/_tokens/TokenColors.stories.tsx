import type { Meta, StoryObj } from '@storybook/react';
import { TokenColors } from '../../__components/_tokens/TokenColors';

const meta = {
  title: 'Tokens/Colors',
  component: TokenColors,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
