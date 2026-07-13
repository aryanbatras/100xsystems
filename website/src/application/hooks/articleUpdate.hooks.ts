/**
 * @deprecated Article update via GitHub workflow has been removed.
 * Content is now managed through Markdown/MDX files in the monorepo.
 * This hook is kept as a stub to prevent import errors.
 */
export interface UseArticleUpdateOptions {
  slug: string;
  title: string;
}
export interface UpdateResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const useArticleUpdate = (_options: UseArticleUpdateOptions) => {
  return {
    handleUpdate: async () => ({ success: false, error: 'Article update system has been removed. Content is now managed via MDX files in the monorepo.' }),
    updateState: 'draft' as const,
    isUpdating: false,
    updateResult: null,
    resetUpdateState: () => {},
  };
};
