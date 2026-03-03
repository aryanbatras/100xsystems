import { QuillDelta, UploadedImage, ConversionResult, PublishResult } from '../../shared/types';
import { HtmlConverter } from '../infrastructure';
import { ImageProcessor } from '../infrastructure';
import { GitHubPublisher } from '../infrastructure';
import { SlugGenerator } from '../domain';
import { log } from '../../shared/utils';

export interface PublishingWorkflowInput {
  delta: QuillDelta;
  title: string;
  customSlug?: string;
}

export interface PublishingWorkflowResult {
  success: boolean;
  slug: string;
  htmlUrl?: string;
  conversionResult?: ConversionResult;
  uploadedImages?: UploadedImage[];
  error?: string;
  processingTime: number;
}

export class PublishingService {
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

      const images = ImageProcessor.extractImagesFromDelta(input.delta);
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

  static async generateHtmlOnly(input: PublishingWorkflowInput): Promise<ConversionResult> {
    const startTime = Date.now();
    
    try {
      log('🔄 Starting HTML generation only...', 'info');
      
      const slug = input.customSlug || SlugGenerator.generateSlug(input.title);
      const images = ImageProcessor.extractImagesFromDelta(input.delta);
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
