import { PublishResult } from '../../shared/types';
import { log } from '../../shared/utils';

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
}
