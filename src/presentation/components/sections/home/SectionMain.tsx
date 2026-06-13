import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FaMicrophone } from 'react-icons/fa';
import styles from '../../../_styles/components/sections/home/SectionMain.module.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className={styles.editorLoading} />,
});

// Import Quill bubble theme CSS (extracted at build time, no SSR issues)
import 'react-quill-new/dist/quill.bubble.css';

// Hero Input Component - React Quill Bubble Editor with Attachment
function HeroInput() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState<Array<{ id: string; name: string; type: string; file: File }>>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const modules = {
    clipboard: {
      matchVisual: false,
    },
    keyboard: {
      bindings: {
        enter: {
          key: 'Enter',
          shiftKey: false,
          handler: () => {
            // Only send if there's content
            if (value.trim()) {
              handleSendMessage();
            }
            return false;
          }
        }
      }
    }
  };

  // Handle wheel events for smooth scrolling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Let CSS handle scrolling naturally, just ensure proper containment
    e.stopPropagation();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');

    if (isImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setValue((prev) => prev + `<img src="${imageUrl}" />`);
      };
      reader.readAsDataURL(file);
    } else {
      // Add to attachments for AI
      setAttachments((prev) => [...prev, {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        type: file.type,
        file,
      }]);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('audio')) return '🎵';
    if (type.includes('video')) return '🎬';
    return '📎';
  };

  const handleSendMessage = () => {
    if (!value.trim()) return;
    
    // Store the complete HTML content with images for AI Dashboard
    localStorage.setItem('pending-message', value);
    router.push('/new-ai-dashboard');
  };

  // Voice recording functionality
  const startRecording = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setValue(transcript);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
      recognitionInstance.start();
      setIsRecording(true);
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className={styles.inputOuter}>
      {/* Scrollable Content Area */}
      <div 
        className={styles.inputWrapper} 
        ref={wrapperRef}
        onWheel={handleWheel}
      >
        {/* Attachment Bubbles */}
        {attachments.length > 0 && (
          <div className={styles.attachmentsRow}>
            {attachments.map((att) => (
              <div key={att.id} className={styles.attachmentBubble}>
                <span className={styles.attachmentIcon}>{getFileIcon(att.type)}</span>
                <div className={styles.attachmentInfo}>
                  <span className={styles.attachmentName}>{att.name}</span>
                  <span className={styles.attachmentType}>{att.type.split('/')[1]?.toUpperCase() || 'FILE'}</span>
                </div>
                <button 
                  className={styles.attachmentRemove}
                  onClick={() => removeAttachment(att.id)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          modules={modules}
          placeholder="Ask anything about system  design..."
          className={styles.quillEditor}
        />
      </div>

      {/* Fixed Button Bar - Outside scrollable area */}
      <div className={styles.inputContainer}>
        {/* Attachment Button - Direct file picker */}
        <button 
          className={styles.attachmentButton}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </button>

        {/* Voice Recording Button */}
        <button 
          className={`${styles.voiceButton} ${isRecording ? styles.recording : ''}`}
          onClick={toggleRecording}
          title={isRecording ? "Stop recording" : "Start voice recording"}
        >
          <FaMicrophone size={16} />
        </button>

        {/* Hidden File Input - Accepts any file */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

        <button onClick={handleSendMessage} className={styles.sendButton}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function SectionMain() {
  return (
    <div className={styles.sectionMain}>
      {/* Content */}
      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img
            src="/100xsystemsfooter.webp"
            alt="100xSystems"
            className={styles.logo}
          />
        </div>

        {/* Hero Input */}
        <HeroInput />
      </div>
    </div>
  );
}
