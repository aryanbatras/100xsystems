/**
 * ## Page Components
 *
 * Page-level layout placeholders composed from existing atomic, composite,
 * token, and layout components. Each represents a full page section or
 * complete page layout using the design system tokens.
 *
 * @packageDocumentation
 */

'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/application/lib/utils';
import {
  Button, Input, Textarea, Badge, Tag, Spinner, Select, Toggle,
  Heading, Text, Divider, Icon, type IconName,
  type ButtonVariant,
} from './components.atomic';
import {
  Alert, Breadcrumbs, FaqItem,
  FeatureCard, UserCard, MemberCard, ModuleCard, RoadmapCard,
  ArticleCard, SearchInput, TabBar, Pagination,
  InfoRow, DifficultyBadge, type Tab,
} from './components.composite';
import { IconAnimatedGridPattern } from './components.animations';

// ─── SignUpPage ─────────────────────────────────────────────────────
// Full signup form with social auth, divider, terms & conditions.

export interface SignUpPageProps {
  className?: string;
  onSignUp?: (data: { name: string; email: string; password: string }) => void;
  onSocialSignUp?: (provider: 'google' | 'github' | 'discord') => void;
  onLogin?: () => void;
}

export function SignUpPage({ className, onSignUp, onSocialSignUp, onLogin }: SignUpPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-surface-secondary p-4', className)}>
      <div className="w-full max-w-md bg-white border border-border p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-2xl font-extrabold text-fg tracking-tight uppercase block mb-2">100X SYSTEMS</span>
          <h1 className="text-lg font-bold text-fg uppercase tracking-wider">Create Your Account</h1>
          <p className="text-sm text-fg-secondary mt-1">Start your journey to becoming a 100xsystems Engineer</p>
        </div>

        {/* Social sign-up buttons */}
        <div className="space-y-3 mb-6">
          <Button
            variant="ghost"
            className="w-full justify-center border border-border"
            icon={<Icon name="mail" size={16} />}
            onClick={() => onSocialSignUp?.('google')}
          >
            CONTINUE WITH GOOGLE
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-center border border-border"
            icon={<Icon name="user" size={16} />}
            onClick={() => onSocialSignUp?.('github')}
          >
            CONTINUE WITH GITHUB
          </Button>
        </div>

        <Divider label="OR SIGN UP WITH EMAIL" className="mb-6" />

        {/* Form */}
        <div className="space-y-5">
          <Input
            label="FULL NAME"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="EMAIL ADDRESS"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="PASSWORD"
            type="password"
            placeholder="••••••••"
            helperText="Min 8 characters, at least 1 uppercase and 1 number"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="primary"
            className="w-full justify-center"
            onClick={() => onSignUp?.({ name, email, password })}
          >
            CREATE ACCOUNT
          </Button>
        </div>

        {/* Terms */}
        <p className="mt-6 text-xs text-fg-muted text-center leading-relaxed">
          By creating an account, you agree to our{' '}
          <a href="/terms" className="text-accent hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>
        </p>

        {/* Login link */}
        <p className="mt-4 text-sm text-fg-secondary text-center">
          Already have an account?{' '}
          <button type="button" onClick={onLogin} className="text-accent font-semibold hover:underline">
            SIGN IN
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── LoginPage ──────────────────────────────────────────────────────
// Login form with remember me, forgot password, social auth.

export interface LoginPageProps {
  className?: string;
  onLogin?: (data: { email: string; password: string; remember: boolean }) => void;
  onSocialLogin?: (provider: 'google' | 'github' | 'discord') => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
}

export function LoginPage({ className, onLogin, onSocialLogin, onSignUp, onForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-surface-secondary p-4', className)}>
      <div className="w-full max-w-md bg-white border border-border p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-2xl font-extrabold text-fg tracking-tight uppercase block mb-2">100X SYSTEMS</span>
          <h1 className="text-lg font-bold text-fg uppercase tracking-wider">Welcome Back</h1>
          <p className="text-sm text-fg-secondary mt-1">Sign in to continue your learning journey</p>
        </div>

        {/* Social login */}
        <div className="space-y-3 mb-6">
          <Button
            variant="ghost"
            className="w-full justify-center border border-border"
            icon={<Icon name="mail" size={16} />}
            onClick={() => onSocialLogin?.('google')}
          >
            CONTINUE WITH GOOGLE
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-center border border-border"
            icon={<Icon name="user" size={16} />}
            onClick={() => onSocialLogin?.('github')}
          >
            CONTINUE WITH GITHUB
          </Button>
        </div>

        <Divider label="OR SIGN IN WITH EMAIL" className="mb-6" />

        {/* Form */}
        <div className="space-y-5">
          <Input
            label="EMAIL ADDRESS"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="PASSWORD"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Toggle
              checked={remember}
              onChange={setRemember}
              label="Remember me"
              size="sm"
            />
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs text-accent font-semibold hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <Button
            variant="primary"
            className="w-full justify-center"
            onClick={() => onLogin?.({ email, password, remember })}
          >
            SIGN IN
          </Button>
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-sm text-fg-secondary text-center">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={onSignUp} className="text-accent font-semibold hover:underline">
            CREATE ONE
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── ForgotPasswordPage ─────────────────────────────────────────────

export interface ForgotPasswordPageProps {
  className?: string;
  onReset?: (email: string) => void;
  onBackToLogin?: () => void;
}

export function ForgotPasswordPage({ className, onReset, onBackToLogin }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-surface-secondary p-4', className)}>
      <div className="w-full max-w-md bg-white border border-border p-8 md:p-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 bg-accent-bg flex items-center justify-center">
            <Icon name="mail" size={28} />
          </div>
        </div>
        <h1 className="text-lg font-bold text-fg uppercase tracking-wider mb-2">
          {sent ? 'CHECK YOUR EMAIL' : 'RESET PASSWORD'}
        </h1>
        <p className="text-sm text-fg-secondary mb-6">
          {sent
            ? 'We\'ve sent a reset link to your email if an account exists.'
            : 'Enter your email and we\'ll send you a reset link.'}
        </p>

        {!sent && (
          <div className="space-y-5">
            <Input
              label="EMAIL ADDRESS"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => { onReset?.(email); setSent(true); }}
            >
              SEND RESET LINK
            </Button>
          </div>
        )}

        <button
          type="button"
          onClick={onBackToLogin}
          className="mt-6 text-sm text-accent font-semibold hover:underline"
        >
          BACK TO SIGN IN
        </button>
      </div>
    </div>
  );
}

// ─── PricingTiers ───────────────────────────────────────────────────
// Three-tier pricing cards with feature lists, CTA, and yearly/monthly toggle.

export interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  ctaVariant: ButtonVariant;
}

