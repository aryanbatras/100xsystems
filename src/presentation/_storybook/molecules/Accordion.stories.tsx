import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../__components/molecules/Accordion';

const sampleItems = [
  { id: 'intro', title: 'Introduction', content: <p>Welcome to this module where we explore core concepts.</p>, count: 3 },
  { id: 'basics', title: 'Core Concepts', content: <p>Deep dive into the fundamental principles that form the foundation.</p>, count: 8 },
  { id: 'advanced', title: 'Advanced Topics', content: <p>Complex patterns and advanced usage scenarios.</p>, count: 5 },
  { id: 'summary', title: 'Summary & Review', content: <p>Recap of key takeaways and practice exercises.</p> },
];

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'bordered', 'separated'] },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: sampleItems },
};

export const Bordered: Story = {
  args: { items: sampleItems, variant: 'bordered' },
};

export const Separated: Story = {
  args: { items: sampleItems, variant: 'separated' },
};

export const MultipleOpen: Story = {
  args: { items: sampleItems, multiple: true, defaultOpen: ['intro', 'basics'] },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      { id: 'a', title: 'Available Module', content: <p>This module is ready.</p> },
      { id: 'b', title: 'Coming Soon', content: <p>This module is locked.</p>, disabled: true },
    ],
  },
};
