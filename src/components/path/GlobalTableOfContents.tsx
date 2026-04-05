import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/components/path/GlobalTableOfContents.module.css';;

interface TocItem {
  id: string;
  title: string;
  level: number;
  children: TocItem[];
}

interface GlobalTableOfContentsProps {
  tocItems: TocItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  isVisible: boolean;
}

export const GlobalTableOfContents: React.FC<GlobalTableOfContentsProps> = ({ 
  tocItems, 
  activeSection, 
  onSectionClick,
  isVisible 
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    
    if (!contentRef.current) return;
    
    const currentScroll = contentRef.current.scrollTop;
    const newScrollTop = currentScroll + e.deltaY;
    const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
    
    contentRef.current.scrollTop = Math.max(0, Math.min(maxScroll, newScrollTop));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!tocRef.current) return;

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show when scrolled down 100px, hide when near bottom of content
      const scrollPercentage = (scrollPosition + viewportHeight) / documentHeight;
      const shouldShow = scrollPosition > 100 && scrollPercentage < 0.90; // Hide when 90% scrolled
      setIsSticky(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Removed auto-scrolling to prevent flickering and jittering
  // Users can now scroll manually for better UX

  const renderTocItem = (item: TocItem, depth: number = 0) => (
    <div key={item.id} className={styles.tocItem}>
      <button
        className={`${styles.tocLink} ${activeSection === item.id ? styles.active : ''}`}
        onClick={() => {
          onSectionClick(item.id);
        }}
        style={{ paddingLeft: `${depth * 1 + 0.5}rem` }}
        data-section-id={item.id}
        type="button"
      >
        {item.title}
      </button>
      {item.children.length > 0 && (
        <div className={styles.tocSublist}>
          {item.children.map(child => renderTocItem(child, depth + 1))}
        </div>
      )}
    </div>
  );

  if (!isVisible || tocItems.length === 0) return null;

  return (
    <div 
      ref={tocRef}
      className={`${styles.globalToc} ${isSticky ? styles.globalTocSticky : styles.globalTocHidden}`}
    >
      <div className={styles.globalTocContent} ref={contentRef} onWheel={handleWheel}>
        {tocItems.map(item => renderTocItem(item))}
      </div>
    </div>
  );
};
