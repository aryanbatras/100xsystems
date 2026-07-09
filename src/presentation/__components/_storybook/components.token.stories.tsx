import type { Meta, StoryObj } from '@storybook/react';
import { TokenColors, TokenTypography, TokenRadius, TokenInteractive, TokenLayout, TokenShadows, TokenMotion, TokenFramerMotion } from '../components.token';

const meta = {
  title: 'Tokens/All',
  component: TokenColors,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ padding: '3rem 1.5rem' }}><Story /></div>],
} satisfies Meta<typeof TokenColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = { render: () => <TokenColors /> };
export const Typography: Story = { render: () => <TokenTypography /> };
export const Radius: Story = { render: () => <TokenRadius /> };
export const Interactive: Story = { render: () => <TokenInteractive /> };
export const Layout: Story = { render: () => <TokenLayout /> };
export const Shadows: Story = { render: () => <TokenShadows /> };
export const Motion: Story = { render: () => <TokenMotion /> };
export const FramerMotion: Story = { render: () => <TokenFramerMotion /> };
