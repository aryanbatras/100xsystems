'use client';

import { log } from '../../infrastructure/utils/logger';
import { useImageQueue, usePublishing, useArticleUpdate } from '../../application/hooks';
import { PublishingState } from '../../application/types/shared.types';
import { ArticleUpdater } from '../../infrastructure/articleUpdater';
import quillEditorStyles from '../_styles/editor-customquilleditor.module.css';
import livePreviewStyles from '../_styles/editor-livepreview.module.css';
import terminalStyles from '../_styles/editor-terminal.module.css';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
/**
 * ## Editor
 *
 * Merged feature module for the editor domain.
 * Contains all components, sub-components, hooks, and types.
 *
 * @packageDocumentation
 * @module editor
 */

;

import "react-quill-new/dist/quill.bubble.css";
import type { LogLevel } from "../../application/types/shared.types";


// ============================================================
// editor/CustomQuillEditor.tsx
// ============================================================
export interface CustomQuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  onTitleChange?: (title: string) => void;
  mode?: 'create' | 'edit' | 'parser';
  onSave?: (quillRef: any) => void;
  saveState?: PublishingState;
  isSaving?: boolean;
  saveResult?: { success: boolean; url?: string; error?: string } | null;
  onResetSave?: () => void;
  titleReadOnly?: boolean;
}

