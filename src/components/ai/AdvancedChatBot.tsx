import { useState, useEffect, useRef, useCallback } from 'react';
import { FaUserCircle, FaMicrophone, FaMicrophoneSlash, FaImage, FaCog, FaTimes, FaPaperPlane, FaVolumeUp, FaVolumeMute, FaRobot, FaBrain, FaCopy } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './AdvancedChatBot.module.css';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  imageUrl?: string;
}

interface ChatSettings {
  autoContext: boolean;
  voiceEnabled: boolean;
  selectedModel: string;
  ttsEnabled: boolean;
}

const GROQ_MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', description: 'Most capable model' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', description: 'Fast responses' },
  { id: 'moonshotai/kimi-k2-instruct', name: 'Kimi K2', description: 'Balanced performance' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout', description: 'Multimodal capable' }
];

const VOICE_MODELS = [
  { id: 'whisper-large-v3-turbo', name: 'Whisper Turbo', description: 'Fast transcription' },
  { id: 'whisper-large-v3', name: 'Whisper Large', description: 'High accuracy' }
];

const TTS_MODELS = [
  { id: 'canopylabs/orpheus-v1-english', name: 'Orpheus V1', description: 'English TTS' }
];

interface AdvancedChatBotProps {
  articleSlug: string;
  articleContent: string;
  selectedText?: string;
  isOpen: boolean;
  onClose: () => void;
  onClearContext?: () => void;
}

