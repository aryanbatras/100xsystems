import { useState, useEffect, useRef } from 'react';
import styles from './Terminal.module.css';

export interface TerminalLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

interface TerminalProps {
  logs: TerminalLog[];
  isVisible: boolean;
  onClear: () => void;
  onClose: () => void;
}

export default function Terminal({ logs, isVisible, onClear, onClose }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    if (terminalRef.current && logs.length > 0 && !isUserScrolling) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, isUserScrolling]);

  const handleScroll = () => {
    if (terminalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = terminalRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsUserScrolling(!isAtBottom);
    }
  };

  const scrollToTop = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = 0;
      setIsUserScrolling(true);
    }
  };

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      setIsUserScrolling(false);
    }
  };

  if (!isVisible) return null;

  const getLogIcon = (type: TerminalLog['type']) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getLogColor = (type: TerminalLog['type']) => {
    switch (type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  };

  const copyLogsToClipboard = () => {
    const logsText = logs.map(log => 
      `[${log.timestamp}] ${getLogIcon(log.type)} ${log.message}`
    ).join('\n');
    
    navigator.clipboard.writeText(logsText).then(() => {
      // Show a brief success indication
      const originalTitle = document.title;
      document.title = '📋 Logs copied!';
      setTimeout(() => {
        document.title = originalTitle;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy logs:', err);
    });
  };

  return (
    <div className={`${styles.terminalContainer} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.terminalHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.terminalIcon}>TERM</div>
          <div className={styles.terminalTitle}>Publishing Terminal</div>
          <div className={styles.logCount}>{logs.length} logs</div>
        </div>
        <div className={styles.headerRight}>
          <button 
            onClick={copyLogsToClipboard}
            className={styles.copyButton}
            title="Copy all logs"
            disabled={logs.length === 0}
          >
            COPY
          </button>
          <button 
            onClick={onClear}
            className={styles.clearButton}
            title="Clear logs"
            disabled={logs.length === 0}
          >
            CLEAR
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.expandButton}
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? 'MIN' : 'MAX'}
          </button>
          <button 
            onClick={onClose}
            className={styles.closeButton}
            title="Close terminal"
          >
            CLOSE
          </button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className={styles.terminalContent}
        onScroll={handleScroll}
      >
        {/* Always Visible Overlay Navigation Buttons */}
        <div className={styles.scrollOverlay}>
          <button
            onClick={scrollToTop}
            className={styles.scrollButton}
            title="Scroll to top"
          >
            ↑
          </button>
          <button
            onClick={scrollToBottom}
            className={styles.scrollButton}
            title="Scroll to bottom"
          >
            ↓
          </button>
        </div>

        {logs.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>LOG</div>
            <div className={styles.emptyText}>Waiting for publishing logs...</div>
            <div className={styles.emptySubtext}>Click "Publish" to see detailed logs here</div>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={styles.logEntry}>
              <span className={styles.logTimestamp}>[{log.timestamp}]</span>
              <span 
                className={styles.logIcon}
                style={{ color: getLogColor(log.type) }}
              >
                {getLogIcon(log.type)}
              </span>
              <span className={styles.logMessage}>{log.message}</span>
            </div>
          ))
        )}
        
        {logs.length > 0 && (
          <div className={styles.terminalCursor}>
            <span className={styles.cursorBlink}>█</span>
          </div>
        )}
      </div>
    </div>
  );
}
