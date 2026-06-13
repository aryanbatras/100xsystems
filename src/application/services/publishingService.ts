/**
 * ## Application Services: Publishing Service
 *
 * Orchestrates the end-to-end article publishing workflow.
 * Coordinates between infrastructure (ImageProcessor, HtmlConverter,
 * GitHubPublisher) and domain (SlugGenerator) services.
 *
 * Each public method represents a complete use case in the
 * Clean Architecture sense.
 *
 * @packageDocumentation
 */

import { QuillDelta, UploadedImage, ConversionResult, PublishResult } from '../types/shared.types';
import { HtmlConverter } from '../../infrastructure/converters/htmlConverter';
import { ImageProcessor } from '../../infrastructure/imageProcessor';
import { GitHubPublisher } from '../../infrastructure/api/githubPublisher';
import { SlugGenerator } from '../domain/slugGenerator';
import { log } from '../../shared/utils';

/**
 * Input parameters for the publishing workflow.
 *
 * @remarks
 * The `customSlug` field is optional; if omitted, the slug is
 * auto-generated from the title via SlugGenerator.
 *
 * @public
 */
export interface PublishingWorkflowInput {
  delta: QuillDelta;
  title: string;
  customSlug?: string;
}

/**
 * Result of a publishing workflow execution.
 *
 * @remarks
 * Contains all artifacts produced during publishing: the generated slug,
 * the published URL, conversion metrics, and uploaded image references.
 * On failure, the `error` field contains the error message.
 *
 * @public
 */
export interface PublishingWorkflowResult {
  success: boolean;
  slug: string;
  htmlUrl?: string;
  conversionResult?: ConversionResult;
  uploadedImages?: UploadedImage[];
  error?: string;
  processingTime: number;
}

/**
 * End-to-end article publishing service.
 *
 * @remarks
 * Implements the complete publishing use case: extract images from the
 * Quill Delta, upload them to GitHub, convert the Delta to HTML, and
 * publish the HTML to GitHub Pages.
 *
 * @public
 */
export class PublishingService {
  /**
   * Executes the full publish workflow: extract images → upload → convert → publish.
   *
   * @param input - The article content and metadata to publish
   * @returns A result containing all generated artifacts or an error
   *
   * @example
   * ```ts
   * const result = await PublishingService.publishArticle({
   *   delta: quillDelta,
   *   title: 'My Article',
   * });
   * ```
   *
   * @public
   */
  static async publishArticle(input: PublishingWorkflowInput): Promise<PublishingWorkflowResult> {
    const startTime = Date.now();
    
    try {
      log('🚀 Starting article publishing workflow...', 'info');
      log(`📝 Title: "${input.title}"`, 'info');
      log(`📂 Custom slug: ${input.customSlug || 'auto-generated'}`, 'info');

      const slug = input.customSlug || SlugGenerator.generateSlug(input.title);
      
      if (!SlugGenerator.isValidSlug(slug)) {
        throw new Error(`Invalid slug: "${slug}"`);
      }

      const images = await ImageProcessor.extractImagesFromDelta(input.delta);
      const uploadedImages = images.length > 0 
        ? await ImageProcessor.uploadImagesToGitHub(images, slug)
        : [];

      const conversionResult = HtmlConverter.convertDeltaToHtml(
        input.delta, 
        input.title, 
        slug, 
        uploadedImages
      );

      const publishResult = await GitHubPublisher.publishHTML(slug, conversionResult.html);
      
      if (!publishResult.success) {
        throw new Error(publishResult.error || 'Failed to publish HTML');
      }

      const totalTime = Date.now() - startTime;
      
      log('🎉 Article publishing workflow completed successfully!', 'success');
      log(`⏱️ Total processing time: ${totalTime}ms`, 'info');
      log(`🔗 Published URL: ${publishResult.url}`, 'success');

      return {
        success: true,
        slug,
        htmlUrl: publishResult.url,
        conversionResult,
        uploadedImages,
        processingTime: totalTime
      };

    } catch (error) {
      const totalTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      log(`❌ Publishing workflow failed after ${totalTime}ms: ${errorMessage}`, 'error');
      
      return {
        success: false,
        slug: input.customSlug || '',
        error: errorMessage,
        processingTime: totalTime
      };
    }
  }

  /**
   * Generates HTML from a Quill Delta without publishing.
   *
   * @param input - The article content to convert
   * @returns The conversion result with HTML and metadata
   * @throws If any step in the conversion pipeline fails
   *
   * @remarks
   * Useful for previewing content before publishing. Still extracts
   * and uploads images since the HTML references uploaded URLs.
   *
   * @public
   */
  static async generateHtmlOnly(input: PublishingWorkflowInput): Promise<ConversionResult> {
    const startTime = Date.now();
    
    try {
      log('🔄 Starting HTML generation only...', 'info');
      
      const slug = input.customSlug || SlugGenerator.generateSlug(input.title);
      const images = await ImageProcessor.extractImagesFromDelta(input.delta);
      const uploadedImages = images.length > 0 
        ? await ImageProcessor.uploadImagesToGitHub(images, slug)
        : [];

      const result = HtmlConverter.convertDeltaToHtml(
        input.delta, 
        input.title, 
        slug, 
        uploadedImages
      );

      const totalTime = Date.now() - startTime;
      log(`✅ HTML generation completed in ${totalTime}ms`, 'success');

      return result;

    } catch (error) {
      const totalTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      log(`❌ HTML generation failed after ${totalTime}ms: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Validates publishing input before starting the workflow.
   *
   * @param input - The input to validate
   * @returns Validation result with error messages if invalid
   *
   * @remarks
   * Checks that title is present (≤ 200 chars), delta has content, and
   * custom slug (if provided) is valid.
   *
   * @public
   */
  static validateInput(input: PublishingWorkflowInput): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!input.title || input.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!input.delta || !input.delta.ops || input.delta.ops.length === 0) {
      errors.push('Delta content is required');
    }

    if (input.customSlug && !SlugGenerator.isValidSlug(input.customSlug)) {
      errors.push('Custom slug is invalid');
    }

    if (input.title && input.title.length > 200) {
      errors.push('Title is too long (max 200 characters)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
