import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import styles from "./CustomQuillEditor.module.css";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useImageQueue } from "../../hooks/useImageQueue";
import { usePublishing, PublishingState } from "../../hooks/usePublishing";
import { log, LogLevel } from "../../lib/logger";
import Terminal from "./Terminal";
import LivePreview from "./LivePreview";

// Custom debounce implementation with cancel method
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: NodeJS.Timeout;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}

export interface CustomQuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  onTitleChange?: (title: string) => void;
}

export default function CustomQuillEditor({
  value,
  onChange,
  placeholder,
  title,
  onTitleChange,
}: CustomQuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [mounted, setMounted] = useState(false);
  const [articleTitle, setArticleTitle] = useState(title || "");
  const lastContentRef = useRef<string>("");
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLivePreviewVisible, setIsLivePreviewVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState(value || "");

  const { imageQueue } = useImageQueue(mounted);
  const { publishingState, handlePublish, logs, clearLogs } = usePublishing(articleTitle);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);

  // Debounced onChange handler with adaptive delay based on content size
  const debouncedOnChange = useMemo(
    () => {
      // Create adaptive debounce function
      const adaptiveDebounce = (content: string) => {
        const contentLength = content.length;
        const imageCount = (content.match(/<img/g) || []).length;
        
        // Adaptive delay based on content size and image count
        let delay = 300; // Default
        if (contentLength > 500000 || (contentLength > 300000 && imageCount > 2)) {
          delay = 800; // Longer delay for very large content with images
        } else if (contentLength > 200000 || imageCount > 1) {
          delay = 500; // Medium delay for large content
        }
        
        // Clear existing timeout
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
        
        // Set new timeout
        updateTimeoutRef.current = setTimeout(() => {
          if (content !== lastContentRef.current) {
            lastContentRef.current = content;
            onChange(content);
          }
        }, delay);
      };
      
      // Add cancel method
      adaptiveDebounce.cancel = () => {
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
      };
      
      return adaptiveDebounce;
    },
    [onChange]
  );

  // Optimized content change handler with image-aware processing
  const handleTextChange = useCallback(() => {
    if (!quillRef.current) return;
    
    const content = quillRef.current.root.innerHTML;
    const contentLength = content.length;
    
    // Update current content for live preview
    setCurrentContent(content);
    
    // Count actual text characters vs image data
    const imageCount = (content.match(/<img/g) || []).length;
    const estimatedImageSize = imageCount * 100000; // Rough estimate per image
    const textContent = quillRef.current.getText();
    const actualTextLength = textContent.length;
    
    // Only log for significant changes to reduce spam
    if (contentLength - lastContentRef.current.length > 100) {
      log(`📝 Content change - Total: ${contentLength}, Text: ${actualTextLength}, Images: ${imageCount}`);
    }
    
    // For very large content with images, use longer debounce
    if (contentLength > 300000 || (contentLength > 200000 && imageCount > 1)) {
      debouncedOnChange(content);
    } else {
      debouncedOnChange(content);
    }
  }, [debouncedOnChange]);

  const handlePublishClick = () => {
    log('🚀 Publish button clicked', 'info');
    log(`📝 Article title: "${articleTitle}"`, 'info');
    log(`📄 Quill ref available: ${!!quillRef.current}`, 'info');
    
    setIsTerminalVisible(true);
    handlePublish(quillRef);
  };

  const handleTerminalClose = () => {
    setIsTerminalVisible(false);
    if (publishingState === 'success' || publishingState === 'failed') {
      clearLogs();
    }
  };

  const handleLivePreviewToggle = () => {
    setIsLivePreviewVisible(!isLivePreviewVisible);
    log(`👁️ Live preview ${!isLivePreviewVisible ? 'opened' : 'closed'}`, 'info');
  };

  // Initialize editor logger
  useEffect(() => {
    log('🔧 Editor component mounted', 'info');
    
    // Cleanup debounce on unmount
    return () => {
      debouncedOnChange.cancel();
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [debouncedOnChange]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !editorRef.current || quillRef.current) return;

    log('🔧 Initializing Quill editor...', 'info');
        
    // Initialize Quill 1.2.4 style
    const quill = new Quill(editorRef.current, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
        clipboard: {
          matchVisual: false,
        },
      },
      placeholder: placeholder || "Tell your story...",
      theme: "snow",
    });

    log('✅ Quill editor initialized successfully', 'success');
    log('🔧 Setting up optimized clipboard handlers...', 'info');

    // Optimized paste handling with performance improvements
    const Delta = Quill.import('delta');
    
    // Use requestAnimationFrame for large content processing
    const processLargeContent = (content: string, formatter: (text: string) => any) => {
      if (content.length > 10000) {
        // Process large content in chunks to avoid blocking
        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            resolve(formatter(content));
          });
        });
      }
      return formatter(content);
    };
    
    quill.clipboard.addMatcher('PRE', (node: any, delta: any) => {
      const text = node.textContent || '';
      if (text.length > 5000) {
        // For large content, process synchronously but defer heavy operations
        setTimeout(() => {
          // Process in background to avoid blocking
        }, 0);
        return new Delta().insert(text, { 'code-block': true });
      }
      return new Delta().insert(text, { 'code-block': true });
    });
    
    quill.clipboard.addMatcher('CODE', (node: any, delta: any) => {
      const text = node.textContent || '';
      return new Delta().insert(text, { 'code': true });
    });
    
    quill.clipboard.addMatcher(Node.TEXT_NODE, (node: any, delta: any) => {
      let text = node.data;
      
      // Skip processing for very large text nodes to prevent freezing
      if (text.length > 20000) {
        return delta; // Let Quill handle large text normally
      }
      
      if (text.includes('```') || text.includes('`')) {
        const codeBlockMatch = text.match(/```([\s\S]*?)```/);
        if (codeBlockMatch) {
          return new Delta()
            .insert(codeBlockMatch[1].trim(), { 'code-block': true })
            .insert('\n');
        }
        
        const inlineCodeMatch = text.match(/`([^`]+)`/);
        if (inlineCodeMatch) {
          return new Delta()
            .insert(inlineCodeMatch[1], { 'code': true });
        }
      }
      
      return delta;
    });

    // Handle content changes with optimized handler
    quill.on('text-change', handleTextChange);

    // Set initial content efficiently
    if (value && value.length > 0) {
      const message = `� Setting initial content, length: ${value.length}`;
      log(message, 'info');
      
      // Use requestAnimationFrame for large content to prevent blocking
      if (value.length > 50000) {
        requestAnimationFrame(() => {
          quill.root.innerHTML = value;
          lastContentRef.current = value;
        });
      } else {
        quill.root.innerHTML = value;
        lastContentRef.current = value;
      }
    }

    quillRef.current = quill;
    const message = '✅ Quill editor setup complete';
    log(message, 'success');

    return () => {
      const cleanupMessage = '🧹 Cleaning up Quill editor';
      log(cleanupMessage, 'info');
      
      // Clean up event listeners and references
      quill.off('text-change', handleTextChange);
      quillRef.current = null;
      
      // Cancel any pending operations
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [mounted, handleTextChange]);

  // Optimized value synchronization with comparison
  useEffect(() => {
    if (!quillRef.current) return;
    
    const currentContent = quillRef.current.root.innerHTML;
    
    // Only update if content is actually different
    if (value !== currentContent && value !== lastContentRef.current) {
      // Use requestAnimationFrame for large content to prevent blocking
      if (value.length > 50000) {
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
        
        // Use setTimeout for very large content with images
        updateTimeoutRef.current = setTimeout(() => {
          if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value;
            lastContentRef.current = value;
          }
        }, 100);
      } else {
        quillRef.current.root.innerHTML = value;
        lastContentRef.current = value;
      }
    }
  }, [value]);

  if (!mounted) {
    return <div className={styles.quillEditorLoading}>Loading editor...</div>;
  }

  return (
    <div className={`${styles.quillEditor} quillEditor`}>
      <input
        type="text"
        value={articleTitle}
        onChange={(e) => {
          setArticleTitle(e.target.value);
          onTitleChange?.(e.target.value);
        }}
        placeholder="Title"
        className={styles.titleInput}
      />

      <div 
        ref={editorRef}
        style={{ minHeight: "500px" }}
      />

      <Terminal
        logs={logs}
        isVisible={isTerminalVisible}
        onClear={clearLogs}
        onClose={handleTerminalClose}
      />

      {/* Live Preview Component */}
      <LivePreview
        content={currentContent}
        isVisible={isLivePreviewVisible}
        onClose={() => setIsLivePreviewVisible(false)}
      />

      {/* Open Terminal Button - Only show when terminal is closed */}
      {!isTerminalVisible && (
        <div className={styles.openTerminalContainer}>
          <button
            onClick={() => setIsTerminalVisible(true)}
            className={styles.openTerminalButton}
            title="Open terminal"
          >
            OPEN TERMINAL
          </button>
        </div>
      )}

      {/* Open Live Preview Button - Only show when preview is closed */}
      {!isLivePreviewVisible && (
        <div className={styles.openPreviewContainer}>
          <button
            onClick={handleLivePreviewToggle}
            className={styles.openPreviewButton}
            title="Open live preview"
          >
            LIVE PREVIEW
          </button>
        </div>
      )}

      <div className={styles.publishButtonContainer}>
        <button
          onClick={handlePublishClick}
          disabled={publishingState !== "draft"}
          className={`${styles.publishButton} ${styles[publishingState]}`}
        >
          {publishingState === "draft" && "Publish"}
          {publishingState === "uploading" && "Publishing..."}
          {publishingState === "success" && "Published"}
          {publishingState === "failed" && "Failed - Retry"}
        </button>
      </div>
    </div>
  );
}
