/**
 * ## Infrastructure: HTML Converter
 *
 * Converts Quill Delta documents to publishable HTML.
 * Handles formatting, image embedding, metadata injection,
 * and performance tracking.
 *
 * @packageDocumentation
 */

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { 
  QuillDelta, 
  UploadedImage, 
  ArticleMetadata, 
  QuillConverterConfig,
  ConversionResult,
  PerformanceMetrics
} from '../../application/types/shared.types';
import { log } from '../../infrastructure/utils';
import { DateUtils } from '../../infrastructure/utils';

export class HtmlConverter {
  private static readonly DEFAULT_CONFIG: QuillConverterConfig = {
    paragraphTag: 'p',
    encodeHtml: true,
    classPrefix: 'ql',
    inlineStyles: {
      font: {
        'serif': 'font-family: Georgia, Times New Roman, serif',
        'monospace': 'font-family: Monaco, Courier New, monospace'
      },
      size: {
        'small': 'font-size: 0.75em',
        'large': 'font-size: 1.5em',
        'huge': 'font-size: 2.5em'
      },
      color: (value: string) => `color: ${value}`,
      background: (value: string) => `background-color: ${value}`,
      align: (value: string) => `text-align: ${value}`,
      indent: (value: string) => {
        const indentSize = parseInt(value, 10) * 3;
        return `padding-left: ${indentSize}em`;
      },
      direction: (value: string) => {
        if (value === 'rtl') {
          return 'direction: rtl; text-align: inherit';
        }
        return '';
      }
    },
    multiLineBlockquote: true,
    multiLineHeader: true,
    multiLineCodeblock: true,
    linkTarget: '_blank'
  };

  static convertDeltaToHtml(
    delta: QuillDelta,
    title: string,
    slug: string,
    uploadedImages: UploadedImage[],
    config?: Partial<QuillConverterConfig>
  ): ConversionResult {
    const metrics: PerformanceMetrics = {
      startTime: Date.now(),
      totalTime: 0
    };

    log('🔄 Starting Delta to HTML conversion...', 'info');
    log(`📝 Title: "${title}"`, 'info');
    log(`📂 Slug: "${slug}"`, 'info');
    log(`🖼️ Uploaded images: ${uploadedImages.length}`, 'info');
    log(`📊 Delta operations: ${delta.ops?.length || 0}`, 'info');

    const metadata = this.createMetadata(title, slug, uploadedImages);
    const imageUrlMap = this.createImageUrlMap(uploadedImages);

    const converterConfig = { ...this.DEFAULT_CONFIG, ...config };
    const converter = new QuillDeltaToHtmlConverter(delta.ops || [], converterConfig);

    // Enable registerImageRenderer to process ALL images (blobs AND GitHub URLs) during initial conversion
    // This ensures existing GitHub URLs also go through our sequential numbering system
    log('🔧 Registering image renderer for Delta conversion...', 'info');
    this.registerImageRenderer(converter, imageUrlMap, uploadedImages);
    log('✅ Image renderer registered successfully', 'info');

    const conversionStartTime = Date.now();
    const html = converter.convert();
    metrics.conversionTime = Date.now() - conversionStartTime;

    log(`✅ Delta conversion completed in ${metrics.conversionTime}ms`, 'success');

    const processedHtml = this.processRemainingImageBlobs(html, uploadedImages);
    const imageStats = this.calculateImageStats(html, processedHtml, uploadedImages);

    const finalHtml = this.buildHtmlDocument(processedHtml, metadata);
    metrics.totalTime = Date.now() - metrics.startTime;

    log(`✅ HTML generation completed in ${metrics.totalTime}ms`, 'success');
    log(`📊 Image processing: ${imageStats.processed}/${imageStats.total} processed, ${imageStats.replaced} replaced`, 'info');

    return {
      html: finalHtml,
      metadata,
      processingTime: metrics.totalTime,
      imageStats
    };
  }

  private static createMetadata(title: string, slug: string, uploadedImages: UploadedImage[]): ArticleMetadata {
    return {
      title,
      slug,
      date: DateUtils.getCurrentDate(),
      images: uploadedImages.map(img => img.publicUrl)
    };
  }

  private static createImageUrlMap(uploadedImages: UploadedImage[]): Map<string, string> {
    const map = new Map<string, string>();
    uploadedImages.forEach(img => {
      map.set(img.temporaryId, img.publicUrl);
    });
    log(`🔗 Created image URL map with ${map.size} entries`, 'info');
    return map;
  }

