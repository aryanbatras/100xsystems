/**
 * ## Publishing Domain: React Hooks
 *
 * Hooks for article publishing workflow — creating, updating,
 * and managing published HTML articles.
 *
 * @packageDocumentation
 */

import { useState, useEffect } from 'react';
import { extractImagesFromDelta, uploadImagesToGitHub } from '../publishing/imageProcessing';
import { generateSlug, generateHTML, publishHTMLToGitHub } from '../publishing/htmlGenerator';
import { log, clearLogs as clearAllLogs, getLogs } from '../../infrastructure/utils/logger';
import { LogEntry, PublishingState } from '../types/shared.types';

/**
 * Hook for managing the article publishing workflow.
 *
 * @remarks
 * Handles the full publish lifecycle with detailed timing metrics:
 * content extraction, image upload, HTML generation, and GitHub publishing.
 * Every step is instrumented with performance logging for debugging.
 *
 * @param articleTitle - The title of the article being published
 * @returns Publishing state, handlers, and log data
 *
 * @public
 */
export const usePublishing = (articleTitle: string) => {
  const [publishingState, setPublishingState] = useState<PublishingState>('draft');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const clearLogs = () => { clearAllLogs(); setLogs([]); };

  useEffect(() => {
    const updateLogs = () => setLogs(getLogs());
    const interval = setInterval(updateLogs, 100);
    return () => clearInterval(interval);
  }, []);

  const startLogCapture = () => {
    log('🚀 ========== PUBLISH PROCESS START ==========');
    setLogs(getLogs());
  };

  const stopLogCapture = () => {
    // No-op since we're not capturing console logs anymore
  };

  const handlePublish = async (quillRef: any) => {
    const publishStartTime = Date.now();

    startLogCapture();
    log('🚀 ========== PUBLISH PROCESS START ==========');
    log('🚀 handlePublish called');
    log('📝 quillRef.current:', quillRef.current);
    log(`📝 Article title: "${articleTitle}"`);
    log(`📏 Title length: ${articleTitle.length} characters`);

    if (!quillRef.current) {
      log('❌ Quill reference is null', 'error');
      stopLogCapture();
      return;
    }

    clearLogs();
    setPublishingState('uploading');

    try {
      log('🚀 Starting publish process...');
      log(`📝 Article title: "${articleTitle}"`);

      // Get Quill editor instance
      const quill = quillRef.current.getEditor();
      log('✅ Quill editor instance obtained');
      log(`🔍 Quill methods available: ${Object.getOwnPropertyNames(quill).join(', ')}`);

      // Extract content from Quill
      log('📄 Extracting content from Quill...');
      const contentExtractionStart = Date.now();
      const delta = quill.getContents();
      const contentExtractionTime = Date.now() - contentExtractionStart;

      log(`📄 Delta content retrieved in ${contentExtractionTime}ms`);
      log('📊 Delta operations count:', delta.ops?.length || 0);
      log(`📏 Delta length: ${JSON.stringify(delta).length} characters`);

      // Generate slug
      log('🔧 Generating article slug...');
      const slugStartTime = Date.now();
      const slug = generateSlug(articleTitle) || `article-${Date.now()}`;
      const slugTime = Date.now() - slugStartTime;

      log(`📝 Generated slug "${slug}" in ${slugTime}ms`);

      // Extract images
      log('🔍 Starting image extraction...');
      const imageExtractionStart = Date.now();
      const images = await extractImagesFromDelta(delta);
      const imageExtractionTime = Date.now() - imageExtractionStart;

      log(`📸 Image extraction completed in ${imageExtractionTime}ms`);
      log(`📸 Found ${images.length} image(s) to upload`);

      // Upload images if any
      let uploadedImages: any[] = [];
      let imageUploadTime = 0;
      if (images.length > 0) {
        log('🗜️ Starting image upload process...');
        log('⬆️ Uploading images to GitHub...');

        const imageUploadStart = Date.now();
        uploadedImages = await uploadImagesToGitHub(images, slug);
        imageUploadTime = Date.now() - imageUploadStart;

        log(`✅ Image upload completed in ${imageUploadTime}ms`);
        log(`✅ Successfully uploaded ${uploadedImages.length}/${images.length} images`);

        uploadedImages.forEach((img, index) => {
          log(`🖼️ Image ${index + 1}: ${img.publicUrl}`);
        });
      } else {
        log('📷 No images found, skipping upload');
      }

      // Generate HTML
      log('📄 Starting HTML generation...');
      const htmlGenStart = Date.now();

      const html = generateHTML(delta, articleTitle, slug, uploadedImages);
      const htmlGenTime = Date.now() - htmlGenStart;

      log(`✅ HTML generation completed in ${htmlGenTime}ms`);
      log(`📏 Generated HTML length: ${html.length} characters`);
      log(`💾 HTML size: ${(html.length / 1024).toFixed(2)}KB`);

      // Publish to GitHub
      log('🚀 Starting GitHub publish...');
      const publishStart = Date.now();

      await publishHTMLToGitHub(slug, html);
      const publishTime = Date.now() - publishStart;

      log(`✅ GitHub publish completed in ${publishTime}ms`);

      // Final success
      const totalPublishTime = Date.now() - publishStartTime;
      setPublishingState('success');

      log('🎉 ========== PUBLISH PROCESS SUCCESS ==========');
      log(`🎉 Total publish time: ${totalPublishTime}ms`);
      log(`📂 Article available at: articles/${slug}/index.html`);

      // Performance breakdown
      log('📊 Performance breakdown:');
      log(`   - Content extraction: ${contentExtractionTime}ms (${((contentExtractionTime / totalPublishTime) * 100).toFixed(1)}%)`);
      log(`   - Slug generation: ${slugTime}ms (${((slugTime / totalPublishTime) * 100).toFixed(1)}%)`);
      log(`   - Image extraction: ${imageExtractionTime}ms (${((imageExtractionTime / totalPublishTime) * 100).toFixed(1)}%)`);
      log(`   - Image upload: ${imageUploadTime || 0}ms (${images.length > 0 ? ((imageUploadTime || 0) / totalPublishTime * 100).toFixed(1) : '0'}%)`);
      log(`   - HTML generation: ${htmlGenTime}ms (${((htmlGenTime / totalPublishTime) * 100).toFixed(1)}%)`);
      log(`   - GitHub publish: ${publishTime}ms (${((publishTime / totalPublishTime) * 100).toFixed(1)}%)`);

    } catch (error) {
      const totalPublishTime = Date.now() - publishStartTime;
      log('❌ ========== PUBLISH PROCESS FAILED ==========', 'error');
      log(`❌ Publishing error after ${totalPublishTime}ms: ${error instanceof Error ? error.message : String(error)}`, 'error');
      log(`❌ Error stack: ${error instanceof Error ? error.stack || 'No stack available' : 'No stack available'}`, 'error');

      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      log(`❌ Publish failed: ${errorMessage}`, 'error');
      log(`🔍 Full error: ${error instanceof Error ? error.stack || errorMessage : String(error)}`, 'error');
      log(`⏱️ Failed after ${totalPublishTime}ms`, 'error');
      log('🔧 Please check your connection and try again', 'error');
      setPublishingState('failed');
    } finally {
      stopLogCapture();
    }
  };

  return { publishingState, handlePublish, setPublishingState, logs, clearLogs };
};
