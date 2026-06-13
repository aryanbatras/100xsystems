/**
 * ## Community Domain: Mapper Functions
 *
 * Pure functions for transforming community data into UI-friendly shapes.
 *
 * @packageDocumentation
 */

/**
 * Formats a group name with proper capitalization.
 *
 * @param name - Raw group name string
 * @returns Name with first letter uppercased
 *
 * @public
 */
export function formatGroupName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Generates a deterministic color from a tag string for consistent tag styling.
 *
 * @param tag - The tag string to derive a color from
 * @returns A hex color string from the curated palette
 *
 * @remarks
 * Uses a simple hash to consistently map the same tag to the same color.
 * The palette is curated for readability and accessibility.
 *
 * @public
 */
export function getInitialTagStyle(tag: string): string {
  const colors = ['#572EFF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}