  private static registerImageRenderer(
    converter: QuillDeltaToHtmlConverter,
    imageUrlMap: Map<string, string>,
    uploadedImages: UploadedImage[]
  ): void {
    log('🚀 registerImageRenderer called!', 'info');
    log(`📋 Uploaded images available: ${uploadedImages.length}`, 'info');
    
    converter.renderCustomWith((customOp, contextOp) => {
      if (customOp.insert.type === 'image') {
        const imageUrl = customOp.insert.value;
        log(`🖼️ Processing image during Delta conversion: ${imageUrl.substring(0, 50)}...`, 'info');
        
        // Process ALL images (data blobs AND GitHub URLs) through sequential numbering
        const isDataBlob = imageUrl.startsWith('data:image/');
        const isGitHubRaw = imageUrl.startsWith('https://raw.githubusercontent.com/aryanbatras/100xsystems-storage/main/images/');
        
        if (isDataBlob || isGitHubRaw) {
          // Find the sequential position for this image based on its order in Delta
          const imagePosition = this.findImagePositionInDelta(imageUrl, uploadedImages);
          const slug = this.extractSlugFromImageUrl(uploadedImages[0]?.publicUrl || '');
          const replacementUrl = `https://raw.githubusercontent.com/aryanbatras/100xsystems-storage/main/images/${slug}/${slug}-${String(imagePosition).padStart(3, '0')}.webp`;
          
          log(`🔧 Delta conversion: Image position ${imagePosition} → ${replacementUrl}`, 'info');
          return `<img src="${replacementUrl}" />`;
        }

        return `<img src="${imageUrl}" />`;
      }

      return 'Unmanaged custom blot!';
    });
  }

  private static findImagePositionInDelta(imageUrl: string, uploadedImages: UploadedImage[]): number {
    // For existing GitHub URLs, find their position in the uploaded images array
    // For new blobs, assign the next available position
    const isGitHubUrl = imageUrl.startsWith('https://raw.githubusercontent.com/aryanbatras/100xsystems-storage/main/images/');
    
    if (isGitHubUrl) {
      const existingImage = uploadedImages.find(img => img.publicUrl === imageUrl);
      if (existingImage && 'documentPosition' in existingImage) {
        return (existingImage as any).documentPosition;
      }
    }
    
    // For new blobs or unfound GitHub URLs, assign next position
    const maxPosition = Math.max(...uploadedImages.map(img => ('documentPosition' in img ? (img as any).documentPosition : 0)));
    return maxPosition + 1;
  }

  private static findReplacementUrl(
    imageUrl: string,
    contextOp: any,
    imageUrlMap: Map<string, string>,
    uploadedImages: UploadedImage[]
  ): string | null {
    for (const [tempId, publicUrl] of imageUrlMap.entries()) {
      if (contextOp?.attributes?.tempId === tempId) {
        return publicUrl;
      }
    }

    if (uploadedImages.length > 0) {
      log(`🔄 Using fallback image URL: ${uploadedImages[0].publicUrl}`, 'info');
      return uploadedImages[0].publicUrl;
    }

    return null;
  }

