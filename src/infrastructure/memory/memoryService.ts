/**
 * ## Infrastructure: Memory Service
 *
 * Client-side memory persistence using IndexedDB.
 * Stores conversation history, chat sessions, and
 * user preferences for the AI chat interface.
 *
 * @packageDocumentation
 */

interface MemoryEntry {
  id: string;
  content: string;
  timestamp: number;
  type: 'user_message' | 'ai_response' | 'context' | 'preference';
  importance: number;
  tags: string[];
  sessionId: string;
  articleContext?: string;
}

interface MemoryStats {
  totalEntries: number;
  totalSize: number;
  oldestEntry: number;
  newestEntry: number;
}

class MemoryService {
  private readonly STORAGE_KEYS = {
    RECENT: 'ai_chat_recent_memory',
    INDEXED_DB: 'AI_Memory_DB',
    SESSION: 'ai_chat_session_id'
  };

  private readonly MAX_RECENT_ENTRIES = 50;
  private readonly MAX_MEMORY_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly CLEANUP_THRESHOLD = 0.8; // Clean at 80% capacity

  constructor() {
    // IndexedDB is lazily initialized — not called in constructor 
    // to avoid crashes during SSR/SSG where indexedDB is not available.
  }

  private dbPromise: Promise<IDBDatabase> | null = null;

  private async initializeIndexedDB(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') {
        reject(new Error('indexedDB is not available (server-side render)'));
        return;
      }

