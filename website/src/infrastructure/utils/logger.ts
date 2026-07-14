import { LogLevel, LogEntry } from '../../application/types/shared.types';
import { DateUtils } from './dateUtils';

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;

  log(message: string, type: LogLevel = 'info'): void {
    const newLog: LogEntry = {
      id: DateUtils.generateUniqueId(),
      timestamp: DateUtils.getCurrentTimestamp(),
      message,
      type
    };
    
    this.logs.push(newLog);
    
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
    
    this.consoleLog(newLog);
  }

  private consoleLog(log: LogEntry): void {
    const prefix = this.getPrefix(log.type);
    const message = `${prefix} ${log.message}`;
    
    switch (log.type) {
      case 'error':
        break;
      case 'warning':
        break;
      case 'success':
        break;
      default:
    }
  }

  private getPrefix(type: LogLevel): string {
    const timestamp = new Date().toLocaleTimeString();
    switch (type) {
      case 'error':
        return `[${timestamp}] ❌`;
      case 'warning':
        return `[${timestamp}] ⚠️`;
      case 'success':
        return `[${timestamp}] ✅`;
      default:
        return `[${timestamp}] ℹ️`;
    }
  }

  clear(): void {
    this.logs = [];
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getLogsByType(type: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.type === type);
  }

  getRecentLogs(count: number = 50): LogEntry[] {
    return this.logs.slice(-count);
  }
}

export const logger = new Logger();
export const log = (message: string, type: LogLevel = 'info') => logger.log(message, type);
export const clearLogs = () => logger.clear();
export const getLogs = () => logger.getLogs();
export const getRecentLogs = (count?: number) => logger.getRecentLogs(count);
