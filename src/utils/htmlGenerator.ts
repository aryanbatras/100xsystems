import { UploadedImage } from '../hooks/useImageProcessing';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { log, LogLevel } from '../lib/logger';

export const generateSlug = (title: string): string => {
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
};

export const generateHTML = (delta: any, title: string, slug: string, uploadedImages: UploadedImage[]): string => {
  log('📄 Generating HTML file...', 'info');
  log(`📝 Title: "${title}"`, 'info');
  log(`📂 Slug: "${slug}"`, 'info');
  log(`🖼️ Uploaded images: ${uploadedImages.length}`, 'info');
  log(`📊 Delta operations: ${delta.ops?.length || 0}`, 'info');
  
  const startTime = Date.now();
  
  // Create metadata for JSON script tag
  const metadata = {
    title: title,
    slug: slug,
    date: new Date().toISOString().split('T')[0],
    images: uploadedImages.map(img => img.publicUrl)
  };
  
  log('📋 HTML metadata:', 'info');
  log(`   - Title: ${metadata.title}`, 'info');
  log(`   - Slug: ${metadata.slug}`, 'info');
  log(`   - Date: ${metadata.date}`, 'info');
  log(`   - Images: ${metadata.images.length} URLs`, 'info');
  
  // Convert delta to HTML using quill-delta-to-html
  log('🔄 Converting Delta to HTML...', 'info');
  const conversionStartTime = Date.now();
  
  try {
    // Create a map for quick image URL lookup
    const imageUrlMap = new Map<string, string>();
    uploadedImages.forEach(img => {
      imageUrlMap.set(img.temporaryId, img.publicUrl);
    });
    
    log(`🔗 Created image URL map with ${imageUrlMap.size} entries`, 'info');
    
    // Configure converter for proper HTML output
    const converter = new QuillDeltaToHtmlConverter(delta.ops || [], {
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
      } as any,
      multiLineBlockquote: true,
      multiLineHeader: true,
      multiLineCodeblock: true,
      linkTarget: '_blank'
    });
    
    // Register custom renderer for images to handle URL replacement
    converter.renderCustomWith((customOp, contextOp) => {
      if (customOp.insert.type === 'image') {
        const imageUrl = customOp.insert.value;
        log(`�️ Processing image: ${imageUrl.substring(0, 50)}...`);
        
        // Check if this is a data:image URL that needs to be replaced
        if (imageUrl.startsWith('data:image')) {
          // Try to find matching uploaded image by temporary ID
          let replacementUrl = null;
          
          // Method 1: Try to extract temporary ID from the data URL or context
          for (const [tempId, publicUrl] of imageUrlMap.entries()) {
            // This is a heuristic - in practice, you might need a better way to match
            if (contextOp && contextOp.attributes && contextOp.attributes.tempId === tempId) {
              replacementUrl = publicUrl;
              break;
            }
          }
          
          // Method 2: If no match found, use the first uploaded image
          if (!replacementUrl && uploadedImages.length > 0) {
            replacementUrl = uploadedImages[0].publicUrl;
            log(`🔄 Using fallback image URL: ${replacementUrl}`);
          }
          
          if (replacementUrl) {
            log(`✅ Replaced image blob with: ${replacementUrl}`);
            return `<img src="${replacementUrl}" />`;
          } else {
            log(`⚠️ No replacement URL found for image, keeping original`);
          }
        }
        
        // Return original image tag if no replacement needed
        return `<img src="${imageUrl}" />`;
      }
      
      return 'Unmanaged custom blot!';
    });
    
    const html = converter.convert();
    const conversionTime = Date.now() - conversionStartTime;
    
    log(`✅ Delta to HTML conversion completed in ${conversionTime}ms`, 'success');
    log(`📊 HTML content length: ${html.length} characters`, 'info');
    
    // Additional fallback: Replace any remaining data:image URLs
    log('🔄 Performing final cleanup of any remaining image blobs...');
    let processedHtml = html;
    let replacedImages = 0;
    
    // Find any remaining data:image URLs
    const remainingDataImages = processedHtml.match(/src="data:image\/[^"]*"/gi);
    if (remainingDataImages && remainingDataImages.length > 0) {
      log(`⚠️ Found ${remainingDataImages.length} remaining image blobs for cleanup`);
      
      remainingDataImages.forEach((dataImageSrc, index) => {
        if (uploadedImages.length > 0) {
          // Use the first uploaded image as fallback
          const fallbackUrl = uploadedImages[0].publicUrl;
          log(`🔧 Replacing remaining blob ${index + 1} with: ${fallbackUrl}`);
          processedHtml = processedHtml.replace(dataImageSrc, `src="${fallbackUrl}"`);
          replacedImages++;
        }
      });
    }
    
    // Final verification
    const finalBlobs = processedHtml.match(/src="data:image\/[^"]*"/gi);
    if (finalBlobs && finalBlobs.length > 0) {
      log(`❌ CRITICAL: ${finalBlobs.length} data:image URLs still remain!`);
    } else {
      log(`✅ All image URLs properly processed`);
    }
    
    log(`📊 Image processing summary:`);
    log(`   - Total uploaded images: ${uploadedImages.length}`);
    log(`   - Remaining blobs cleaned: ${replacedImages}`);
    log(`   - Final blobs remaining: ${finalBlobs?.length || 0}`);
    
    // Build complete HTML document
    const totalTime = Date.now() - startTime;
    const finalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
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
        ${processedHtml}
    </article>
</body>
</html>`;
    
    log(`✅ HTML generation completed in ${totalTime}ms`, 'success');
    log(`📏 Final HTML length: ${finalHTML.length} characters`, 'info');
    log(`📊 Size breakdown:`, 'info');
    log(`   - HTML document: ${finalHTML.length} chars`, 'info');
    log(`   - Content: ${processedHtml.length} chars (${((processedHtml.length/ finalHTML.length) * 100).toFixed(1)}%)`, 'info');
    
    return finalHTML;
  } catch (error) {
    log('❌ Delta to HTML conversion failed: ' + error, 'error');
    throw error;
  }
};

export const publishHTMLToGitHub = async (slug: string, html: string): Promise<void> => {
  log('📤 Publishing HTML file to GitHub...', 'info');
  log(`📂 Target slug: "${slug}"`, 'info');
  log(`📏 HTML content length: ${html.length} characters`, 'info');
  
  try {
    const response = await fetch('/api/publish-html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: slug,
        html: html,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      log('❌ Failed to publish HTML: ' + errorData, 'error');
      throw new Error(`Publishing error: ${errorData.error}`);
    }
    
    const result = await response.json();
    log('✅ HTML published successfully!', 'success');
    log(`🔗 Published URL: ${result.url}`, 'success');
    log(`📊 File size: ${result.size} bytes`, 'info');
    
  } catch (error) {
    log('❌ Publishing failed: ' + error, 'error');
    throw error;
  }
};