      const request = indexedDB.open(this.STORAGE_KEYS.INDEXED_DB, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('memories')) {
          const store = db.createObjectStore('memories', { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('importance', 'importance', { unique: false });
          store.createIndex('tags', 'tags', { unique: false, multiEntry: true });
        }
        
        if (!db.objectStoreNames.contains('sessions')) {
          db.createObjectStore('sessions', { keyPath: 'id' });
        }
      };
    });

    return this.dbPromise;
  }

  private getSessionId(): string {
    let sessionId = localStorage.getItem(this.STORAGE_KEYS.SESSION);
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(this.STORAGE_KEYS.SESSION, sessionId);
    }
    return sessionId;
  }

  private compressContent(content: string): string {
    return content
      .replace(/\s+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  private calculateImportance(content: string, type: string): number {
    let importance = 1;
    
    if (type === 'user_message') importance += 2;
    if (type === 'ai_response') importance += 1;
    if (content.includes('important') || content.includes('remember')) importance += 2;
    if (content.includes('preference') || content.includes('like')) importance += 1;
    if (content.length > 200) importance += 1;
    
    return Math.min(importance, 10);
  }

  private extractTags(content: string): string[] {
    const tags: string[] = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('preference')) tags.push('preference');
    if (lowerContent.includes('remember')) tags.push('important');
    if (lowerContent.includes('example')) tags.push('example');
    if (lowerContent.includes('question')) tags.push('question');
    if (lowerContent.includes('code') || lowerContent.includes('function')) tags.push('technical');
    if (lowerContent.includes('help')) tags.push('help');
    
    return tags;
  }

  async storeMemory(
    content: string,
    type: MemoryEntry['type'],
    articleContext?: string
  ): Promise<void> {
    const entry: MemoryEntry = {
      id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: this.compressContent(content),
      timestamp: Date.now(),
      type,
      importance: this.calculateImportance(content, type),
      tags: this.extractTags(content),
      sessionId: this.getSessionId(),
      articleContext
    };

    try {
      await this.addToRecentMemory(entry);
      await this.addToIndexedDB(entry);
      await this.performMaintenance();
    } catch (error) {
    }
  }

  private async addToRecentMemory(entry: MemoryEntry): Promise<void> {
    const recent = this.getRecentMemory();
    recent.unshift(entry);
    
    const trimmed = recent.slice(0, this.MAX_RECENT_ENTRIES);
    localStorage.setItem(this.STORAGE_KEYS.RECENT, JSON.stringify(trimmed));
  }

  private getRecentMemory(): MemoryEntry[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.RECENT);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private async addToIndexedDB(entry: MemoryEntry): Promise<void> {
    const db = await this.initializeIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['memories'], 'readwrite');
      const store = transaction.objectStore('memories');
      const request = store.add(entry);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async retrieveMemories(
    query?: string,
    limit: number = 20,
    type?: MemoryEntry['type']
  ): Promise<MemoryEntry[]> {
    const recent = this.getRecentMemory();
    let filtered = recent;

    if (type) {
      filtered = filtered.filter(m => m.type === type);
    }

    if (query) {
      const queryLower = query.toLowerCase();
      filtered = filtered.filter(m => 
        m.content.toLowerCase().includes(queryLower) ||
        m.tags.some(tag => tag.includes(queryLower))
      );
    }

    filtered.sort((a, b) => {
      const scoreA = a.importance * 0.3 + (Date.now() - a.timestamp) / (1000 * 60 * 60) * 0.7;
      const scoreB = b.importance * 0.3 + (Date.now() - b.timestamp) / (1000 * 60 * 60) * 0.7;
      return scoreA - scoreB;
    });

    return filtered.slice(0, limit);
  }

  async searchMemories(query: string, limit: number = 10): Promise<MemoryEntry[]> {
    const queryLower = query.toLowerCase();
    
    // Search recent memories first
    const recent = this.getRecentMemory();
    const recentFiltered = recent.filter(memory => 
      memory.content.toLowerCase().includes(queryLower) ||
      memory.tags.some(tag => tag.includes(queryLower))
    );

    // Search IndexedDB memories
    const db = await this.initializeIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['memories'], 'readonly');
      const store = transaction.objectStore('memories');
      const request = store.getAll();
      
      request.onsuccess = () => {
        const allMemories = request.result as MemoryEntry[];
        
        const dbFiltered = allMemories
          .filter(memory => 
            memory.content.toLowerCase().includes(queryLower) ||
            memory.tags.some(tag => tag.includes(queryLower))
          )
          .map(memory => ({
            memory,
            score: this.calculateRelevanceScore(memory, query)
          }))
          .sort((a, b) => b.score - a.score)
          .map(item => item.memory);

        // Combine recent and DB memories, remove duplicates
        const allResults = [...recentFiltered, ...dbFiltered];
        const uniqueResults = allResults.filter((memory, index, self) => 
          index === self.findIndex(m => m.id === memory.id)
        );

        // Sort by relevance and limit
        const scored = uniqueResults
          .map(memory => ({
            memory,
            score: this.calculateRelevanceScore(memory, query)
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map(item => item.memory);
        
        resolve(scored);
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  private calculateRelevanceScore(memory: MemoryEntry, query: string): number {
    const queryLower = query.toLowerCase();
    const contentLower = memory.content.toLowerCase();
    
    let score = 0;
    
    if (contentLower.includes(queryLower)) {
      score += 5;
    }
    
    memory.tags.forEach(tag => {
      if (tag.includes(queryLower)) score += 3;
    });
    
    score += memory.importance;
    
    const hoursOld = (Date.now() - memory.timestamp) / (1000 * 60 * 60);
    score += Math.max(0, 10 - hoursOld / 24);
    
    return score;
  }

  async getMemoryStats(): Promise<MemoryStats> {
    const recent = this.getRecentMemory();
    const db = await this.initializeIndexedDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['memories'], 'readonly');
      const store = transaction.objectStore('memories');
      const request = store.getAll();
      
      request.onsuccess = () => {
        const allMemories = request.result as MemoryEntry[];
        const totalSize = JSON.stringify(allMemories).length;
        
        resolve({
          totalEntries: allMemories.length,
          totalSize,
          oldestEntry: Math.min(...allMemories.map(m => m.timestamp)),
          newestEntry: Math.max(...allMemories.map(m => m.timestamp))
        });
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  async clearMemory(type?: MemoryEntry['type']): Promise<void> {
    if (type) {
      const recent = this.getRecentMemory().filter(m => m.type !== type);
      localStorage.setItem(this.STORAGE_KEYS.RECENT, JSON.stringify(recent));
      
      const db = await this.initializeIndexedDB();
      const transaction = db.transaction(['memories'], 'readwrite');
      const store = transaction.objectStore('memories');
      const request = store.openCursor();
      
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          if (cursor.value.type === type) {
            cursor.delete();
          }
          cursor.continue();
        }
      };
    } else {
      localStorage.removeItem(this.STORAGE_KEYS.RECENT);
      
      const db = await this.initializeIndexedDB();
      const transaction = db.transaction(['memories'], 'readwrite');
      const store = transaction.objectStore('memories');
      store.clear();
    }
  }

  private async performMaintenance(): Promise<void> {
    const stats = await this.getMemoryStats();
    
    if (stats.totalSize > this.MAX_MEMORY_SIZE * this.CLEANUP_THRESHOLD) {
      await this.cleanupOldMemories();
    }
  }

  private async cleanupOldMemories(): Promise<void> {
    const db = await this.initializeIndexedDB();
    const transaction = db.transaction(['memories'], 'readwrite');
    const store = transaction.objectStore('memories');
    const request = store.getAll();
    
    request.onsuccess = () => {
      const allMemories = request.result as MemoryEntry[];
      const cutoffTime = Date.now() - (30 * 24 * 60 * 60 * 1000); // 30 days
      
      const toKeep = allMemories
        .filter(m => m.timestamp > cutoffTime || m.importance >= 7)
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 1000);
      
      store.clear();
      toKeep.forEach(memory => store.add(memory));
    };
  }

  async exportMemory(): Promise<string> {
    const recent = this.getRecentMemory();
    const db = await this.initializeIndexedDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['memories'], 'readonly');
      const store = transaction.objectStore('memories');
      const request = store.getAll();
      
      request.onsuccess = () => {
        const allMemories = request.result as MemoryEntry[];
        const exportData = {
          recent,
          archived: allMemories,
          exportDate: new Date().toISOString(),
          version: '1.0'
        };
        
        resolve(JSON.stringify(exportData, null, 2));
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  async importMemory(data: string): Promise<void> {
    try {
      const importData = JSON.parse(data);
      
      if (importData.recent) {
        localStorage.setItem(this.STORAGE_KEYS.RECENT, JSON.stringify(importData.recent));
      }
      
      if (importData.archived) {
        const db = await this.initializeIndexedDB();
        const transaction = db.transaction(['memories'], 'readwrite');
        const store = transaction.objectStore('memories');
        
        importData.archived.forEach((memory: MemoryEntry) => {
          store.add(memory);
        });
      }
    } catch (error) {
      throw new Error('Invalid memory data format');
    }
  }
}

export const memoryService = new MemoryService();
export type { MemoryEntry, MemoryStats };
