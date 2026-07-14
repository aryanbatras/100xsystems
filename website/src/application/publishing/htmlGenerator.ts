/**
 * @deprecated HTML publishing system has been removed.
 * Content is now managed through Markdown/MDX files in the monorepo.
 */

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
};

export const generateHTML = (_delta: any, title: string, _slug: string, _uploadedImages: any[]): string => {
  return `<!DOCTYPE html><html><head><title>${title}</title></head><body><p>HTML generation has been removed. Content is now managed via MDX files.</p></body></html>`;
};

export const publishHTMLToGitHub = async (_slug: string, _html: string): Promise<void> => {
  throw new Error('Publishing to GitHub has been removed. Content is now managed via MDX files in the monorepo.');
};
