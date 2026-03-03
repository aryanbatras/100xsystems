import { LogLevel } from '../types';

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
}
