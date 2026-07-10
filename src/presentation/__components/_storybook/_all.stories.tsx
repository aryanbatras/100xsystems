import type { Meta, StoryObj } from '@storybook/react';
import {
  AnimatedIcon,
  Button, Input, Textarea, Badge, Tag, Spinner, Heading, Text, Divider, Select, Toggle, ProgressBar, CircularProgress, Skeleton, SkeletonBlock, Icon, Image,
  Accordion, Alert, SearchInput, TabBar, Pagination, Breadcrumbs, CodeBlock, Timeline, FilterBar,
  SidebarNav,
} from '..';

const meta = {
  title: 'All Components',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AllComponents: Story = {
  name: 'All Components',
  render: () => (
    <div className="p-8 space-y-16 max-w-4xl mx-auto">

      {/* ── Tokens ── */}
      <section>
        <h2 className="text-lg font-bold text-fg mb-6 border-b border-border pb-3">Tokens</h2>
        <div className="flex flex-wrap items-center gap-4">
          <AnimatedIcon name="search" size={28} />
          <AnimatedIcon name="user" size={28} />
          <AnimatedIcon name="star" size={28} />
          <AnimatedIcon name="heart" size={28} />
          <AnimatedIcon name="settings" size={28} />
          <AnimatedIcon name="bell" size={28} />
        </div>
      </section>

      {/* ── Atoms ── */}
      <section>
        <h2 className="text-lg font-bold text-fg mb-6 border-b border-border pb-3">Atoms</h2>

        <div className="space-y-8">
          {/* Buttons */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Buttons</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="ripple">Ripple</Button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Badges</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="purple">Purple</Badge>
              <Badge variant="yellow">Yellow</Badge>
              <Badge variant="black">Black</Badge>
              <Badge variant="purple" dot>Live</Badge>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Tags</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Tag variant="default">Default</Tag>
              <Tag variant="brand">Brand</Tag>
              <Tag variant="outline">Outline</Tag>
              <Tag variant="brand" removable onRemove={() => {}}>Removable</Tag>
            </div>
          </div>

          {/* Spinner */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Spinners</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Spinner size="lg" />
              <Spinner size="xl" />
            </div>
          </div>

          {/* Input & Textarea */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Inputs</h3>
            <div className="space-y-4 max-w-md">
              <Input label="Email" placeholder="you@example.com" />
              <Textarea label="Message" placeholder="Write your message..." rows={2} />
            </div>
          </div>

          {/* Select & Toggle */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Select & Toggle</h3>
            <div className="flex flex-wrap items-end gap-6">
              <div className="w-48">
                <Select label="Difficulty" options={[{ value: 'beginner', label: 'Beginner' }, { value: 'advanced', label: 'Advanced' }]} />
              </div>
              <Toggle checked={true} onChange={() => {}} label="Notifications" />
            </div>
          </div>

          {/* ProgressBar & CircularProgress */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Progress</h3>
            <div className="max-w-md space-y-3">
              <ProgressBar value={65} showLabel />
              <ProgressBar mode="buffer" value={30} bufferValue={65} />
              <ProgressBar />
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Circular Progress</h3>
            <div className="flex flex-wrap items-center gap-5">
              <CircularProgress value={25} size={48} showValue />
              <CircularProgress value={75} size={56} showValue variant="wavy" />
              <CircularProgress indeterminate size={48} />
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Typography</h3>
            <div className="space-y-1">
              <Heading variant="h2">Heading 2</Heading>
              <Text variant="body">Body text with relaxed leading.</Text>
              <Text variant="caption">Caption text</Text>
              <Divider label="divider" />
            </div>
          </div>

          {/* Skeleton */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Skeletons</h3>
            <div className="max-w-md space-y-2">
              <SkeletonBlock lines={2} />
            </div>
          </div>

          {/* Icon & Image */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Icon & Image</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Icon name="search" size={20} />
              <Icon name="star" size={20} />
              <Icon name="settings" size={20} />
              <div className="w-20">
                <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80" alt="Sample" aspectRatio="1/1" objectFit="cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Composites ── */}
      <section>
        <h2 className="text-lg font-bold text-fg mb-6 border-b border-border pb-3">Composites</h2>

        <div className="space-y-8">
          {/* Accordion */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Accordion</h3>
            <Accordion items={[{ id: '1', title: 'Getting Started', content: 'Learn the fundamentals.' }, { id: '2', title: 'Advanced Topics', content: 'Deep dive into architecture.' }]} />
          </div>

          {/* Alert */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Alerts</h3>
            <div className="space-y-2">
              <Alert variant="info">This is an informational message.</Alert>
              <Alert variant="success">Operation completed successfully.</Alert>
            </div>
          </div>

          {/* SearchInput */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">SearchInput</h3>
            <SearchInput value="" onChange={() => {}} placeholder="Search anything..." />
          </div>

          {/* TabBar */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">TabBar</h3>
            <TabBar tabs={[{ id: 'overview', label: 'Overview' }, { id: 'lessons', label: 'Lessons', count: 12 }]} activeTab="overview" onTabChange={() => {}} />
          </div>

          {/* Breadcrumbs */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Breadcrumbs</h3>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Docs' }, { label: 'Components' }]} />
          </div>

          {/* Pagination */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Pagination</h3>
            <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} totalItems={250} />
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Timeline</h3>
            <Timeline steps={[{ number: '01', title: 'Foundation', description: 'Master the basics' }, { number: '02', title: 'Advanced', description: 'Deep dive into topics' }]} variant="numbered" />
          </div>

          {/* CodeBlock */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">CodeBlock</h3>
            <CodeBlock code={`function greet(name: string) {\n  return \`Hello, \${name}!\`;\n}`} language="typescript" />
          </div>

          {/* FilterBar */}
          <div>
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">FilterBar</h3>
            <FilterBar searchValue="" onSearchChange={() => {}} searchPlaceholder="Filter items..." resultCount={42} />
          </div>
        </div>
      </section>

      {/* ── Layout ── */}
      <section>
        <h2 className="text-lg font-bold text-fg mb-6 border-b border-border pb-3">Layout</h2>
        <div className="border border-border max-w-xs">
          <SidebarNav items={[{ id: 'overview', label: 'Overview', count: 3 }, { id: 'settings', label: 'Settings', children: [{ id: 'profile', label: 'Profile' }, { id: 'account', label: 'Account' }] }]} header="Navigation" activeId="overview" />
        </div>
      </section>

    </div>
  ),
};
