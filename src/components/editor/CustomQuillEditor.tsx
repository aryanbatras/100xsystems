import { useEffect, useRef, useState } from "react";
import styles from "./CustomQuillEditor.module.css";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useImageQueue } from "../../hooks/useImageQueue";
import { usePublishing, PublishingState } from "../../hooks/usePublishing";
import { log, LogLevel } from "../../lib/logger";
import Terminal from "./Terminal";

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

  const { imageQueue } = useImageQueue(mounted);
  const { publishingState, handlePublish, logs, clearLogs } = usePublishing(articleTitle);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);

  // Initialize editor logger
  useEffect(() => {
    log('🔧 Editor component mounted', 'info');
  }, []);

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
    log('🔧 Setting up clipboard handlers...', 'info');
    log('✅ Quill editor initialized successfully', 'success');
    log('🔧 Setting up clipboard handlers...', 'info');

    // Enhanced paste handling like CodePen
    const Delta = Quill.import('delta');
    
    quill.clipboard.addMatcher('PRE', (node: any, delta: any) => {
      return new Delta().insert(node.textContent, { 'code-block': true });
    });
    
    quill.clipboard.addMatcher('CODE', (node: any, delta: any) => {
      return new Delta().insert(node.textContent, { 'code': true });
    });
    
    quill.clipboard.addMatcher(Node.TEXT_NODE, (node: any, delta: any) => {
      let text = node.data;
      
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

    // Handle content changes
    quill.on('text-change', () => {
      const content = quill.root.innerHTML;
      const message = `📝 Content changed, length: ${content.length}`;
      log(message);
      // Don't log every content change to terminal to avoid spam
      onChange(content);
    });

    // Set initial content
    if (value) {
      const message = `📄 Setting initial content, length: ${value.length}`;
      log(message);
      log(message, 'info');
      quill.root.innerHTML = value;
    }

    quillRef.current = quill;
    const message = '✅ Quill editor setup complete';
    log(message, 'success');
    log(message, 'success');

    return () => {
      const cleanupMessage = '🧹 Cleaning up Quill editor';
      log(cleanupMessage);
      log(cleanupMessage, 'info');
      quillRef.current = null;
    };
  }, [mounted, onChange]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
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
