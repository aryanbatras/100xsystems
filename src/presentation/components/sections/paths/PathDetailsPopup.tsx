import { X } from 'lucide-react';
import styles from '../../../_styles/components/sections/paths/PathDetailsPopup.module.css';

interface PathDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  path: {
    number: string;
    title: string;
    duration: string;
    description: string;
    features: string[];
    technologies: string[];
  } | null;
}

export default function PathDetailsPopup({ isOpen, onClose, path }: PathDetailsPopupProps) {
  if (!isOpen || !path) return null;

  const getBackgroundClass = () => {
    switch(path.title) {
      case 'Foundation':
        return 'foundation';
      case 'Advanced Systems':
        return 'advanced';
      case 'Engineering Mastery':
        return 'mastery';
      default:
        return 'foundation';
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={`${styles.popupContent} ${styles[getBackgroundClass()]}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className={styles.popupInnerContent}>
          <div className={styles.popupHeader}>
            <div className={styles.popupNumber}>{path.number}</div>
            <h2 className={styles.popupTitle}>{path.title}</h2>
            <div className={styles.popupDuration}>{path.duration}</div>
          </div>
          
          <div className={styles.popupDescription}>
            <p>{path.description}</p>
          </div>
          
          <div className={styles.popupSection}>
            <h3 className={styles.sectionTitle}>What You'll Learn</h3>
            <div className={styles.featuresList}>
              {path.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.popupSection}>
            <h3 className={styles.sectionTitle}>Technologies You'll Master</h3>
            <div className={styles.techGrid}>
              {path.technologies.map((tech, index) => (
                <div key={index} className={styles.techItem}>
                  {tech}
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.popupActions}>
            <button className={styles.primaryButton}>
              Start Your Journey
            </button>
            <button className={styles.secondaryButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
