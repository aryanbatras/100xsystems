import { LogLevel } from '../../application/types/shared.types';

export class DateUtils {
  private static isClientSide(): boolean {
    return typeof window !== 'undefined';
  }

  static getCurrentDate(): string {
    if (this.isClientSide()) {
      return new Date().toISOString().split('T')[0];
    }
    
    if (typeof global !== 'undefined' && global.Date) {
      return new global.Date().toISOString().split('T')[0];
    }
    
    return new Date().toISOString().split('T')[0];
  }

  static getCurrentTimestamp(): string {
    if (this.isClientSide()) {
      return new Date().toISOString();
    }
    
    if (typeof global !== 'undefined' && global.Date) {
      return new global.Date().toISOString();
    }
    
    return new Date().toISOString();
  }

  static generateUniqueId(): string {
    const timestamp = this.isClientSide() ? Date.now() : 
                     (typeof global !== 'undefined' && global.Date ? global.Date.now() : Date.now());
    
    return `${timestamp}-${Math.random().toString(36).substring(2, 9)}`;
  }

  static formatDuration(milliseconds: number): string {
    if (milliseconds < 1000) {
      return `${milliseconds}ms`;
    } else if (milliseconds < 60000) {
      return `${(milliseconds / 1000).toFixed(1)}s`;
    } else {
      return `${(milliseconds / 60000).toFixed(1)}m`;
    }
  }

  // SSR-safe date formatting for display
  static formatDateForDisplay(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (this.isClientSide()) {
      // Client-side: Use user's locale
      return dateObj.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
      });
    } else {
      // Server-side: Use consistent format (UTC)
      return dateObj.toDateString();
    }
  }

  // SSR-safe time formatting for display
  static formatTimeForDisplay(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (this.isClientSide()) {
      // Client-side: Use user's locale
      return dateObj.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        ...options
      });
    } else {
      // Server-side: Use consistent format (UTC)
      return dateObj.toUTCString().split(' ')[4];
    }
  }

  // SSR-safe relative time (prevents hydration mismatches)
  static getRelativeTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hour${Math.floor(diffMins / 60) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffMins / 1440)} day${Math.floor(diffMins / 1440) > 1 ? 's' : ''} ago`;
  }

  // Get consistent timestamp for logs (SSR-safe)
  static getLogTimestamp(): string {
    // Always use UTC for consistency between server and client
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19);
  }

  // Check if we're in hydration phase
  static isHydrating(): boolean {
    return !this.isClientSide() || (typeof window !== 'undefined' && !window.document);
  }
}