export function CustomQuillEditor({
  value,
  onChange,
  placeholder,
  title,
  onTitleChange,
  mode = 'create',
  onSave,
  saveState,
  isSaving = false,
  saveResult,
  onResetSave,
  titleReadOnly = false,
}: CustomQuillEditorProps) {
  const quillRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const [articleTitle, setArticleTitle] = useState(title || "");
  const lastContentRef = useRef<string>("");
  const [isLivePreviewVisible, setIsLivePreviewVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState(value || "");

  const { imageQueue } = useImageQueue(mounted);
  const { publishingState, handlePublish, logs, clearLogs } = usePublishing(articleTitle);
  const { updateState, handleUpdate, updateResult, resetUpdateState } = useArticleUpdate({
    slug: articleTitle.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim(),
    title: articleTitle
  });
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


  // Optimized content change handler
  const handleTextChange = useCallback((content: string, delta: any, source: string, editor: any) => {
    if (!editor) return;
    
    const contentLength = content.length;
    
    // Update current content for live preview
    setCurrentContent(content);
    
    // Count actual text characters vs image data
    const imageCount = (content.match(/<img/g) || []).length;
    const textContent = editor.getText();
    const actualTextLength = textContent.length;
    
    // Only log for significant changes to reduce spam
    if (contentLength - lastContentRef.current.length > 100) {
      log(`📝 Content change - Total: ${contentLength}, Text: ${actualTextLength}, Images: ${imageCount}`);
    }
    
    // Direct update without debouncing
    if (content !== lastContentRef.current) {
      lastContentRef.current = content;
      onChange(content);
    }
  }, [onChange]);

  const handleQuillRefReady = (ref: any) => {
    quillRef.current = ref;
  };

  const handleSaveClick = async () => {
    if (onSave && quillRef.current) {
      setIsTerminalVisible(true);
      onSave(quillRef);
    } else if (mode === 'parser' && quillRef.current) {
      // For parser mode, use the same publish flow as admin (which works perfectly)
      setIsTerminalVisible(true);
      try {
        await handlePublish(quillRef);
        log(`✅ Parser save completed successfully`, 'success');
      } catch (error) {
        log(`❌ Parser save failed: ${error}`, 'error');
      }
    }
  };

  const handlePublishClick = () => {
    setIsTerminalVisible(true);
    handlePublish(quillRef);
  };

  const handleTerminalClose = () => {
    setIsTerminalVisible(false);
    if (publishingState === 'success' || publishingState === 'failed') {
      clearLogs();
    }
    if (saveState === 'success' || saveState === 'failed') {
      onResetSave?.();
    }
  };

  const handleLivePreviewToggle = () => {
    setIsLivePreviewVisible(!isLivePreviewVisible);
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
  }, []);

  useEffect(() => setMounted(true), []);

  // ReactQuill modules configuration
  const modules = useMemo(() => ({
    toolbar: toolbarConfig,
    clipboard: {
      matchVisual: false,
      matchers: createTableMatchers()
    },
  }), []);

  // Enhanced clipboard handlers for ReactQuill - Moved to EditorContent component
  useEffect(() => {
    // This effect is now handled in EditorContent component
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
    return <div className={quillEditorStyles.quillEditorLoading}>Loading editor...</div>;
  }

  return (
    <div className={`${quillEditorStyles.quillEditor} quillEditor`}>
      {/* Title Input at the top */}
      <TitleInput
        articleTitle={articleTitle}
        onTitleChange={(title) => {
          setArticleTitle(title);
          onTitleChange?.(title);
        }}
        readOnly={titleReadOnly}
      />

      {/* Editor in the middle */}
      <EditorContent
        value={value}
        onChange={handleTextChange}
        modules={modules}
        placeholder={placeholder}
        mounted={mounted}
        onWheel={handleEditorWheel}
        isContainerMode={isContainerMode}
        styles={quillEditorStyles}
        onQuillRefReady={handleQuillRefReady}
      />

      {/* Control Buttons at the bottom */}
      <ControlButtons
        onPublishClick={mode === 'create' ? handlePublishClick : undefined}
        onSaveClick={mode === 'edit' || mode === 'parser' ? handleSaveClick : undefined}
        publishingState={publishingState}
        saveState={mode === 'parser' ? updateState : saveState}
        onTerminalToggle={() => setIsTerminalVisible(true)}
        isTerminalVisible={isTerminalVisible}
        onLivePreviewToggle={handleLivePreviewToggle}
        isLivePreviewVisible={isLivePreviewVisible}
        isContainerMode={isContainerMode}
        onViewModeToggle={() => setIsContainerMode(!isContainerMode)}
        mode={mode}
        isSaving={mode === 'parser' ? updateState === 'uploading' : isSaving}
      />

      <Terminal
        logs={logs}
        isVisible={isTerminalVisible}
        onClear={clearLogs}
        onClose={handleTerminalClose}
      />

      <LivePreview
        content={currentContent}
        isVisible={isLivePreviewVisible}
        onClose={() => setIsLivePreviewVisible(false)}
        onRefreshQuill={refreshQuillDisplay}
      />
    </div>
  );
}


// ============================================================
// editor/LivePreview.tsx
// ============================================================
interface LivePreviewProps {
  content: string;
  isVisible: boolean;
  onClose: () => void;
  onRefreshQuill: () => void;
}

export function LivePreview({ content, isVisible, onClose, onRefreshQuill }: LivePreviewProps) {
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
    <div className={`${quillEditorStyles.previewContainer} ${isExpanded ? quillEditorStyles.expanded : ''}`}>
      <div className={quillEditorStyles.previewHeader}>
        <div className={quillEditorStyles.headerLeft}>
          <div className={quillEditorStyles.previewIcon}>HTML</div>
          {/* <div className={quillEditorStyles.previewTitle}>Raw HTML Source</div> */}
          <div className={quillEditorStyles.contentLength}>{content.length} chars</div>
        </div>
        <div className={quillEditorStyles.headerRight}>
          <button 
            onClick={handleRefreshQuill}
            className={quillEditorStyles.refreshButton}
            title="Refresh Quill editor display"
          >
            REFRESH
          </button>
          <button 
            onClick={handleCopyHTML}
            className={quillEditorStyles.copyButton}
            title="Copy HTML code"
            disabled={!content}
          >
            {copied ? 'COPIED!' : 'COPY'}
          </button>
          <button 
            onClick={handleExpandToggle}
            className={quillEditorStyles.expandButton}
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? 'MIN' : 'MAX'}
          </button>
          <button 
            onClick={onClose}
            className={quillEditorStyles.closeButton}
            title="Close preview"
          >
            CLOSE
          </button>
        </div>
      </div>
      
      <div className={quillEditorStyles.previewContent} onWheel={handleWheel}>
        <pre className={quillEditorStyles.codeBlock}>
          <code ref={previewRef} className={quillEditorStyles.htmlCode}>
            {content || '<!-- Start typing to see HTML source code... -->'}
          </code>
        </pre>
      </div>
    </div>
  );
}


