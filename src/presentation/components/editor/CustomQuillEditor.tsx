import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import styles from '../../_styles/components/editor/CustomQuillEditor.module.css';;
import "react-quill-new/dist/quill.bubble.css";
import { useImageQueue, usePublishing, useArticleUpdate } from "../../../application/hooks";
import { ArticleUpdater } from '../../../infrastructure/articleUpdater';
import { log } from "../../../infrastructure/utils/logger";
import type { LogLevel } from "../../../application/types/shared.types";
import { PublishingState } from "../../../application/types/shared.types";
import Terminal from "./Terminal";
import LivePreview from "./LivePreview";
import { TitleInput, ControlButtons } from "./components/EditorControls";
import EditorContent from "./components/EditorContent";
import { toolbarConfig } from "./modules/toolbarConfig";
import { createTableMatchers } from "./modules/clipboardHandlers";


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

export default function CustomQuillEditor({
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
    return <div className={styles.quillEditorLoading}>Loading editor...</div>;
  }

  return (
    <div className={`${styles.quillEditor} quillEditor`}>
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
        styles={styles}
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
