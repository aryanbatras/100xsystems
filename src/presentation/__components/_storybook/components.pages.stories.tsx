import type { Meta, StoryObj } from '@storybook/react';
import {
  SignUpPage, LoginPage, ForgotPasswordPage,
  PricingTiers, FAQPage, CoursesPage, CourseDetailPage,
  BlogPage, TeamPage, ContactPageLayout,
  NotFoundPage, ErrorPage, StatsShowcase, NewsletterSignup,
  SettingsPage, OnboardingPage, TestimonialsShowcase,
  ComparisonPage, DonationPage, CheckoutPage, EmptyDashboard,
  NotificationsPage, AccountPage, ComingSoonPage,
  SearchPage, HeroPage, CtaSection,
} from '../components.pages';

const meta = {
  title: 'Pages',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ─── Auth Pages ─────────────────────────────────────────────────────

export const SignUpStory: Story = {
  name: 'Sign Up Page',
  render: () => (
    <SignUpPage onSignUp={(data) => console.log('SignUp:', data)} onLogin={() => console.log('Go to login')} />
  ),
};

export const LoginStory: Story = {
  name: 'Login Page',
  render: () => (
    <LoginPage onLogin={(data) => console.log('Login:', data)} onSignUp={() => console.log('Go to sign up')} />
  ),
};

export const ForgotPasswordStory: Story = {
  name: 'Forgot Password Page',
  render: () => (
    <ForgotPasswordPage onReset={(email) => console.log('Reset:', email)} onBackToLogin={() => console.log('Back to login')} />
  ),
};

// ─── Pricing ────────────────────────────────────────────────────────

export const PricingStory: Story = {
  name: 'Pricing Tiers',
  render: () => <PricingTiers />,
};

// ─── FAQ ────────────────────────────────────────────────────────────

export const FAQStory: Story = {
  name: 'FAQ Page',
  render: () => <FAQPage />,
};

// ─── Courses ────────────────────────────────────────────────────────

export const CoursesStory: Story = {
  name: 'Courses Page',
  render: () => <CoursesPage />,
};

export const CourseDetailStory: Story = {
  name: 'Course Detail Page',
  render: () => <CourseDetailPage />,
};

// ─── Blog ───────────────────────────────────────────────────────────

export const BlogStory: Story = {
  name: 'Blog Page',
  render: () => <BlogPage />,
};

// ─── Team ───────────────────────────────────────────────────────────

export const TeamStory: Story = {
  name: 'Team Page',
  render: () => <TeamPage />,
};

// ─── Contact ────────────────────────────────────────────────────────

export const ContactStory: Story = {
  name: 'Contact Page',
  render: () => <ContactPageLayout />,
};

// ─── Error Pages ────────────────────────────────────────────────────

export const NotFoundStory: Story = {
  name: '404 Not Found',
  render: () => <NotFoundPage />,
};

export const ErrorStory: Story = {
  name: '500 Error Page',
  render: () => <ErrorPage errorMessage="Failed to load user data. Please try again." />,
};

// ─── Stats & Newsletter ─────────────────────────────────────────────

export const StatsStory: Story = {
  name: 'Stats Showcase',
  render: () => <StatsShowcase />,
};

export const NewsletterStory: Story = {
  name: 'Newsletter Signup',
  render: () => <NewsletterSignup />,
};

// ─── Settings & Onboarding ──────────────────────────────────────────

export const SettingsStory: Story = {
  name: 'Settings Page',
  render: () => <SettingsPage />,
};

export const OnboardingStory: Story = {
  name: 'Onboarding Wizard',
  render: () => <OnboardingPage />,
};

// ─── Testimonials & Comparison ─────────────────────────────────────

export const TestimonialsStory: Story = {
  name: 'Testimonials Showcase',
  render: () => <TestimonialsShowcase />,
};

export const ComparisonStory: Story = {
  name: 'Comparison Page',
  render: () => <ComparisonPage />,
};

// ─── Donation & Checkout ────────────────────────────────────────────

export const DonationStory: Story = {
  name: 'Donation Page',
  render: () => <DonationPage />,
};

export const CheckoutStory: Story = {
  name: 'Checkout Page',
  render: () => <CheckoutPage />,
};

// ─── Dashboard & Notifications ─────────────────────────────────────

export const EmptyDashboardStory: Story = {
  name: 'Empty Dashboard',
  render: () => <EmptyDashboard />,
};

export const NotificationsStory: Story = {
  name: 'Notifications Page',
  render: () => <NotificationsPage />,
};

// ─── Account & Coming Soon ──────────────────────────────────────────

export const AccountStory: Story = {
  name: 'Account Page',
  render: () => <AccountPage />,
};

export const ComingSoonStory: Story = {
  name: 'Coming Soon Page',
  render: () => <ComingSoonPage />,
};

// ─── Search ─────────────────────────────────────────────────────────

export const SearchStory: Story = {
  name: 'Search Results Page',
  render: () => <SearchPage />,
};

// ─── Hero & Features ────────────────────────────────────────────────

export const HeroStory: Story = {
  name: 'Hero Section',
  render: () => <HeroPage />,
};

export const CtaStory: Story = {
  name: 'Call to Action Section',
  render: () => <CtaSection />,
};
