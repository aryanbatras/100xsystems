import { useState, useEffect, useRef } from 'react';
import styles from '../_styles/components/editor/LivePreview.module.css';

interface LivePreviewProps {
  content: string;
  isVisible: boolean;
  onClose: () => void;
  onRefreshQuill: () => void;
}

export default function LivePreview({ content, isVisible, onClose, onRefreshQuill }: LivePreviewProps) {
  const previewRef = useRef<HTMLPreElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (previewRef.current && content) {
      previewRef.current.textContent = content;
    }
  }, [content]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const delta = e.deltaY;
      
      // Prevent page scroll when preview has scrollable content
      const hasScrollableContent = scrollHeight > clientHeight;
      
      if (hasScrollableContent) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  if (!isVisible) return null;

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRefreshQuill = () => {
    if (onRefreshQuill) {
      onRefreshQuill();
    }
  };

  const handleCopyHTML = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
    }
  };

  return (
    <div className={`${styles.previewContainer} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.previewHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.previewIcon}>HTML</div>
          {/* <div className={styles.previewTitle}>Raw HTML Source</div> */}
          <div className={styles.contentLength}>{content.length} chars</div>
        </div>
        <div className={styles.headerRight}>
          <button 
            onClick={handleRefreshQuill}
            className={styles.refreshButton}
            title="Refresh Quill editor display"
          >
            REFRESH
          </button>
          <button 
            onClick={handleCopyHTML}
            className={styles.copyButton}
            title="Copy HTML code"
            disabled={!content}
          >
            {copied ? 'COPIED!' : 'COPY'}
          </button>
          <button 
            onClick={handleExpandToggle}
            className={styles.expandButton}
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? 'MIN' : 'MAX'}
          </button>
          <button 
            onClick={onClose}
            className={styles.closeButton}
            title="Close preview"
          >
            CLOSE
          </button>
        </div>
      </div>
      
      <div className={styles.previewContent} onWheel={handleWheel}>
        <pre className={styles.codeBlock}>
          <code ref={previewRef} className={styles.htmlCode}>
            {content || '<!-- Start typing to see HTML source code... -->'}
          </code>
        </pre>
      </div>
    </div>
  );
}