  private static processRemainingImageBlobs(html: string, uploadedImages: UploadedImage[]): string {
    log('🔄 Performing final cleanup of remaining image blobs...', 'info');

    // Find ALL image sources in exact order they appear in HTML
    const allImageRegex = /src="([^"]*)"/gi;
    const allImageMatches = html.match(allImageRegex);

    if (!allImageMatches || allImageMatches.length === 0) {
      log('✅ No images found in HTML', 'success');
      return html;
    }

    log(`📊 Found ${allImageMatches.length} total images in HTML to process in order`, 'info');
    
    // Log all found images with their positions
    allImageMatches.forEach((imageMatch, index) => {
      const imageUrl = imageMatch.match(/src="([^"]*)"/)?.[1];
      const displayUrl = imageUrl && imageUrl.startsWith('data:image/') ? 'data:image/[...large blob...]' : (imageUrl || '');
      log(`🔍 HTML Image ${index + 1}: ${displayUrl}`, 'info');
    });

    log(`📋 Available uploaded images:`, 'info');
    uploadedImages.forEach((img, index) => {
      log(`   Uploaded ${index + 1}: ${img.publicUrl}`, 'info');
    });

    let processedHtml = html;
    let imagePosition = 1;

    // Create a map of current HTML images to their correct sequential URLs
    const slug = this.extractSlugFromImageUrl(uploadedImages[0]?.publicUrl || '');
    
    // Process ALL images in exact order they appear in HTML
    allImageMatches.forEach((imageMatch, index) => {
      const imageUrl = imageMatch.match(/src="([^"]*)"/)?.[1];
      
      if (imageUrl) {
        // Only process data blobs and GitHub raw URLs, skip external images
        const isDataBlob = imageUrl.startsWith('data:image/');
        const isGitHubRaw = imageUrl.startsWith('https://raw.githubusercontent.com/aryanbatras/100xsystems-storage/main/images/');
        
        log(`🔍 Processing HTML Image ${index + 1}:`, 'info');
        const displayUrl = imageUrl.startsWith('data:image/') ? 'data:image/[...large blob...]' : imageUrl;
        log(`   - URL: ${displayUrl}`, 'info');
        log(`   - Is Data Blob: ${displayUrl}`, 'info');
        log(`   - Is GitHub Raw: ${isGitHubRaw}`, 'info');
        
        if (isDataBlob || isGitHubRaw) {
          // ALWAYS generate sequential URL based on HTML position (1, 2, 3, 4)
          // This ensures correct ordering regardless of what Delta conversion produced
          const replacementUrl = `https://raw.githubusercontent.com/aryanbatras/100xsystems-storage/main/images/${slug}/${slug}-${String(imagePosition).padStart(3, '0')}.webp`;
          
          log(`🔧 FORCED SEQUENTIAL REPLACEMENT:`, 'info');
          log(`   - HTML Position: ${index + 1}`, 'info');
          log(`   - New Sequential Position: ${imagePosition}`, 'info');
          log(`   - Original URL: ${isDataBlob ? 'data:image/[...large blob...]' : imageUrl}`, 'info');
          log(`   - Replacement URL: ${replacementUrl}`, 'info');
          log(`   - Slug: ${slug}`, 'info');
          
          processedHtml = processedHtml.replace(imageMatch, `src="${replacementUrl}"`);
          log(`✅ Successfully replaced image ${index + 1} with sequential position ${imagePosition}`, 'success');
          imagePosition++;
        } else {
          log(`✅ Skipping external image ${index + 1}: ${imageUrl.substring(0, 50)}...`, 'info');
        }
      }
    });

    log(`✅ Processed ${imagePosition - 1} images in correct HTML sequence`, 'success');
    log(`📝 Final image positions: 1 to ${imagePosition - 1}`, 'info');
    
    // Log final HTML snippet to verify
    const finalImageMatches = processedHtml.match(/src="([^"]*)"/gi);
    log(`📋 Final HTML Images:`, 'info');
    finalImageMatches?.forEach((match, index) => {
      const url = match.match(/src="([^"]*)"/)?.[1];
      log(`   Final ${index + 1}: ${url}`, 'info');
    });
    
    return processedHtml;
  }

  private static extractSlugFromImageUrl(imageUrl: string): string {
    const match = imageUrl.match(/\/images\/([^\/]+)\/[^\/]+$/);
    return match ? match[1] : '';
  }

  private static calculateImageStats(
    originalHtml: string,
    processedHtml: string,
    uploadedImages: UploadedImage[]
  ) {
    const originalBlobs = (originalHtml.match(/src="data:image\/[^"]*"/gi) || []).length;
    const finalBlobs = (processedHtml.match(/src="data:image\/[^"]*"/gi) || []).length;
    
    return {
      total: uploadedImages.length,
      processed: originalBlobs,
      replaced: originalBlobs - finalBlobs
    };
  }

  private static buildHtmlDocument(content: string, metadata: ArticleMetadata): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metadata.title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 2em;
            margin-bottom: 1em;
            font-weight: 600;
        }
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1em 0;
        }
        blockquote {
            border-left: 4px solid #ddd;
            margin: 1em 0;
            padding-left: 1em;
            color: #666;
        }
        pre {
            background: #f4f4f4;
            padding: 1em;
            border-radius: 4px;
            overflow-x: auto;
        }
        code {
            background: #f4f4f4;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'Monaco', 'Courier New', monospace;
        }
        pre code {
            background: none;
            padding: 0;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: left;
        }
        th {
            background-color: #f5f5f5;
            font-weight: 600;
        }
        a {
            color: #0066cc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .ql-editor {
            font-size: 18px;
            line-height: 1.7;
        }
    </style>
</head>
<body>
    <script type="application/json" id="article-metadata">${JSON.stringify(metadata)}</script>
    <article class="ql-editor">
        ${content}
    </article>
</body>
</html>`;
  }
}
