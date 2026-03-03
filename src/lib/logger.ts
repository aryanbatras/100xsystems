export type LogLevel = 'info' | 'success' | 'error' | 'warning';

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: LogLevel;
}

class SimpleLogger {
  private logs: LogEntry[] = [];

  log(message: string, type: LogLevel = 'info') {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      message,
      type
    };
    
    this.logs.push(newLog);
  }

  clear() {
    this.logs = [];
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }
}

const logger = new SimpleLogger();

export const log = (message: string, type: LogLevel = 'info') => {
  logger.log(message, type);
};

export const clearLogs = () => {
  logger.clear();
};

export const getLogs = () => {
  return logger.getLogs();
};
