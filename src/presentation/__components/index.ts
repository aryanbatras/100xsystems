/**
 * ## 100xSystems Design System
 *
 * Flat barrel export for all design system components.
 *
 * @packageDocumentation
 */

// ─── Tokens ────────────────────────────────────────────────────────
export { TokenColors, TokenTypography, TokenRadius, TokenInteractive, TokenLayout, TokenShadows, TokenMotion, TokenFramerMotion } from './components.token';
export type { TokenColorsProps, ColorToken, TokenTypographyProps, TokenRadiusProps, TokenInteractiveProps, TokenLayoutProps, TokenShadowsProps, TokenMotionProps, TokenFramerMotionProps } from './components.token';

// ─── Atoms ──────────────────────────────────────────────────────────
export { Button, Input, Badge, Tag, Spinner, Card, CardHeader, Heading, Text, Divider, Select, Toggle, ProgressBar, Skeleton, SkeletonBlock, Modal, Avatar, RippleButton } from './components.atomic';
export type { ButtonProps, ButtonVariant, ButtonSize, InputProps, InputVariant, BadgeProps, BadgeVariant, BadgeSize, TagProps, SpinnerProps, CardProps, CardHeaderProps, HeadingProps, TextProps, HeadingVariant, TextVariant, DividerProps, SelectProps, SelectOption, ToggleProps, ProgressBarProps, SkeletonProps, SkeletonBlockProps, ModalProps, AvatarProps, RippleButtonProps } from './components.atomic';

// ─── Composites (molecules + organisms) ────────────────────────────
export { PageHeader, Breadcrumbs, Accordion, Alert, SearchInput, TabBar, Pagination, FilterBar, EmptyState, DataGrid, CodeBlock, Timeline, ArticleCard, DifficultyBadge, InfoRow, FeatureCard, StatCard, StreakCard, ComingSoonCard, ModuleCard, UserCard, MemberCard, GroupCard, RoadmapCard, SearchResults, FaqItem, ContactInfoItem, ProblemCard } from './components.composite';
export type { PageHeaderProps, BreadcrumbItem, BreadcrumbsProps, AccordionProps, AccordionItem, AlertProps, SearchInputProps, TabBarProps, Tab, PaginationProps, FilterBarProps, EmptyStateProps, DataGridProps, StatCardData, CodeBlockProps, TimelineProps, TimelineStep, ArticleCardProps, DifficultyBadgeProps, InfoRowProps, FeatureCardProps, StatCardProps, StreakCardProps, ComingSoonCardProps, ModuleCardProps, ModuleStatus, UserCardProps, MemberCardProps, SocialLink, GroupCardProps, RoadmapCardProps, SearchResultsProps, SearchResultItem, FaqItemProps, ContactInfoItemProps, ProblemCardProps } from './components.composite';

// ─── Layout Components ─────────────────────────────────────────────
export { SidebarNav } from './components.layout';
export type { SidebarNavProps, SidebarNavItem } from './components.layout';
