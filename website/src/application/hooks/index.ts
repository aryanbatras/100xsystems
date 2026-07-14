/**
 * ## Application: Hooks Barrel
 *
 * Re-exports all application-level React hooks for
 * convenient imports.
 *
 * @packageDocumentation
 */

export { useUserAnalytics } from './analytics.hooks';
export type { LearningInsights, UseUserAnalyticsReturn } from './analytics.hooks';

export { useUserCommunity } from './community.hooks';
export type { CommunityStats, UseUserCommunityReturn } from './community.hooks';

export { useContactForm } from './contact.hooks';
export type { ContactFormData, UseContactFormReturn } from './contact.hooks';

export { useUserAchievements } from './achievements.hooks';
export type { UseUserAchievementsReturn } from './achievements.hooks';

export { useLoadingScreen } from './loadingScreen.hooks';

export { useMemory } from './memory.hooks';

export { useUserProfile } from './profiles.hooks';
export type { UseUserProfileReturn } from './profiles.hooks';

export { useUserProgress } from './progress.hooks';
export type { UseUserProgressReturn } from './progress.hooks';

export { useVideoAutoplay } from './videoAutoplay.hooks';
