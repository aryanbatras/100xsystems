import type { Meta, StoryObj } from '@storybook/react';
import { TokenTypography } from '../../__components/_tokens/TokenTypography';

const meta = {
  title: 'Tokens/Typography',
  component: TokenTypography,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
