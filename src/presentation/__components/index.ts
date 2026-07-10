/**
 * ## 100xSystems Design System
 *
 * Flat barrel export for all design system components.
 *
 * @packageDocumentation
 */

// ─── Tokens ────────────────────────────────────────────────────────
export { TokenColors, TokenTypography, TokenRadius, TokenInteractive, TokenLayout, TokenShadows, TokenSpacing, TokenIcon, TokenImage, AnimatedIcon } from './components.token';
export type { TokenColorsProps, ColorToken, TokenTypographyProps, TokenRadiusProps, TokenInteractiveProps, TokenLayoutProps, TokenShadowsProps, TokenSpacingProps, TokenIconProps, TokenImageProps, AnimatedIconProps } from './components.token';

// ─── Atoms ──────────────────────────────────────────────────────────
export { Button, Input, Textarea, Badge, Tag, Spinner, Heading, Text, Divider, Select, Toggle, ProgressBar, CircularProgress, Skeleton, SkeletonBlock, SkeletonCard, SkeletonTable, SkeletonForm, Icon, Image } from './components.atomic';
export type { ButtonProps, ButtonVariant, ButtonSize, InputProps, TextareaProps, BadgeProps, BadgeVariant, BadgeSize, TagProps, SpinnerProps, ProgressMode, ProgressBarProps, CircularProgressProps, SkeletonProps, SkeletonBlockProps, SkeletonCardProps, SkeletonTableProps, SkeletonFormProps, IconProps, IconName, ImageProps, HeadingProps, TextProps, HeadingVariant, TextVariant, DividerProps, SelectProps, SelectOption, ToggleProps } from './components.atomic';

// ─── Composites (molecules + organisms) ────────────────────────────
export { Breadcrumbs, Accordion, Alert, SearchInput, TabBar, Pagination, FilterBar, DataGrid, CodeBlock, Timeline, ArticleCard, DifficultyBadge, InfoRow, FeatureCard, StatCard, StreakCard, ComingSoonCard, ModuleCard, UserCard, MemberCard, GroupCard, RoadmapCard, SearchResults, FaqItem, ContactInfoItem, ProblemCard } from './components.composite';
export type { BreadcrumbItem, BreadcrumbsProps, AccordionProps, AccordionItem, AlertProps, SearchInputProps, TabBarProps, Tab, PaginationProps, FilterBarProps, DataGridProps, StatCardData, CodeBlockProps, TimelineProps, TimelineStep, ArticleCardProps, DifficultyBadgeProps, InfoRowProps, FeatureCardProps, StatCardProps, StreakCardProps, ComingSoonCardProps, ModuleCardProps, ModuleStatus, UserCardProps, MemberCardProps, SocialLink, GroupCardProps, RoadmapCardProps, SearchResultsProps, SearchResultItem, FaqItemProps, ContactInfoItemProps, ProblemCardProps } from './components.composite';

// ─── Layout Components ─────────────────────────────────────────────
export { SidebarNav, Header, MobileNav, Footer, Dropdown } from './components.layout';
export type { SidebarNavProps, SidebarNavItem, HeaderProps, HeaderNavItem, MobileNavProps, MobileNavItem, FooterProps, FooterSection, DropdownProps, DropdownItem } from './components.layout';

// ─── Animation Components ──────────────────────────────────────────
export {
  KineticText, CoolMode, NoiseTexture,
  RippleButton, SpinningText, ScrollVelocityContainer, ScrollVelocityRow,
  NumberTicker, BlurFade, AnimatedList, AnimatedListItem,
  SkewButton, GooeyCheckbox, ExpandInput, BookLoader,
  IconAnimatedGridPattern,
} from './components.animations';
export type {
  KineticTextProps, CoolModeProps, CoolParticleOptions, NoiseTextureProps,
  RippleButtonProps,
  SpinningTextProps, ScrollVelocityContainerProps, ScrollVelocityRowProps,
  NumberTickerProps, BlurFadeProps, AnimatedListProps,
  IconAnimatedGridPatternProps,
} from './components.animations';
