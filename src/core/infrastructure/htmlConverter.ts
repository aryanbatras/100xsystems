import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { 
  QuillDelta, 
  UploadedImage, 
  ArticleMetadata, 
  QuillConverterConfig,
  ConversionResult,
  PerformanceMetrics
} from '../../shared/types';
import { log } from '../../shared/utils';
import { DateUtils } from '../../shared/utils';

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

    this.registerImageRenderer(converter, imageUrlMap, uploadedImages);

    const conversionStartTime = Date.now();
    let html = converter.convert();
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
    converter.renderCustomWith((customOp, contextOp) => {
      if (customOp.insert.type === 'image') {
        const imageUrl = customOp.insert.value;
        log(`🖼️ Processing image: ${imageUrl.substring(0, 50)}...`, 'info');

        if (imageUrl.startsWith('data:image')) {
          const replacementUrl = this.findReplacementUrl(imageUrl, contextOp, imageUrlMap, uploadedImages);
          
          if (replacementUrl) {
            log(`✅ Replaced image blob with: ${replacementUrl}`, 'success');
            return `<img src="${replacementUrl}" />`;
          } else {
            log(`⚠️ No replacement URL found for image`, 'warning');
          }
        }

        return `<img src="${imageUrl}" />`;
      }

      return 'Unmanaged custom blot!';
    });
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

    const dataImageRegex = /src="data:image\/[^"]*"/gi;
    const remainingBlobs = html.match(dataImageRegex);

    if (!remainingBlobs || remainingBlobs.length === 0) {
      log('✅ No remaining image blobs found', 'success');
      return html;
    }

    log(`⚠️ Found ${remainingBlobs.length} remaining image blobs for cleanup`, 'warning');

    let processedHtml = html;
    let replacedCount = 0;

    remainingBlobs.forEach((blob, index) => {
      if (uploadedImages.length > 0 && uploadedImages[index]) {
        const fallbackUrl = uploadedImages[index].publicUrl;
        processedHtml = processedHtml.replace(blob, `src="${fallbackUrl}"`);
        replacedCount++;
        log(`🔧 Replaced blob ${index + 1} with: ${fallbackUrl}`, 'info');
      }
    });

    log(`✅ Cleaned up ${replacedCount} remaining blobs`, 'success');
    return processedHtml;
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