export interface PricingTiersProps {
  tiers?: PricingTier[];
  yearly?: boolean;
  onToggleYearly?: (yearly: boolean) => void;
  onSelectTier?: (tier: PricingTier) => void;
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'STARTER', price: 0, description: 'Perfect for getting started',
    features: ['Access to 5 courses', 'Basic exercises', 'Community forum', 'Email support'],
    ctaLabel: 'GET STARTED FREE', ctaVariant: 'ghost',
  },
  {
    name: 'PRO', price: 29, description: 'For serious learners',
    features: ['All courses unlimited', 'Advanced exercises', 'Priority support', 'Progress tracking', 'Certificates'],
    highlighted: true, ctaLabel: 'START PRO', ctaVariant: 'primary',
  },
  {
    name: 'ENTERPRISE', price: 99, description: 'For teams & organizations',
    features: ['Everything in Pro', 'Team dashboard', 'Custom roadmaps', 'Dedicated support', 'API access', 'SSO'],
    ctaLabel: 'CONTACT SALES', ctaVariant: 'purpleGhost',
  },
];

export function PricingTiers({
  tiers = defaultTiers,
  yearly = false,
  onToggleYearly,
  onSelectTier,
  className,
}: PricingTiersProps) {
  const displayPrice = (price: number) => yearly ? price * 10 : price;

  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Heading variant="h2" className="uppercase tracking-tight">Pricing Plans</Heading>
          <Text variant="body" className="mt-2 max-w-md mx-auto">
            Choose the plan that fits your learning journey. Upgrade anytime.
          </Text>
        </div>

        {/* Yearly / Monthly toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={cn('text-sm font-semibold', !yearly ? 'text-fg' : 'text-fg-muted')}>Monthly</span>
          <Toggle checked={yearly} onChange={(v) => onToggleYearly?.(v)} />
          <span className={cn('text-sm font-semibold', yearly ? 'text-fg' : 'text-fg-muted')}>
            Yearly
            <Badge variant="yellow" size="sm" className="ml-1.5">SAVE 17%</Badge>
          </span>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'border p-8 flex flex-col transition-all duration-200',
                tier.highlighted
                  ? 'border-accent bg-white shadow-[0_4px_20px_-8px_rgba(87,46,255,0.15)] relative'
                  : 'border-border bg-white',
              )}
            >
              {tier.highlighted && (
                <Badge variant="purple" size="sm" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  MOST POPULAR
                </Badge>
              )}
              <h3 className="text-sm font-bold text-fg uppercase tracking-wider mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold text-fg tracking-tight">
                  ${displayPrice(tier.price)}
                </span>
                <span className="text-xs text-fg-muted">/{yearly ? 'yr' : 'mo'}</span>
              </div>
              <p className="text-xs text-fg-secondary mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-fg-secondary">
                    <Icon name="check" size={14} className="text-accent mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.ctaVariant}
                className={cn('w-full justify-center', !tier.highlighted && 'border border-border')}
                onClick={() => onSelectTier?.(tier)}
              >
                {tier.ctaLabel}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FAQPage ────────────────────────────────────────────────────────
// Full FAQ page with search, category tabs, and accordion items.

export interface FAQPageProps {
  className?: string;
}

const faqCategories = ['ALL', 'ACCOUNT', 'PAYMENT', 'COURSES', 'TECHNICAL'];
const faqData: Array<{ question: string; answer: string; category: string }> = [
  { question: 'How do I create an account?', answer: 'Click the "Sign Up" button in the top right corner. Fill in your details and verify your email address to get started.', category: 'ACCOUNT' },
  { question: 'Can I change my subscription plan?', answer: 'Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately.', category: 'PAYMENT' },
  { question: 'How are courses structured?', answer: 'Courses are divided into modules with progressive difficulty. Each module contains lessons, exercises, and assessments.', category: 'COURSES' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and cryptocurrency. Enterprise plans support invoice-based billing.', category: 'PAYMENT' },
  { question: 'Is there a mobile app?', answer: 'Yes, our platform is fully responsive and we offer native apps for iOS and Android.', category: 'TECHNICAL' },
  { question: 'Can I download courses for offline access?', answer: 'Pro and Enterprise plans include offline access to course materials through our mobile apps.', category: 'COURSES' },
  { question: 'How do I reset my password?', answer: 'Go to the login page and click "Forgot Password". We\'ll send a reset link to your registered email.', category: 'ACCOUNT' },
  { question: 'What is your refund policy?', answer: 'We offer a 30-day money-back guarantee on all paid plans. Contact support for assistance.', category: 'PAYMENT' },
];

export function FAQPage({ className }: FAQPageProps) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('ALL');

  const filtered = faqData.filter((item) => {
    const matchesSearch = item.question.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCat === 'ALL' || item.category === activeCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="purple" size="sm" className="mb-3">HELP CENTER</Badge>
          <Heading variant="h2" className="uppercase tracking-tight">Frequently Asked Questions</Heading>
          <Text variant="body" className="mt-2">Find answers to common questions about our platform.</Text>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search FAQ..."
          />
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {faqCategories.map((cat) => (
            <Tag
              key={cat}
              variant={activeCat === cat ? 'brand' : 'outline'}
              onClick={() => setActiveCat(cat)}
              className="cursor-pointer"
            >
              {cat}
            </Tag>
          ))}
        </div>

        {/* FAQ items */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Text variant="muted">No results found for &ldquo;{search}&rdquo;</Text>
            <button
              type="button"
              onClick={() => { setSearch(''); setActiveCat('ALL'); }}
              className="text-sm text-accent font-semibold hover:underline mt-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div>
            {filtered.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CoursesPage ────────────────────────────────────────────────────
// Course listing with search, filter tags, and course cards.

export interface CoursesPageProps {
  className?: string;
}

export function CoursesPage({ className }: CoursesPageProps) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('ALL');

  const tags = ['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'SYSTEM DESIGN', 'DSA', 'WEB DEV'];

  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Heading variant="h2" className="uppercase tracking-tight">All Courses</Heading>
          <Text variant="body" className="mt-1">Comprehensive learning paths for every skill level.</Text>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-4 mb-8">
          <SearchInput value={search} onChange={setSearch} placeholder="Search courses..." />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag
                key={tag}
                variant={activeTag === tag ? 'brand' : 'outline'}
                onClick={() => setActiveTag(tag)}
                className="cursor-pointer"
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'System Design Fundamentals', difficulty: 'Beginner' as const, sections: 8, desc: 'Master the core principles of designing scalable systems.', time: '8 hours' },
            { title: 'Advanced Data Structures', difficulty: 'Advanced' as const, sections: 12, desc: 'Deep dive into complex data structures and their applications.', time: '16 hours' },
            { title: 'Full-Stack Web Development', difficulty: 'Intermediate' as const, sections: 16, desc: 'Build complete web applications from front to back.', time: '24 hours' },
            { title: 'Microservices Architecture', difficulty: 'Advanced' as const, sections: 10, desc: 'Design and implement microservices-based systems.', time: '20 hours' },
            { title: 'Database Design & Optimization', difficulty: 'Intermediate' as const, sections: 6, desc: 'Master database design patterns and query optimization.', time: '12 hours' },
            { title: 'DevOps & CI/CD Pipelines', difficulty: 'Intermediate' as const, sections: 8, desc: 'Learn modern DevOps practices and automation.', time: '14 hours' },
            { title: 'Machine Learning Basics', difficulty: 'Beginner' as const, sections: 10, desc: 'Introduction to ML concepts and practical implementations.', time: '18 hours' },
            { title: 'Security Patterns & Practices', difficulty: 'Advanced' as const, sections: 7, desc: 'Implement security best practices in your systems.', time: '10 hours' },
            { title: 'API Design & GraphQL', difficulty: 'Intermediate' as const, sections: 5, desc: 'Design robust APIs with REST and GraphQL.', time: '8 hours' },
          ].map((course, i) => (
            <RoadmapCard
              key={i}
              title={course.title}
              description={course.desc}
              difficulty={course.difficulty}
              estimatedTime={course.time}
              sectionCount={course.sections}
              sections={[]}
              href="#"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CourseDetailPage ───────────────────────────────────────────────
// Single course page with modules, progress, sidebar info.

export interface CourseDetailPageProps {
  className?: string;
}

export function CourseDetailPage({ className }: CourseDetailPageProps) {
  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Courses', href: '/courses' },
            { label: 'System Design', href: '/courses/system-design' },
            { label: 'System Design Fundamentals' },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="purple" size="sm">INTERMEDIATE</Badge>
                <Badge variant="yellow" size="sm">8 HOURS</Badge>
              </div>
              <Heading variant="h2">System Design Fundamentals</Heading>
              <Text variant="body-lg" className="mt-2">
                Master the core principles of designing scalable, reliable, and maintainable systems.
                This comprehensive course covers everything from basic architecture patterns to advanced distributed systems.
              </Text>
              <div className="flex items-center gap-4 mt-4">
                <Button variant="primary">ENROLL NOW</Button>
                <Button variant="ghost" icon={<Icon name="bookmark" size={16} />}>SAVE</Button>
                <Button variant="ghost" icon={<Icon name="share" size={16} />}>SHARE</Button>
              </div>
            </div>

            <Divider className="mb-8" />

            {/* Modules */}
            <div className="space-y-4">
              <Heading variant="h4" className="uppercase tracking-wider">Course Modules</Heading>
              {[
                { title: 'Introduction to System Design', lessons: 4, progress: 100, status: 'completed' as const, time: '2 hours' },
                { title: 'Architecture Patterns', lessons: 6, progress: 60, status: 'in-progress' as const, time: '3 hours' },
                { title: 'Database Design Principles', lessons: 5, progress: 0, status: 'not-started' as const, time: '2.5 hours' },
                { title: 'Scalability & Caching', lessons: 4, progress: 0, status: 'not-started' as const, time: '2 hours' },
                { title: 'Distributed Systems', lessons: 6, progress: 0, status: 'not-started' as const, time: '3 hours' },
                { title: 'System Design Interviews', lessons: 3, progress: 0, status: 'not-started' as const, time: '1.5 hours' },
              ].map((mod, i) => (
                <ModuleCard
                  key={i}
                  title={mod.title}
                  description={`${mod.lessons} lessons — ${mod.time}`}
                  progress={mod.progress}
                  completedLessons={mod.status === 'completed' ? mod.lessons : mod.status === 'in-progress' ? Math.floor(mod.lessons * mod.progress / 100) : 0}
                  totalLessons={mod.lessons}
                  difficulty="Intermediate"
                  estimatedTime={mod.time}
                  status={mod.status}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border border-border p-6 bg-white">
              <Heading variant="h5" className="uppercase tracking-wider mb-4">Course Info</Heading>
              <div className="space-y-4">
                <InfoRow label="Duration" value="14 hours" variant="compact" />
                <InfoRow label="Lessons" value="28" variant="compact" />
                <InfoRow label="Difficulty" value={<DifficultyBadge level="Intermediate" size="sm" />} variant="compact" />
                <InfoRow label="Language" value="English" variant="compact" />
                <InfoRow label="Last Updated" value="March 2024" variant="compact" />
              </div>
            </div>

            <div className="border border-border p-6 bg-white">
              <Heading variant="h5" className="uppercase tracking-wider mb-4">Instructor</Heading>
              <UserCard
                name="Alex Rivera"
                username="alexrivera"
                bio="Senior Systems Architect with 15+ years of experience in distributed systems."
                tags={['System Design', 'Architecture']}
                variant="detailed"
              />
            </div>

            <div className="border border-border p-6 bg-white">
              <Heading variant="h5" className="uppercase tracking-wider mb-4">Your Progress</Heading>
              <div className="text-center py-4">
                <div className="text-3xl font-extrabold text-fg">28%</div>
                <Text variant="muted">Overall completion</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BlogPage ───────────────────────────────────────────────────────
// Blog/article listing with category filters and article cards.

export interface BlogPageProps {
  className?: string;
}

export function BlogPage({ className }: BlogPageProps) {
  const [activeCat, setActiveCat] = useState('ALL');
  const categories = ['ALL', 'SYSTEM DESIGN', 'DSA', 'CAREER', 'TUTORIAL', 'NEWS'];

  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <Heading variant="h2" className="uppercase tracking-tight">Articles & Resources</Heading>
          <Text variant="body" className="mt-1">Insights, tutorials, and deep dives from our engineering team.</Text>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Tag
              key={cat}
              variant={activeCat === cat ? 'brand' : 'outline'}
              onClick={() => setActiveCat(cat)}
              className="cursor-pointer"
            >
              {cat}
            </Tag>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Building Scalable Microservices', desc: 'Learn the key principles of designing microservices that scale.', cat: 'SYSTEM DESIGN', date: '2024-03-15', readTime: 12 },
            { title: 'Understanding B-Tree Indexing', desc: 'Deep dive into B-tree data structures and database indexing.', cat: 'DSA', date: '2024-03-10', readTime: 8 },
            { title: 'The 100xsystems Engineer Mindset', desc: 'What separates good engineers from great ones? A framework for growth.', cat: 'CAREER', date: '2024-03-05', readTime: 6 },
            { title: 'GraphQL vs REST: A Practical Guide', desc: 'When to use GraphQL vs REST API patterns.', cat: 'TUTORIAL', date: '2024-02-28', readTime: 10 },
            { title: 'Platform Update: March 2024', desc: 'New features, improvements, and what\'s coming next.', cat: 'NEWS', date: '2024-03-01', readTime: 3 },
            { title: 'Mastering System Design Interviews', desc: 'A structured approach to acing your system design interviews.', cat: 'CAREER', date: '2024-02-20', readTime: 15 },
          ].map((article, i) => (
            <ArticleCard
              key={i}
              slug={i.toString()}
              title={article.title}
              description={article.desc}
              date={article.date}
              category={article.cat}
              readTime={article.readTime}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10">
          <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} totalItems={30} />
        </div>
      </div>
    </div>
  );
}

// ─── TeamPage ───────────────────────────────────────────────────────
// Team members grid with role/bio cards.

export interface TeamPageProps {
  className?: string;
}

export function TeamPage({ className }: TeamPageProps) {
  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="purple" size="sm" className="mb-3">OUR TEAM</Badge>
          <Heading variant="h2" className="uppercase tracking-tight">Meet the Engineers</Heading>
          <Text variant="body" className="mt-2 max-w-lg mx-auto">
            We&apos;re a distributed team of engineers, designers, and educators building the future of technical education.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Alex Rivera', role: 'FOUNDER & CEO', bio: 'Former Staff Engineer at Google. Passionate about systems thinking.', tags: ['System Design', 'Leadership'] },
            { name: 'Sarah Chen', role: 'CTO', bio: 'Ex-Amazon Principal Engineer. Distributed systems expert.', tags: ['Architecture', 'Backend'] },
            { name: 'Marcus Johnson', role: 'HEAD OF ENGINEERING', bio: 'Led engineering teams at Stripe and Shopify.', tags: ['Full-Stack', 'DevOps'] },
            { name: 'Priya Patel', role: 'EDUCATION DIRECTOR', bio: 'PhD in Computer Science Education. Curriculum designer.', tags: ['Education', 'DSA'] },
            { name: 'James Wilson', role: 'SENIOR ENGINEER', bio: 'Open source contributor. Rust and systems programming.', tags: ['Systems', 'Rust'] },
            { name: 'Elena Garcia', role: 'UI/UX LEAD', bio: 'Design systems architect. Accessibility advocate.', tags: ['Design', 'UX'] },
            { name: 'David Kim', role: 'ML ENGINEER', bio: 'AI/ML researcher. Building intelligent learning tools.', tags: ['AI/ML', 'NLP'] },
            { name: 'Lisa Thompson', role: 'COMMUNITY LEAD', bio: 'Developer relations expert. Community builder.', tags: ['Community', 'Content'] },
          ].map((member, i) => (
            <MemberCard
              key={i}
              name={member.name}
              username={member.role.toLowerCase().replace(/[&\s]+/g, '')}
              role={member.role}
              bio={member.bio}
              tags={member.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ContactPage ────────────────────────────────────────────────────
// Two-column contact page with form and info.

export interface ContactPageProps {
  className?: string;
  onSubmit?: (data: { name: string; email: string; subject: string; message: string }) => void;
}

export function ContactPageLayout({ className, onSubmit }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="purple" size="sm" className="mb-3">GET IN TOUCH</Badge>
          <Heading variant="h2" className="uppercase tracking-tight">Contact Us</Heading>
          <Text variant="body" className="mt-2 max-w-md mx-auto">
            Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-border p-6 bg-white">
              <ContactInfoSection icon="mail" label="EMAIL" value="admin@100xsystems.dev" />
              <ContactInfoSection icon="clock" label="RESPONSE TIME" value="Typically within 24 hours" />
              <ContactInfoSection icon="globe" label="LOCATION" value="San Francisco, CA / Remote" />
              <ContactInfoSection icon="user" label="SOCIAL" value={<span className="flex gap-3 mt-1">@100xsystems on X, LinkedIn</span>} />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="border border-border p-6 bg-white">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="YOUR NAME" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input label="EMAIL" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Input label="SUBJECT" placeholder="How can we help?" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <Textarea label="MESSAGE" placeholder="Tell us more about your inquiry..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button variant="primary" className="w-full justify-center" onClick={() => onSubmit?.({ name, email, subject, message })}>
                  SEND MESSAGE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoSection({ icon, label, value }: { icon: IconName; label: string; value: ReactNode }) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
      <div className="h-9 w-9 bg-accent-bg flex items-center justify-center shrink-0">
        <Icon name={icon} size={16} className="text-accent" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mb-0.5">{label}</p>
        <p className="text-sm text-fg">{value}</p>
      </div>
    </div>
  );
}

// ─── NotFoundPage ──────────────────────────────────────────────────
// 404 error page with illustration and navigation options.

export interface NotFoundPageProps {
  className?: string;
  onGoHome?: () => void;
  onGoBack?: () => void;
}

export function NotFoundPage({ className, onGoHome, onGoBack }: NotFoundPageProps) {
  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-surface-secondary p-4', className)}>
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-fg tracking-tighter mb-4 select-none">404</div>
        <Heading variant="h3" className="uppercase tracking-tight mb-3">Page Not Found</Heading>
        <Text variant="body" className="mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find your way back.
        </Text>
        <div className="flex items-center justify-center gap-4">
          <Button variant="primary" onClick={onGoHome}>GO HOME</Button>
          <Button variant="ghost" icon={<Icon name="arrow-left" size={16} />} onClick={onGoBack}>
            GO BACK
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── ErrorPage (500) ────────────────────────────────────────────────

export interface ErrorPageProps {
  className?: string;
  errorMessage?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export function ErrorPage({ className, errorMessage = 'Something went wrong', onRetry, onGoHome }: ErrorPageProps) {
  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-surface-secondary p-4', className)}>
      <div className="text-center max-w-md">
        <div className="h-20 w-20 bg-accent-bg flex items-center justify-center mx-auto mb-6">
          <Icon name="alert-circle" size={36} className="text-accent" />
        </div>
        <Heading variant="h3" className="uppercase tracking-tight mb-3">Unexpected Error</Heading>
        <Alert variant="error" className="mb-6 text-left">
          {errorMessage}
        </Alert>
        <Text variant="body" className="mb-8">
          Our team has been notified. Please try again or contact support if the issue persists.
        </Text>
        <div className="flex items-center justify-center gap-4">
          <Button variant="primary" onClick={onRetry}>TRY AGAIN</Button>
          <Button variant="ghost" onClick={onGoHome}>GO HOME</Button>
        </div>
      </div>
    </div>
  );
}

// ─── StatsShowcase ──────────────────────────────────────────────────
// Statistics / metrics showcase section.

export interface StatsShowcaseProps {
  className?: string;
}

export function StatsShowcase({ className }: StatsShowcaseProps) {
  return (
    <div className={cn('py-16 px-4 bg-accent text-white', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '50K+', label: 'ACTIVE LEARNERS' },
            { value: '500+', label: 'COURSES' },
            { value: '95%', label: 'SATISFACTION' },
            { value: '24/7', label: 'SUPPORT' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── NewsletterSignup ───────────────────────────────────────────────
// Newsletter CTA section with email input.

export interface NewsletterSignupProps {
  className?: string;
  onSubmit?: (email: string) => void;
}

export function NewsletterSignup({ className, onSubmit }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');

  return (
    <div className={cn('py-16 px-4 border-t border-border', className)}>
      <div className="max-w-xl mx-auto text-center">
        <Heading variant="h3" className="uppercase tracking-tight mb-2">Stay Updated</Heading>
        <Text variant="body" className="mb-6">
          Get the latest articles, tutorials, and platform updates delivered to your inbox.
        </Text>
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
          <Button variant="primary" onClick={() => onSubmit?.(email)}>SUBSCRIBE</Button>
        </div>
        <Text variant="caption" className="mt-3">
          No spam. Unsubscribe anytime.
        </Text>
      </div>
    </div>
  );
}

// ─── SettingsPage ───────────────────────────────────────────────────
// Settings page with tabs for different settings categories.

export interface SettingsPageProps {
  className?: string;
}

export function SettingsPage({ className }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs: Tab[] = [
    { id: 'profile', label: 'PROFILE' },
    { id: 'account', label: 'ACCOUNT' },
    { id: 'notifications', label: 'NOTIFICATIONS' },
    { id: 'privacy', label: 'PRIVACY' },
  ];

  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        <Heading variant="h2" className="uppercase tracking-tight mb-2">Settings</Heading>
        <Text variant="body" className="mb-8">Manage your account settings and preferences.</Text>

        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} variant="underline" className="mb-8" />

        <div className="border border-border p-8 bg-white">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Heading variant="h5" className="uppercase tracking-wider">Profile Information</Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="FIRST NAME" placeholder="John" />
                <Input label="LAST NAME" placeholder="Doe" />
              </div>
              <Input label="BIO" placeholder="Tell us about yourself..." />
              <Input label="LOCATION" placeholder="San Francisco, CA" />
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="primary">SAVE CHANGES</Button>
                <Button variant="ghost">CANCEL</Button>
              </div>
            </div>
          )}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <Heading variant="h5" className="uppercase tracking-wider">Account Settings</Heading>
              <Input label="EMAIL" type="email" defaultValue="john@example.com" />
              <Input label="USERNAME" defaultValue="johndoe" />
              <Divider label="PASSWORD" />
              <Input label="CURRENT PASSWORD" type="password" placeholder="••••••••" />
              <Input label="NEW PASSWORD" type="password" placeholder="••••••••" />
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="primary">UPDATE ACCOUNT</Button>
                <Button variant="ghost">CANCEL</Button>
              </div>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <Heading variant="h5" className="uppercase tracking-wider">Notification Preferences</Heading>
              {[
                { label: 'Email notifications for new courses', defaultChecked: true },
                { label: 'Push notifications for reminders', defaultChecked: true },
                { label: 'Weekly progress digest', defaultChecked: false },
                { label: 'Product updates and features', defaultChecked: true },
                { label: 'Community activity alerts', defaultChecked: false },
              ].map((n, i) => (
                <Toggle key={i} checked={n.defaultChecked} onChange={() => {}} label={n.label} />
              ))}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="primary">SAVE PREFERENCES</Button>
              </div>
            </div>
          )}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <Heading variant="h5" className="uppercase tracking-wider">Privacy Settings</Heading>
              <Toggle checked={true} onChange={() => {}} label="Make my profile public" />
              <Toggle checked={false} onChange={() => {}} label="Show my progress on leaderboard" />
              <Toggle checked={true} onChange={() => {}} label="Allow others to message me" />
              <Alert variant="info" className="mt-4">
                Your privacy is important to us. We only use your data to personalize your learning experience.
              </Alert>
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="primary">SAVE PRIVACY</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── OnboardingPage ─────────────────────────────────────────────────
// Multi-step onboarding/setup wizard.

export interface OnboardingPageProps {
  className?: string;
}

export function OnboardingPage({ className }: OnboardingPageProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-surface-secondary p-4', className)}>
      <div className="w-full max-w-lg bg-white border border-border p-8 md:p-12">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={cn(
                'h-8 w-8 flex items-center justify-center text-xs font-bold transition-colors',
                i + 1 === step ? 'bg-accent text-white' : i + 1 < step ? 'bg-accent-bg text-accent' : 'bg-surface-secondary text-fg-muted',
              )}>
                {i + 1}
              </div>
              {i < totalSteps - 1 && <div className={cn('w-8 h-px', i + 1 < step ? 'bg-accent' : 'bg-border')} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="text-center mb-8">
          <Heading variant="h4" className="uppercase tracking-tight mb-2">
            {step === 1 && 'Welcome to 100X Systems'}
            {step === 2 && 'Set Your Goals'}
            {step === 3 && 'Choose Your Path'}
            {step === 4 && 'Ready to Learn'}
          </Heading>
          <Text variant="body">
            {step === 1 && 'Tell us a bit about yourself so we can personalize your experience.'}
            {step === 2 && 'What are your learning goals? Select all that apply.'}
            {step === 3 && 'Pick the areas you want to focus on first.'}
            {step === 4 && 'You\'re all set! Let\'s start your learning journey.'}
          </Text>
        </div>

        {/* Step body */}
        {step === 1 && (
          <div className="space-y-5">
            <Input label="YOUR NAME" placeholder="John Doe" />
            <Input label="EXPERIENCE LEVEL" placeholder="e.g., Junior, Mid, Senior" />
            <Select
              label="WHAT BRINGS YOU HERE?"
              options={[
                { value: 'career', label: 'Career Growth' },
                { value: 'interview', label: 'Interview Prep' },
                { value: 'upskill', label: 'Upskilling' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select..."
            />
          </div>
        )}
        {step === 2 && (
          <div className="grid grid-cols-2 gap-3">
            {['Master System Design', 'Ace Interviews', 'Build Projects', 'Learn DSA', 'Advance Career', 'Contribute to OSS'].map((goal) => (
              <Tag
                key={goal}
                variant="outline"
                className="cursor-pointer justify-center py-3"
                onClick={() => {}}
              >
                {goal}
              </Tag>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="grid grid-cols-2 gap-3">
            {['System Design', 'Data Structures', 'Algorithms', 'Web Dev', 'DevOps', 'AI/ML'].map((path) => (
              <Tag
                key={path}
                variant="outline"
                className="cursor-pointer justify-center py-3"
                onClick={() => {}}
              >
                {path}
              </Tag>
            ))}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            icon={<Icon name="arrow-left" size={16} />}
          >
            BACK
          </Button>
          <div className="text-xs text-fg-muted">Step {step} of {totalSteps}</div>
          <Button
            variant="primary"
            onClick={() => step < totalSteps ? setStep(step + 1) : undefined}
            iconPosition="right"
            icon={<Icon name="arrow-right" size={16} />}
          >
            {step === totalSteps ? 'GET STARTED' : 'NEXT'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── TestimonialsShowcase ───────────────────────────────────────────
// Testimonial cards in a grid.

export interface TestimonialsShowcaseProps {
  className?: string;
}

export function TestimonialsShowcase({ className }: TestimonialsShowcaseProps) {
  return (
    <div className={cn('py-16 px-4 bg-surface-secondary', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="purple" size="sm" className="mb-3">TESTIMONIALS</Badge>
          <Heading variant="h2" className="uppercase tracking-tight">What Our Learners Say</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: 'This platform completely transformed how I approach system design. The depth-first learning methodology is game-changing.', name: 'Sarah Chen', role: 'Senior Engineer at Stripe' },
            { quote: 'The structured curriculum helped me land my dream job at Google. The DSA course is the best I\'ve ever taken.', name: 'Marcus Johnson', role: 'Software Engineer at Google' },
            { quote: 'Finally, a platform that teaches real engineering, not just theory. The projects are challenging and relevant.', name: 'Priya Patel', role: 'Full-Stack Developer' },
          ].map((t, i) => (
            <div key={i} className="border border-border bg-white p-6">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Icon key={s} name="star" size={14} className={s < 4 ? 'text-accent-yellow' : 'text-border'} />
                ))}
              </div>
              <p className="text-sm text-fg-secondary leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold text-fg">{t.name}</p>
                <p className="text-xs text-fg-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ComparisonPage ─────────────────────────────────────────────────
// Feature comparison table.

export interface ComparisonPageProps {
  className?: string;
}

export function ComparisonPage({ className }: ComparisonPageProps) {
  const plans = ['FREE', 'PRO', 'ENTERPRISE'];
  const features = [
    { name: 'Course Access', free: '5 courses', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Exercises', free: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
    { name: 'Progress Tracking', free: '—', pro: '✓', enterprise: '✓' },
    { name: 'Certificates', free: '—', pro: '✓', enterprise: '✓' },
    { name: 'Priority Support', free: '—', pro: '✓', enterprise: '24/7 Dedicated' },
    { name: 'Team Dashboard', free: '—', pro: '—', enterprise: '✓' },
    { name: 'Custom Roadmaps', free: '—', pro: '—', enterprise: '✓' },
    { name: 'API Access', free: '—', pro: '—', enterprise: '✓' },
    { name: 'SSO', free: '—', pro: '—', enterprise: '✓' },
  ];

  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Heading variant="h2" className="uppercase tracking-tight">Compare Plans</Heading>
          <Text variant="body" className="mt-2">Find the right plan for your learning journey.</Text>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left px-4 py-4 text-xs font-bold uppercase tracking-wider text-fg-muted bg-surface-secondary border-b border-border">Feature</th>
                {plans.map((plan) => (
                  <th key={plan} className={cn(
                    'px-4 py-4 text-sm font-bold uppercase tracking-wider border-b border-border text-center',
                    plan === 'PRO' ? 'bg-accent-bg text-accent' : 'bg-surface-secondary text-fg',
                  )}>
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className={cn('border-b border-border', i % 2 === 0 ? 'bg-white' : 'bg-surface-light')}>
                  <td className="px-4 py-3 text-sm text-fg font-medium">{f.name}</td>
                  {(['free', 'pro', 'enterprise'] as const).map((key) => (
                    <td key={key} className="px-4 py-3 text-sm text-fg-secondary text-center">
                      {f[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── DonationPage ───────────────────────────────────────────────────
// Donation amount selection with pre-defined amounts and custom input.

export interface DonationPageProps {
  className?: string;
}

export function DonationPage({ className }: DonationPageProps) {
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState('');
  const presets = [10, 25, 50, 100, 250, 500];

  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-surface-secondary p-4', className)}>
      <div className="w-full max-w-md bg-white border border-border p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="h-16 w-16 bg-accent-bg flex items-center justify-center mx-auto mb-4">
            <Icon name="heart" size={28} className="text-accent" />
          </div>
          <Heading variant="h3" className="uppercase tracking-tight mb-2">Support Our Mission</Heading>
          <Text variant="body">
            Help us provide free, high-quality engineering education to developers worldwide.
          </Text>
        </div>

        {/* Preset amounts */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => { setAmount(preset); setCustom(''); }}
              className={cn(
                'py-3 text-sm font-bold border transition-all',
                amount === preset && !custom
                  ? 'border-accent bg-accent-bg text-accent'
                  : 'border-border text-fg-secondary hover:border-accent',
              )}
            >
              ${preset}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <Input
          label="OR ENTER CUSTOM AMOUNT"
          type="number"
          placeholder="Enter amount"
          value={custom}
          onChange={(e) => { setCustom(e.target.value); setAmount(0); }}
          fullWidth
        />

        <Button variant="primary" className="w-full justify-center mt-6">
          DONATE ${custom || amount}
        </Button>

        <Text variant="caption" className="mt-4">
          Secure payment via Stripe. You&apos;ll receive a receipt via email.
        </Text>
      </div>
    </div>
  );
}

// ─── CheckoutPage ───────────────────────────────────────────────────
// Simple checkout/cart page layout.

export interface CheckoutPageProps {
  className?: string;
}

export function CheckoutPage({ className }: CheckoutPageProps) {
  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-surface-secondary p-4', className)}>
      <div className="w-full max-w-2xl bg-white border border-border p-8 md:p-12">
        <Heading variant="h3" className="uppercase tracking-tight mb-6">Checkout</Heading>

        {/* Order summary */}
        <div className="border border-border mb-6">
          <div className="px-5 py-4 border-b border-border bg-surface-light">
            <span className="text-xs font-bold uppercase tracking-wider text-fg-muted">Order Summary</span>
          </div>
          <div className="px-5 py-4 space-y-3">
            {[
              { item: 'Pro Plan — Yearly', price: '$290' },
              { item: 'System Design Course', price: '$49' },
            ].map((line, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-fg">{line.item}</span>
                <span className="text-fg font-semibold">{line.price}</span>
              </div>
            ))}
            <Divider />
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-fg">Total</span>
              <span className="text-accent">$339</span>
            </div>
          </div>
        </div>

        {/* Payment form */}
        <div className="space-y-5">
          <Input label="CARDHOLDER NAME" placeholder="John Doe" />
          <Input label="CARD NUMBER" placeholder="4242 4242 4242 4242" />
          <div className="grid grid-cols-2 gap-5">
            <Input label="EXPIRY" placeholder="MM/YY" />
            <Input label="CVC" placeholder="123" />
          </div>
          <Input label="COUPON CODE" placeholder="Enter coupon" />
          <Button variant="primary" className="w-full justify-center">
            PAY $339
          </Button>
          <Text variant="caption" className="text-center">
            Secured by Stripe. Your card info is never stored on our servers.
          </Text>
        </div>
      </div>
    </div>
  );
}

// ─── EmptyDashboard ─────────────────────────────────────────────────
// Empty state for a dashboard with no data yet.

export interface EmptyDashboardProps {
  className?: string;
  onGetStarted?: () => void;
  onBrowseCourses?: () => void;
}

export function EmptyDashboard({ className, onGetStarted, onBrowseCourses }: EmptyDashboardProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-24 px-4 text-center', className)}>
      <div className="h-24 w-24 bg-accent-bg flex items-center justify-center mb-6">
        <Icon name="folder" size={40} className="text-accent" />
      </div>
      <Heading variant="h3" className="uppercase tracking-tight mb-2">Welcome to Your Dashboard</Heading>
      <Text variant="body" className="max-w-md mb-8">
        Your learning journey starts here. Pick a course and start building your skills.
        Your progress, achievements, and notes will appear here.
      </Text>
      <div className="flex items-center gap-4">
        <Button variant="primary" onClick={onGetStarted}>GET STARTED</Button>
        <Button variant="ghost" onClick={onBrowseCourses}>BROWSE COURSES</Button>
      </div>
    </div>
  );
}

// ─── NotificationsPage ─────────────────────────────────────────────
// Notification list page with read/unread states.

export interface NotificationsPageProps {
  className?: string;
}

export function NotificationsPage({ className }: NotificationsPageProps) {
  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Heading variant="h2" className="uppercase tracking-tight">Notifications</Heading>
            <Text variant="body" className="mt-1">Stay updated with your learning activity.</Text>
          </div>
          <Button variant="ghost" size="sm">MARK ALL READ</Button>
        </div>

        <div className="space-y-2">
          {[
            { title: 'Course Update: System Design', desc: 'New module added — Distributed Systems', time: '2 hours ago', unread: true },
            { title: 'Achievement Unlocked!', desc: 'You earned the "Quick Learner" badge', time: 'Yesterday', unread: true },
            { title: 'Weekly Progress Report', desc: 'You completed 5 lessons this week', time: '3 days ago', unread: false },
            { title: 'New Comment on Your Post', desc: 'Sarah replied to your discussion about microservices', time: '5 days ago', unread: false },
            { title: 'Course Recommendation', desc: 'Based on your progress, try "Advanced DSA"', time: '1 week ago', unread: false },
          ].map((notification, i) => (
            <div
              key={i}
              className={cn(
                'flex items-start gap-4 p-4 border border-border transition-colors hover:border-border-hover cursor-pointer',
                notification.unread ? 'bg-accent-bg border-l-accent border-l-2' : 'bg-white',
              )}
            >
              <div className={cn(
                'h-9 w-9 flex items-center justify-center shrink-0',
                notification.unread ? 'bg-accent text-white' : 'bg-surface-secondary text-fg-muted',
              )}>
                <Icon name={notification.unread ? 'star' : 'clock'} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm', notification.unread ? 'font-semibold text-fg' : 'text-fg-secondary')}>
                  {notification.title}
                </p>
                <p className="text-xs text-fg-muted mt-0.5">{notification.desc}</p>
                <p className="text-[10px] text-fg-muted mt-1">{notification.time}</p>
              </div>
              {notification.unread && <div className="h-2 w-2 bg-accent rounded-full mt-2 shrink-0" />}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost" size="sm">LOAD MORE</Button>
        </div>
      </div>
    </div>
  );
}

// ─── AccountPage ────────────────────────────────────────────────────
// Account management page with security options.

export interface AccountPageProps {
  className?: string;
}

export function AccountPage({ className }: AccountPageProps) {
  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-3xl mx-auto">
        <Heading variant="h2" className="uppercase tracking-tight mb-2">Account</Heading>
        <Text variant="body" className="mb-8">Manage your account security and connected services.</Text>

        <div className="space-y-6">
          {/* Security */}
          <div className="border border-border p-6 bg-white">
            <Heading variant="h5" className="uppercase tracking-wider mb-4">Security</Heading>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-fg">Password</p>
                  <p className="text-xs text-fg-muted">Last changed 30 days ago</p>
                </div>
                <Button variant="ghost" size="sm">CHANGE</Button>
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-fg">Two-Factor Authentication</p>
                  <p className="text-xs text-fg-muted">Add an extra layer of security</p>
                </div>
                <Toggle checked={false} onChange={() => {}} />
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-fg">Active Sessions</p>
                  <p className="text-xs text-fg-muted">2 active sessions</p>
                </div>
                <Button variant="ghost" size="sm">MANAGE</Button>
              </div>
            </div>
          </div>

          {/* Connected accounts */}
          <div className="border border-border p-6 bg-white">
            <Heading variant="h5" className="uppercase tracking-wider mb-4">Connected Accounts</Heading>
            <div className="space-y-4">
              {[
                { provider: 'Google', connected: true, email: 'john@gmail.com' },
                { provider: 'GitHub', connected: true, email: 'johndoe' },
                { provider: 'Discord', connected: false, email: '' },
              ].map((conn, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-surface-secondary flex items-center justify-center text-xs font-bold text-fg-muted">
                      {conn.provider[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-fg">{conn.provider}</p>
                      {conn.connected && <p className="text-xs text-fg-muted">{conn.email}</p>}
                    </div>
                  </div>
                  <Button variant={conn.connected ? 'ghost' : 'primary'} size="sm">
                    {conn.connected ? 'DISCONNECT' : 'CONNECT'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="border border-red-200 p-6 bg-red-50">
            <Heading variant="h5" className="uppercase tracking-wider mb-4 text-red-600">Danger Zone</Heading>
            <p className="text-xs text-red-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <Button variant="ghost" className="border border-red-300 text-red-600 hover:bg-red-100">
              DELETE ACCOUNT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ComingSoonPage ─────────────────────────────────────────────────
// Full-page launch countdown/coming soon layout.

export interface ComingSoonPageProps {
  className?: string;
  onNotify?: (email: string) => void;
}

export function ComingSoonPage({ className, onNotify }: ComingSoonPageProps) {
  const [email, setEmail] = useState('');

  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-surface-secondary p-4', className)}>
      <div className="text-center max-w-lg">
        <Badge variant="purple" size="sm" className="mb-4">COMING SOON</Badge>
        <Heading variant="h2" className="uppercase tracking-tight mb-4">Something Amazing Is Coming</Heading>
        <Text variant="body" className="mb-8">
          We&apos;re building something incredible. Be the first to know when we launch.
        </Text>

        <div className="flex items-center gap-3 max-w-sm mx-auto mb-8">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
          <Button variant="primary" onClick={() => onNotify?.(email)}>NOTIFY ME</Button>
        </div>

        {/* Placeholder countdown */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: '47', label: 'DAYS' },
            { value: '12', label: 'HOURS' },
            { value: '38', label: 'MINUTES' },
            { value: '52', label: 'SECONDS' },
          ].map((unit, i) => (
            <div key={i} className="border border-border bg-white p-4">
              <div className="text-2xl font-extrabold text-fg">{unit.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mt-1">{unit.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SearchPage ─────────────────────────────────────────────────────
// Full dedicated search results page.

export interface SearchPageProps {
  className?: string;
}

export function SearchPage({ className }: SearchPageProps) {
  const [query, setQuery] = useState('system design');

  return (
    <div className={cn('py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-bold text-fg uppercase tracking-wider mb-6">Search</h1>

        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search courses, articles, roadmaps..."
          className="mb-8"
          onSearch={() => {}}
        />

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All', 'Courses', 'Articles', 'Roadmaps', 'DSA', 'People'].map((filter) => (
            <Tag key={filter} variant={filter === 'All' ? 'brand' : 'outline'} className="cursor-pointer">
              {filter}
            </Tag>
          ))}
        </div>

        {/* Results meta */}
        <p className="text-sm text-fg-secondary mb-6">Showing 12 results for &ldquo;{query}&rdquo;</p>

        {/* Results */}
        <div className="space-y-3">
          {[
            { title: 'System Design Fundamentals', cat: 'Course', desc: 'Master the core principles of designing scalable systems.', url: '#' },
            { title: 'Building Scalable Microservices', cat: 'Article', desc: 'Learn the key principles of designing microservices that scale.', url: '#' },
            { title: 'System Design Interview Prep', cat: 'Roadmap', desc: 'A structured approach to acing your system design interviews.', url: '#' },
            { title: 'Database Design Patterns', cat: 'Article', desc: 'Common database design patterns and when to use them.', url: '#' },
          ].map((result, i) => (
            <a key={i} href={result.url} className="block border border-border p-4 hover:border-border-hover transition-colors bg-white">
              <div className="flex items-center gap-2 mb-1">
                <Tag variant="default" size="sm">{result.cat}</Tag>
              </div>
              <h3 className="text-sm font-semibold text-fg">{result.title}</h3>
              <p className="text-xs text-fg-secondary mt-1">{result.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
        </div>
      </div>
    </div>
  );
}

// ─── HeroPage ───────────────────────────────────────────────────────
// Landing page hero section with headline, subtitle, CTA.

export interface HeroPageProps {
  className?: string;
}

export function HeroPage({ className }: HeroPageProps) {
  return (
    <section className={cn('relative overflow-hidden min-h-[80vh] flex items-center', className)}>
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <IconAnimatedGridPattern />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 text-center">
        <Badge variant="purple" size="sm" className="mb-4">100X SYSTEMS</Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold text-fg tracking-tight leading-[1.05] mb-6 uppercase">
          Transform Into a<br />
          <span className="text-accent">100xsystems Engineer</span>
        </h1>
        <p className="text-lg text-fg-secondary max-w-2xl mx-auto mb-8 uppercase tracking-wider">
          Depth-first learning. Systems thinking. Real engineering.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="primary" size="lg">START LEARNING</Button>
          <Button variant="ghost" size="lg" iconPosition="right" icon={<Icon name="arrow-right" size={20} />}>
            EXPLORE
          </Button>
        </div>
      </div>
    </section>
  );
}


// ─── CtaSection ─────────────────────────────────────────────────────
// Call-to-action section with background and two buttons.

export interface CtaSectionProps {
  className?: string;
}

export function CtaSection({ className }: CtaSectionProps) {
  return (
    <section className={cn('py-20 px-4 bg-accent text-white text-center', className)}>
      <div className="max-w-2xl mx-auto">
        <Heading variant="h2" className="uppercase tracking-tight text-white mb-4">
          Ready to Transform Your Engineering Skills?
        </Heading>
        <Text variant="body-lg" className="text-white/80 mb-8">
          Join thousands of engineers who are leveling up with 100xsystems Systems.
          Start your journey today.
        </Text>
        <div className="flex items-center justify-center gap-4">
          <Button variant="ripple" size="lg">GET STARTED FREE</Button>
          <Button
            variant="yellowGhost"
            size="lg"
            className="text-white hover:text-black"
            iconPosition="right"
            icon={<Icon name="arrow-right" size={20} />}
          >
            VIEW PLANS
          </Button>
        </div>
      </div>
    </section>
  );
}
