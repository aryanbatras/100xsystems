import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, Alert, SearchInput, TabBar, Pagination, Breadcrumbs, CodeBlock, Timeline, FilterBar } from '../components.composite';

const meta = {
  title: 'Composites',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ padding: '3rem 1.5rem', maxWidth: '960px' }}><Story /></div>],
} satisfies Meta<React.ComponentType<unknown>>;

export default meta;
type Story = StoryObj<React.ComponentType<unknown>>;

export const AccordionStory: Story = { name: 'Accordion', render: () => <Accordion items={[{ id: '1', title: 'Section 1', content: 'Content here' }, { id: '2', title: 'Section 2', content: 'More content' }]} /> };
export const AlertStory: Story = { name: 'Alert', render: () => <div className="space-y-2"><Alert variant="info">Info message</Alert><Alert variant="success">Success!</Alert><Alert variant="error" dismissible>Error with dismiss</Alert></div> };
export const SearchInputStory: Story = { name: 'SearchInput', render: () => <SearchInput value="" onChange={() => {}} placeholder="Search..." /> };
export const TabBarStory: Story = { name: 'TabBar', render: () => <TabBar tabs={[{ id: 'overview', label: 'Overview' }, { id: 'lessons', label: 'Lessons', count: 12 }]} activeTab="overview" onTabChange={() => {}} /> };
export const PaginationStory: Story = { name: 'Pagination', render: () => <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} totalItems={100} /> };
export const BreadcrumbsStory: Story = { name: 'Breadcrumbs', render: () => <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Roadmaps' }, { label: 'System Design' }]} /> };
export const CodeBlockStory: Story = { name: 'CodeBlock', render: () => <CodeBlock code="console.log('hello');" language="javascript" /> };
export const TimelineStory: Story = { name: 'Timeline', render: () => <Timeline steps={[{ number: '01', title: 'Foundation', description: 'Master basics' }, { number: '02', title: 'Advanced', description: 'Deep dive' }]} variant="numbered" /> };
export const FilterBarStory: Story = { name: 'FilterBar', render: () => <FilterBar searchValue="" onSearchChange={() => {}} searchPlaceholder="Filter resources..." resultCount={42} /> };
