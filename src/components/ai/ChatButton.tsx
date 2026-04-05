import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaComments, FaTimes } from 'react-icons/fa';
import styles from '../../styles/components/ai/ChatButton.module.css';;
import { ArticleRouteDialog } from './ArticleRouteDialog';

interface ChatButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  unreadCount?: number;
}

export default function ChatButton({ isOpen, onToggle, unreadCount = 0 }: ChatButtonProps) {
  const router = useRouter();
  const [isPulsing, setIsPulsing] = useState(false);
  const [showRouteDialog, setShowRouteDialog] = useState(false);

  useEffect(() => {
    // Pulse animation when there are unread messages
    if (unreadCount > 0 && !isOpen) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount, isOpen]);

  const handleChatClick = () => {
    // Check if current route is /articles sub-route but not /articles itself
    const isArticlesSubRoute = router.pathname.startsWith('/articles/') && router.pathname !== '/articles';
    
    if (isArticlesSubRoute) {
      onToggle();
    } else {
      setShowRouteDialog(true);
    }
  };

  return (
    <>
    <button
      onClick={handleChatClick}
      className={`${styles.chatButton} ${isOpen ? styles.open : ''} ${
        isPulsing ? styles.pulsing : ''
      }`}
      title={isOpen ? 'Close chat' : 'Ask AI'}
      aria-label={isOpen ? 'Close chat' : 'Ask AI'}
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
        {isOpen ? 'Close chat' : 'Ask AI'}
      </div>
    </button>
    
    <ArticleRouteDialog
      isOpen={showRouteDialog}
      onClose={() => setShowRouteDialog(false)}
    />
    </>
  );
}
