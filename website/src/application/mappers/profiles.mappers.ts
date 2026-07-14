/**
 * ## Profiles Domain: Mapper Functions
 *
 * Pure functions that transform profile data into UI-friendly shapes.
 * These are the "Presenter" in Clean Architecture: they ensure the UI
 * never deals with raw database shapes.
 *
 * @packageDocumentation
 */

import { Profile } from '../types/database.types';

/**
 * Resolves a display name from a profile, with fallback chain.
 *
 * @param profile - The profile object or null
 * @returns The best available display name, or 'Unknown User' if profile is null
 *
 * @remarks
 * Prioritizes full_name over username to show the user's preferred name.
 *
 * @public
 */
export function getDisplayName(profile: Profile | null): string {
  return profile?.full_name || profile?.username || 'Unknown User';
}

/**
 * Creates a compact profile summary object for UI rendering.
 *
 * @param profile - The profile object or null
 * @returns A summary with name, avatar URL, and initials, or null if profile is null
 *
 * @remarks
 * Used by avatar components and user cards that need a lightweight
 * profile representation without the full Profile object.
 *
 * @public
 */
export function formatProfileSummary(profile: Profile | null) {
  if (!profile) return null;
  return {
    name: getDisplayName(profile),
    avatar: profile.avatar_url,
    initials: (profile.full_name || profile.username || '??').charAt(0).toUpperCase(),
  };
}
