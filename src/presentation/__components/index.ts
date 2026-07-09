/**
 * ## 100xSystems Design System
 *
 * Barrel export for all design system components.
 * Import from this file for easy access:
 *
 * ```tsx
 * import { Button, Card, Input, Badge } from '@/presentation/__components';
 * ```
 *
 * @packageDocumentation
 */

// ─── Atoms ──────────────────────────────────────────────────────────
export { Avatar } from './atoms/Avatar';
export type { AvatarProps } from './atoms/Avatar';

export { Badge } from './atoms/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './atoms/Badge';

export { Button } from './atoms/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './atoms/Button';

export { Card, CardHeader } from './atoms/Card';
export type { CardProps, CardHeaderProps } from './atoms/Card';

export { Heading, Text, Divider } from './atoms/Typography';
export type { HeadingProps, TextProps, HeadingVariant, TextVariant, DividerProps } from './atoms/Typography';

export { Input } from './atoms/Input';
export type { InputProps, InputVariant } from './atoms/Input';

export { Modal } from './atoms/Modal';
export type { ModalProps } from './atoms/Modal';

export { ProgressBar } from './atoms/ProgressBar';
export type { ProgressBarProps } from './atoms/ProgressBar';

export { RippleButton } from './atoms/RippleButton';
export type { RippleButtonProps } from './atoms/RippleButton';

export { Select } from './atoms/Select';
export type { SelectProps, SelectOption } from './atoms/Select';

export { Skeleton, SkeletonBlock } from './atoms/Skeleton';
export type { SkeletonProps, SkeletonBlockProps } from './atoms/Skeleton';

export { Spinner } from './atoms/Spinner';
export type { SpinnerProps } from './atoms/Spinner';

export { Tag } from './atoms/Tag';
export type { TagProps } from './atoms/Tag';

export { Toggle } from './atoms/Toggle';
export type { ToggleProps } from './atoms/Toggle';

// ─── Molecules ──────────────────────────────────────────────────────
export { Accordion } from './molecules/Accordion';
export type { AccordionProps, AccordionItem } from './molecules/Accordion';

export { Alert } from './molecules/Alert';
export type { AlertProps } from './molecules/Alert';

export { Breadcrumbs } from './molecules/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './molecules/Breadcrumbs';

export { CodeBlock } from './molecules/CodeBlock';
export type { CodeBlockProps } from './molecules/CodeBlock';

export { DataGrid } from './molecules/DataGrid';
export type { DataGridProps } from './molecules/DataGrid';

export { EmptyState } from './molecules/EmptyState';
export type { EmptyStateProps } from './molecules/EmptyState';

export { FilterBar } from './molecules/FilterBar';
export type { FilterBarProps } from './molecules/FilterBar';

export { Pagination } from './molecules/Pagination';
export type { PaginationProps } from './molecules/Pagination';

export { SearchInput } from './molecules/SearchInput';
export type { SearchInputProps } from './molecules/SearchInput';

export { TabBar } from './molecules/TabBar';
export type { TabBarProps, Tab } from './molecules/TabBar';

export { UserCard } from './molecules/UserCard';
export type { UserCardProps } from './molecules/UserCard';

export { DifficultyBadge } from './molecules/DifficultyBadge';
export type { DifficultyBadgeProps } from './molecules/DifficultyBadge';

export { FeatureCard } from './molecules/FeatureCard';
export type { FeatureCardProps } from './molecules/FeatureCard';

export { InfoRow } from './molecules/InfoRow';
export type { InfoRowProps } from './molecules/InfoRow';

export { StatCard } from './molecules/StatCard';
export type { StatCardProps } from './molecules/StatCard';

export { Timeline } from './molecules/Timeline';
export type { TimelineProps, TimelineStep } from './molecules/Timeline';

export { ArticleCard } from './molecules/ArticleCard';
export type { ArticleCardProps } from './molecules/ArticleCard';

export { ProblemCard } from './molecules/ProblemCard';
export type { ProblemCardProps } from './molecules/ProblemCard';

export { MemberCard } from './molecules/MemberCard';
export type { MemberCardProps, SocialLink } from './molecules/MemberCard';

export { StreakCard } from './molecules/StreakCard';
export type { StreakCardProps } from './molecules/StreakCard';

export { FaqItem } from './molecules/FaqItem';
export type { FaqItemProps } from './molecules/FaqItem';

export { ContactInfoItem } from './molecules/ContactInfoItem';
export type { ContactInfoItemProps } from './molecules/ContactInfoItem';

// ─── Organisms ──────────────────────────────────────────────────────

export { ComingSoonCard } from './organisms/ComingSoonCard';
export type { ComingSoonCardProps } from './organisms/ComingSoonCard';

export { ModuleCard } from './organisms/ModuleCard';
export type { ModuleCardProps, ModuleStatus } from './organisms/ModuleCard';

export { PageHeader } from './organisms/PageHeader';
export type { PageHeaderProps } from './organisms/PageHeader';

export { SearchResults } from './organisms/SearchResults';
export type { SearchResultsProps, SearchResultItem } from './organisms/SearchResults';

export { SidebarNav } from './organisms/SidebarNav';
export type { SidebarNavProps, SidebarNavItem } from './organisms/SidebarNav';

export { GroupCard } from './organisms/GroupCard';
export type { GroupCardProps } from './organisms/GroupCard';

export { RoadmapCard } from './organisms/RoadmapCard';
export type { RoadmapCardProps } from './organisms/RoadmapCard';

// ─── Tokens ────────────────────────────────────────────────────────
export { TokenColors, TokenTypography, TokenRadius, TokenInteractive, TokenLayout, TokenShadows, TokenMotion, TokenFramerMotion } from './_tokens';
export type { TokenColorsProps, ColorToken, TokenTypographyProps, TokenRadiusProps, TokenInteractiveProps, TokenLayoutProps, TokenShadowsProps, TokenMotionProps, TokenFramerMotionProps } from './_tokens';
