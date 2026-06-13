import React, { useState } from 'react';
import styles from '../../_styles/components/path/TableOfContents.module.css';;

interface TocItem {
  id: string;
  title: string;
  level: number;
  children: TocItem[];
}

interface TableOfContentsProps {
  tocItems: TocItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  isMobile?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  tocItems, 
  activeSection, 
  onSectionClick,
  isMobile = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderTocItem = (item: TocItem, depth: number = 0) => (
    <li key={item.id} className={styles.tocItem}>
      <button
        className={`${styles.tocLink} ${item.children.length > 0 ? styles.bold : ''}`}
        onClick={() => onSectionClick(item.id)}
        style={{ paddingLeft: `${depth * 1.75 + 0.5}rem` }}
      >
        {item.title}
      </button>
      {item.children.length > 0 && (
        <ul className={styles.tocSublist}>
          {item.children.map(child => renderTocItem(child, depth + 1))}
        </ul>
      )}
    </li>
  );

  if (!isMobile) {
    return null;
  }

  return (
    <div className={styles.mobileToc}>
      <button 
        className={styles.mobileTocTitle}
        onClick={() => setIsOpen(!isOpen)}
      >
        Contents
        <span style={{ 
          fontSize: '0.75rem',
          marginLeft: '0.5rem',
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>▼</span>
      </button>
      
      {isOpen && (
        <div className={styles.mobileTocContainer}>
          <nav className={styles.mobileToc}>
            <ul className={styles.tocList}>
              {tocItems.map(item => renderTocItem(item))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
