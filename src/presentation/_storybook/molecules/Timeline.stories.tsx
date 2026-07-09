import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from '../../__components/molecules/Timeline';

const sampleSteps = [
  { number: '01', title: 'Foundation', description: 'Master one programming language deeply. Learn CS basics that actually matter.' },
  { number: '02', title: 'Systems Architecture', description: 'Build systems that don\'t break. Learn databases, APIs, and deployment.' },
  { number: '03', title: 'Engineering Excellence', description: 'Write professional code. Learn testing, security, and performance.' },
  { number: '04', title: 'Leadership & Innovation', description: 'Lead projects. Make technical decisions. Stay relevant.' },
];

const meta = {
  title: 'Molecules/Timeline',
  component: Timeline,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { steps: sampleSteps } };
export const Numbered: Story = { args: { steps: sampleSteps, variant: 'numbered' } };
export const InProgress: Story = { args: { steps: sampleSteps, activeStep: 1, variant: 'numbered' } };
export const Completed: Story = { args: { steps: sampleSteps, activeStep: 3, variant: 'numbered' } };
