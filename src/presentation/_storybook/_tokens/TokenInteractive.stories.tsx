import type { Meta, StoryObj } from '@storybook/react';
import { TokenInteractive } from '../../__components/_tokens/TokenInteractive';

const meta = {
  title: 'Tokens/Interactive States',
  component: TokenInteractive,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem 1.5rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TokenInteractive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
