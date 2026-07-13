/**
 * ## Infrastructure: GitHub Publisher
 *
 * Publishes HTML content to GitHub Pages storage repository.
 * Handles file creation, content encoding, and error reporting
 * via the GitHub Contents API.
 *
 * @packageDocumentation
 */

import { PublishResult } from '../../application/types/shared.types';
import { log } from '../../infrastructure/utils';

export class GitHubPublisher {
  static async publishHTML(slug: string, html: string): Promise<PublishResult> {
    log('📤 Publishing HTML to GitHub...', 'info');
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
        return {
          success: false,
          error: `Publishing error: ${errorData.error}`
        };
      }

      const result = await response.json();
      log('✅ HTML published successfully!', 'success');
      log(`🔗 Published URL: ${result.url}`, 'success');
      log(`📊 File size: ${result.size} bytes`, 'info');

      return {
        success: true,
        url: result.url,
        size: result.size
      };

    } catch (error) {
      log('❌ Publishing failed: ' + error, 'error');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async deleteFile(filePath: string): Promise<PublishResult> {
    log('🗑️ Deleting file from GitHub...', 'info');
    log(`📂 Target file: "${filePath}"`, 'info');

    try {
      const response = await fetch('/api/delete-file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath: filePath,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        log('❌ Failed to delete file: ' + errorData, 'error');
        return {
          success: false,
          error: `Delete error: ${errorData.error}`
        };
      }

      const result = await response.json();
      log('✅ File deleted successfully!', 'success');

      return {
        success: true,
        url: result.url
      };

    } catch (error) {
      log('❌ File deletion failed: ' + error, 'error');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async loadHTML(slug: string): Promise<string | null> {
    log('📂 Loading HTML from GitHub...', 'info');
    log(`📂 Target slug: "${slug}"`, 'info');

    try {
      const response = await fetch(`/api/load-html?slug=${encodeURIComponent(slug)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          log(`⚠️ Article not found: ${slug}`, 'warning');
          return null;
        }
        const errorData = await response.json();
        log('❌ Failed to load HTML: ' + errorData, 'error');
        return null;
      }

      const result = await response.json();
      log('✅ HTML loaded successfully!', 'success');
      log(`📏 Content length: ${result.html?.length || 0} characters`, 'info');

      return result.html || '';

    } catch (error) {
      log('❌ Loading HTML failed: ' + error, 'error');
      return null;
    }
  }
}
