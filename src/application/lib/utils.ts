/**
 * ## Application Library: Utility Functions
 *
 * General-purpose utility functions for the application layer.
 *
 * @packageDocumentation
 */

type ClassValue = string | number | boolean | null | undefined | ClassValue[];

/**
 * Recursively flattens an array of class values up to a safe depth.
 * Avoids TypeScript's TS2589 by restricting recursion depth.
 */
function flattenClasses(values: ClassValue[], depth: number = 3): (string | number | boolean | null | undefined)[] {
  if (depth <= 0) return values as (string | number | boolean | null | undefined)[];
  const result: (string | number | boolean | null | undefined)[] = [];
  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...flattenClasses(value, depth - 1));
    } else {
      result.push(value);
    }
  }
  return result;
}

/**
 * Merges class names, filtering out falsy values.
 * Lightweight alternative to clsx + tailwind-merge.
 *
 * @param inputs - Class values to merge
 * @returns A single string of merged class names
 *
 * @public
 */
export function cn(...inputs: ClassValue[]): string {
  return flattenClasses(inputs)
    .filter(Boolean)
    .join(' ');
}
