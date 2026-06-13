/**
 * ## Article Update Domain: React Hooks
 *
 * Hook for updating existing published articles via the GitHub workflow.
 *
 * @packageDocumentation
 */

import { useState, useCallback } from 'react';
import { ArticleUpdater, UpdateOptions } from '../../infrastructure/articleUpdater';
import { QuillDelta, ArticleMetadata, PublishingState } from '../../shared/types';
import { log } from '../../shared/utils';

/**
 * Options for the useArticleUpdate hook.
 *
 * @public
 */
export interface UseArticleUpdateOptions {
  slug: string;
  title: string;
  existingMetadata?: ArticleMetadata;
}

/**
 * Result of an article update operation.
 *
 * @public
 */
export interface UpdateResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Hook for updating existing published articles.
 *
 * @remarks
 * Handles the full update lifecycle: validation, uploading content to GitHub,
 * and tracking update state. Provides detailed logging for debugging.
 *
 * @param options - Update configuration (slug, title, existing metadata)
 * @returns Update handlers, state, and result
 *
 * @public
 */
export const useArticleUpdate = (options: UseArticleUpdateOptions) => {
  const [updateState, setUpdateState] = useState<PublishingState>('draft');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateResult, setUpdateResult] = useState<UpdateResult | null>(null);

  const handleUpdate = useCallback(async (delta: QuillDelta): Promise<UpdateResult> => {
    if (!options.slug || !options.title) {
      const error = 'Slug and title are required for updates';
      log('Update validation failed: ' + error, 'error');
      return { success: false, error };
    }

    if (options.existingMetadata && !ArticleUpdater.validateUpdateEligibility(options.existingMetadata, options.title)) {
      const error = 'Title change detected. This will create a new article instead of updating.';
      log('Update validation failed: ' + error, 'error');
      return { success: false, error };
    }

    setIsUpdating(true);
    setUpdateState('uploading');
    setUpdateResult(null);

    try {
      const updateOptions: UpdateOptions = {
        slug: options.slug,
        delta,
        title: options.title,
        existingMetadata: options.existingMetadata,
      };

      const result = await ArticleUpdater.updateArticle(updateOptions);

      if (result.success) {
        setUpdateState('success');
      } else {
        setUpdateState('failed');
      }

      const updateResult: UpdateResult = {
        success: result.success,
        url: result.url,
        error: result.error,
      };

      setUpdateResult(updateResult);
      return updateResult;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setUpdateState('failed');
      const result: UpdateResult = { success: false, error: errorMessage };
      setUpdateResult(result);
      return result;
    } finally {
      setIsUpdating(false);
    }
  }, [options]);

  const resetUpdateState = useCallback(() => {
    setUpdateState('draft');
    setUpdateResult(null);
    setIsUpdating(false);
  }, []);

  return {
    handleUpdate,
    updateState,
    isUpdating,
    updateResult,
    resetUpdateState,
  };
};
