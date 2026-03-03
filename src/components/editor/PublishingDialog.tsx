import { useEffect, useRef } from 'react';
import styles from './PublishingDialog.module.css';

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

interface PublishingDialogProps {
  isOpen: boolean;
  logs: LogEntry[];
  onClose: () => void;
  status: 'idle' | 'publishing' | 'success' | 'failed';
}

export default function PublishingDialog({ isOpen, logs, onClose, status }: PublishingDialogProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isOpen) return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'publishing':
        return '⚡';
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '🚀';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'publishing':
        return 'Publishing...';
      case 'success':
        return 'Published Successfully';
      case 'failed':
        return 'Publishing Failed';
      default:
        return 'Ready to Publish';
    }
  };

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div className={styles.statusInfo}>
            <span className={styles.statusIcon}>{getStatusIcon()}</span>
            <h2 className={styles.statusText}>{getStatusText()}</h2>
          </div>
          <button 
            onClick={onClose}
            className={styles.closeButton}
            disabled={status === 'publishing'}
          >
            ×
          </button>
        </div>

        <div className={styles.logContainer} ref={logContainerRef}>
          <div className={styles.logHeader}>
            <span className={styles.logTitle}>Publishing Logs</span>
            <span className={styles.logCount}>{logs.length} entries</span>
          </div>
          
          <div className={styles.logs}>
            {logs.length === 0 ? (
              <div className={styles.emptyLogs}>
                <span className={styles.emptyIcon}>📝</span>
                <p>Waiting to start publishing...</p>
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className={styles.logEntry}>
                  <span className={styles.logTimestamp} style={{ color: getLogColor(log.type) }}>
                    [{log.timestamp}]
                  </span>
                  <span className={styles.logMessage} style={{ color: getLogColor(log.type) }}>
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.footer}>
          {status === 'success' && (
            <button className={styles.viewButton} onClick={onClose}>
              View Article
            </button>
          )}
          {status === 'failed' && (
            <button className={styles.retryButton} onClick={onClose}>
              Try Again
            </button>
          )}
          {status === 'idle' && (
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
