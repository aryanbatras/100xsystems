import { QuillDelta, QuillOperation, ArticleMetadata, UploadedImage } from '../../shared/types';
import { log } from '../../shared/utils';

export interface ParsedContent {
  content: string;
  metadata: ArticleMetadata | null;
  images: string[];
}

export interface ConversionOptions {
  preserveImages?: boolean;
  generateTempIds?: boolean;
}

export class HtmlToDeltaConverter {
  private static readonly QUILL_CONTENT_SELECTOR = 'article.ql-editor';
  private static readonly METADATA_SELECTOR = 'script[id="article-metadata"]';

  static parseHtml(html: string, options: ConversionOptions = {}): ParsedContent {
    const startTime = Date.now();
    log('🔄 Starting HTML to Delta parsing...', 'info');

    const metadata = this.extractMetadata(html);
    const content = this.extractQuillContent(html);
    const images = this.extractImageUrls(content);

    const processingTime = Date.now() - startTime;
    log(`✅ HTML parsing completed in ${processingTime}ms`, 'success');
    log(`📝 Content length: ${content.length} characters`, 'info');
    log(`🖼️ Images found: ${images.length}`, 'info');

    return {
      content,
      metadata,
      images
    };
  }

  static convertToDelta(html: string, options: ConversionOptions = {}): QuillDelta {
    const parsed = this.parseHtml(html, options);
    
    if (!parsed.content) {
      log('⚠️ No content found for Delta conversion', 'warning');
      return { ops: [] };
    }

    const delta = this.createDeltaFromHtml(parsed.content, options);
    log(`✅ Delta conversion completed with ${delta.ops?.length || 0} operations`, 'success');
    
    return delta;
  }

  private static extractMetadata(html: string): ArticleMetadata | null {
    try {
      const metadataMatch = html.match(/<script[^>]*id="article-metadata"[^>]*type="application\/json"[^>]*>(.*?)<\/script>/s) ||
                          html.match(/<script[^>]*type="application\/json"[^>]*id="article-metadata"[^>]*>(.*?)<\/script>/s);
      
      if (!metadataMatch) {
        log('⚠️ No metadata script tag found', 'warning');
        return null;
      }

      const jsonContent = metadataMatch[1].trim();
      const metadata = JSON.parse(jsonContent);
      
      log('✅ Metadata extracted successfully', 'success');
      log(`📝 Title: ${metadata.title}`, 'info');
      log(`📂 Slug: ${metadata.slug}`, 'info');
      log(`📅 Date: ${metadata.date}`, 'info');
      log(`🖼️ Images: ${metadata.images?.length || 0}`, 'info');
      
      return metadata;
    } catch (error) {
      log(`❌ Error extracting metadata: ${error}`, 'error');
      return null;
    }
  }

  private static extractQuillContent(html: string): string {
    try {
      const articleMatch = html.match(/<article[^>]*class="ql-editor"[^>]*>(.*?)<\/article>/s);
      if (!articleMatch) {
        log('⚠️ No ql-editor article found, using full HTML', 'warning');
        return this.stripCustomElements(html);
      }

      const content = articleMatch[1].trim();
      log('✅ Quill content extracted from article tag', 'success');
      
      return this.cleanQuillContent(content);
    } catch (error) {
      log(`❌ Error extracting content: ${error}`, 'error');
      return '';
    }
  }

  private static stripCustomElements(html: string): string {
    return html
      .replace(/<script[^>]*id="article-metadata"[^>]*>.*?<\/script>/gs, '')
      .replace(/<style[^>]*>.*?<\/style>/gs, '')
      .replace(/<head[^>]*>.*?<\/head>/gs, '')
      .replace(/<\/?html[^>]*>/gi, '')
      .replace(/<\/?body[^>]*>/gi, '')
      .replace(/<\/?article[^>]*>/gi, '')
      .trim();
  }

