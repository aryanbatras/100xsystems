/**
 * ## Progress Domain: Mapper Functions
 *
 * Pure functions for transforming learning progress data into
 * human-readable UI labels.
 *
 * @packageDocumentation
 */

/**
 * Converts a numeric progress percentage into a descriptive label.
 *
 * @param percentage - Progress percentage (0-100)
 * @returns Human-readable status label
 *
 * @remarks
 * Uses tiered thresholds rather than exact values since absolute
 * percentages are less meaningful to users than qualitative labels.
 *
 * @public
 */
export function formatProgress(percentage: number): string {
  if (percentage >= 100) return 'Completed';
  if (percentage >= 75) return 'Almost Done';
  if (percentage >= 50) return 'Halfway';
  if (percentage >= 25) return 'In Progress';
  return 'Just Started';
}
