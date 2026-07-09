import type { Meta, StoryObj } from '@storybook/react';
import { KineticText, CoolMode } from '../components.animations';
import { Button } from '../components.atomic';

const meta = {
  title: 'Animations',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const KineticTextDemo: Story = {
  name: 'KineticText',
  render: () => (
    <div className="flex flex-col gap-8 p-8 max-w-lg">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold">Hover over the text:</p>
      <KineticText text="Hello World" as="h1" className="text-4xl font-[300]" />
      <KineticText text="Kinetic Typography" as="h2" className="text-2xl font-[300]" />
      <KineticText text="Each character animates independently" as="p" className="text-base font-[300]" />
    </div>
  ),
};

export const CoolModeDemo: Story = {
  name: 'CoolMode',
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold">Click the buttons:</p>
      <div className="flex flex-wrap items-center gap-4">
        <CoolMode>
          <Button variant="primary">Click Me</Button>
        </CoolMode>
        <CoolMode options={{ particle: '✨', size: 20 }}>
          <Button variant="ghost">Sparkle ✨</Button>
        </CoolMode>
        <CoolMode options={{ particle: '🔥', size: 25 }}>
          <Button variant="ripple">Fire 🔥</Button>
        </CoolMode>
      </div>
    </div>
  ),
};
