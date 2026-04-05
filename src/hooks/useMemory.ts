import { useState, useEffect, useCallback } from 'react';
import { memoryService, MemoryEntry, MemoryStats } from '../services/memoryService';

interface UseMemoryOptions {
  autoSave?: boolean;
  maxRetrieved?: number;
  includeRecent?: boolean;
}

interface MemoryContext {
  entries: MemoryEntry[];
  context: string;
  stats: MemoryStats | null;
  isLoading: boolean;
  error: string | null;
}

export const useMemory = (options: UseMemoryOptions = {}) => {
  const {
    autoSave = true,
    maxRetrieved = 10,
    includeRecent = true
  } = options;

  const [memoryContext, setMemoryContext] = useState<MemoryContext>({
    entries: [],
    context: '',
    stats: null,
    isLoading: false,
    error: null
  });

  const [isInitialized, setIsInitialized] = useState(false);

  const saveMemory = useCallback(async (
    content: string,
    type: MemoryEntry['type'],
    articleContext?: string
  ) => {
    if (!autoSave) return;

    try {
      await memoryService.storeMemory(content, type, articleContext);
      
      const updatedEntries = await memoryService.retrieveMemories(undefined, maxRetrieved);
      setMemoryContext(prev => ({
        ...prev,
        entries: updatedEntries
      }));
    } catch (error) {
      setMemoryContext(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to save memory'
      }));
    }
  }, [autoSave, maxRetrieved]);

  const retrieveRelevantMemories = useCallback(async (
    query?: string,
    limit: number = maxRetrieved
  ) => {
    setMemoryContext(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const entries = await memoryService.retrieveMemories(query, limit);
      const context = entries
        .map(entry => `[${entry.type}]: ${entry.content}`)
        .join('\n\n');

      setMemoryContext(prev => ({
        ...prev,
        entries,
        context,
        isLoading: false
      }));

      return entries;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve memories';
      setMemoryContext(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return [];
    }
  }, [maxRetrieved]);

  const searchMemories = useCallback(async (query: string, limit: number = 10) => {
    setMemoryContext(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const entries = await memoryService.searchMemories(query, limit);
      setMemoryContext(prev => ({
        ...prev,
        entries,
        isLoading: false
      }));
      return entries;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search memories';
      setMemoryContext(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return [];
    }
  }, []);

  const clearMemories = useCallback(async (type?: MemoryEntry['type']) => {
    try {
      await memoryService.clearMemory(type);
      setMemoryContext(prev => ({
        ...prev,
        entries: [],
        context: ''
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear memories';
      setMemoryContext(prev => ({
        ...prev,
        error: errorMessage
      }));
    }
  }, []);

  const getMemoryStats = useCallback(async () => {
    try {
      const stats = await memoryService.getMemoryStats();
      setMemoryContext(prev => ({ ...prev, stats }));
      return stats;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get memory stats';
      setMemoryContext(prev => ({
        ...prev,
        error: errorMessage
      }));
      return null;
    }
  }, []);

  const exportMemories = useCallback(async () => {
    try {
      return await memoryService.exportMemory();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to export memories';
      setMemoryContext(prev => ({
        ...prev,
        error: errorMessage
      }));
      throw error;
    }
  }, []);

  const importMemories = useCallback(async (data: string) => {
    try {
      await memoryService.importMemory(data);
      await retrieveRelevantMemories();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to import memories';
      setMemoryContext(prev => ({
        ...prev,
        error: errorMessage
      }));
      throw error;
    }
  }, [retrieveRelevantMemories]);

  useEffect(() => {
    if (!isInitialized && includeRecent) {
      retrieveRelevantMemories();
      getMemoryStats();
      setIsInitialized(true);
    }
  }, [isInitialized, includeRecent, retrieveRelevantMemories, getMemoryStats]);

  return {
    ...memoryContext,
    saveMemory,
    retrieveRelevantMemories,
    searchMemories,
    clearMemories,
    getMemoryStats,
    exportMemories,
    importMemories,
    isInitialized
  };
};