export default function AdvancedChatBot({ 
  articleSlug, 
  articleContent, 
  selectedText, 
  isOpen, 
  onClose,
  onClearContext
}: AdvancedChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showContextDropdown, setShowContextDropdown] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [currentContext, setCurrentContext] = useState(selectedText || '');
  
  const [settings, setSettings] = useState<ChatSettings>({
    autoContext: true,
    voiceEnabled: false,
    selectedModel: 'llama-3.3-70b-versatile',
    ttsEnabled: false
  });

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (settings.autoContext && selectedText) {
      // Don't set context automatically anymore - it will be added to messages
    }
  }, [selectedText, settings.autoContext]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scroll when chat is open
    document.body.style.overflow = 'hidden';
    
    // Add class to push article content
    document.body.classList.add('chatbot-open');
    
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
      document.body.classList.remove('chatbot-open');
    };
  }, [onClose]);

  // Prevent scroll propagation from messages container
  const handleMessagesScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Debug logging
    console.log('Auto-context enabled:', settings.autoContext);
    console.log('Selected text:', selectedText);
    console.log('Input:', input);

    // Only include context if auto-context is enabled AND text is selected
    const messageContent = settings.autoContext && selectedText 
      ? `**Context:** ${selectedText}\n\n${input}`
      : input;

    console.log('Final message content:', messageContent);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat-enhanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
          selectedText: settings.autoContext ? selectedText : '',
          model: settings.selectedModel,
          stream: true
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let aiContent = '';
      const aiMessageId = (Date.now() + 1).toString();
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.choices?.[0]?.delta?.content) {
                  aiContent += parsed.choices[0].delta.content;
                  
                  setMessages(prev => {
                    const updated = [...prev];
                    const existingIndex = updated.findIndex(m => m.id === aiMessageId);
                    
                    if (existingIndex >= 0) {
                      updated[existingIndex] = {
                        ...updated[existingIndex],
                        content: aiContent,
                        isStreaming: true
                      };
                    } else {
                      updated.push({
                        id: aiMessageId,
                        type: 'ai',
                        content: aiContent,
                        timestamp: new Date(),
                        isStreaming: true
                      });
                    }
                    
                    return updated;
                  });
                }
              } catch (e) {
                console.error('Error parsing chunk:', e);
              }
            }
          }
        }
      }

      // Mark streaming as complete
      setMessages(prev => 
        prev.map(m => m.id === aiMessageId ? { ...m, isStreaming: false } : m)
      );

      // Text-to-speech if enabled
      if (settings.ttsEnabled && aiContent) {
        await handleTextToSpeech(aiContent);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await handleVoiceTranscription(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleVoiceTranscription = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob);
      formData.append('model', 'whisper-large-v3-turbo');

      const response = await fetch('/api/voice-transcribe', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Transcription failed');

      const data = await response.json();
      setInput(data.text);
    } catch (error) {
      console.error('Error transcribing voice:', error);
    }
  };

  const handleTextToSpeech = async (text: string) => {
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          model: 'canopylabs/orpheus-v1-english'
        })
      });

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('Error with TTS:', error);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/image-upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: input || 'Analyze this image',
        timestamp: new Date(),
        imageUrl: data.url
      };

      setMessages(prev => [...prev, userMessage]);
      setInput('');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      // Stop current playback
      setIsPlaying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatOverlay}>
      <div className={styles.chatSidebar}>
        {/* Modern Header */}
        <div className={styles.chatHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.botIcon}>
              <FaRobot className={styles.botIconSvg} />
            </div>
            <div>
              <h3>AI Assistant</h3>
              <span className={styles.modelName}>
                <FaBrain className={styles.modelIcon} />
                {GROQ_MODELS.find(m => m.id === settings.selectedModel)?.name}
              </span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button 
              onClick={() => {
                console.log('Brain button clicked');
                setShowModelSelector(!showModelSelector);
                setShowSettings(false);
              }}
              className={styles.modelButton}
              title="Change Model"
            >
              <FaBrain />
            </button>
            <button 
              onClick={() => {
                console.log('Settings button clicked');
                setShowSettings(!showSettings);
                setShowModelSelector(false);
              }}
              className={styles.settingsButton}
              title="Settings"
            >
              <FaCog />
            </button>
            <button 
              onClick={onClose}
              className={styles.closeButton}
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Show context indicator when text is selected AND auto-context is enabled */}
        {selectedText && settings.autoContext && (
          <div className={styles.contextIndicator}>
            <span className={styles.contextIndicatorText}>
              <FaBrain className={styles.contextIcon} />
              Context from article will be used
            </span>
            <button 
              onClick={() => setShowContextDropdown(!showContextDropdown)}
              className={styles.viewContextButton}
            >
              View Context
            </button>
          </div>
        )}

        {/* Context dropdown */}
        {showContextDropdown && selectedText && (
          <div className={styles.contextDropdown}>
            <div className={styles.contextDropdownHeader}>
              <h4>Context Being Used</h4>
              <button 
                onClick={() => setShowContextDropdown(false)}
                className={styles.closeDropdownButton}
              >
                <FaTimes />
              </button>
            </div>
            <div 
              className={styles.contextContent}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {selectedText}
            </div>
          </div>
        )}

        {showModelSelector && (
          <div className={styles.modelPanel}>
            <div className={styles.panelHeader}>
              <h3>Select Model</h3>
              <button 
                onClick={() => setShowModelSelector(false)}
                className={styles.closePanelButton}
              >
                <FaTimes />
              </button>
            </div>
            <div className={styles.modelGrid}>
              {GROQ_MODELS.map(model => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSettings(prev => ({ ...prev, selectedModel: model.id }));
                    setShowModelSelector(false);
                  }}
                  className={`${styles.modelCard} ${
                    settings.selectedModel === model.id ? styles.selected : ''
                  }`}
                >
                  <div className={styles.modelCardInfo}>
                    <span className={styles.modelCardName}>{model.name}</span>
                    <span className={styles.modelCardDescription}>{model.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {showSettings && (
          <div className={styles.settingsPanel}>
            <div className={styles.panelHeader}>
              <h3>Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className={styles.closePanelButton}
              >
                <FaTimes />
              </button>
            </div>
            <div className={styles.settingsGrid}>
              <label className={styles.settingItem}>
                <input
                  type="checkbox"
                  checked={settings.autoContext}
                  onChange={(e) => {
                    const newAutoContext = e.target.checked;
                    setSettings(prev => ({ ...prev, autoContext: newAutoContext }));
                    // When auto-context is turned off, user should manually clear selection
                      console.log('Auto-context', newAutoContext ? 'enabled' : 'disabled');
                    }}
                  />
                  <span>Auto-use selected text as context</span>
              </label>
              <label className={styles.settingItem}>
                <input
                  type="checkbox"
                  checked={settings.voiceEnabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, voiceEnabled: e.target.checked }))}
                />
                <span>Enable voice input</span>
              </label>
              <label className={styles.settingItem}>
                <input
                  type="checkbox"
                  checked={settings.ttsEnabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, ttsEnabled: e.target.checked }))}
                />
                <span>Enable text-to-speech</span>
              </label>
              <button onClick={clearChat} className={styles.clearButton}>
                Clear Chat History
              </button>
            </div>
          </div>
        )}

        <div 
          className={styles.messagesContainer}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onWheel={handleMessagesScroll}
        >
          {messages.length === 0 && (
            <div className={styles.welcomeMessage}>
              <div className={styles.welcomeIcon}>
                <FaRobot className={styles.welcomeIconSvg} />
              </div>
              <h4>Welcome to AI Assistant</h4>
              <p>I'm here to help you understand this article better. Ask me anything!</p>
              <div className={styles.suggestions}>
                <button 
                  className={styles.suggestionBtn}
                  onClick={() => setInput('Explain the key concepts in this article')}
                >
                  Explain concepts
                </button>
                <button 
                  className={styles.suggestionBtn}
                  onClick={() => setInput('Provide practical examples from this content')}
                >
                  Provide examples
                </button>
                <button 
                  className={styles.suggestionBtn}
                  onClick={() => setInput('Analyze the main arguments and insights')}
                >
                  Analyze content
                </button>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${styles[message.type]} ${
                message.isStreaming ? styles.streaming : ''
              }`}
            >
              <div className={styles.avatar}>
                {message.type === 'user' ? (
                  <FaUserCircle className={styles.userAvatar} />
                ) : (
                  <div className={styles.aiAvatar}>
                    <FaRobot className={styles.aiAvatarIcon} />
                  </div>
                )}
              </div>
              <div className={styles.messageContent}>
                {message.imageUrl && (
                  <img src={message.imageUrl} alt="Uploaded" className={styles.messageImage} />
                )}
                {message.type === 'user' && message.content.includes('**Context:**') && (
                  <div className={styles.contextBadge}>Context from article</div>
                )}
                <div className={styles.messageText}>
                  <ReactMarkdown
                    components={{
                      code: ({ inline, className, children }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        
                        if (!inline && language) {
                          return (
                            <div className={styles.codeBlockContainer}>
                              <div className={styles.codeBlockHeader}>
                                <span>{language}</span>
                                <button
                                  className={styles.copyButton}
                                  onClick={() => copyToClipboard(String(children))}
                                  title={copiedCode === String(children) ? 'Copied!' : 'Copy code'}
                                >
                                  {copiedCode === String(children) ? '✓' : <FaCopy />}
                                </button>
                              </div>
                              <div className={styles.codeBlockContent}>
                                <SyntaxHighlighter
                                  style={oneDark}
                                  language={language}
                                  PreTag="div"
                                  customStyle={{
                                    margin: 0,
                                    background: 'transparent',
                                    fontSize: '0.8125rem'
                                  }}
                                >
                                  {String(children)}
                                </SyntaxHighlighter>
                              </div>
                            </div>
                          );
                        }
                        
                        return (
                          <code className={className}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                  {message.isStreaming && <span className={styles.cursor}>|</span>}
                </div>
              </div>
              <div className={styles.messageActions}>
                <span className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
                {message.type === 'ai' && settings.ttsEnabled && (
                  <button 
                    onClick={togglePlayback}
                    className={styles.playButton}
                    title="Play response"
                  >
                    {isPlaying ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className={`${styles.message} ${styles.ai} ${styles.loading}`}>
              <div className={styles.avatar}>
                <span className={styles.avatarText}>AI</span>
              </div>
              <div className={styles.messageContent}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          {dragActive && (
            <div className={styles.dropZone}>
              <FaImage className={styles.dropIcon} />
              <p>Drop image here to analyze</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.inputActions}>
            {settings.voiceEnabled && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`${styles.voiceButton} ${isRecording ? styles.recording : ''}`}
                title={isRecording ? 'Stop recording' : 'Start voice input'}
              >
                {isRecording ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
            )}
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className={styles.imageButton}
              title="Upload image"
            >
              <FaImage />
            </button>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about this article..."
            disabled={isLoading}
            rows={1}
            className={styles.messageInput}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className={styles.sendButton}
          >
            <IoMdSend />
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            className={styles.fileInput}
          />
        </div>
      </div>
    </div>
  );
}
