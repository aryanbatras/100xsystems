/**
 * ## Publishing Domain: HTML Generator
 *
 * High-level publishing workflow functions that orchestrate the
 * end-to-end process: slug generation → HTML conversion → GitHub publish.
 *
 * WHY SEPARATE FROM THE PUBLISHING SERVICE:
 *   These are thin convenience wrappers that the presentation layer
 *   calls directly. The heavier orchestration logic lives in
 *   PublishingService.
 *
 * @packageDocumentation
 */

import { HtmlConverter } from '../../infrastructure/converters/htmlConverter';
import { ImageProcessor } from '../../infrastructure/imageProcessor';
import { GitHubPublisher } from '../../infrastructure/api/githubPublisher';
import { SlugGenerator } from '../domain/slugGenerator';
import { QuillDelta, UploadedImage } from '../types/shared.types';
import { log } from '../../shared/utils';

/**
 * Generates a URL-safe slug from an article title.
 *
 * @param title - The article title
 * @returns A URL-safe, hyphenated slug string
 *
 * @public
 */
export const generateSlug = (title: string): string => {
  return SlugGenerator.generateSlug(title);
};

/**
 * Converts a Quill Delta to a complete HTML document.
 *
 * @param delta - The Quill Delta document
 * @param title - Article title for the HTML title tag
 * @param slug - Article slug for image URL generation
 * @param uploadedImages - Previously uploaded image references
 * @returns Complete HTML document string with metadata
 *
 * @public
 */
export const generateHTML = (delta: QuillDelta, title: string, slug: string, uploadedImages: UploadedImage[]): string => {
  const result = HtmlConverter.convertDeltaToHtml(delta, title, slug, uploadedImages);
  return result.html;
};

/**
 * Publishes an HTML string to GitHub Pages storage.
 *
 * @param slug - The article slug for the file path
 * @param html - The complete HTML document to publish
 * @throws If the publish operation fails
 *
 * @public
 */
export const publishHTMLToGitHub = async (slug: string, html: string): Promise<void> => {
  const result = await GitHubPublisher.publishHTML(slug, html);
  if (!result.success) {
    throw new Error(result.error || 'Publishing failed');
  }
};
