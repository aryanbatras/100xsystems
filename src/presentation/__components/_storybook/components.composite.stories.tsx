import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, Alert, SearchInput, TabBar, Pagination, Breadcrumbs, CodeBlock, Timeline, ArticleCard, DifficultyBadge, FeatureCard, StatCard, StreakCard, ComingSoonCard, ModuleCard, UserCard, MemberCard, GroupCard, RoadmapCard, ProblemCard, DataGrid, FilterBar, SearchResults, FaqItem, ContactInfoItem, InfoRow } from '../components.composite';

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
export const ArticleCardStory: Story = { name: 'ArticleCard', render: () => <ArticleCard slug="test" title="Getting Started" date="2024-01-15" category="Engineering" readTime={8} /> };
export const DifficultyBadgeStory: Story = { name: 'DifficultyBadge', render: () => <div className="flex gap-2"><DifficultyBadge level="Beginner" /><DifficultyBadge level="Intermediate" /><DifficultyBadge level="Advanced" /><DifficultyBadge level="Theory" /></div> };
export const FeatureCardStory: Story = { name: 'FeatureCard', render: () => <FeatureCard icon="🚀" title="Systems Thinking" description="Learn to architect scalable solutions." number="01" /> };
export const StatCardStory: Story = { name: 'StatCard', render: () => <div className="space-y-4"><StatCard value="10,000" label="Users" trend="up" trendText="+12%" /><StatCard value="$48K" label="Revenue" variant="hero" /></div> };
export const StreakCardStory: Story = { name: 'StreakCard', render: () => <StreakCard currentStreak={7} longestStreak={30} totalDays={120} lastActivityDate="2025-01-10" showUpdate onUpdate={() => {}} /> };
export const ComingSoonCardStory: Story = { name: 'ComingSoonCard', render: () => <ComingSoonCard icon="🏆" title="Achievements" description="Track progress." /> };
export const ModuleCardStory: Story = { name: 'ModuleCard', render: () => <ModuleCard title="System Fundamentals" description="Master core principles" progress={75} completedLessons={9} totalLessons={12} difficulty="Intermediate" estimatedTime="8 hours" status="in-progress" /> };
export const UserCardStory: Story = { name: 'UserCard', render: () => <div className="space-y-2 max-w-sm border border-border"><UserCard name="Aryan Batra" username="aryan" bio="Full-stack engineer passionate about systems design" tags={['React', 'TypeScript', 'Node.js']} variant="default" /><UserCard name="Priya Sharma" username="priya" variant="compact" /></div> };
export const MemberCardStory: Story = { name: 'MemberCard', render: () => <div className="max-w-sm"><MemberCard name="Priya Sharma" username="priya" role="Admin" bio="Design lead with 5+ years experience" joinedDate="2024-06-15" socialLinks={[{ label: 'GitHub', url: '#' }, { label: 'LinkedIn', url: '#' }]} tags={['Figma', 'Design']} /></div> };
export const GroupCardStory: Story = { name: 'GroupCard', render: () => <div className="max-w-sm"><GroupCard name="System Design Study" description="Weekly study group for system design patterns" memberCount={24} maxMembers={50} tags={['system-design', 'architecture']} createdAt="2024-03-01" membership="admin" onJoin={() => {}} onEdit={() => {}} /></div> };
export const RoadmapCardStory: Story = { name: 'RoadmapCard', render: () => <div className="max-w-sm"><RoadmapCard title="Backend Engineering" description="Complete path to backend mastery" difficulty="Intermediate" estimatedTime="6 months" articleCount={12} sectionCount={8} sections={['Fundamentals', 'Databases', 'APIs', 'Deployment']} /></div> };
export const ProblemCardStory: Story = { name: 'ProblemCard', render: () => <div className="space-y-2"><ProblemCard order={1} title="Two Sum" difficulty="Easy" description="Find two numbers that add up to a target." examples={['Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]']} leetcodeUrl="https://leetcode.com/problems/two-sum/" /><ProblemCard order={2} title="Merge Intervals" difficulty="Medium" description="Merge all overlapping intervals." /></div> };
export const DataGridStory: Story = { name: 'DataGrid', render: () => <DataGrid stats={[{ label: 'Total Users', value: '10K', icon: '👥', trend: 'up', trendText: '+12%' }, { label: 'Active', value: '4.2K', icon: '⚡', trend: 'up', trendText: '+5%' }, { label: 'Revenue', value: '$48K', icon: '💰', trend: 'up', trendText: '+18%' }, { label: 'Churn', value: '2.1%', icon: '📉', trend: 'down', trendText: '-0.3%' }]} columns={4} /> };
export const FilterBarStory: Story = { name: 'FilterBar', render: () => <FilterBar searchValue="" onSearchChange={() => {}} searchPlaceholder="Filter resources..." resultCount={42}><DifficultyBadge level="Beginner" /></FilterBar> };
export const SearchResultsStory: Story = { name: 'SearchResults', render: () => <SearchResults query="system design" totalResults={15} results={[{ id: '1', title: 'Introduction to System Design', description: 'Learn the fundamentals of designing scalable systems.', url: '#', category: 'Engineering', tags: ['architecture', 'scalability'], date: '2024-06-15' }, { id: '2', title: 'Load Balancing Patterns', description: 'Different strategies for distributing traffic.', url: '#', category: 'DevOps', tags: ['networking', 'reliability'] }]} /> };
export const FaqItemStory: Story = { name: 'FaqItem', render: () => <FaqItem question="What is this?" answer="A platform for learning." /> };
export const ContactInfoItemStory: Story = { name: 'ContactInfoItem', render: () => <ContactInfoItem label="Email" value="admin@example.com" icon="✉️" /> };
export const InfoRowStory: Story = { name: 'InfoRow', render: () => <div className="max-w-md"><InfoRow label="Status" value="Active" /><InfoRow label="Role" value="Admin" variant="compact" /><InfoRow label="Joined" value="January 2024" variant="inline" /></div> };
