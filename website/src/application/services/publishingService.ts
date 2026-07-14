/**
 * @deprecated Publishing service has been removed.
 * Content is now managed through Markdown/MDX files in the monorepo.
 * This file is kept as a stub to prevent import errors in remaining code.
 */

export interface PublishingWorkflowInput {
  delta: any;
  title: string;
  customSlug?: string;
}

export interface PublishingWorkflowResult {
  success: boolean;
  slug: string;
  htmlUrl?: string;
  error?: string;
  processingTime: number;
}

export class PublishingService {
  static async publishArticle(input: PublishingWorkflowInput): Promise<PublishingWorkflowResult> {
    return {
      success: false,
      slug: input.customSlug || '',
      error: 'Publishing service has been removed. Content is now managed via MDX files.',
      processingTime: 0,
    };
  }

  static async generateHtmlOnly(_input: PublishingWorkflowInput): Promise<any> {
    throw new Error('HTML generation has been removed. Content is now managed via MDX files.');
  }

  static validateInput(_input: PublishingWorkflowInput): { isValid: boolean; errors: string[] } {
    return { isValid: false, errors: ['Publishing service has been removed.'] };
  }
}
