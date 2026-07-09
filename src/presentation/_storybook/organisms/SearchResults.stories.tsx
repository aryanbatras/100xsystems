import type { Meta, StoryObj } from '@storybook/react';
import { SearchResults } from '../../__components/organisms/SearchResults';

const sampleArticles = [
  { id: '1', title: 'Getting Started with React', description: 'Learn the fundamentals of React including components, state, and props.', category: 'Frontend', tags: ['react', 'beginner'], date: '2024-01-15', icon: '⚛️' },
  { id: '2', title: 'Understanding TypeScript Generics', description: 'Deep dive into generics and type constraints in TypeScript.', category: 'Language', tags: ['typescript', 'advanced'], date: '2024-01-20', icon: '🔷' },
  { id: '3', title: 'System Design: Load Balancing', description: 'Explore different load balancing algorithms and their use cases.', category: 'Architecture', tags: ['system-design', 'scalability'], date: '2024-02-01', icon: '⚖️' },
  { id: '4', title: 'Node.js Performance Optimization', description: 'Tips and techniques for optimizing Node.js applications in production.', category: 'Backend', tags: ['nodejs', 'performance'], date: '2024-02-10', icon: '🚀' },
  { id: '5', title: 'CSS Grid Mastery', description: 'Complete guide to CSS Grid layout with practical examples.', category: 'Frontend', tags: ['css', 'layout'], date: '2024-02-15', icon: '🎨' },
];

const allTags = ['react', 'typescript', 'system-design', 'beginner', 'advanced', 'performance', 'css'];

const meta = {
  title: 'Organisms/SearchResults',
  component: SearchResults,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithResults: Story = {
  args: {
    query: 'react',
    results: sampleArticles.slice(0, 3),
    totalResults: 3,
    availableTags: allTags,
  },
};

export const AllResults: Story = {
  args: {
    query: '',
    results: sampleArticles,
    totalResults: 5,
    availableTags: allTags,
  },
};

export const WithFilters: Story = {
  args: {
    query: '',
    results: sampleArticles.slice(0, 2),
    totalResults: 2,
    availableTags: allTags,
    selectedTags: ['typescript', 'advanced'],
    onTagToggle: () => {},
    onClearFilters: () => {},
  },
};

export const Empty: Story = {
  args: {
    query: 'nonexistent',
    results: [],
    totalResults: 0,
  },
};

export const Loading: Story = {
  args: {
    query: 'react',
    results: [],
    loading: true,
  },
};

export const WithPagination: Story = {
  args: {
    query: '',
    results: sampleArticles.slice(0, 2),
    totalResults: 5,
    currentPage: 1,
    totalPages: 3,
    onPageChange: () => {},
  },
};
