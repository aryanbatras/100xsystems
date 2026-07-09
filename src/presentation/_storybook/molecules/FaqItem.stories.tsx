import type { Meta, StoryObj } from '@storybook/react';
import { FaqItem } from '../../__components/molecules/FaqItem';

const meta = {
  title: 'Molecules/FaqItem',
  component: FaqItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[500px]"><Story /></div>],
} satisfies Meta<typeof FaqItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    question: 'What is 100xSystems?',
    answer: '100xSystems is a comprehensive platform for software engineering education that focuses on systems thinking, architecture, and hands-on learning through structured roadmaps and real-world projects.',
  },
};

export const Open: Story = {
  args: {
    question: 'How does the pricing work?',
    answer: 'We offer both free and premium tiers. The free tier includes access to introductory content and community features. Premium subscribers get full access to all roadmaps, advanced content, and personalized learning paths.',
    defaultOpen: true,
  },
};

export const LongAnswer: Story = {
  args: {
    question: 'What topics are covered in the System Design roadmap?',
    answer: 'The System Design roadmap covers a wide range of topics including: fundamentals of distributed systems, load balancing and caching strategies, database scaling and sharding, message queues and event-driven architectures, microservices patterns, API design principles, CAP theorem and consistency models, system design interviews preparation, and real-world case studies of large-scale systems like Netflix, Uber, and YouTube. Each section includes practical exercises and hands-on projects to reinforce learning.',
    defaultOpen: true,
  },
};