// ============================================================
// editor/Terminal.tsx
// ============================================================
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

export function Terminal({ logs, isVisible, onClear, onClose }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    if (terminalRef.current && logs.length > 0 && !isUserScrolling) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, isUserScrolling]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (terminalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = terminalRef.current;
      const delta = e.deltaY;
      
      // Update scroll state
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsUserScrolling(!isAtBottom);
      
      // Prevent page scroll when terminal has scrollable content
      const hasScrollableContent = scrollHeight > clientHeight;
      
      if (hasScrollableContent) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  const scrollToTop = () => {
    if (terminalRef.current) {
      const currentScrollTop = terminalRef.current.scrollTop;
      const viewportHeight = terminalRef.current.clientHeight;
      const newScrollTop = Math.max(0, currentScrollTop - viewportHeight);
      terminalRef.current.scrollTop = newScrollTop;
      setIsUserScrolling(true);
    }
  };

  const scrollToBottom = () => {
    if (terminalRef.current) {
      const currentScrollTop = terminalRef.current.scrollTop;
      const viewportHeight = terminalRef.current.clientHeight;
      const scrollHeight = terminalRef.current.scrollHeight;
      const newScrollTop = Math.min(scrollHeight, currentScrollTop + viewportHeight);
      terminalRef.current.scrollTop = newScrollTop;
      
      // Only set isUserScrolling to false if we're actually at the bottom
      if (newScrollTop >= scrollHeight - viewportHeight - 10) {
        setIsUserScrolling(false);
      } else {
        setIsUserScrolling(true);
      }
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
    });
  };

  return (
    <div className={`${quillEditorStyles.terminalContainer} ${isExpanded ? quillEditorStyles.expanded : ''}`}>
      <div className={quillEditorStyles.terminalHeader}>
        <div className={quillEditorStyles.headerLeft}>
          <div className={quillEditorStyles.terminalIcon}>TERMINAL</div>
          {/* <div className={quillEditorStyles.terminalTitle}>Publishing Terminal</div> */}
          <div className={quillEditorStyles.logCount}>{logs.length} logs</div>
        </div>
        <div className={quillEditorStyles.headerRight}>
          <button 
            onClick={copyLogsToClipboard}
            className={quillEditorStyles.copyButton}
            title="Copy all logs"
            disabled={logs.length === 0}
          >
            COPY
          </button>
          <button 
            onClick={onClear}
            className={quillEditorStyles.clearButton}
            title="Clear logs"
            disabled={logs.length === 0}
          >
            CLEAR
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={quillEditorStyles.expandButton}
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? 'MIN' : 'MAX'}
          </button>
          <button 
            onClick={onClose}
            className={quillEditorStyles.closeButton}
            title="Close terminal"
          >
            CLOSE
          </button>
        </div>
      </div>
      
      {/* Always Visible Overlay Navigation Buttons */}
      <div className={quillEditorStyles.scrollOverlay}>
        <button
          onClick={scrollToTop}
          className={quillEditorStyles.scrollButton}
          title="Scroll to top"
        >
          ↑
        </button>
        <button
          onClick={scrollToBottom}
          className={quillEditorStyles.scrollButton}
          title="Scroll to bottom"
        >
          ↓
        </button>
      </div>
      
      <div 
        ref={terminalRef}
        className={quillEditorStyles.terminalContent}
        onWheel={handleWheel}
      >

        {logs.length === 0 ? (
          <div className={quillEditorStyles.emptyState}>
            <div className={quillEditorStyles.emptyIcon}>LOG</div>
            <div className={quillEditorStyles.emptyText}>Waiting for publishing logs...</div>
            <div className={quillEditorStyles.emptySubtext}>Click "Publish" to see detailed logs here</div>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={quillEditorStyles.logEntry}>
              <span className={quillEditorStyles.logTimestamp}>[{log.timestamp}]</span>
              <span 
                className={quillEditorStyles.logIcon}
                style={{ color: getLogColor(log.type) }}
              >
                {getLogIcon(log.type)}
              </span>
              <span className={quillEditorStyles.logMessage}>{log.message}</span>
            </div>
          ))
        )}
        
        {logs.length > 0 && (
          <div className={quillEditorStyles.terminalCursor}>
            <span className={quillEditorStyles.cursorBlink}>█</span>
          </div>
        )}
      </div>
    </div>
  );
}


