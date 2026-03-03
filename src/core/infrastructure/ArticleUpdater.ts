import { GitHubPublisher } from './publisher';
import { ImageProcessor } from './imageProcessor';
import { HtmlConverter } from './htmlConverter';
import { HtmlToDeltaConverter } from './HtmlToDeltaConverter';
import { QuillDelta, UploadedImage, ArticleMetadata, PublishResult, ImageData } from '../../shared/types';
import { log } from '../../shared/utils';

export interface ImageComparison {
  toUpload: ImageData[];
  toRemove: string[];
  toKeep: string[];
}

export interface UpdateOptions {
  slug: string;
  delta: QuillDelta;
  title: string;
  existingMetadata?: ArticleMetadata;
}

export class ArticleUpdater {
  static async updateArticle(options: UpdateOptions): Promise<PublishResult> {
    const startTime = Date.now();
    log('🔄 Starting article update process...', 'info');
    log(`📝 Updating article: ${options.slug}`, 'info');

    try {
      const imageComparison = await this.compareImages(options);
      log(`🖼️ Image comparison - Upload: ${imageComparison.toUpload.length}, Remove: ${imageComparison.toRemove.length}, Keep: ${imageComparison.toKeep.length}`, 'info');

      const uploadedImages = await this.processImageUpdates(imageComparison, options.slug);
      log(`✅ Image processing completed`, 'success');

      const html = HtmlConverter.convertDeltaToHtml(
        options.delta, 
        options.title, 
        options.slug, 
        uploadedImages
      ).html;
      log(`📄 HTML generated (${html.length} characters)`, 'info');

      const publishResult = await GitHubPublisher.publishHTML(options.slug, html);
      
      if (publishResult.success) {
        await this.cleanupStaleImages(imageComparison.toRemove, options.slug);
        log(`🗑️ Cleaned up ${imageComparison.toRemove.length} stale images`, 'info');
      }

      const totalTime = Date.now() - startTime;
      log(`✅ Article update completed in ${totalTime}ms`, 'success');

      return publishResult;

    } catch (error) {
      const totalTime = Date.now() - startTime;
      log(`❌ Article update failed after ${totalTime}ms: ${error}`, 'error');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private static async compareImages(options: UpdateOptions): Promise<ImageComparison> {
    const { uploadedUrls: currentImages, dataUrls } = this.extractImagesFromDelta(options.delta);
    const existingImages = options.existingMetadata?.images || [];

    log(`🔍 Comparing images - Current: ${currentImages.length}, Data URLs: ${dataUrls.length}, Existing: ${existingImages.length}`, 'info');

    const toRemove: string[] = [];
    const toKeep: string[] = [];
    const toUpload: ImageData[] = dataUrls; // Data URLs need to be uploaded

    existingImages.forEach(existingUrl => {
      if (currentImages.includes(existingUrl)) {
        toKeep.push(existingUrl);
      } else {
        toRemove.push(existingUrl);
      }
    });

    return {
      toUpload,
      toRemove,
      toKeep
    };
  }

  private static extractImagesFromDelta(delta: QuillDelta): { uploadedUrls: string[]; dataUrls: ImageData[] } {
    const uploadedUrls: string[] = [];
    const dataUrls: ImageData[] = [];
    
    if (delta.ops) {
      delta.ops.forEach((op, index) => {
        if (typeof op.insert === 'object' && op.insert.image) {
          const imageUrl = op.insert.image;
          if (imageUrl && imageUrl.startsWith('data:image')) {
            // Extract base64 data and file type from data URL
            const matches = imageUrl.match(/^data:(image\/\w+);base64,(.+)$/);
            if (matches) {
              const [, fileType, base64Data] = matches;
              dataUrls.push({
                temporaryId: `temp_${index}`,
                base64Data,
                fileType
              });
            }
          } else if (imageUrl && !imageUrl.startsWith('temp_')) {
            uploadedUrls.push(imageUrl);
          }
        }
      });
    }

    return { uploadedUrls, dataUrls };
  }

  private static async processImageUpdates(
    comparison: ImageComparison, 
    slug: string
  ): Promise<UploadedImage[]> {
    const uploadedImages: UploadedImage[] = [];

    if (comparison.toUpload.length > 0) {
      log(`⬆️ Uploading ${comparison.toUpload.length} new images...`, 'info');
      const newUploads = await ImageProcessor.uploadImagesToGitHub(comparison.toUpload, slug);
      uploadedImages.push(...newUploads);
      log(`✅ Uploaded ${newUploads.length} images`, 'success');
    }

    comparison.toKeep.forEach(url => {
      uploadedImages.push({
        temporaryId: this.extractTempIdFromUrl(url),
        publicUrl: url,
        filename: this.extractFilenameFromUrl(url)
      });
    });

    return uploadedImages;
  }

  private static async cleanupStaleImages(toRemove: string[], slug: string): Promise<void> {
    if (toRemove.length === 0) return;

    log(`🗑️ Removing ${toRemove.length} stale images...`, 'info');
    
    try {
      const deletePromises = toRemove.map(url => 
        GitHubPublisher.deleteFile(this.extractImagePathFromUrl(url))
      );
      
      await Promise.allSettled(deletePromises);
      log(`✅ Stale image cleanup completed`, 'success');
    } catch (error) {
      log(`⚠️ Error during image cleanup: ${error}`, 'warning');
    }
  }

  private static extractTempIdFromUrl(url: string): string {
    const filename = this.extractFilenameFromUrl(url);
    return filename.replace(/\.[^/.]+$/, '');
  }

  private static extractFilenameFromUrl(url: string): string {
    return url.split('/').pop() || '';
  }

  private static extractImagePathFromUrl(url: string): string {
    const urlObj = new URL(url);
    return urlObj.pathname;
  }

  static async loadExistingArticle(slug: string): Promise<{
    html: string;
    metadata: ArticleMetadata | null;
    delta: QuillDelta;
  } | null> {
    try {
      log(`📂 Loading existing article: ${slug}`, 'info');
      
      const html = await GitHubPublisher.loadHTML(slug);
      if (!html) {
        log(`❌ Article not found: ${slug}`, 'error');
        return null;
      }

      const parsed = HtmlToDeltaConverter.parseHtml(html);
      const delta = HtmlToDeltaConverter.convertToDelta(html);

      log(`✅ Article loaded successfully`, 'success');
      log(`📝 Content length: ${parsed.content.length} characters`, 'info');
      log(`🖼️ Images found: ${parsed.images.length}`, 'info');

      return {
        html,
        metadata: parsed.metadata,
        delta
      };

    } catch (error) {
      log(`❌ Error loading article ${slug}: ${error}`, 'error');
      return null;
    }
  }

  static validateUpdateEligibility(existingMetadata: ArticleMetadata, newTitle: string): boolean {
    if (!existingMetadata) return false;
    
    const titleChanged = existingMetadata.title !== newTitle;
    if (titleChanged) {
      log(`⚠️ Title change detected. This will create a new article instead of updating.`, 'warning');
      return false;
    }

    return true;
  }
}
