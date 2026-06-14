import React from 'react';
import { useRouter } from 'next/router';
import { FaRobot, FaBookOpen, FaArrowRight } from 'react-icons/fa';
import styles from '../_styles/components/ai/ArticleRouteDialog.module.css';;

interface ArticleRouteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleRouteDialog: React.FC<ArticleRouteDialogProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleVisitArticles = () => {
    router.push('/articles');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>AI Chat</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.iconSection}>
            <div className={styles.robotIcon}>
              <FaRobot />
            </div>
          </div>
          
          <div className={styles.textSection}>
            <h3 className={styles.messageTitle}>
              AI Chat Works with Articles
            </h3>
            <p className={styles.message}>
              Visit our articles section to experience AI-powered learning assistance. Get personalized answers and enhance your understanding of complex topics.
            </p>
          </div>
          
          <div className={styles.featuresSection}>
            <div className={styles.featureItem}>
              <FaBookOpen className={styles.featureIcon} />
              <span>Context-aware responses</span>
            </div>
            <div className={styles.featureItem}>
              <FaRobot className={styles.featureIcon} />
              <span>Personalized learning</span>
            </div>
          </div>
          
          <div className={styles.actionSection}>
            <button
              onClick={handleVisitArticles}
              className={styles.visitButton}
            >
              <span>Visit Articles</span>
              <FaArrowRight className={styles.buttonIcon} />
            </button>
            
            <button
              onClick={onClose}
              className={styles.cancelButton}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
