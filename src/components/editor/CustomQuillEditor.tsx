import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import styles from "./CustomQuillEditor.module.css";
import "react-quill-new/dist/quill.bubble.css";
import ReactQuill from "react-quill-new";
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
  const quillRef = useRef<ReactQuill>(null);
  const [mounted, setMounted] = useState(false);
  const [articleTitle, setArticleTitle] = useState(title || "");
  const lastContentRef = useRef<string>("");
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLivePreviewVisible, setIsLivePreviewVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState(value || "");

  const { imageQueue } = useImageQueue(mounted);
  const { publishingState, handlePublish, logs, clearLogs } = usePublishing(articleTitle);
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [isContainerMode, setIsContainerMode] = useState(true);

  // Handle wheel events for smooth scrolling in editor container
  const handleEditorWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Only handle custom scrolling in container mode
    if (!isContainerMode) return;
    
    const editorContainer = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = editorContainer;
    const delta = e.deltaY;
    
    // Check if container has scrollable content
    const hasScrollableContent = scrollHeight > clientHeight;
    
    if (hasScrollableContent) {
      // Prevent page scroll when editor container can scroll
      e.preventDefault();
      e.stopPropagation();
      
      // Manual scroll implementation
      const newScrollTop = scrollTop + delta;
      editorContainer.scrollTop = Math.max(0, Math.min(newScrollTop, scrollHeight - clientHeight));
    }
  };

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
  const handleTextChange = useCallback((content: string, delta: any, source: string, editor: any) => {
    if (!editor) return;
    
    const contentLength = content.length;
    
    // Update current content for live preview
    setCurrentContent(content);
    
    // Count actual text characters vs image data
    const imageCount = (content.match(/<img/g) || []).length;
    const estimatedImageSize = imageCount * 100000; // Rough estimate per image
    const textContent = editor.getText();
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

  const refreshQuillDisplay = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const currentContent = editor.root.innerHTML;
      log('🔄 Refreshing Quill editor display', 'info');
      
      // Force Quill to re-render by clearing and re-setting content
      editor.setText('');
      
      // Use requestAnimationFrame to ensure smooth refresh
      requestAnimationFrame(() => {
        if (quillRef.current) {
          const editorRef = quillRef.current.getEditor();
          editorRef.root.innerHTML = currentContent;
          log('✅ Quill editor refreshed', 'success');
        }
      });
    }
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

  // ReactQuill modules configuration
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"], ["table"],
    ],
    clipboard: {
      matchVisual: false,
      // Add our matchers at the module level to ensure they're processed first
      matchers: [
        ['TABLE', (node: Node, delta: any, scroll: any) => {
          console.log('🔍 TABLE matcher triggered!', { node, delta, scroll });
          const htmlContent = (node as HTMLElement).innerHTML;
          console.log('🔍 Extracted HTML:', htmlContent);
          
          // Use Quill's clipboard to convert HTML to Delta
          const Quill = ReactQuill.Quill;
          const Delta = Quill.import('delta');
          const Clipboard = Quill.import('modules/clipboard') as any;
          
          // Create a temporary clipboard instance and use its convert method
          const tempContainer = document.createElement('div');
          const tempEditor = new Quill(tempContainer);
          const tempClipboard = new Clipboard(tempEditor, {});
          
          // Use the clipboard's convert method directly (not onPaste)
          const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
          
          console.log('📋 Converted Delta:', convertedDelta);
          return new Delta(convertedDelta.ops).concat(new Delta().insert('\n\n'));
        }],
        ['TR', (node: Node, delta: any, scroll: any) => {
          console.log('🔍 TR matcher triggered!', { node, delta, scroll });
          const htmlContent = (node as HTMLElement).innerHTML;
          console.log('🔍 TR HTML:', htmlContent);
          
          // Use Quill's clipboard to convert HTML to Delta
          const Quill = ReactQuill.Quill;
          const Delta = Quill.import('delta');
          const Clipboard = Quill.import('modules/clipboard') as any;
          
          // Create a temporary clipboard instance and use its convert method
          const tempContainer = document.createElement('div');
          const tempEditor = new Quill(tempContainer);
          const tempClipboard = new Clipboard(tempEditor, {});
          
          // Use the clipboard's convert method directly (not onPaste)
          const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
          
          console.log('📋 Converted Delta:', convertedDelta);
          return new Delta(convertedDelta.ops).concat(new Delta().insert('\n'));
        }],
        ['TD', (node: Node, delta: any, scroll: any) => {
          console.log('🔍 TD matcher triggered!', { node, delta, scroll });
          const htmlContent = (node as HTMLElement).innerHTML;
          console.log('🔍 TD HTML:', htmlContent);
          
          // Use Quill's clipboard to convert HTML to Delta
          const Quill = ReactQuill.Quill;
          const Delta = Quill.import('delta');
          const Clipboard = Quill.import('modules/clipboard') as any;
          
          // Create a temporary clipboard instance and use its convert method
          const tempContainer = document.createElement('div');
          const tempEditor = new Quill(tempContainer);
          const tempClipboard = new Clipboard(tempEditor, {});
          
          // Use the clipboard's convert method directly (not onPaste)
          const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
          
          console.log('📋 Converted Delta:', convertedDelta);
          return new Delta(convertedDelta.ops).concat(new Delta().insert(' | '));
        }],
        ['TH', (node: Node, delta: any, scroll: any) => {
          console.log('🔍 TH matcher triggered!', { node, delta, scroll });
          const htmlContent = (node as HTMLElement).innerHTML;
          console.log('🔍 TH HTML:', htmlContent);
          
          // Use Quill's clipboard to convert HTML to Delta
          const Quill = ReactQuill.Quill;
          const Delta = Quill.import('delta');
          const Clipboard = Quill.import('modules/clipboard') as any;
          
          // Create a temporary clipboard instance and use its convert method
          const tempContainer = document.createElement('div');
          const tempEditor = new Quill(tempContainer);
          const tempClipboard = new Clipboard(tempEditor, {});
          
          // Use the clipboard's convert method directly (not onPaste)
          const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
          
          console.log('📋 Converted Delta:', convertedDelta);
          return new Delta(convertedDelta.ops).concat(new Delta().insert(' | '));
        }]
      ]
    },
  }), []);

  // Enhanced clipboard handlers for ReactQuill
  useEffect(() => {
    if (!mounted || !quillRef.current) return;

    console.log('🔧 Setting up clipboard handlers...');
    const editor = quillRef.current.getEditor();
    console.log('📝 Editor instance:', editor);
    console.log('📝 Editor clipboard:', editor.clipboard);
    
    const Quill = ReactQuill.Quill;
    const Delta = Quill.import('delta');
    console.log('📝 Quill instance:', Quill);
    console.log('📝 Delta class:', Delta);
    
    // Test paste event listener - multiple approaches
    console.log('🔧 Adding paste event listeners...');
    
    // 1. Direct paste on editor root
    editor.root.addEventListener('paste', (e) => {
      console.log('🔍 Paste event detected on root!', e);
      console.log('🔍 Clipboard data:', e.clipboardData);
      console.log('🔍 Paste data types:', e.clipboardData?.types);
      console.log('🔍 Paste HTML:', e.clipboardData?.getData('text/html'));
      console.log('🔍 Paste text:', e.clipboardData?.getData('text/plain'));
    });
    
    // 2. Paste on document
    document.addEventListener('paste', (e) => {
      console.log('🔍 Global paste event detected!', e);
      if (e.target && editor.root.contains(e.target as Node)) {
        console.log('🔍 Paste happened inside editor!');
      }
    });
    
    // 3. Monitor text-change for paste detection
    let lastLength = 0;
    editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
      const currentLength = editor.getText().length;
      if (source === 'user' && currentLength > lastLength + 100) {
        console.log('🔍 Large text change detected (possible paste)', { delta, oldDelta, source, currentLength, lastLength });
        console.log('🔍 Current editor content:', editor.root.innerHTML);
      }
      lastLength = currentLength;
    });
    
    // 4. Check if matchers are actually called
    console.log('🔧 Testing matcher registration...');
    console.log('📝 Matchers array:', editor.clipboard.matchers);
    console.log('📝 Matcher count:', editor.clipboard.matchers.length);
    
    // Log each matcher
    editor.clipboard.matchers.forEach((matcher: any, index: number) => {
      console.log(`📝 Matcher ${index}:`, matcher[0], typeof matcher[1]);
    });

    log('✅ Enhanced clipboard handlers setup complete', 'success');
  }, [mounted]);

  // Optimized value synchronization with comparison - ReactQuill handles this automatically
  // This effect is only needed for additional logging and performance tracking
  useEffect(() => {
    if (!quillRef.current) return;
    
    const editor = quillRef.current.getEditor();
    const currentContent = editor.root.innerHTML;
    
    // Only log for significant content changes
    if (value !== currentContent && value !== lastContentRef.current && value.length > 100) {
      log(`📝 Value prop changed - New length: ${value.length}`);
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

      {/* Scrollable Editor Container */}
      <div 
        className={`${styles.editorContainer} ${isContainerMode ? styles.containerMode : styles.fullPageMode}`}
        onWheel={handleEditorWheel}
      >
        <ReactQuill
          ref={quillRef}
          theme="bubble"
          value={value}
          onChange={handleTextChange}
          modules={modules}
          placeholder={placeholder || " "}
          style={{ minHeight: "500px" }}
        />
      </div>

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
        onRefreshQuill={refreshQuillDisplay}
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

      {/* View Mode Toggle Button */}
      <div className={styles.viewModeContainer}>
        <button
          onClick={() => setIsContainerMode(!isContainerMode)}
          className={styles.viewModeButton}
          title={isContainerMode ? "Switch to full page view" : "Switch to container view"}
        >
          {isContainerMode ? "FULL PAGE" : "CONTAINER"}
        </button>
      </div>

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
