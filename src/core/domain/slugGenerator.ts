import { log } from '../../shared/utils';

export class SlugGenerator {
  static generateSlug(title: string): string {
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
  }

  static isValidSlug(slug: string): boolean {
    return /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length <= 50;
  }

  static sanitizeSlug(slug: string): string {
    return slug
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
  }
}