// ============================================================
// editor/components/EditorContent.tsx
// ============================================================
interface EditorContentProps {
  value: string;
  onChange: (content: string, delta: any, source: string, editor: any) => void;
  modules: any;
  placeholder?: string;
  mounted: boolean;
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
  isContainerMode: boolean;
  styles: any;
  onQuillRefReady: (ref: ReactQuill) => void;
}

export function EditorContent({
  value,
  onChange,
  modules,
  placeholder,
  mounted,
  onWheel,
  isContainerMode,
  styles,
  onQuillRefReady,
}: EditorContentProps) {
  const quillRef = useRef<ReactQuill>(null);

  // Pass the ref to parent when ready
  useEffect(() => {
    if (quillRef.current) {
      onQuillRefReady(quillRef.current);
    }
  }, [mounted, onQuillRefReady]);

  // Enhanced clipboard handlers for ReactQuill
  useEffect(() => {
    if (!mounted || !quillRef.current) return;

    const editor = quillRef.current.getEditor();
    setupClipboardHandlers(editor, ReactQuill);
  }, [mounted]);

  return (
    <div 
      className={`${quillEditorStyles.editorContainer} ${isContainerMode ? quillEditorStyles.containerMode : quillEditorStyles.fullPageMode}`}
      onWheel={onWheel}
    >
      <ReactQuill
        ref={quillRef}
        theme="bubble"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder || " "}
        style={{ minHeight: "500px" }}
      />
    </div>
  );
}


// ============================================================
// editor/components/EditorControls.tsx
// ============================================================
interface TitleInputProps {
  articleTitle: string;
  onTitleChange: (title: string) => void;
  readOnly?: boolean;
}

export function TitleInput({ articleTitle, onTitleChange, readOnly = false }: TitleInputProps) {
  return (
    <input
      type="text"
      value={articleTitle}
      onChange={(e) => onTitleChange(e.target.value)}
      placeholder="Title"
      className={quillEditorStyles.titleInput}
      readOnly={readOnly}
    />
  );
}

interface ControlButtonsProps {
  onPublishClick?: () => void;
  onSaveClick?: () => void;
  publishingState?: 'draft' | 'uploading' | 'success' | 'failed';
  saveState?: 'draft' | 'uploading' | 'success' | 'failed';
  onTerminalToggle: () => void;
  isTerminalVisible: boolean;
  onLivePreviewToggle: () => void;
  isLivePreviewVisible: boolean;
  isContainerMode: boolean;
  onViewModeToggle: () => void;
  mode?: 'create' | 'edit' | 'parser';
  isSaving?: boolean;
}

