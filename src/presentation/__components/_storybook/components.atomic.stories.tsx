import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, Badge, Tag, Spinner, Card, CardHeader, Select, Toggle, ProgressBar, Skeleton, SkeletonBlock, Modal, Avatar, RippleButton, Heading, Text, Divider } from '../components.atomic';

const meta = {
  title: 'Atoms/All',
  component: Button,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}><Story /></div>],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = { name: 'Button', render: () => <div className="flex flex-wrap gap-2"><Button variant="primary">Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button></div> };
export const InputStory: Story = { name: 'Input', render: () => <Input label="Email" placeholder="you@example.com" /> };
export const BadgeStory: Story = { name: 'Badge', render: () => <div className="flex flex-wrap gap-2"><Badge variant="success">Success</Badge><Badge variant="error">Error</Badge><Badge variant="brand">Brand</Badge></div> };
export const CardStory: Story = { name: 'Card', render: () => <Card header={<CardHeader title="Hello" subtitle="World" />} footer={<Button size="sm">Action</Button>}>Body content</Card> };
export const SpinnerStory: Story = { name: 'Spinner', render: () => <Spinner /> };
export const TagStory: Story = { name: 'Tag', render: () => <div className="flex flex-wrap gap-2"><Tag variant="brand">React</Tag><Tag variant="success">Done</Tag><Tag removable onRemove={() => {}}>Remove</Tag></div> };
export const SelectStory: Story = { name: 'Select', render: () => <Select label="Difficulty" options={[{ value: 'beginner', label: 'Beginner' }, { value: 'advanced', label: 'Advanced' }]} /> };
export const ToggleStory: Story = { name: 'Toggle', render: () => <Toggle checked={true} onChange={() => {}} label="Notifications" /> };
export const ProgressBarStory: Story = { name: 'ProgressBar', render: () => <ProgressBar value={65} showLabel /> };
export const SkeletonStory: Story = { name: 'Skeleton', render: () => <SkeletonBlock lines={3} avatar /> };
export const ModalStory: Story = { name: 'Modal', render: () => <Modal isOpen={true} onClose={() => {}} title="Modal Title">Modal content</Modal> };
export const AvatarStory: Story = { name: 'Avatar', render: () => <Avatar initials="JD" status="online" /> };
export const RippleButtonStory: Story = { name: 'RippleButton', render: () => <div className="flex flex-wrap items-start gap-6"><RippleButton>Default</RippleButton><RippleButton style={{ borderColor: '#572EFF', color: '#572EFF' }}>Custom Ripple</RippleButton></div> };
export const TypographyStory: Story = { name: 'Typography', render: () => <div><Heading variant="h1">Heading 1</Heading><Text variant="body">Body text</Text><Divider /><Text variant="caption">Caption</Text></div> };
