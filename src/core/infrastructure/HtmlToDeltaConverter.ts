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
    console.log('🔍 === MAIN PARSE HTML DEBUG START ===');
    console.log('📏 Input HTML length:', html.length);
    console.log('🔍 First 300 chars of input HTML:', html.substring(0, 300));
    console.log('� Last 300 chars of input HTML:', html.substring(html.length - 300));
    log('�🔄 Starting HTML to Delta parsing...', 'info');

    const metadata = this.extractMetadata(html);
    console.log('📊 Metadata extraction result:', metadata);
    
    const content = this.extractQuillContent(html);
    console.log('📊 Content extraction result length:', content.length);
    console.log('📝 First 200 chars of extracted content:', content.substring(0, 200));
    
    const images = this.extractImageUrls(content);
    console.log('📊 Image extraction result:', images);

    const processingTime = Date.now() - startTime;
    console.log('⏱️ Processing completed in', processingTime, 'ms');
    console.log('🔍 === MAIN PARSE HTML DEBUG END ===');
    
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
      // COMPREHENSIVE DEBUGGING LOGS
      console.log('🔍 === METADATA EXTRACTION DEBUG START ===');
      console.log('📏 HTML length:', html.length);
      console.log('🔍 First 500 chars of HTML:', html.substring(0, 500));
      console.log('🔍 Last 500 chars of HTML:', html.substring(html.length - 500));
      
      // Check for any script tags
      const allScriptMatches = html.match(/<script[^>]*>.*?<\/script>/gs) || [];
      console.log('📜 All script tags found:', allScriptMatches.length);
      allScriptMatches.forEach((script, index) => {
        console.log(`📜 Script ${index + 1}:`, script.substring(0, 200) + (script.length > 200 ? '...' : ''));
      });
      
      // Check for article-metadata specifically
      const metadataMatch1 = html.match(/<script[^>]*id="article-metadata"[^>]*type="application\/json"[^>]*>(.*?)<\/script>/s);
      const metadataMatch2 = html.match(/<script[^>]*type="application\/json"[^>]*id="article-metadata"[^>]*>(.*?)<\/script>/s);
      
      console.log('🔍 Metadata match 1 (id first):', !!metadataMatch1);
      console.log('🔍 Metadata match 2 (type first):', !!metadataMatch2);
      
      if (metadataMatch1) {
        console.log('📝 Metadata content (match 1):', metadataMatch1[1].substring(0, 200));
      }
      if (metadataMatch2) {
        console.log('📝 Metadata content (match 2):', metadataMatch2[1].substring(0, 200));
      }
      
      const metadataMatch = metadataMatch1 || metadataMatch2;
      
      if (!metadataMatch) {
        console.log('❌ No metadata script tag found');
        console.log('🔍 Checking for any JSON script tags...');
        const jsonScriptMatches = html.match(/<script[^>]*type="application\/json"[^>]*>(.*?)<\/script>/gs) || [];
        console.log('📜 JSON script tags found:', jsonScriptMatches.length);
        jsonScriptMatches.forEach((script, index) => {
          console.log(`📜 JSON Script ${index + 1}:`, script.substring(0, 200) + (script.length > 200 ? '...' : ''));
        });
        
        console.log('🔍 Checking for any id="article-metadata"...');
        const idMatches = html.match(/<[^>]*id="article-metadata"[^>]*>/g) || [];
        console.log('📜 Elements with id="article-metadata":', idMatches.length);
        idMatches.forEach((element, index) => {
          console.log(`📜 Element ${index + 1}:`, element);
        });
        
        console.log('🔍 === METADATA EXTRACTION DEBUG END ===');
        log('⚠️ No metadata script tag found', 'warning');
        return null;
      }

      const jsonContent = metadataMatch[1].trim();
      console.log('📝 Raw JSON content:', jsonContent.substring(0, 200));
      
      const metadata = JSON.parse(jsonContent);
      console.log('✅ Parsed metadata:', metadata);
      
      log('✅ Metadata extracted successfully', 'success');
      log(`📝 Title: ${metadata.title}`, 'info');
      log(`📂 Slug: ${metadata.slug}`, 'info');
      log(`📅 Date: ${metadata.date}`, 'info');
      log(`🖼️ Images: ${metadata.images?.length || 0}`, 'info');
      
      console.log('🔍 === METADATA EXTRACTION DEBUG END ===');
      return metadata;
    } catch (error) {
      console.log('❌ Error parsing metadata:', error);
      log(`❌ Error extracting metadata: ${error}`, 'error');
      return null;
    }
  }

  private static extractQuillContent(html: string): string {
    try {
      console.log('🔍 === QUILL CONTENT EXTRACTION DEBUG START ===');
      
      // Check for any article tags
      const allArticleMatches = html.match(/<article[^>]*>.*?<\/article>/gs) || [];
      console.log('📜 All article tags found:', allArticleMatches.length);
      allArticleMatches.forEach((article, index) => {
        console.log(`📜 Article ${index + 1}:`, article.substring(0, 200) + (article.length > 200 ? '...' : ''));
      });
      
      // Check for ql-editor specifically
      const articleMatch = html.match(/<article[^>]*class="ql-editor"[^>]*>(.*?)<\/article>/s);
      console.log('🔍 QL-editor article match:', !!articleMatch);
      
      if (articleMatch) {
        console.log('📝 QL-editor content length:', articleMatch[1].length);
        console.log('📝 First 200 chars of QL-editor content:', articleMatch[1].substring(0, 200));
      }
      
      if (!articleMatch) {
        console.log('❌ No ql-editor article found, checking for other article patterns...');
        
        // Check for any article with class containing ql-editor
        const qlEditorArticleMatch = html.match(/<article[^>]*class="[^"]*ql-editor[^"]*"[^>]*>(.*?)<\/article>/s);
        console.log('🔍 Article with ql-editor in class:', !!qlEditorArticleMatch);
        
        if (qlEditorArticleMatch) {
          console.log('📝 Alternative QL-editor content length:', qlEditorArticleMatch[1].length);
          console.log('📝 First 200 chars of alternative content:', qlEditorArticleMatch[1].substring(0, 200));
        }
        
        // Check for any div with ql-editor
        const qlEditorDivMatch = html.match(/<div[^>]*class="[^"]*ql-editor[^"]*"[^>]*>(.*?)<\/div>/s);
        console.log('🔍 Div with ql-editor class:', !!qlEditorDivMatch);
        
        if (qlEditorDivMatch) {
          console.log('📝 Div QL-editor content length:', qlEditorDivMatch[1].length);
          console.log('📝 First 200 chars of div content:', qlEditorDivMatch[1].substring(0, 200));
        }
        
        console.log('🔍 Using full HTML as fallback');
        const strippedContent = this.stripCustomElements(html);
        console.log('📝 Stripped content length:', strippedContent.length);
        console.log('📝 First 200 chars of stripped content:', strippedContent.substring(0, 200));
        
        console.log('🔍 === QUILL CONTENT EXTRACTION DEBUG END ===');
        log('⚠️ No ql-editor article found, using full HTML', 'warning');
        return this.cleanQuillContent(strippedContent);
      }

      const content = articleMatch[1].trim();
      console.log('📝 Final content length:', content.length);
      console.log('📝 First 200 chars of final content:', content.substring(0, 200));
      
      console.log('🔍 === QUILL CONTENT EXTRACTION DEBUG END ===');
      log('✅ Quill content extracted from article tag', 'success');
      
      return this.cleanQuillContent(content);
    } catch (error) {
      console.log('❌ Error extracting content:', error);
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
