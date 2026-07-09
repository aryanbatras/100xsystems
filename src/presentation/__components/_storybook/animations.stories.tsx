import type { Meta, StoryObj } from '@storybook/react';
import {
  KineticText, CoolMode, NoiseTexture, InteractiveGridPattern, AnimatedGridPattern,
  RippleButton, SpinningText, ScrollVelocityContainer, ScrollVelocityRow,
  NumberTicker, BlurFade, AnimatedList, AnimatedListItem,
  SkewButton, GooeyCheckbox, ServerLoader, GlobeLoader, ExpandInput, BookLoader,
} from '../components.animations';
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
        <CoolMode><Button variant="primary">Click Me</Button></CoolMode>
        <CoolMode options={{ particle: '✨', size: 20 }}><Button variant="ghost">Sparkle ✨</Button></CoolMode>
        <CoolMode options={{ particle: '🔥', size: 25 }}><Button variant="ripple">Fire 🔥</Button></CoolMode>
      </div>
    </div>
  ),
};

export const NoiseTextureDemo: Story = {
  name: 'NoiseTexture',
  render: () => (
    <div className="p-8">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold mb-4">Noise overlay on a surface:</p>
      <div className="relative h-40 w-80 overflow-hidden border border-border bg-surface-secondary">
        <NoiseTexture />
        <div className="relative z-10 flex h-full items-center justify-center">
          <span className="text-sm font-medium text-fg">Noise Texture Surface</span>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveGridPatternDemo: Story = {
  name: 'InteractiveGridPattern',
  render: () => (
    <div className="p-8">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold mb-4">Hover over the squares:</p>
      <div className="relative h-[300px] w-[500px] overflow-hidden border border-border">
        <InteractiveGridPattern width={30} height={30} squares={[16, 10]} />
      </div>
    </div>
  ),
};

export const AnimatedGridPatternDemo: Story = {
  name: 'AnimatedGridPattern',
  render: () => (
    <div className="p-8">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold mb-4">Animated grid squares:</p>
      <div className="relative h-[300px] w-[500px] overflow-hidden border border-border bg-surface-secondary">
        <AnimatedGridPattern numSquares={30} maxOpacity={0.5} duration={3} />
      </div>
    </div>
  ),
};

export const RippleButtonDemo: Story = {
  name: 'RippleButton',
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold">Click the buttons:</p>
      <div className="flex flex-wrap items-center gap-4">
        <RippleButton className="bg-accent text-white border-accent">Ripple Primary</RippleButton>
        <RippleButton className="bg-accent-yellow text-black border-accent-yellow">Ripple Yellow</RippleButton>
        <RippleButton className="bg-fg text-white border-fg" rippleColor="rgba(255,255,255,0.3)">Ripple Dark</RippleButton>
      </div>
    </div>
  ),
};

export const SpinningTextDemo: Story = {
  name: 'SpinningText',
  render: () => (
    <div className="p-8">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold mb-8 text-center">Spinning text:</p>
      <SpinningText duration={12} radius={6} className="text-sm font-semibold text-accent">
        learn more • earn more • grow more •
      </SpinningText>
    </div>
  ),
};

export const NumberTickerDemo: Story = {
  name: 'NumberTicker',
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold">Scroll into view to animate:</p>
      <div className="flex flex-wrap gap-12">
        <div className="text-center">
          <NumberTicker value={10000} className="text-5xl font-bold text-fg" />
          <p className="text-sm text-fg-secondary mt-1">Users</p>
        </div>
        <div className="text-center">
          <NumberTicker value={500} className="text-5xl font-bold text-accent" />
          <p className="text-sm text-fg-secondary mt-1">Projects</p>
        </div>
        <div className="text-center">
          <NumberTicker value={99.9} decimalPlaces={1} className="text-5xl font-bold text-fg" />
          <p className="text-sm text-fg-secondary mt-1">Uptime %</p>
        </div>
      </div>
    </div>
  ),
};

