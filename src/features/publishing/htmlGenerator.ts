import { HtmlConverter } from '../../infrastructure/converters';
import { ImageProcessor } from '../../infrastructure/imageProcessor';
import { GitHubPublisher } from '../../infrastructure/api/githubPublisher';
import { SlugGenerator } from '../../core/domain';
import { QuillDelta, UploadedImage } from '../../shared/types';
import { log } from '../../shared/utils';

export const generateSlug = (title: string): string => {
  return SlugGenerator.generateSlug(title);
};

export const generateHTML = (delta: QuillDelta, title: string, slug: string, uploadedImages: UploadedImage[]): string => {
  const result = HtmlConverter.convertDeltaToHtml(delta, title, slug, uploadedImages);
  return result.html;
};

export const publishHTMLToGitHub = async (slug: string, html: string): Promise<void> => {
  const result = await GitHubPublisher.publishHTML(slug, html);
  if (!result.success) {
    throw new Error(result.error || 'Publishing failed');
  }
};