  private static cleanQuillContent(content: string): string {
    return content
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  private static extractImageUrls(content: string): string[] {
    const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/gi;
    const urls: string[] = [];
    let match;

    while ((match = imgRegex.exec(content)) !== null) {
      const url = match[1];
      if (url && !url.startsWith('data:image')) {
        urls.push(url);
      }
    }

    return urls;
  }

  private static createDeltaFromHtml(html: string, options: ConversionOptions): QuillDelta {
    const ops: QuillOperation[] = [];
    
    const cleanHtml = this.prepareHtmlForQuill(html);
    const paragraphs = this.splitIntoParagraphs(cleanHtml);

    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim()) {
        const paragraphOps = this.convertParagraphToOps(paragraph, options);
        ops.push(...paragraphOps);
        
        if (index < paragraphs.length - 1) {
          ops.push({ insert: '\n' });
        }
      }
    });

    return { ops };
  }

  private static prepareHtmlForQuill(html: string): string {
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '</p>\n')
      .replace(/<\/div>/gi, '</div>\n')
      .replace(/<\/h[1-6]>/gi, (match) => match + '\n');
  }

  private static splitIntoParagraphs(html: string): string[] {
    return html
      .split(/\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  private static convertParagraphToOps(paragraph: string, options: ConversionOptions): QuillOperation[] {
    const ops: QuillOperation[] = [];
    
    const textAndFormatting = this.extractTextAndFormatting(paragraph);
    
    textAndFormatting.forEach(item => {
      if (item.type === 'text') {
        const op: QuillOperation = { insert: item.content };
        if (item.attributes && Object.keys(item.attributes).length > 0) {
          op.attributes = item.attributes;
        }
        ops.push(op);
      } else if (item.type === 'image') {
        const op: QuillOperation = { 
          insert: { 
            image: options.generateTempIds ? 
              `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : 
              item.src
          }
        };
        if (item.attributes) {
          op.attributes = item.attributes;
        }
        ops.push(op);
      }
    });

    return ops.length > 0 ? ops : [{ insert: paragraph }];
  }

  private static extractTextAndFormatting(html: string): Array<{
    type: 'text' | 'image';
    content: string;
    src?: string;
    attributes?: any;
  }> {
    const result: Array<{ type: 'text' | 'image'; content: string; src?: string; attributes?: any }> = [];
    
    const parts = html.split(/(<img[^>]*>)/g);
    
    parts.forEach(part => {
      if (part.startsWith('<img')) {
        const srcMatch = part.match(/src="([^"]*)"/);
        const altMatch = part.match(/alt="([^"]*)"/);
        
        result.push({
          type: 'image',
          content: altMatch ? altMatch[1] : '',
          src: srcMatch ? srcMatch[1] : '',
          attributes: {
            alt: altMatch ? altMatch[1] : undefined
          }
        });
      } else if (part.trim()) {
        const textContent = this.stripHtmlTags(part);
        if (textContent) {
          const attributes = this.extractFormattingAttributes(part);
          result.push({
            type: 'text',
            content: textContent,
            attributes
          });
        }
      }
    });

    return result;
  }

  private static stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }

  private static extractFormattingAttributes(html: string): any {
    const attributes: any = {};

    if (html.includes('<strong>') || html.includes('<b>')) {
      attributes.bold = true;
    }
    
    if (html.includes('<em>') || html.includes('<i>')) {
      attributes.italic = true;
    }
    
    if (html.includes('<u>')) {
      attributes.underline = true;
    }

    const headerMatch = html.match(/<h([1-6])>/);
    if (headerMatch) {
      attributes.header = parseInt(headerMatch[1]);
    }

    const linkMatch = html.match(/<a[^>]*href="([^"]*)"[^>]*>/);
    if (linkMatch) {
      attributes.link = linkMatch[1];
    }

    const colorMatch = html.match(/style="[^"]*color:\s*([^;]*)[^"]*"/);
    if (colorMatch) {
      attributes.color = colorMatch[1].trim();
    }

    return Object.keys(attributes).length > 0 ? attributes : undefined;
  }
}
