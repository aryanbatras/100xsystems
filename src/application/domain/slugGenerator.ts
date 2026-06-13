/**
 * ## Application Domain: Slug Generator
 *
 * URL slug generation utilities used by the publishing workflow.
 * Slugs must be URL-safe, lowercase, hyphenated, and ≤ 50 chars.
 *
 * WHY A DOMAIN CLASS:
 *   Slug generation is a pure domain concern with zero dependencies
 *   (beyond logging). It sits in the application layer because
 *   multiple features (publishing, articles, content) depend on it.
 *
 * @packageDocumentation
 */

import { log } from '../../shared/utils';

/**
 * Generates and validates URL-safe slugs from article titles.
 *
 * @remarks
 * The slug is the URL path segment used for article routing and
 * GitHub storage paths. It must be deterministic (same title → same slug)
 * and safe for URL use.
 *
 * @public
 */
export class SlugGenerator {
  /**
   * Generates a URL-safe slug from a title string.
   *
   * @param title - The article title to convert
   * @returns A lowercase, hyphenated slug (max 50 chars)
   *
   * @example
   * ```ts
   * SlugGenerator.generateSlug('My Awesome Article!');
   * // → 'my-awesome-article'
   * ```
   *
   * @public
   */
  static generateSlug(title: string): string {
    log('🔧 Generating slug from title: ' + title, 'info');
    log(`📏 Original title length: ${title.length} characters`, 'info');

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50);

    log(`✅ Generated slug: "${slug}"`, 'success');
    log(`📏 Slug length: ${slug.length} characters`, 'info');

    if (slug.length === 0) {
      log('⚠️ Slug is empty, title may contain no valid characters', 'warning');
    }

    return slug;
  }

  /**
   * Validates that a slug is URL-safe and within length limits.
   *
   * @param slug - The slug to validate
   * @returns True if the slug contains only valid characters and is ≤ 50 chars
   *
   * @public
   */
  static isValidSlug(slug: string): boolean {
    return /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length <= 50;
  }

  /**
   * Sanitizes a raw string into a valid slug format.
   *
   * @param slug - The raw string to sanitize
   * @returns A cleaned slug safe for URL use
   *
   * @remarks
   * More aggressive than generateSlug — removes any character that
   * isn't a lowercase letter, digit, or hyphen. Use this when
   * accepting user-provided slugs.
   *
   * @public
   */
  static sanitizeSlug(slug: string): string {
    return slug
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
  }
}
