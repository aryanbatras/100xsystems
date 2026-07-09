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
export { Button } from './atoms/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './atoms/Button';

export { Badge } from './atoms/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './atoms/Badge';

export { Card, CardHeader } from './atoms/Card';
export type { CardProps, CardHeaderProps } from './atoms/Card';

export { Input } from './atoms/Input';
export type { InputProps, InputVariant } from './atoms/Input';

export { Modal } from './atoms/Modal';
export type { ModalProps } from './atoms/Modal';

export { Spinner } from './atoms/Spinner';
export type { SpinnerProps } from './atoms/Spinner';

export { Heading, Text, Divider } from './atoms/Typography';
export type { HeadingProps, TextProps, HeadingVariant, TextVariant, DividerProps } from './atoms/Typography';

// ─── Molecules ──────────────────────────────────────────────────────
export { SearchInput } from './molecules/SearchInput';
export type { SearchInputProps } from './molecules/SearchInput';

export { TabBar } from './molecules/TabBar';
export type { TabBarProps, Tab } from './molecules/TabBar';

export { FilterBar } from './molecules/FilterBar';
export type { FilterBarProps } from './molecules/FilterBar';

export { DataGrid } from './molecules/DataGrid';
export type { DataGridProps, StatCard } from './molecules/DataGrid';

export { Pagination } from './molecules/Pagination';
export type { PaginationProps } from './molecules/Pagination';