export function ControlButtons({
  onPublishClick,
  onSaveClick,
  publishingState = 'draft',
  saveState = 'draft',
  onTerminalToggle,
  isTerminalVisible,
  onLivePreviewToggle,
  isLivePreviewVisible,
  isContainerMode,
  onViewModeToggle,
  mode = 'create',
  isSaving = false,
}: ControlButtonsProps) {
  
  const handlePublishClick = () => {
    log('🚀 Publish button clicked', 'info');
    onPublishClick?.();
  };

  const handleSaveClick = () => {
    log('💾 Save button clicked', 'info');
    onSaveClick?.();
  };

  const handleLivePreviewToggle = () => {
    onLivePreviewToggle();
    log(`👁️ Live preview ${!isLivePreviewVisible ? 'opened' : 'closed'}`, 'info');
  };

  return (
    <>
      {/* Open Terminal Button - Only show when terminal is closed */}
      {!isTerminalVisible && (
        <div className={quillEditorStyles.openTerminalContainer}>
          <button
            onClick={onTerminalToggle}
            className={quillEditorStyles.openTerminalButton}
            title="Open terminal"
          >
            OPEN TERMINAL
          </button>
        </div>
      )}

      {/* Open Live Preview Button - Only show when preview is closed */}
      {!isLivePreviewVisible && (
        <div className={quillEditorStyles.openPreviewContainer}>
          <button
            onClick={handleLivePreviewToggle}
            className={quillEditorStyles.openPreviewButton}
            title="Open live preview"
          >
            LIVE PREVIEW
          </button>
        </div>
      )}

      {/* View Mode Toggle Button */}
      <div className={quillEditorStyles.viewModeContainer}>
        <button
          onClick={onViewModeToggle}
          className={quillEditorStyles.viewModeButton}
          title={isContainerMode ? "Switch to full page view" : "Switch to container view"}
        >
          {isContainerMode ? "FULL PAGE" : "CONTAINER"}
        </button>
      </div>

      {/* Action Button - Save or Publish */}
      <div className={quillEditorStyles.publishButtonContainer}>
        {mode === 'edit' || mode === 'parser' ? (
          <button
            onClick={handleSaveClick}
            disabled={isSaving || saveState === 'uploading'}
            className={`${quillEditorStyles.publishButton} ${quillEditorStyles[saveState]}`}
          >
            {saveState === 'draft' && "Save"}
            {saveState === 'uploading' && "Saving..."}
            {saveState === 'success' && "Saved"}
            {saveState === 'failed' && "Failed"}
          </button>
        ) : (
          <button
            onClick={handlePublishClick}
            disabled={publishingState !== "draft"}
            className={`${quillEditorStyles.publishButton} ${quillEditorStyles[publishingState]}`}
          >
            {publishingState === "draft" && "Publish"}
            {publishingState === "uploading" && "Publishing..."}
            {publishingState === "success" && "Published"}
            {publishingState === "failed" && "Failed"}
          </button>
        )}
      </div>
    </>
  );
}


// ============================================================
// editor/modules/clipboardHandlers.ts
// ============================================================
export const createTableMatchers = () => {
  const Quill = ReactQuill.Quill;
  const Delta = Quill.import('delta');
  const Clipboard = Quill.import('modules/clipboard') as any;

  return [
    ['TABLE', (node: Node, delta: any, scroll: any) => {
      const htmlContent = (node as HTMLElement).innerHTML;
      
      const tempContainer = document.createElement('div');
      const tempEditor = new Quill(tempContainer);
      const tempClipboard = new Clipboard(tempEditor, {});
      
      const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
      
      return new Delta(convertedDelta.ops).concat(new Delta().insert('\n\n'));
    }],
    ['TR', (node: Node, delta: any, scroll: any) => {
      const htmlContent = (node as HTMLElement).innerHTML;
      
      const tempContainer = document.createElement('div');
      const tempEditor = new Quill(tempContainer);
      const tempClipboard = new Clipboard(tempEditor, {});
      
      const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
      
      return new Delta(convertedDelta.ops).concat(new Delta().insert('\n'));
    }],
    ['TD', (node: Node, delta: any, scroll: any) => {
      const htmlContent = (node as HTMLElement).innerHTML;
      
      const tempContainer = document.createElement('div');
      const tempEditor = new Quill(tempContainer);
      const tempClipboard = new Clipboard(tempEditor, {});
      
      const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
      
      return new Delta(convertedDelta.ops).concat(new Delta().insert(' | '));
    }],
    ['TH', (node: Node, delta: any, scroll: any) => {
      const htmlContent = (node as HTMLElement).innerHTML;
      
      const tempContainer = document.createElement('div');
      const tempEditor = new Quill(tempContainer);
      const tempClipboard = new Clipboard(tempEditor, {});
      
      const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
      
      return new Delta(convertedDelta.ops).concat(new Delta().insert(' | '));
    }]
  ];
};

export const setupClipboardHandlers = (editor: any, ReactQuill: any) => {
  editor.root.addEventListener('paste', (e: ClipboardEvent) => {
    if (e.clipboardData?.getData('text/html')) {
      log('� HTML content pasted', 'info');
    }
  });
  
  let lastLength = 0;
  editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
    const currentLength = editor.getText().length;
    if (source === 'user' && currentLength > lastLength + 100) {
      log('� Large content change detected (possible paste)', 'info');
    }
    lastLength = currentLength;
  });

  log('✅ Clipboard handlers setup complete', 'success');
};


// ============================================================
// editor/modules/toolbarConfig.ts
// ============================================================
export const toolbarConfig = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "code-block"],
  ["link", "image"],
  ["clean"], 
  ["table"],
];