export const BlurFadeDemo: Story = {
  name: 'BlurFade',
  render: () => (
    <div className="flex flex-col gap-4 p-8 max-w-md">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold">Each item fades in with blur:</p>
      <BlurFade inView delay={0.1}>
        <div className="border border-border p-4 bg-white"><p className="text-sm text-fg">First item — fades in with blur</p></div>
      </BlurFade>
      <BlurFade inView delay={0.3}>
        <div className="border border-border p-4 bg-white"><p className="text-sm text-fg">Second item — delayed</p></div>
      </BlurFade>
      <BlurFade inView delay={0.5}>
        <div className="border border-border p-4 bg-white"><p className="text-sm text-fg">Third item — further delayed</p></div>
      </BlurFade>
    </div>
  ),
};

export const AnimatedListDemo: Story = {
  name: 'AnimatedList',
  render: () => (
    <div className="p-8 max-w-sm">
      <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold mb-4">Items appear one by one:</p>
      <AnimatedList delay={1500} className="border border-border p-4">
        {[
          { key: '1', label: 'User joined the platform', time: '2m ago', color: 'bg-accent-bg text-accent' },
          { key: '2', label: 'New lesson completed', time: '5m ago', color: 'bg-accent-yellow/10 text-accent-yellow' },
          { key: '3', label: 'Achievement unlocked', time: '12m ago', color: 'bg-accent-bg text-accent' },
          { key: '4', label: 'Project published', time: '1h ago', color: 'bg-surface-secondary text-fg' },
        ].map((item) => (
          <AnimatedListItem key={item.key}>
            <div className="flex items-center gap-3 border border-border p-3 bg-white">
              <div className={`h-8 w-8 flex items-center justify-center text-xs font-semibold ${item.color}`}>
                {item.key}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-fg truncate">{item.label}</p>
                <p className="text-xs text-fg-muted">{item.time}</p>
              </div>
            </div>
          </AnimatedListItem>
        ))}
      </AnimatedList>
    </div>
  ),
};

export const ScrollVelocityDemo: Story = {
  name: 'ScrollVelocity',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center gap-8">
        <ScrollVelocityContainer className="text-4xl font-bold md:text-6xl">
          <ScrollVelocityRow baseVelocity={15} direction={1}>
            <span className="text-accent mr-8">Scroll Velocity</span>
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={15} direction={-1}>
            <span className="text-fg mr-8">Scroll Velocity</span>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        <div className="text-center text-sm text-fg-muted mt-8">Scroll up and down to see the speed change</div>
      </div>
    </div>
  ),
};

// ─── styled-components demos ────────────────────────────────────────

export const SkewButtonDemo: Story = {
  name: 'SkewButton',
  render: () => (
    <div className="flex items-center justify-center p-8">
      <SkewButton />
    </div>
  ),
};

export const GooeyCheckboxDemo: Story = {
  name: 'GooeyCheckbox',
  render: () => (
    <div className="flex items-center justify-center p-8">
      <GooeyCheckbox />
    </div>
  ),
};

export const ServerLoaderDemo: Story = {
  name: 'ServerLoader',
  render: () => (
    <div className="flex items-center justify-center p-8">
      <ServerLoader />
    </div>
  ),
};

export const GlobeLoaderDemo: Story = {
  name: 'GlobeLoader',
  render: () => (
    <div className="flex h-32 items-center justify-center p-8">
      <GlobeLoader />
    </div>
  ),
};

export const ExpandInputDemo: Story = {
  name: 'ExpandInput',
  render: () => (
    <div className="flex items-center justify-center p-8">
      <ExpandInput />
    </div>
  ),
};

export const BookLoaderDemo: Story = {
  name: 'BookLoader',
  render: () => (
    <div className="flex items-center justify-center p-8">
      <BookLoader />
    </div>
  ),
};
