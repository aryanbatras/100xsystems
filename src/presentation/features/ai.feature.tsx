'use client';

import { DIAGRAM_KEYWORDS } from '../../application/ai/diagramConfig';
import { DiagramParser } from '../../application/ai/diagramParser';
import { DIAGRAM_GENERATION_PROMPT } from '../../application/ai/diagramPrompt';
import { MERMAID_GENERATION_PROMPT } from '../../application/ai/mermaidPrompt';
import { useMemory } from '../../application/hooks';
import { useChat } from './contexts.feature';
import advancedChatBotStyles from '../_styles/css/ai-advancedchatbot.module.css';
import articleRouteDialogStyles from '../_styles/css/ai-articleroutedialog.module.css';
import chatButtonStyles from '../_styles/css/ai-chatbutton.module.css';
import newAIChatBotStyles from '../_styles/css/ai-newaichatbot.module.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {useState, useEffect, useRef, useCallback} from 'react';
import { FaArrowRight, FaBars, FaBookOpen, FaBrain, FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp, FaCog, FaComment, FaComments, FaCopy, FaDownload, FaEllipsisH, FaImage, FaMemory, FaMicrophone, FaMicrophoneSlash, FaPaperclip, FaPencilRuler, FaPlus, FaQuoteLeft, FaRobot, FaSearch, FaShare, FaSync, FaThumbsDown, FaThumbsUp, FaTimes, FaTimesCircle, FaTrash, FaUpload, FaUserCircle, FaVolumeMute, FaVolumeUp, FaWaveSquare } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
/**
 * ## Ai
 *
 * Ai feature module.
 * Contains all components, types, and logic for the ai domain.
 *
 * @packageDocumentation
 * @module ai
 */




// ============================================================
// Source: AdvancedChatBot.tsx
// ============================================================
interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  imageUrl?: string;
  images?: string[];
}

interface ChatSettings {
  autoContext: boolean;
  voiceEnabled: boolean;
  selectedModel: string;
  ttsEnabled: boolean;
  memoryEnabled: boolean;
  showMemoryContext: boolean;
}

const GROQ_MODELS = [
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B",
    description: "Most capable model",
  },
  {
    id: "llama-3.1-8b-instant",
    name: "Llama 3.1 8B Instant",
    description: "Fast responses",
  },
  {
    id: "moonshotai/kimi-k2-instruct",
    name: "Kimi K2",
    description: "Balanced performance",
  },
  {
    id: "meta-llama/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout",
    description: "Multimodal capable",
  },
];

const VOICE_MODELS = [
  {
    id: "whisper-large-v3-turbo",
    name: "Whisper Turbo",
    description: "Fast transcription",
  },
  {
    id: "whisper-large-v3",
    name: "Whisper Large",
    description: "High accuracy",
  },
];

const TTS_MODELS = [
  {
    id: "canopylabs/orpheus-v1-english",
    name: "Orpheus V1",
    description: "English TTS",
  },
];

interface AdvancedChatBotProps {
  articleSlug: string;
  articleContent: string;
  selectedText?: string;
  isOpen: boolean;
  onClose: () => void;
  onClearContext?: () => void;
}

