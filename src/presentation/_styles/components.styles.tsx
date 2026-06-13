/**
 * ## Presentation: Shared Component Styles
 *
 * Tailwind className presets for consistent styling
 * across atomic, composite, and layout components.
 * Provides button, card, modal, input, table, badge,
 * layout, and typography style utilities.
 *
 * @packageDocumentation
 */

import { cn } from '../../lib/utils';

// BUTTONS
export const primaryButton = () => cn('bg-[#572EFF] text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#4625CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed');
export const secondaryButton = () => cn('bg-[#f5f5f5] text-[#45464d] px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#e5e5e5] transition-colors');
export const destructiveButton = () => cn('bg-[#ef4444] text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#dc2626] transition-colors');
export const ghostButton = () => cn('text-[#572EFF] text-sm font-semibold hover:underline');

// CARDS
export const card = () => cn('bg-white border border-[#e5e5e5] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-lg');
export const cardHeader = () => cn('border-b border-[#e5e5e5] px-6 py-4');
export const cardBody = () => cn('px-6 py-5');

// MODALS
export const modalOverlay = () => cn('fixed inset-0 z-50 flex items-center justify-center bg-black/30');
export const modalContent = () => cn('bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto');
export const modalHeader = () => cn('flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4');
export const modalBody = () => cn('px-6 py-5');
export const modalFooter = () => cn('flex items-center justify-end gap-3 border-t border-[#e5e5e5] px-6 py-4');

// FORM ELEMENTS
export const input = () => cn('w-full border border-[#e5e5e5] px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#572EFF]/20 focus:border-[#572EFF]');
export const label = () => cn('text-[10px] font-semibold uppercase tracking-[0.6px] text-[#76777d]');
export const select = () => cn('w-full border border-[#e5e5e5] px-3 py-2 text-sm bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#572EFF]/20');

// TABLES
export const table = () => cn('w-full border-collapse');
export const tableHeader = () => cn('bg-[#f5f5f5] text-[10px] font-bold uppercase tracking-[0.6px] text-[#45464d]');
export const tableHeaderCell = () => cn('px-4 py-3 text-left');
export const tableRow = () => cn('border-b border-[#e5e5e5] hover:bg-[#fafafa] transition-colors');
export const tableCell = () => cn('px-4 py-3 text-sm text-black');

// BADGES
export const badge = () => cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium');
export const badgeSuccess = () => cn(badge(), 'bg-green-100 text-green-800');
export const badgeWarning = () => cn(badge(), 'bg-yellow-100 text-yellow-800');
export const badgeError = () => cn(badge(), 'bg-red-100 text-red-800');
export const badgeInfo = () => cn(badge(), 'bg-blue-100 text-blue-800');

// LAYOUT
export const pageContainer = () => cn('flex min-h-screen bg-white');
export const mainContent = () => cn('flex-1 overflow-auto bg-[#fafafa]');
export const contentArea = () => cn('mx-auto w-full max-w-[1440px] px-6 pt-6 pb-6');
export const flexRow = () => cn('flex items-center gap-3');
export const flexBetween = () => cn('flex items-center justify-between');
export const gridCols2 = () => cn('grid grid-cols-2 gap-4');
export const gridCols3 = () => cn('grid grid-cols-3 gap-4');

// TYPOGRAPHY
export const pageTitle = () => cn('text-[32px] font-semibold leading-[40px] tracking-[-0.8px] text-black');
export const pageSubtitle = () => cn('mt-1 text-sm font-normal leading-5 text-[#76777d]');
export const sectionTitle = () => cn('text-[10px] font-bold uppercase tracking-[0.6px] text-black');
export const textMuted = () => cn('text-sm text-[#76777d]');
export const textDanger = () => cn('text-sm text-[#ef4444]');
