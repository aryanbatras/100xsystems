import { useState, useCallback } from 'react';
import { ArticleUpdater, UpdateOptions } from '../core/infrastructure/ArticleUpdater';
import { QuillDelta, ArticleMetadata, PublishingState } from '../shared/types';
import { log } from '../shared/utils';

export interface UseArticleUpdateOptions {
  slug: string;
  title: string;
  existingMetadata?: ArticleMetadata;
}

export interface UpdateResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const useArticleUpdate = (options: UseArticleUpdateOptions) => {
  const [updateState, setUpdateState] = useState<PublishingState>('draft');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateResult, setUpdateResult] = useState<UpdateResult | null>(null);

  const handleUpdate = useCallback(async (delta: QuillDelta): Promise<UpdateResult> => {
    if (!options.slug || !options.title) {
      const error = 'Slug and title are required for updates';
      log('❌ Update validation failed: ' + error, 'error');
      return { success: false, error };
    }

    if (options.existingMetadata && !ArticleUpdater.validateUpdateEligibility(options.existingMetadata, options.title)) {
      const error = 'Title change detected. This will create a new article instead of updating.';
      log('❌ Update validation failed: ' + error, 'error');
      return { success: false, error };
    }

    setIsUpdating(true);
    setUpdateState('uploading');
    setUpdateResult(null);

    try {
      log('🔄 Starting article update process...', 'info');
      log(`📝 Article: ${options.title} (${options.slug})`, 'info');

      const updateOptions: UpdateOptions = {
        slug: options.slug,
        delta,
        title: options.title,
        existingMetadata: options.existingMetadata
      };

      const result = await ArticleUpdater.updateArticle(updateOptions);

      if (result.success) {
        setUpdateState('success');
        log('✅ Article updated successfully!', 'success');
        log(`🔗 Updated URL: ${result.url}`, 'success');
      } else {
        setUpdateState('failed');
        log('❌ Article update failed: ' + result.error, 'error');
      }

      const updateResult: UpdateResult = {
        success: result.success,
        url: result.url,
        error: result.error
      };

      setUpdateResult(updateResult);
      return updateResult;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setUpdateState('failed');
      log('❌ Unexpected error during update: ' + errorMessage, 'error');
      
      const result: UpdateResult = {
        success: false,
        error: errorMessage
      };
      
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
    resetUpdateState
  };
};