export function AdvancedChatBot({
  articleSlug,
  articleContent,
  selectedText,
  isOpen,
  onClose,
  onClearContext,
}: AdvancedChatBotProps) {
  const { user, loading: authLoading } = { user: null, loading: false };

  // Simple client-side rate limiting
  const [requestTimes, setRequestTimes] = useState<number[]>([]);
  const RATE_LIMIT = 2; // 2 requests per minute
  const RATE_WINDOW = 60000; // 1 minute in milliseconds
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showContextDropdown, setShowContextDropdown] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [currentContext, setCurrentContext] = useState(selectedText || "");

  const [settings, setSettings] = useState<ChatSettings>({
    autoContext: false,
    voiceEnabled: true,
    selectedModel: "meta-llama/llama-4-scout-17b-16e-instruct",
    ttsEnabled: false,
    memoryEnabled: true,
    showMemoryContext: true,
  });

  const [showMemoryPanel, setShowMemoryPanel] = useState(false);
  const [memorySearchQuery, setMemorySearchQuery] = useState("");
  const [showMemoryManager, setShowMemoryManager] = useState(false);

  // Only use memory on client side to avoid IndexedDB server-side errors
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    // No auth required - removed auth modal trigger
  }, []);

  const memory = useMemory({
    autoSave: isClient && settings.memoryEnabled,
    maxRetrieved: 10,
  });

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Prevent body scroll when chat is open
    document.body.style.overflow = "hidden";

    // Add class to push article content
    document.body.classList.add("chatbot-open");

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      document.body.classList.remove("chatbot-open");
    };
  }, [onClose]);

  // Prevent scroll propagation from messages container
  const handleMessagesScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  const sendAIMessage = async (messageContent: string, imageUrl?: string) => {
    setIsLoading(true);

    try {
      // Use multimodal model if image is provided, otherwise use selected model
      const modelToUse = imageUrl
        ? "meta-llama/llama-4-scout-17b-16e-instruct"
        : settings.selectedModel;

      // Get relevant memories if enabled
      let memoryContext = "";
      if (settings.memoryEnabled && settings.showMemoryContext) {
        await memory.retrieveRelevantMemories(messageContent, 5);
        memoryContext = memory.context;
      }

      const requestBody: any = {
        question: messageContent,
        selectedText: settings.autoContext ? selectedText : "",
        model: modelToUse,
        stream: true,
        memoryContext: memoryContext,
      };

      // Add image URL if provided
      if (imageUrl) {
        requestBody.imageUrl = imageUrl;
      }

      const response = await fetch("/api/ai-chat-enhanced", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let aiContent = "";
      const aiMessageId = (Date.now() + 1).toString();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.choices?.[0]?.delta?.content) {
                  aiContent += parsed.choices[0].delta.content;

                  setMessages((prev) => {
                    const updated = [...prev];
                    const existingIndex = updated.findIndex(
                      (m) => m.id === aiMessageId,
                    );

                    if (existingIndex >= 0) {
                      updated[existingIndex] = {
                        ...updated[existingIndex],
                        content: aiContent,
                        isStreaming: true,
                      };
                    } else {
                      updated.push({
                        id: aiMessageId,
                        type: "ai",
                        content: aiContent,
                        timestamp: new Date(),
                        isStreaming: true,
                      });
                    }

                    return updated;
                  });
                }
              } catch (e) {
              }
            }
          }
        }
      }

      // Mark streaming as complete
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMessageId ? { ...m, isStreaming: false } : m,
        ),
      );

      // Save AI response to memory
      if (settings.memoryEnabled && aiContent) {
        await memory.saveMemory(aiContent, "ai_response", articleSlug);
      }

      // Text-to-speech if enabled
      if (settings.ttsEnabled && aiContent) {
        await handleTextToSpeech(aiContent);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate rate limit info
  const now = Date.now();
  const recentRequests = requestTimes.filter(time => now - time < RATE_WINDOW);
  const remainingRequests = RATE_LIMIT - recentRequests.length;
  
  // Calculate when oldest request expires
  let resetTime = 0;
  if (recentRequests.length > 0) {
    const oldestRequest = Math.min(...recentRequests);
    resetTime = oldestRequest + RATE_WINDOW;
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Simple client-side rate limiting
    const now = Date.now();
    const recentRequests = requestTimes.filter(time => now - time < RATE_WINDOW);
    
    if (recentRequests.length >= RATE_LIMIT) {
      const oldestRequest = Math.min(...recentRequests);
      const waitTime = Math.ceil((oldestRequest + RATE_WINDOW - now) / 1000);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: `⚠️ Rate limit exceeded. Please wait ${waitTime} seconds before sending another message.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Update request times
    setRequestTimes([...recentRequests, now]);

    // Only include context if auto-context is enabled AND text is selected
    const messageContent =
      settings.autoContext && selectedText
        ? `**Context:** ${selectedText}\n\n${input}`
        : input;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Save user message to memory
    if (settings.memoryEnabled) {
      await memory.saveMemory(messageContent, "user_message", articleSlug);
    }

    // Send to AI using the new function
    await sendAIMessage(messageContent);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Try to get a supported MIME type
      let mimeType = "audio/webm";
      let options: MediaRecorderOptions = { mimeType };

      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "audio/mp4";
        options = { mimeType };

        if (!MediaRecorder.isTypeSupported(mimeType)) {
          options = {};
          mimeType = "";
        }
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        // Use the actual MIME type from the recorder or first chunk
        const actualMimeType =
          mediaRecorder.mimeType ||
          audioChunksRef.current[0]?.type ||
          "audio/webm";

        const audioBlob = new Blob(audioChunksRef.current, {
          type: actualMimeType,
        });

        await handleVoiceTranscription(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      // Show user-friendly error
      alert(
        `Microphone access failed: ${error || "Unknown error"}. Please check your browser permissions.`,
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (error) {
      }

      setIsRecording(false);
    }
  };

  const handleVoiceTranscription = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();

      // Create a proper file with the correct MIME type
      const fileExtension = audioBlob.type.includes("webm")
        ? "webm"
        : audioBlob.type.includes("mp4")
          ? "mp4"
          : audioBlob.type.includes("wav")
            ? "wav"
            : "webm";

      const fileName = `recording.${fileExtension}`;
      formData.append("file", audioBlob, fileName);
      formData.append("model", "whisper-large-v3-turbo");

      const response = await fetch("/api/voice-transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Try to get error details from response
        let errorDetails = "Unknown error";
        try {
          const errorData = await response.json();
          errorDetails = errorData.error || JSON.stringify(errorData);
        } catch (e) {
        }

        throw new Error(
          `Transcription failed: ${response.status} ${response.statusText} - ${errorDetails}`,
        );
      }

      const data = await response.json();

      if (data.text) {
        setInput(data.text);
      }
    } catch (error) {
      // Show user-friendly error
      alert(
        `Voice transcription failed: ${error || "Unknown error"}. Please try again.`,
      );
    }
  };

  const handleTextToSpeech = async (text: string) => {
    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          model: "canopylabs/orpheus-v1-english",
        }),
      });

      if (!response.ok) throw new Error("TTS failed");

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
    }
  };

  const handleImageUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: input || "Analyze this image",
        timestamp: new Date(),
        imageUrl: data.url,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      // Now send the message to AI
      await sendAIMessage(userMessage.content, data.url);
    } catch (error) {
      alert(
        `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
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

  const handleMemorySearch = async () => {
    if (!memorySearchQuery.trim()) {
      // If search is empty, show all recent memories
      await memory.retrieveRelevantMemories(undefined, 10);
      return;
    }
    await memory.searchMemories(memorySearchQuery, 10);
  };

  const handleMemorySearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleMemorySearch();
    }
  };

  const clearMemorySearch = async () => {
    setMemorySearchQuery("");
    await memory.retrieveRelevantMemories(undefined, 10);
  };

  const handleMemoryExport = async () => {
    try {
      const data = await memory.exportMemories();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-memory-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
    }
  };

  const handleMemoryImport = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await memory.importMemories(text);
      alert("Memory imported successfully!");
    } catch (error) {
      alert("Failed to import memory. Please check the file format.");
    }
  };

  // Don't render if user is not authenticated - auth removed
  if (false) {
    return null;
  }

  return (
    <div className={advancedChatBotStyles.chatOverlay}>
      <div className={advancedChatBotStyles.chatSidebar}>
        {/* Modern Header */}
        <div className={advancedChatBotStyles.chatHeader}>
          <div className={advancedChatBotStyles.headerLeft}>
            <div className={advancedChatBotStyles.botIcon}>
              <FaRobot className={advancedChatBotStyles.botIconSvg} />
            </div>
            <div>
              <h3>AI Assistant</h3>
              <span className={advancedChatBotStyles.modelName}>
                <FaBrain className={advancedChatBotStyles.modelIcon} />
                {GROQ_MODELS.find((m) => m.id === settings.selectedModel)?.name}
              </span>
            </div>
          </div>
          <div className={advancedChatBotStyles.headerActions}>
            <button
              onClick={() => {
                setShowMemoryManager(!showMemoryManager);
                setShowModelSelector(false);
                setShowSettings(false);
              }}
              className={advancedChatBotStyles.memoryButton}
              title="Memory Management"
            >
              <FaMemory />
            </button>
            <button
              onClick={() => {
                setShowModelSelector(!showModelSelector);
                setShowSettings(false);
                setShowMemoryManager(false);
              }}
              className={advancedChatBotStyles.modelButton}
              title="Change Model"
            >
              <FaBrain />
            </button>
            <button
              onClick={() => {
                setShowSettings(!showSettings);
                setShowModelSelector(false);
                setShowMemoryManager(false);
              }}
              className={advancedChatBotStyles.settingsButton}
              title="Settings"
            >
              <FaCog />
            </button>
            <button
              onClick={onClose}
              className={advancedChatBotStyles.closeButton}
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Show context indicator when text is selected AND auto-context is enabled */}
        {selectedText && settings.autoContext && (
          <div className={advancedChatBotStyles.contextIndicator}>
            <span className={advancedChatBotStyles.contextIndicatorText}>
              <FaBrain className={advancedChatBotStyles.contextIcon} />
              Context from article will be used
            </span>
            <button
              onClick={() => setShowContextDropdown(!showContextDropdown)}
              className={advancedChatBotStyles.viewContextButton}
            >
              View Context
            </button>
          </div>
        )}

        {/* Context dropdown */}
        {showContextDropdown && selectedText && (
          <div className={advancedChatBotStyles.contextDropdown}>
            <div className={advancedChatBotStyles.contextDropdownHeader}>
              <h4>Context Being Used</h4>
              <button
                onClick={() => setShowContextDropdown(false)}
                className={advancedChatBotStyles.closeDropdownButton}
              >
                <FaTimes />
              </button>
            </div>
            <div
              className={advancedChatBotStyles.contextContent}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {selectedText}
            </div>
          </div>
        )}

        {showModelSelector && (
          <div className={advancedChatBotStyles.modelPanel}>
            <div className={advancedChatBotStyles.panelHeader}>
              <h3>Select Model</h3>
              <button
                onClick={() => setShowModelSelector(false)}
                className={advancedChatBotStyles.closePanelButton}
              >
                <FaTimes />
              </button>
            </div>
            <div className={advancedChatBotStyles.modelGrid}>
              {GROQ_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSettings((prev) => ({
                      ...prev,
                      selectedModel: model.id,
                    }));
                    setShowModelSelector(false);
                  }}
                  className={`${advancedChatBotStyles.modelCard} ${
                    settings.selectedModel === model.id ? advancedChatBotStyles.selected : ""
                  }`}
                >
                  <div className={advancedChatBotStyles.modelCardInfo}>
                    <span className={advancedChatBotStyles.modelCardName}>{model.name}</span>
                    <span className={advancedChatBotStyles.modelCardDescription}>
                      {model.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {showSettings && (
          <div className={advancedChatBotStyles.settingsPanel}>
            <div className={advancedChatBotStyles.panelHeader}>
              <h3>Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className={advancedChatBotStyles.closePanelButton}
              >
                <FaTimes />
              </button>
            </div>
            <div className={advancedChatBotStyles.settingsGrid}>
              <label className={advancedChatBotStyles.settingItem}>
                <input
                  type="checkbox"
                  checked={settings.autoContext}
                  onChange={(e) => {
                    const newAutoContext = e.target.checked;
                    setSettings((prev) => ({
                      ...prev,
                      autoContext: newAutoContext,
                    }));
                  }}
                />
                <span>Auto-use selected text as context</span>
              </label>
              <label className={advancedChatBotStyles.settingItem}>
                <input
                  type="checkbox"
                  checked={settings.memoryEnabled}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      memoryEnabled: e.target.checked,
                    }))
                  }
                />
                <span>Enable AI memory</span>
              </label>
              <label className={advancedChatBotStyles.settingItem}>
                <input
                  type="checkbox"
                  checked={settings.voiceEnabled}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      voiceEnabled: e.target.checked,
                    }))
                  }
                />
                <span>Enable voice input</span>
              </label>
              <label className={advancedChatBotStyles.settingItem}>
                <input
                  type="checkbox"
                  checked={settings.ttsEnabled}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      ttsEnabled: e.target.checked,
                    }))
                  }
                />
                <span>Enable text-to-speech</span>
              </label>
              <button onClick={clearChat} className={advancedChatBotStyles.clearButton}>
                Clear Chat History
              </button>
            </div>
          </div>
        )}

        {showMemoryManager && (
          <div className={advancedChatBotStyles.memoryPanel}>
            <div className={advancedChatBotStyles.panelHeader}>
              <h3>Memory Management</h3>
              <button
                onClick={() => setShowMemoryManager(false)}
                className={advancedChatBotStyles.closePanelButton}
              >
                <FaTimes />
              </button>
            </div>

            <div className={advancedChatBotStyles.memoryStats}>
              {memory.stats && (
                <div className={advancedChatBotStyles.statsGrid}>
                  <div className={advancedChatBotStyles.statItem}>
                    <span className={advancedChatBotStyles.statLabel}>Total Entries:</span>
                    <span className={advancedChatBotStyles.statValue}>
                      {memory.stats.totalEntries}
                    </span>
                  </div>
                  <div className={advancedChatBotStyles.statItem}>
                    <span className={advancedChatBotStyles.statLabel}>Storage Used:</span>
                    <span className={advancedChatBotStyles.statValue}>
                      {(memory.stats.totalSize / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className={advancedChatBotStyles.memorySearch}>
              <div className={advancedChatBotStyles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search memories..."
                  value={memorySearchQuery}
                  onChange={(e) => setMemorySearchQuery(e.target.value)}
                  onKeyPress={handleMemorySearchKeyPress}
                  className={advancedChatBotStyles.searchInput}
                />
                {memorySearchQuery && (
                  <button
                    onClick={clearMemorySearch}
                    className={advancedChatBotStyles.clearSearchButton}
                    title="Clear search"
                  >
                    <FaTimesCircle />
                  </button>
                )}
                <button
                  onClick={handleMemorySearch}
                  className={advancedChatBotStyles.searchButton}
                  title="Search"
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className={advancedChatBotStyles.memoryActions}>
              <button
                onClick={handleMemoryExport}
                className={advancedChatBotStyles.exportButton}
                title="Export Memory"
              >
                <FaDownload /> Export
              </button>
              <label className={advancedChatBotStyles.importButton}>
                <FaUpload /> Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleMemoryImport}
                  style={{ display: "none" }}
                />
              </label>
              <button
                onClick={() => memory.clearMemories()}
                className={advancedChatBotStyles.clearMemoryButton}
                title="Clear All Memory"
              >
                <FaTrash /> Clear All
              </button>
            </div>

            <div className={advancedChatBotStyles.memoryList}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            >
              {memory.entries.length > 0 ? (
                memory.entries.map((entry) => (
                  <div key={entry.id} className={advancedChatBotStyles.memoryEntry}>
                    <div className={advancedChatBotStyles.memoryHeader}>
                      <span className={advancedChatBotStyles.memoryType}>{entry.type}</span>
                      <span className={advancedChatBotStyles.memoryTime}>
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className={advancedChatBotStyles.memoryContent}>
                      {entry.content.length > 150
                        ? `${entry.content.substring(0, 150)}...`
                        : entry.content}
                    </div>
                    {entry.tags.length > 0 && (
                      <div className={advancedChatBotStyles.memoryTags}>
                        {entry.tags.map((tag, index) => (
                          <span key={index} className={advancedChatBotStyles.memoryTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className={advancedChatBotStyles.noMemories}>
                  <p>No memories found. Start chatting to build your memory!</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className={advancedChatBotStyles.messagesContainer}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onWheel={handleMessagesScroll}
        >
          {messages.length === 0 && (
            <div className={advancedChatBotStyles.welcomeMessage}>
              <div className={advancedChatBotStyles.welcomeIcon}>
                <FaRobot className={advancedChatBotStyles.welcomeIconSvg} />
              </div>
              <h4>Welcome to AI Assistant</h4>
              <p>
                I'm here to help you understand this article better. Ask me
                anything!
              </p>
              <div className={advancedChatBotStyles.suggestions}>
                <button
                  className={advancedChatBotStyles.suggestionBtn}
                  onClick={() =>
                    setInput("Explain the key concepts in this article")
                  }
                >
                  Explain concepts
                </button>
                <button
                  className={advancedChatBotStyles.suggestionBtn}
                  onClick={() =>
                    setInput("Provide practical examples from this content")
                  }
                >
                  Provide examples
                </button>
                <button
                  className={advancedChatBotStyles.suggestionBtn}
                  onClick={() =>
                    setInput("Analyze the main arguments and insights")
                  }
                >
                  Analyze content
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`${advancedChatBotStyles.message} ${advancedChatBotStyles[message.type]} ${
                message.isStreaming ? advancedChatBotStyles.streaming : ""
              }`}
            >
              <div className={advancedChatBotStyles.avatar}>
                {message.type === "user" ? (
                  <FaUserCircle className={advancedChatBotStyles.userAvatar} />
                ) : (
                  <div className={advancedChatBotStyles.aiAvatar}>
                    <FaRobot className={advancedChatBotStyles.aiAvatarIcon} />
                  </div>
                )}
              </div>
              <div className={advancedChatBotStyles.messageContent}>
                {message.imageUrl && (
                  <img
                    src={message.imageUrl}
                    alt="Uploaded"
                    className={advancedChatBotStyles.messageImage}
                  />
                )}
                {message.type === "user" &&
                  message.content.includes("**Context:**") && (
                    <div className={advancedChatBotStyles.contextBadge}>
                      Context from article
                    </div>
                  )}
                <div className={advancedChatBotStyles.messageText}>
                  <ReactMarkdown
                    components={{
                      code: ({ inline, className, children }: any) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const language = match ? match[1] : "";

                        if (!inline && language) {
                          return (
                            <div className={advancedChatBotStyles.codeBlockContainer}>
                              <div className={advancedChatBotStyles.codeBlockHeader}>
                                <span>{language}</span>
                                <button
                                  className={advancedChatBotStyles.copyButton}
                                  onClick={() =>
                                    copyToClipboard(String(children))
                                  }
                                  title={
                                    copiedCode === String(children)
                                      ? "Copied!"
                                      : "Copy code"
                                  }
                                >
                                  {copiedCode === String(children) ? (
                                    "✓"
                                  ) : (
                                    <FaCopy />
                                  )}
                                </button>
                              </div>
                              <div className={advancedChatBotStyles.codeBlockContent}>
                                <SyntaxHighlighter
                                  style={oneDark}
                                  language={language}
                                  PreTag="div"
                                  customStyle={{
                                    margin: 0,
                                    background: "transparent",
                                    fontSize: "0.8125rem",
                                  }}
                                >
                                  {String(children)}
                                </SyntaxHighlighter>
                              </div>
                            </div>
                          );
                        }

                        return <code className={className}>{children}</code>;
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                  {message.isStreaming && (
                    <span className={advancedChatBotStyles.cursor}>|</span>
                  )}
                </div>
              </div>
              <div className={advancedChatBotStyles.messageActions}>
                <span className={advancedChatBotStyles.messageTime}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
                {message.type === "ai" && settings.ttsEnabled && (
                  <button
                    onClick={togglePlayback}
                    className={advancedChatBotStyles.playButton}
                    title="Play response"
                  >
                    {isPlaying ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={`${advancedChatBotStyles.message} ${advancedChatBotStyles.ai} ${advancedChatBotStyles.loading}`}>
              <div className={advancedChatBotStyles.avatar}>
                <span className={advancedChatBotStyles.avatarText}>AI</span>
              </div>
              <div className={advancedChatBotStyles.messageContent}>
                <div className={advancedChatBotStyles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {dragActive && (
            <div className={advancedChatBotStyles.dropZone}>
              <FaImage className={advancedChatBotStyles.dropIcon} />
              <p>Drop image here to analyze</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className={advancedChatBotStyles.inputContainer}>
          <div className={advancedChatBotStyles.inputActions}>
            {settings.voiceEnabled && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`${advancedChatBotStyles.voiceButton} ${isRecording ? advancedChatBotStyles.recording : ""}`}
                title={isRecording ? "Stop recording" : "Start voice input"}
              >
                {isRecording ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              className={advancedChatBotStyles.imageButton}
              title="Upload image"
            >
              <FaImage />
            </button>
          </div>

          <textarea
            value={input}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onChange={(e) => {
              setInput(e.target.value);
              e.stopPropagation();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about this article..."
            disabled={isLoading}
            rows={1}
            className={advancedChatBotStyles.messageInput}
          />

          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim() || remainingRequests <= 0}
            className={advancedChatBotStyles.sendButton}
            title={remainingRequests <= 0 ? "Rate limit exceeded" : `${remainingRequests} requests remaining`}
          >
            <IoMdSend />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleImageUpload(e.target.files[0])
            }
            className={advancedChatBotStyles.fileInput}
          />
        </div>
      </div>
    </div>
  );
}


// ============================================================
// Source: ArticleRouteDialog.tsx
// ============================================================
interface ArticleRouteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleRouteDialog: React.FC<ArticleRouteDialogProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleVisitArticles = () => {
    router.push('/articles');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={articleRouteDialogStyles.overlay} onClick={onClose}>
      <div className={articleRouteDialogStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={articleRouteDialogStyles.header}>
          <h2 className={articleRouteDialogStyles.title}>AI Chat</h2>
          <button className={articleRouteDialogStyles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={articleRouteDialogStyles.content}>
          <div className={articleRouteDialogStyles.iconSection}>
            <div className={articleRouteDialogStyles.robotIcon}>
              <FaRobot />
            </div>
          </div>
          
          <div className={articleRouteDialogStyles.textSection}>
            <h3 className={articleRouteDialogStyles.messageTitle}>
              AI Chat Works with Articles
            </h3>
            <p className={articleRouteDialogStyles.message}>
              Visit our articles section to experience AI-powered learning assistance. Get personalized answers and enhance your understanding of complex topics.
            </p>
          </div>
          
          <div className={articleRouteDialogStyles.featuresSection}>
            <div className={articleRouteDialogStyles.featureItem}>
              <FaBookOpen className={articleRouteDialogStyles.featureIcon} />
              <span>Context-aware responses</span>
            </div>
            <div className={articleRouteDialogStyles.featureItem}>
              <FaRobot className={articleRouteDialogStyles.featureIcon} />
              <span>Personalized learning</span>
            </div>
          </div>
          
          <div className={articleRouteDialogStyles.actionSection}>
            <button
              onClick={handleVisitArticles}
              className={articleRouteDialogStyles.visitButton}
            >
              <span>Visit Articles</span>
              <FaArrowRight className={articleRouteDialogStyles.buttonIcon} />
            </button>
            
            <button
              onClick={onClose}
              className={articleRouteDialogStyles.cancelButton}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================
// Source: ChatButton.tsx
// ============================================================
interface ChatButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  unreadCount?: number;
}

export function ChatButton({ isOpen, onToggle, unreadCount = 0 }: ChatButtonProps) {
  const router = useRouter();
  const [isPulsing, setIsPulsing] = useState(false);
  const [showRouteDialog, setShowRouteDialog] = useState(false);

  useEffect(() => {
    // Pulse animation when there are unread messages
    if (unreadCount > 0 && !isOpen) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount, isOpen]);

  const handleChatClick = () => {
    // Check if current route is /articles sub-route but not /articles itself
    const isArticlesSubRoute = router.pathname.startsWith('/articles/') && router.pathname !== '/articles';
    
    if (isArticlesSubRoute) {
      onToggle();
    } else {
      setShowRouteDialog(true);
    }
  };

  return (
    <>
    <button
      onClick={handleChatClick}
      className={`${chatButtonStyles.chatButton} ${isOpen ? chatButtonStyles.open : ''} ${
        isPulsing ? chatButtonStyles.pulsing : ''
      }`}
      title={isOpen ? 'Close chat' : 'Ask AI'}
      aria-label={isOpen ? 'Close chat' : 'Ask AI'}
    >
      <div className={chatButtonStyles.buttonContent}>
        {isOpen ? (
          <FaTimes className={chatButtonStyles.icon} />
        ) : (
          <>
            <FaComments className={chatButtonStyles.icon} />
            {unreadCount > 0 && (
              <span className={chatButtonStyles.unreadBadge}>{unreadCount}</span>
            )}
          </>
        )}
      </div>
      
      <div className={chatButtonStyles.tooltip}>
        {isOpen ? 'Close chat' : 'Ask AI'}
      </div>
    </button>
    
    <ArticleRouteDialog
      isOpen={showRouteDialog}
      onClose={() => setShowRouteDialog(false)}
    />
    </>
  );
}


// ============================================================
// Source: ChatComponents.tsx
// ============================================================
export function ChatComponents() {
  const { isChatOpen, toggleChat } = useChat();

  return (
    <>
      <ChatButton 
        isOpen={isChatOpen}
        onToggle={toggleChat}
      />
      
      <AdvancedChatBot 
        articleSlug={useChat().articleSlug}
        articleContent={useChat().articleContent}
        selectedText={useChat().selectedText}
        isOpen={isChatOpen}
        onClose={useChat().closeChat}
      />
    </>
  );
}


// ============================================================
// Source: NewAIChatBot.tsx
// ============================================================

// Import Excalidraw CSS exactly like in test component
import '@excalidraw/excalidraw/index.css';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

// Dynamically import Excalidraw component like in test component
const ExcalidrawComponent = dynamic<any>(
  () => import('./excalidraw.feature'),
  { ssr: false }
);


interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}


export function NewAIChatBot() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [diagramElements, setDiagramElements] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingDiagram, setIsGeneratingDiagram] = useState(false);
  
  const [settings, setSettings] = useState<ChatSettings>({
    autoContext: false,
    voiceEnabled: true,
    selectedModel: "meta-llama/llama-4-scout-17b-16e-instruct",
    ttsEnabled: false,
    memoryEnabled: true,
    showMemoryContext: true,
  });

  const [requestTimes, setRequestTimes] = useState<number[]>([]);
  const [feedbackData, setFeedbackData] = useState<Map<string, { liked: boolean; disliked: boolean; replied: boolean }>>(new Map());
  const [feedbackModal, setFeedbackModal] = useState<{ isOpen: boolean; messageId: string; type: 'like' | 'dislike' }>({ isOpen: false, messageId: '', type: 'like' });
  const [feedbackInput, setFeedbackInput] = useState('');
  const RATE_LIMIT = 5;
  const RATE_WINDOW = 60000;

  // Initialize diagram parser
  const diagramParser = useRef(new DiagramParser()).current;

  // Handle fullscreen toggle for Excalidraw
  const handleFullscreenToggle = useCallback((fullscreen: boolean) => {
    setIsFullscreen(fullscreen);
  }, []);

  // Handle AI response with diagram parsing
  const handleAIResponse = useCallback(async (aiContent: string, theme: string = 'dark') => {
    console.log('🎨 === AI RESPONSE HANDLING START ===');
    console.log('🎨 handleAIResponse called with content length:', aiContent.length);
    console.log('🎨 Content preview:', aiContent.substring(0, 200) + '...');
    console.log('🎨 Theme:', theme);
    
    const parsed = await diagramParser.parseAIResponse(aiContent, theme);
    
    console.log('📊 Parsed result:', {
      hasContent: !!parsed.content,
      hasDiagram: !!parsed.diagram,
      elementCount: parsed.diagram?.elements?.length || 0,
      diagramType: parsed.diagram?.diagramType
    });
    
    if (parsed.diagram) {
      console.log('📝 Diagram elements preview:', parsed.diagram.elements.slice(0, 2));
    }
    
    // Set text response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content: parsed.content,
      timestamp: new Date(),
    };
    
    console.log('💬 Adding AI message to chat:', aiMessage.id);
    setMessages(prev => [...prev, aiMessage]);
    
    // Handle diagram generation
    if (parsed.diagram && parsed.diagram.elements.length > 0) {
      console.log('🔄 === DIAGRAM GENERATION START ===');
      console.log('🔄 Starting diagram generation with', parsed.diagram.elements.length, 'elements');
      setIsGeneratingDiagram(true);
      
      try {
        console.log('🔄 Calling convertToExcalidraw...');
        const excalidrawElements = await diagramParser.convertToExcalidraw(parsed.diagram.elements);
        
        console.log('✅ === CONVERSION COMPLETE ===');
        console.log('✅ Conversion result:', {
          success: excalidrawElements.length > 0,
          elementCount: excalidrawElements.length,
          firstElement: excalidrawElements[0],
          allElements: excalidrawElements
        });
        
        if (excalidrawElements.length > 0) {
          console.log('🔄 === UPDATING REACT STATE ===');
          console.log('🔄 Accumulating', excalidrawElements.length, 'new elements');
          
          // Use accumulation instead of replacement
          handleNewAIGeneratedElements(excalidrawElements);
          
          console.log('🔄 Setting isDrawMode to true');
          setIsDrawMode(true); // Auto-switch to draw mode
          
          console.log('🎨 Showing success notification');
          showNotification('🎨 Diagram added! Elements accumulated.');
          
          console.log('✅ === STATE UPDATE COMPLETE ===');
          console.log('✅ Current state:', {
            diagramElementsLength: diagramElements.length,
            isDrawMode: true,
            isGeneratingDiagram: false
          });
        } else {
          console.log('❌ No elements returned from conversion');
          showNotification('⚠️ Diagram generation failed. Showing text response only.');
        }
      } catch (error) {
        console.error('❌ === CONVERSION ERROR ===');
        console.error('❌ Diagram conversion failed:', error);
        showNotification('⚠️ Diagram conversion failed. Please try again.');
      } finally {
        console.log('🏁 === DIAGRAM GENERATION END ===');
        setIsGeneratingDiagram(false);
      }
    } else {
      console.log('ℹ️ No diagram found in AI response');
    }
    
    console.log('🎨 === AI RESPONSE HANDLING END ===');
  }, [diagramParser]);

  // Show notification helper
  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: rgba(250, 204, 21, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  // Check if user is requesting a diagram
  const isDiagramRequest = useCallback((content: string) => {
    console.log('🔍 === DIAGRAM REQUEST CHECK ===');
    console.log('🔍 Checking content:', content);
    const isRequest = diagramParser.isDiagramRequest(content);
    console.log('🔍 Is diagram request:', isRequest);
    return isRequest;
  }, [diagramParser]);

  // Auto-collapse sidebar when entering draw mode
  useEffect(() => {
    console.log('🔄 === SIDEBAR EFFECT ===');
    console.log('🔄 isDrawMode changed:', isDrawMode);
    
    if (isDrawMode) {
      console.log('🔄 Collapsing sidebar for draw mode');
      setSidebarOpen(false);
    }
  }, [isDrawMode]);

  // Track diagramElements state changes
  useEffect(() => {
    console.log('📊 === DIAGRAM ELEMENTS STATE CHANGE ===');
    console.log('📊 diagramElements length:', diagramElements.length);
    console.log('📊 diagramElements:', diagramElements);
    console.log('📊 isDrawMode:', isDrawMode);
  }, [diagramElements, isDrawMode]);

  // Track previous elements to detect user changes vs initialization
  const prevElementsRef = useRef<any[]>([]);
  const isExcalidrawInitialized = useRef(false);
  const accumulatedElementsRef = useRef<any[]>([]);
  
  useEffect(() => {
    prevElementsRef.current = diagramElements;
  }, [diagramElements]);

  // Accumulate new AI elements instead of replacing
  const handleNewAIGeneratedElements = useCallback((newElements: any[]) => {
    console.log('🔄 === ACCUMULATING ELEMENTS ===');
    console.log('🔄 Previous elements:', accumulatedElementsRef.current.length);
    console.log('🔄 New elements:', newElements.length);
    
    // Combine existing elements with new AI elements
    const combinedElements = [...accumulatedElementsRef.current, ...newElements];
    accumulatedElementsRef.current = combinedElements;
    
    console.log('🔄 Combined elements:', combinedElements.length);
    setDiagramElements(combinedElements);
  }, []);

  // Reset accumulation when user wants to start fresh
  const resetDiagram = useCallback(() => {
    console.log('🔄 === RESETTING DIAGRAM ===');
    accumulatedElementsRef.current = [];
    setDiagramElements([]);
    setIsDrawMode(false);
  }, []);

  // Track isDrawMode state changes  
  useEffect(() => {
    console.log('🎨 === DRAW MODE STATE CHANGE ===');
    console.log('🎨 isDrawMode:', isDrawMode);
    console.log('🎨 diagramElements length:', diagramElements.length);
    
    // Reset Excalidraw initialization flag when entering draw mode
    if (isDrawMode) {
      isExcalidrawInitialized.current = false;
      console.log('🔧 Reset Excalidraw initialization flag for new draw mode');
    }
  }, [isDrawMode]);

  const convertHtmlToMarkdown = (html: string): string => {
    if (typeof window === 'undefined') return html;
    
    // Create a temporary div to parse HTML
    const div = document.createElement('div');
    div.innerHTML = html;
    
    // Convert to plain text first
    let text = div.textContent || div.innerText || '';
    
    // Clean up extra whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    return text;
  };

  const cleanInputForAI = (content: string): string => {
    // If content contains HTML tags, convert to plain text
    if (content.includes('<')) {
      return convertHtmlToMarkdown(content);
    }
    return content;
  };

  const extractImagesFromContent = (content: string): string[] => {
    const images: string[] = [];
    
    // Extract base64 images from Quill content
    const imgRegex = /<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/g;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      const [fullMatch, mimeType, base64Data] = match;
      // Reconstruct the full data URL
      const dataUrl = `data:image/${mimeType};base64,${base64Data}`;
      images.push(dataUrl);
    }
    
    return images;
  };

  const removeImagesFromContent = (content: string): string => {
    // Remove all image tags from content
    return content.replace(/<img[^>]*>/g, '');
  };

  // Save only response feedback data to localStorage
  useEffect(() => {
    if (isClient && feedbackData.size > 0) {
      localStorage.setItem('message-feedback', JSON.stringify(Array.from(feedbackData.entries())));
    }
  }, [feedbackData, isClient]);

  // Clean up old message feedback on startup
  useEffect(() => {
    if (isClient) {
      // Remove old message feedback, keep only response feedback
      localStorage.removeItem('message-feedback');
      console.log('🧹 Cleaned up old message feedback - keeping only response feedback');
    }
  }, [isClient]);

  // Feedback handlers with response content and user prompting
  const handleLike = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;
    
    // Open feedback modal
    setFeedbackModal({ isOpen: true, messageId, type: 'like' });
    setFeedbackInput('');
  };

  const handleDislike = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;
    
    // Open feedback modal
    setFeedbackModal({ isOpen: true, messageId, type: 'dislike' });
    setFeedbackInput('');
  };

  const handleFeedbackSubmit = () => {
    const { messageId, type } = feedbackModal;
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    const feedbackEntry = {
      messageId,
      responseContent: message.content,
      feedback: type === 'like' ? 'liked' : 'disliked',
      userFeedback: feedbackInput || `User ${type === 'like' ? 'liked' : 'disliked'} this response`,
      timestamp: new Date().toISOString()
    };

    setFeedbackData(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(messageId) || { liked: false, disliked: false, replied: false };
      newMap.set(messageId, {
        ...current,
        liked: type === 'like' ? !current.liked : false,
        disliked: type === 'dislike' ? !current.disliked : false
      });
      return newMap;
    });

    // Show feedback notification
    showFeedbackNotification(`${type === 'like' ? '👍' : '👎'} Feedback saved! Thank you for helping us improve.`);

    // Store response content for AI learning
    const existingFeedback = JSON.parse(localStorage.getItem('response-feedback') || '[]');
    localStorage.setItem('response-feedback', JSON.stringify([...existingFeedback, feedbackEntry]));

    // Close modal
    setFeedbackModal({ isOpen: false, messageId: '', type: 'like' });
    setFeedbackInput('');
  };

  const handleFeedbackCancel = () => {
    setFeedbackModal({ isOpen: false, messageId: '', type: 'like' });
    setFeedbackInput('');
  };

  const showFeedbackNotification = (message: string) => {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: rgba(250, 204, 21, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  // Console log feedback storage
  useEffect(() => {
    if (isClient && feedbackData.size > 0) {
      console.log('💾 Feedback Data Stored:', Array.from(feedbackData.entries()));
      console.log('💾 localStorage "message-feedback":', localStorage.getItem('message-feedback'));
    }
  }, [feedbackData, isClient]);

  const handleReply = (messageId: string) => {
    setFeedbackData(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(messageId) || { liked: false, disliked: false, replied: false };
      newMap.set(messageId, {
        ...current,
        replied: !current.replied
      });
      return newMap;
    });
    
    // Find the message and add it to input
    const message = messages.find(m => m.id === messageId);
    if (message) {
      const quotedText = `> ${message.content.split('\n').map(line => `> ${line}`).join('\n')}\n\n`;
      setInput(quotedText);
      
      // Focus input
      const inputElement = document.querySelector('.quill-editor .ql-editor') as HTMLElement;
      if (inputElement) {
        inputElement.focus();
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    const savedConversations = localStorage.getItem('ai-conversations');
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed.map((c: Conversation) => ({
          ...c,
          timestamp: new Date(c.timestamp),
          messages: c.messages.map((m: Message) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        })));
      } catch (error) {
        console.error('Failed to load conversations:', error);
      }
    }
    
    const savedFeedback = localStorage.getItem('message-feedback');
    if (savedFeedback) {
      try {
        const parsed = JSON.parse(savedFeedback);
        setFeedbackData(new Map(parsed));
      } catch (error) {
        console.error('Failed to load feedback data:', error);
      }
    }
    
    // Check for pending message from homepage
    const pendingMessage = localStorage.getItem('pending-message');
    if (pendingMessage) {
      localStorage.removeItem('pending-message');
      
      // Extract images from pending message
      const images = extractImagesFromContent(pendingMessage);
      console.log('🔍 AI Dashboard - Extracted images:', images.length);
      console.log('🔍 AI Dashboard - Pending message preview:', pendingMessage.substring(0, 200));
      
      const cleanContent = cleanInputForAI(removeImagesFromContent(pendingMessage));
      console.log('🔍 AI Dashboard - Clean content:', cleanContent.substring(0, 100));
      
      // Create new conversation with pending message
      const newConv: Conversation = {
        id: Date.now().toString(),
        title: cleanContent.slice(0, 30) + (cleanContent.length > 30 ? "..." : ""),
        messages: [],
        timestamp: new Date(),
      };
      setConversations(prev => [newConv, ...prev]);
      setCurrentConversationId(newConv.id);
      
      // Create user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: cleanContent, // Clean HTML from Quill editor
        timestamp: new Date(),
        images: images, // Include the extracted images
      };
      setMessages([userMessage]);
      
      // Update conversation and send to AI
      setConversations(prev => [{
        ...newConv,
        messages: [userMessage]
      }, ...prev.filter(c => c.id !== newConv.id)]);
      
      // Send to AI after a short delay to ensure state is updated
      setTimeout(() => {
        sendAIMessage(cleanContent, newConv.id, images);
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('ai-conversations', JSON.stringify(conversations));
    }
  }, [conversations, isClient]);

  // Sync messages with current conversation
  useEffect(() => {
    if (currentConversationId && conversations.length > 0) {
      const currentConv = conversations.find(c => c.id === currentConversationId);
      if (currentConv) {
        setMessages(currentConv.messages);
      }
    }
  }, [currentConversationId, conversations, isClient]);

  const createNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      timestamp: new Date(),
    };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(newConv.id);
    setMessages([]);
    setInput("");
  };

  const selectConversation = (id: string) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setCurrentConversationId(id);
      setMessages(conv.messages);
    }
  };

  const deleteConversation = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    setConversations(updatedConversations);
    
    // Update localStorage
    localStorage.setItem('ai-conversations', JSON.stringify(updatedConversations));
    
    // Clear current conversation if it was deleted
    if (currentConversationId === id) {
      setCurrentConversationId(null);
      setMessages([]);
    }
  };

  const updateConversationTitle = (content: string) => {
    if (!currentConversationId) return;
    const title = content.slice(0, 30) + (content.length > 30 ? "..." : "");
    setConversations(prev => prev.map(c => 
      c.id === currentConversationId ? { ...c, title } : c
    ));
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const sendAIMessage = async (messageContent: string, conversationId: string, images?: string[]) => {
    setIsLoading(true);
    
    console.log('🚀 AI Dashboard - Sending message with images:', images?.length || 0);
    console.log('🚀 AI Dashboard - Message content:', messageContent.substring(0, 100));
    
    // Check if user is requesting a diagram
    const wantsDiagram = isDiagramRequest(messageContent);
    const wantsMermaid = diagramParser.isMermaidRequest(messageContent);
    console.log('🎨 Diagram request detected:', wantsDiagram);
    console.log('🐳 Mermaid request detected:', wantsMermaid);
    
    // Get ALL feedback data (both message feedback and response feedback)
    const currentFeedback = Array.from(feedbackData.entries()).map(([messageId, feedback]) => ({
      messageId,
      ...feedback
    }));
    
    // Get response feedback data for AI learning
    const responseFeedbackData = JSON.parse(localStorage.getItem('response-feedback') || '[]');
    
    // Log all feedback data being sent to AI
    console.log('📤 Sending to AI - Message Feedback:', currentFeedback);
    console.log('📤 Sending to AI - Response Feedback:', responseFeedbackData);
    
    try {
      const modelToUse = images && images.length > 0
        ? "meta-llama/llama-4-scout-17b-16e-instruct"
        : settings.selectedModel;

      // Build memory context from conversation history
      const conversation = conversations.find(c => c.id === conversationId);
      const history = conversation?.messages || messages;
      const memoryContext = history
        .map(m => `${m.type === 'user' ? 'User' : 'AI'}: ${m.content}`)
        .join('\n\n');

      const requestBody: any = {
        question: wantsMermaid ? `${MERMAID_GENERATION_PROMPT}\n\nUser request: ${messageContent}` : 
                  wantsDiagram ? `${DIAGRAM_GENERATION_PROMPT}\n\nUser request: ${messageContent}` : messageContent,
        model: modelToUse,
        stream: true,
        memoryContext: memoryContext || undefined,
        images: images || undefined,
        feedbackData: currentFeedback, // Send message feedback
        responseFeedbackData: responseFeedbackData, // Send response feedback
        diagramMode: wantsDiagram || wantsMermaid, // Tell AI to expect diagram generation
        mermaidMode: wantsMermaid // Tell AI to generate Mermaid syntax
      };
      
      console.log('🚀 AI Dashboard - Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch("/api/ai-chat-enhanced", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let aiContent = "";
      const aiMessageId = (Date.now() + 1).toString();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.choices?.[0]?.delta?.content) {
                  aiContent += parsed.choices[0].delta.content;

                  setMessages((prev) => {
                    const updated = [...prev];
                    const existingIndex = updated.findIndex(
                      (m) => m.id === aiMessageId,
                    );

                    if (existingIndex >= 0) {
                      updated[existingIndex] = {
                        ...updated[existingIndex],
                        content: aiContent,
                        isStreaming: true,
                      };
                    } else {
                      const newMessage: Message = {
                        id: aiMessageId,
                        type: "ai",
                        content: aiContent,
                        timestamp: new Date(),
                        isStreaming: true,
                      };
                      updated.push(newMessage);
                    }

                    return updated;
                  });
                }
              } catch (e) {}
            }
          }
        }
      }

      // Process complete response for diagram parsing
      console.log('📞 === CALLING handleAIResponse ===');
      console.log('📞 AI content length:', aiContent.length);
      console.log('📞 AI content preview:', aiContent.substring(0, 300) + '...');
      await handleAIResponse(aiContent, 'dark'); // Use dark theme consistently

      // Save final AI message to conversation
      setConversations(prev => prev.map(c => 
        c.id === conversationId ? { ...c, messages: [...c.messages.filter(m => m.id !== aiMessageId), { id: aiMessageId, type: "ai", content: aiContent, timestamp: new Date(), isStreaming: false }] } : c
      ));

      if (settings.ttsEnabled && aiContent) {
        await handleTextToSpeech(aiContent);
      }
    } catch (error) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      
      // Save error message to conversation
      setConversations(prev => prev.map(c => 
        c.id === conversationId ? { ...c, messages: [...c.messages, aiMessage] } : c
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const now = Date.now();
    const recentRequests = requestTimes.filter(time => now - time < RATE_WINDOW);
    
    if (recentRequests.length >= RATE_LIMIT) {
      const oldestRequest = Math.min(...recentRequests);
      const waitTime = Math.ceil((oldestRequest + RATE_WINDOW - now) / 1000);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: `⚠️ Rate limit exceeded. Please wait ${waitTime} seconds before sending another message.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    setRequestTimes([...recentRequests, now]);

    // Extract images from Quill content
    const images = extractImagesFromContent(input);
    const cleanContent = cleanInputForAI(removeImagesFromContent(input));

    // Create conversation first if needed
    let targetConversationId = currentConversationId;
    if (!targetConversationId) {
      const newConv: Conversation = {
        id: Date.now().toString(),
        title: cleanContent.slice(0, 30) + (cleanContent.length > 30 ? "..." : ""),
        messages: [],
        timestamp: new Date(),
      };
      setConversations(prev => [newConv, ...prev]);
      setCurrentConversationId(newConv.id);
      targetConversationId = newConv.id;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: cleanContent, // Clean HTML from Quill editor
      timestamp: new Date(),
      images: images, // Include the extracted images
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    // Update conversation with new message immediately
    setConversations(prev => prev.map(c => 
      c.id === targetConversationId ? { ...c, messages: newMessages } : c
    ));

    await sendAIMessage(cleanContent, targetConversationId, images);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuillKeyPress = () => {
    // Handle Enter key in Quill editor
    handleSendMessage();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      let mimeType = "audio/webm";
      let options: MediaRecorderOptions = { mimeType };

      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "audio/mp4";
        options = { mimeType };

        if (!MediaRecorder.isTypeSupported(mimeType)) {
          options = {};
          mimeType = "";
        }
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const actualMimeType =
          mediaRecorder.mimeType ||
          audioChunksRef.current[0]?.type ||
          "audio/webm";

        const audioBlob = new Blob(audioChunksRef.current, {
          type: actualMimeType,
        });

        await handleVoiceTranscription(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      alert(`Microphone access failed. Please check your browser permissions.`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (error) {}

      setIsRecording(false);
    }
  };

  const handleVoiceTranscription = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();

      const fileExtension = audioBlob.type.includes("webm")
        ? "webm"
        : audioBlob.type.includes("mp4")
          ? "mp4"
          : audioBlob.type.includes("wav")
            ? "wav"
            : "webm";

      const fileName = `recording.${fileExtension}`;
      formData.append("file", audioBlob, fileName);
      formData.append("model", "whisper-large-v3-turbo");

      const response = await fetch("/api/voice-transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorDetails = "Unknown error";
        try {
          const errorData = await response.json();
          errorDetails = errorData.error || JSON.stringify(errorData);
        } catch (e) {}

        throw new Error(
          `Transcription failed: ${response.status} ${response.statusText} - ${errorDetails}`,
        );
      }

      const data = await response.json();

      if (data.text) {
        setInput(data.text);
      }
    } catch (error) {
      alert(`Voice transcription failed. Please try again.`);
    }
  };

  const handleTextToSpeech = async (text: string) => {
    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          model: "canopylabs/orpheus-v1-english",
        }),
      });

      if (!response.ok) throw new Error("TTS failed");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onplay = () => {};
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {}
  };

  const handleImageUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      // Convert uploaded image URL to base64 for Quill editor
      const imageResponse = await fetch(data.url);
      const blob = await imageResponse.blob();
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      // Add the image to the Quill editor content
      const imageHtml = `<img src="${base64}" alt="Uploaded image" style="max-width: 200px; max-height: 200px; border-radius: 8px; margin: 8px 0;" />`;
      setInput(prev => prev + imageHtml);
      
    } catch (error) {
      alert(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const clearChat = () => {
    setMessages([]);
    if (currentConversationId) {
      setConversations(prev => prev.map(c => 
        c.id === currentConversationId ? { ...c, messages: [] } : c
      ));
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {}
  };

  const regenerateResponse = (messageId: string) => {
    // Regenerate the AI response for this message
    const message = messages.find(m => m.id === messageId);
    if (message && currentConversationId) {
      // Find the previous user message
      const messageIndex = messages.findIndex(m => m.id === messageId);
      const previousUserMessage = messages.slice(0, messageIndex).reverse().find(m => m.type === 'user');
      if (previousUserMessage) {
        // Remove the old AI message and regenerate
        const updatedMessages = messages.filter(m => m.id !== messageId);
        setMessages(updatedMessages);
        setConversations(prev => prev.map(c => 
          c.id === currentConversationId ? { ...c, messages: updatedMessages } : c
        ));
        sendAIMessage(previousUserMessage.content, currentConversationId);
      }
    }
  };

  const quoteMessage = (content: string) => {
    // Quote the message by adding it to the input
    setInput(prev => prev + (prev ? '\n> ' : '> ') + content.split('\n').join('\n> ') + '\n\n');
  };

  const shareMessage = (content: string) => {
    // Share the message (copy to clipboard for now)
    copyToClipboard(content);
  };

  return (
    <div className={newAIChatBotStyles.chatContainer}>
      {/* Sidebar */}
      <div className={`${newAIChatBotStyles.sidebar} ${sidebarOpen ? newAIChatBotStyles.sidebarOpen : newAIChatBotStyles.sidebarClosed}`}>
        <div className={newAIChatBotStyles.sidebarHeader}>
          {/* <div className={newAIChatBotStyles.sidebarLogo}>100X</div> */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className={newAIChatBotStyles.closeSidebarButton}
          >
            {sidebarOpen ? <FaChevronLeft /> : <></>}
          </button>
        </div>

        {/* Navigation */}
        <div className={newAIChatBotStyles.navSection}>
          <div className={`${newAIChatBotStyles.navItem} ${newAIChatBotStyles.active}`}>
            <FaSearch className={newAIChatBotStyles.navIcon} />
            <span className={newAIChatBotStyles.navText}>Search</span>
          </div>
          <div className={newAIChatBotStyles.navItem}>
            <FaComment className={newAIChatBotStyles.navIcon} />
            <span className={newAIChatBotStyles.navText}>Chat</span>
          </div>
          <div className={newAIChatBotStyles.navItem}>
            <FaMicrophone className={newAIChatBotStyles.navIcon} />
            <span className={newAIChatBotStyles.navText}>Voice</span>
          </div>
          <div className={newAIChatBotStyles.navItem}>
            <FaWaveSquare className={newAIChatBotStyles.navIcon} />
            <span className={newAIChatBotStyles.navText}>Imagine</span>
          </div>
        </div>

        {/* History Section */}
        <div className={newAIChatBotStyles.historySection}>
          <div className={newAIChatBotStyles.sectionHeader}>
            <div className={newAIChatBotStyles.sectionTitle}>History</div>
            {/* <button className={newAIChatBotStyles.navDropdown}>
              {sidebarOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button> */}
          </div>
          {showAllHistory ? (
            conversations.map((conv) => (
              <div key={conv.id} className={newAIChatBotStyles.historyItem} onClick={() => selectConversation(conv.id)}>
                {/* <FaComment className={newAIChatBotStyles.historyIcon} /> */}
                <span>{conv.title}</span>
                <button
                  onClick={(e) => deleteConversation(conv.id, e)}
                  className={newAIChatBotStyles.deleteButton}
                  title="Delete conversation"
                >
                  <FaTimes />
                </button>
              </div>
            ))
          ) : (
            conversations.slice(0, 3).map((conv) => (
              <div key={conv.id} className={newAIChatBotStyles.historyItem} onClick={() => selectConversation(conv.id)}>
                {/* <FaComment className={newAIChatBotStyles.historyIcon} /> */}
                <span>{conv.title}</span>
                <button
                  onClick={(e) => deleteConversation(conv.id, e)}
                  className={newAIChatBotStyles.deleteButton}
                  title="Delete conversation"
                >
                  <FaTimes />
                </button>
              </div>
            ))
          )}
          <button 
            className={newAIChatBotStyles.seeAllButton}
            onClick={() => setShowAllHistory(!showAllHistory)}
          >
            {showAllHistory ? 'Show less' : 'See all'}
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={newAIChatBotStyles.mainArea}>
        {/* Header */}
        <div className={newAIChatBotStyles.chatHeader}>
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)} 
              className={newAIChatBotStyles.menuButton}
            >
              <FaBars />
            </button>
          )}
          <div className={newAIChatBotStyles.headerCenter}>
            <img src="/100xsystems.webp" alt="100x AI" className={newAIChatBotStyles.headerLogo} />
            <span>100x AI</span>
          </div>
          <button
            onClick={() => setIsDrawMode(!isDrawMode)}
            className={`${newAIChatBotStyles.drawModeButton} ${isDrawMode ? newAIChatBotStyles.drawModeActive : ''}`}
            title={isDrawMode ? "Exit Draw Mode" : "AI Draw Mode"}
          >
            {isDrawMode ? <FaTimes /> : <FaPencilRuler />}
            <span className={newAIChatBotStyles.drawModeButtonText}>
              {isDrawMode ? "Exit Draw" : "AI Draw"}
            </span>
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className={newAIChatBotStyles.settingsPanel}>
            <div className={newAIChatBotStyles.settingsHeader}>
              <h3>Settings</h3>
              <button onClick={() => setShowSettings(false)}>
                <FaTimes />
              </button>
            </div>
            <div className={newAIChatBotStyles.settingsContent}>
              <div className={newAIChatBotStyles.settingGroup}>
                <label>Model</label>
                <select
                  value={settings.selectedModel}
                  onChange={(e) => setSettings({ ...settings, selectedModel: e.target.value })}
                >
                  {GROQ_MODELS.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>
              <label className={newAIChatBotStyles.settingToggle}>
                <input
                  type="checkbox"
                  checked={settings.voiceEnabled}
                  onChange={(e) => setSettings({ ...settings, voiceEnabled: e.target.checked })}
                />
                <span>Enable voice input</span>
              </label>
              <label className={newAIChatBotStyles.settingToggle}>
                <input
                  type="checkbox"
                  checked={settings.ttsEnabled}
                  onChange={(e) => setSettings({ ...settings, ttsEnabled: e.target.checked })}
                />
                <span>Enable text-to-speech</span>
              </label>
            </div>
          </div>
        )}

        {/* Split Layout Container */}
        <div className={`${newAIChatBotStyles.splitContainer} ${isDrawMode ? newAIChatBotStyles.splitMode : newAIChatBotStyles.fullMode}`}>
          {/* Chat Panel (30% when in draw mode, 100% otherwise) */}
          <div className={`${newAIChatBotStyles.chatPanel} ${isDrawMode ? newAIChatBotStyles.chatPanelSplit : newAIChatBotStyles.chatPanelFull}`}>
            {/* Messages */}
            <div 
              className={newAIChatBotStyles.messagesContainer}
              onWheel={(e) => e.stopPropagation()}
            >
          {messages.length === 0 ? (
            <div className={newAIChatBotStyles.emptyState}>
              <img src="/100xsystems.webp" alt="100x AI" className={newAIChatBotStyles.emptyLogo} />
              <h2>How can I help you today?</h2>
              <p>Ask me anything about systems, design, or becoming a 100xEngineer.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`${newAIChatBotStyles.message} ${newAIChatBotStyles[message.type]}`}
              >
                {message.type === "ai" && (
                  <div className={newAIChatBotStyles.messageAvatar}>
                    <img src="/100xsystems.webp" alt="AI" className={newAIChatBotStyles.aiAvatar} />
                  </div>
                )}
                <div className={newAIChatBotStyles.messageContent}>
                  {message.type === "user" ? (
                    <div>
                      {message.images && message.images.length > 0 && (
                        <div className={newAIChatBotStyles.messageImages}>
                          {message.images.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Uploaded image ${index + 1}`}
                              className={newAIChatBotStyles.messageImage}
                            />
                          ))}
                        </div>
                      )}
                      <div className={newAIChatBotStyles.messageBubble}>{message.content.replace(/<[^>]*>/g, '')}</div>
                    </div>
                  ) : (
                    <div className={newAIChatBotStyles.messageContentInner}>
                      {message.imageUrl && (
                        <img
                          src={message.imageUrl}
                          alt="Uploaded"
                          className={newAIChatBotStyles.messageImage}
                        />
                      )}
                      <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                      {message.isStreaming && (
                        <span className={newAIChatBotStyles.streamingIndicator}>▋</span>
                      )}
                    </div>
                  )}
                </div>
                <div className={newAIChatBotStyles.messageActions}>
                  {message.type === "ai" && !message.isStreaming && (
                    <>
                      <button
                        onClick={() => regenerateResponse(message.id)}
                        className={newAIChatBotStyles.miniButton}
                        title="Regenerate"
                      >
                        <FaSync size={14} />
                      </button>
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className={newAIChatBotStyles.miniButton}
                        title="Copy"
                      >
                        <FaCopy size={14} />
                      </button>
                      <button
                        onClick={() => handleReply(message.id)}
                        className={`${newAIChatBotStyles.miniButton} ${feedbackData.get(message.id)?.replied ? newAIChatBotStyles.active : ''}`}
                        title="Reply"
                      >
                        <FaComment size={14} />
                      </button>
                      <button
                        onClick={() => handleLike(message.id)}
                        className={`${newAIChatBotStyles.miniButton} ${feedbackData.get(message.id)?.liked ? newAIChatBotStyles.active : ''}`}
                        title="Good response"
                      >
                        <FaThumbsUp size={14} />
                      </button>
                      <button
                        onClick={() => handleDislike(message.id)}
                        className={`${newAIChatBotStyles.miniButton} ${feedbackData.get(message.id)?.disliked ? newAIChatBotStyles.active : ''}`}
                        title="Helpful?"
                      >
                        <FaThumbsDown size={14} />
                      </button>
                    </>
                  )}
                  {message.type === "user" && (
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className={newAIChatBotStyles.miniButton}
                      title="Copy"
                    >
                      <FaCopy size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Premium Grok Style */}
        <div className={newAIChatBotStyles.inputArea}>
          <div className={newAIChatBotStyles.inputContainer}>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={newAIChatBotStyles.attachButton}
              title="Upload file"
            >
              <FaPaperclip />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="*/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
            <ReactQuill
              value={input}
              onChange={(value) => setInput(value || '')}
              placeholder="Ask anything"
              className={newAIChatBotStyles.quillEditor}
              theme="bubble"
              modules={{
                toolbar: false, // Hide toolbar for minimal look
                keyboard: {
                  bindings: {
                    enter: {
                      key: 'Enter',
                      shiftKey: false,
                      handler: (range: any, context: any) => {
                        handleSendMessage();
                        return false;
                      }
                    },
                    'shift-enter': {
                      key: 'Enter',
                      shiftKey: true,
                      handler: (range: any, context: any) => {
                        // Allow line break with Shift+Enter
                        return true;
                      }
                    }
                  }
                }
              }}
              formats={[
                'bold', 'italic', 'underline', 'strike',
                'link', 'image'
              ]}
            />
            <button className={newAIChatBotStyles.modelSelector} title="Model speed">
              Fast <FaChevronDown size={10} />
            </button>
            {settings.voiceEnabled && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`${newAIChatBotStyles.voiceButton} ${isRecording ? newAIChatBotStyles.recording : ""}`}
                title={isRecording ? "Stop recording" : "Voice input"}
              >
                {isRecording ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
            )}
            <button className={newAIChatBotStyles.audioWaveButton} title="Audio mode">
              <FaWaveSquare />
            </button>
          </div>
        </div>
      </div>

          {/* Excalidraw Panel (70% when in draw mode, hidden otherwise) */}
          {isDrawMode && (
            <div className={newAIChatBotStyles.excalidrawPanel}>
              <div className={newAIChatBotStyles.excalidrawPanelHeader}>
                <h3>Diagram Canvas</h3>
                <div className={newAIChatBotStyles.excalidrawPanelControls}>
                  {isGeneratingDiagram && (
                    <div className={newAIChatBotStyles.diagramLoadingIndicator}>
                      <div className={newAIChatBotStyles.spinner}></div>
                      <span>Generating diagram...</span>
                    </div>
                  )}
                  <button className={newAIChatBotStyles.excalidrawControlButton} title="Clear Canvas" onClick={resetDiagram}>
                    <FaTrash />
                  </button>
                  <button className={newAIChatBotStyles.excalidrawControlButton} title="Export Diagram">
                    <FaCopy />
                  </button>
                </div>
              </div>
              <div className={newAIChatBotStyles.excalidrawCanvas}>
                {(() => {
                  console.log('🎨 === EXCALIDRAW COMPONENT RENDER ===');
                  console.log('🎨 isDrawMode:', isDrawMode);
                  console.log('🎨 diagramElements length:', diagramElements.length);
                  console.log('🎨 diagramElements:', diagramElements);
                  console.log('🎨 isFullscreen:', isFullscreen);
                  console.log('🎨 isGeneratingDiagram:', isGeneratingDiagram);
                  return null;
                })()}
                <ExcalidrawComponent
                  height={isFullscreen ? '100vh' : '100%'}
                  width={isFullscreen ? '100vw' : '100%'}
                  theme="dark"
                  zenModeEnabled={true}
                  autoFocus={true}
                  name="AI Generated Diagram"
                  onFullscreenToggle={handleFullscreenToggle}
                  isFullscreen={isFullscreen}
                  initialData={{
                    elements: diagramElements,
                    appState: {
                      viewBackgroundColor: '#1a1a1a',
                      currentItemStrokeColor: '#ffffff',
                      currentItemBackgroundColor: 'transparent',
                      currentItemFontColor: '#ffffff',
                    },
                  }}
                  onSceneChange={(elements: any, appState: any, files: any) => {
                    console.log('🔄 === EXCALIDRAW SCENE CHANGE ===');
                    console.log('🔄 Scene changed:', { 
                      elementCount: elements.length, 
                      theme: appState.theme,
                      zenMode: appState.zenModeEnabled,
                      elements: elements
                    });
                    
                    // Mark Excalidraw as initialized on first change
                    if (!isExcalidrawInitialized.current) {
                      console.log('🔧 Excalidraw initialized, ignoring first scene change');
                      isExcalidrawInitialized.current = true;
                      // Don't update state on initialization - just set the reference
                      prevElementsRef.current = elements;
                      return;
                    }
                    
                    // Only update state if user actually made changes OR if we're clearing from non-empty to empty
                    const currentElements = prevElementsRef.current;
                    const elementsChanged = JSON.stringify(currentElements) !== JSON.stringify(elements);
                    const isClearingEmpty = currentElements.length > 0 && elements.length === 0;
                    
                    console.log('🔄 Change detection:', {
                      prevCount: currentElements.length,
                      newCount: elements.length,
                      elementsChanged: elementsChanged,
                      isClearingEmpty: isClearingEmpty
                    });
                    
                    // Update accumulated elements when user makes changes
                    if (elementsChanged && !isClearingEmpty) {
                      console.log('🔄 Updating accumulated elements due to user change');
                      accumulatedElementsRef.current = elements;
                      setDiagramElements(elements);
                    } else {
                      console.log('🔄 Ignoring scene change - initialization or empty clearing');
                    }
                  }}
                  onExport={(exportData: any) => {
                    console.log('🔄 === EXCALIDRAW EXPORT ===');
                    console.log('🔄 Excalidraw export:', exportData);
                  }}
                />
              </div>
            </div>
          )}
        </div>

      {/* Feedback Modal */}
      {feedbackModal.isOpen && (
        <div className={newAIChatBotStyles.feedbackModal}>
          <div className={newAIChatBotStyles.feedbackModalContent}>
            <h3 className={newAIChatBotStyles.feedbackModalTitle}>
              {feedbackModal.type === 'like' 
                ? '👍 What did you like about this response? (Helps us improve our AI)'
                : '👎 What did you dislike about this response? (Helps us understand what to improve)'
              }
            </h3>
            <textarea
              className={newAIChatBotStyles.feedbackModalInput}
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              placeholder={
                feedbackModal.type === 'like'
                  ? 'Tell us what you liked about this response...'
                  : 'Tell us what could be improved...'
              }
              autoFocus
            />
            <div className={newAIChatBotStyles.feedbackModalButtons}>
              <button
                className={`${newAIChatBotStyles.feedbackModalButton} ${newAIChatBotStyles.feedbackModalButton}`}
                onClick={handleFeedbackCancel}
              >
                Cancel
              </button>
              <button
                className={`${newAIChatBotStyles.feedbackModalButton} ${newAIChatBotStyles.feedbackModalButton}`}
                onClick={handleFeedbackSubmit}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
     </div>
  );
}
