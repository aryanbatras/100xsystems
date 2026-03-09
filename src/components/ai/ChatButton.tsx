import { useState, useEffect } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import styles from './ChatButton.module.css';

interface ChatButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  unreadCount?: number;
}

export default function ChatButton({ isOpen, onToggle, unreadCount = 0 }: ChatButtonProps) {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Pulse animation when there are unread messages
    if (unreadCount > 0 && !isOpen) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount, isOpen]);

  return (
    <button
      onClick={onToggle}
      className={`${styles.chatButton} ${isOpen ? styles.open : ''} ${
        isPulsing ? styles.pulsing : ''
      }`}
      title={isOpen ? 'Close chat' : 'Open AI assistant'}
      aria-label={isOpen ? 'Close chat' : 'Open AI assistant'}
    >
      <div className={styles.buttonContent}>
        {isOpen ? (
          <FaTimes className={styles.icon} />
        ) : (
          <>
            <FaComments className={styles.icon} />
            {unreadCount > 0 && (
              <span className={styles.unreadBadge}>{unreadCount}</span>
            )}
          </>
        )}
      </div>
      
      <div className={styles.tooltip}>
        {isOpen ? 'Close chat' : 'Ask AI about this article'}
      </div>
    </button>
  );
}
