import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaUserCircle,
  FaMicrophone,
  FaMicrophoneSlash,
  FaImage,
  FaCog,
  FaTimes,
  FaPaperPlane,
  FaVolumeUp,
  FaVolumeMute,
  FaRobot,
  FaBrain,
  FaCopy,
  FaMemory,
  FaSearch,
  FaTrash,
  FaDownload,
  FaUpload,
  FaTimesCircle,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./AdvancedChatBot.module.css";
import { useMemory } from "../../hooks/useMemory";
import { useAuth } from "../../contexts/AuthContext";
import { AuthModal } from "../auth/AuthModal";

interface Message {
  id: string;
  type: "user" | "ai";
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

export default function AdvancedChatBot({
  articleSlug,
  articleContent,
  selectedText,
  isOpen,
  onClose,
  onClearContext,
}: AdvancedChatBotProps) {
  const { user, loading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
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

  const memory = useMemory({
    autoSave: settings.memoryEnabled,
    maxRetrieved: 10,
  });

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
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

      console.log("Sending to AI:", {
        model: modelToUse,
        hasImage: !!imageUrl,
        hasMemory: !!memoryContext,
      });

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
                console.error("Error parsing chunk:", e);
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
      console.error("Error sending message:", error);

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

    // Debug logging
    console.log("Auto-context enabled:", settings.autoContext);
    console.log("Selected text:", selectedText);
    console.log("Input:", input);

    // Only include context if auto-context is enabled AND text is selected
    const messageContent =
      settings.autoContext && selectedText
        ? `**Context:** ${selectedText}\n\n${input}`
        : input;

    console.log("Final message content:", messageContent);

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
    console.log("🎤 Starting voice recording...");

    try {
      console.log("📱 Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("✅ Microphone access granted");

      // Try to get a supported MIME type
      let mimeType = "audio/webm";
      let options: MediaRecorderOptions = { mimeType };

      if (!MediaRecorder.isTypeSupported(mimeType)) {
        console.log("⚠️ audio/webm not supported, trying audio/mp4...");
        mimeType = "audio/mp4";
        options = { mimeType };

        if (!MediaRecorder.isTypeSupported(mimeType)) {
          console.log("⚠️ audio/mp4 not supported, using default");
          options = {};
          mimeType = "";
        }
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      console.log("🔴 MediaRecorder created:", {
        mimeType: mediaRecorder.mimeType || "default",
        state: mediaRecorder.state,
        audioTracks: stream.getAudioTracks().length,
        options: options,
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      console.log("🔄 Reset audio chunks array");

      mediaRecorder.ondataavailable = (event) => {
        console.log("📊 Audio data available:", {
          data: event.data,
          size: event.data.size,
          type: event.data.type,
        });
        audioChunksRef.current.push(event.data);
        console.log(
          "📦 Audio chunks collected:",
          audioChunksRef.current.length,
        );
      };

      mediaRecorder.onstop = async () => {
        console.log("⏹️ MediaRecorder stopped");
        console.log("📋 Total audio chunks:", audioChunksRef.current.length);
        console.log(
          "💾 Chunk sizes:",
          audioChunksRef.current.map((chunk) => chunk.size),
        );

        // Use the actual MIME type from the recorder or first chunk
        const actualMimeType =
          mediaRecorder.mimeType ||
          audioChunksRef.current[0]?.type ||
          "audio/webm";

        const audioBlob = new Blob(audioChunksRef.current, {
          type: actualMimeType,
        });
        console.log("🎵 Audio blob created:", {
          size: audioBlob.size,
          type: audioBlob.type,
          chunks: audioChunksRef.current.length,
          actualMimeType: actualMimeType,
        });

        await handleVoiceTranscription(audioBlob);
      };

      mediaRecorder.onerror = (event) => {
        console.error("❌ MediaRecorder error:", event);
        console.error("❌ Error details:", {
          error: event.error,
          message: event.error?.message,
          name: event.error?.name,
        });
      };

      console.log("▶️ Starting MediaRecorder...");
      mediaRecorder.start();
      console.log("🎙️ Recording started successfully");
      setIsRecording(true);
    } catch (error) {
      console.error("❌ Error accessing microphone:", error);
      console.error("❌ Error details:", error);

      // Show user-friendly error
      alert(
        `Microphone access failed: ${error || "Unknown error"}. Please check your browser permissions.`,
      );
    }
  };

  const stopRecording = () => {
    console.log("🛑 Stopping voice recording...");

    if (mediaRecorderRef.current && isRecording) {
      console.log(
        "⏹️ MediaRecorder state before stop:",
        mediaRecorderRef.current.state,
      );

      try {
        mediaRecorderRef.current.stop();
        console.log("🔇 Stopping all audio tracks...");
        mediaRecorderRef.current.stream.getTracks().forEach((track) => {
          console.log("🎵 Stopping track:", track.kind, track.label);
          track.stop();
        });
        console.log("✅ Recording stopped successfully");
      } catch (error) {
        console.error("❌ Error stopping recording:", error);
      }

      setIsRecording(false);
    } else {
      console.log("⚠️ No active recording to stop");
    }
  };

  const handleVoiceTranscription = async (audioBlob: Blob) => {
    console.log("🤖 Starting voice transcription...");
    console.log("📤 Audio blob details:", {
      size: audioBlob.size,
      type: audioBlob.type,
      isBlob: audioBlob instanceof Blob,
    });

    try {
      console.log("📋 Creating FormData...");
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

      console.log("📤 FormData created:", {
        file: formData.get("file"),
        fileName: fileName,
        mimeType: audioBlob.type,
        model: formData.get("model"),
      });

      console.log("🌐 Sending request to /api/voice-transcribe...");
      const startTime = Date.now();

      const response = await fetch("/api/voice-transcribe", {
        method: "POST",
        body: formData,
      });

      const endTime = Date.now();
      console.log("📡 Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
        duration: `${endTime - startTime}ms`,
      });

      if (!response.ok) {
        console.error("❌ Transcription request failed:", {
          status: response.status,
          statusText: response.statusText,
        });

        // Try to get error details from response
        let errorDetails = "Unknown error";
        try {
          const errorData = await response.json();
          errorDetails = errorData.error || JSON.stringify(errorData);
          console.error("❌ Error response data:", errorData);
        } catch (e) {
          console.error("❌ Could not parse error response:", e);
        }

        throw new Error(
          `Transcription failed: ${response.status} ${response.statusText} - ${errorDetails}`,
        );
      }

      console.log("✅ Parsing response JSON...");
      const data = await response.json();
      console.log("📝 Transcription result:", {
        text: data.text,
        language: data.language,
        duration: data.duration,
      });

      if (data.text) {
        console.log("✅ Setting input text:", data.text);
        setInput(data.text);
      } else {
        console.warn("⚠️ No transcription text received");
      }
    } catch (error) {
      console.error("❌ Error transcribing voice:", error);
      console.error("❌ Error details:", error);

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
      console.error("Error with TTS:", error);
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

      console.log("Uploading image:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

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

      console.log("Image uploaded successfully:", data.url);

      // Now send the message to AI
      await sendAIMessage(userMessage.content, data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
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
      console.error("Failed to export memory:", error);
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
      console.error("Failed to import memory:", error);
      alert("Failed to import memory. Please check the file format.");
    }
  };

  if (!isOpen) return null;

  // Show auth modal if user is not signed in
  if (!authLoading && !user) {
    return (
      <AuthModal
        isOpen={true}
        onClose={onClose}
      />
    );
  }

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
                {GROQ_MODELS.find((m) => m.id === settings.selectedModel)?.name}
              </span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={() => {
                console.log("Memory button clicked");
                setShowMemoryManager(!showMemoryManager);
                setShowModelSelector(false);
                setShowSettings(false);
              }}
              className={styles.memoryButton}
              title="Memory Management"
            >
              <FaMemory />
            </button>
            <button
              onClick={() => {
                console.log("Brain button clicked");
                setShowModelSelector(!showModelSelector);
                setShowSettings(false);
                setShowMemoryManager(false);
              }}
              className={styles.modelButton}
              title="Change Model"
            >
              <FaBrain />
            </button>
            <button
              onClick={() => {
                console.log("Settings button clicked");
                setShowSettings(!showSettings);
                setShowModelSelector(false);
                setShowMemoryManager(false);
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
                  className={`${styles.modelCard} ${
                    settings.selectedModel === model.id ? styles.selected : ""
                  }`}
                >
                  <div className={styles.modelCardInfo}>
                    <span className={styles.modelCardName}>{model.name}</span>
                    <span className={styles.modelCardDescription}>
                      {model.description}
                    </span>
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
                    setSettings((prev) => ({
                      ...prev,
                      autoContext: newAutoContext,
                    }));
                    // When auto-context is turned off, user should manually clear selection
                    console.log(
                      "Auto-context",
                      newAutoContext ? "enabled" : "disabled",
                    );
                  }}
                />
                <span>Auto-use selected text as context</span>
              </label>
              <label className={styles.settingItem}>
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
              {/* <label className={styles.settingItem}>
                <input
                  type="checkbox"
                  checked={settings.showMemoryContext}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      showMemoryContext: e.target.checked,
                    }))
                  }
                  disabled={!settings.memoryEnabled}
                />
                <span>Show memory context in responses</span>
              </label> */}
              <label className={styles.settingItem}>
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
              <label className={styles.settingItem}>
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
              <button onClick={clearChat} className={styles.clearButton}>
                Clear Chat History
              </button>
            </div>
          </div>
        )}

        {showMemoryManager && (
          <div className={styles.memoryPanel}>
            <div className={styles.panelHeader}>
              <h3>Memory Management</h3>
              <button
                onClick={() => setShowMemoryManager(false)}
                className={styles.closePanelButton}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.memoryStats}>
              {memory.stats && (
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Entries:</span>
                    <span className={styles.statValue}>
                      {memory.stats.totalEntries}
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Storage Used:</span>
                    <span className={styles.statValue}>
                      {(memory.stats.totalSize / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.memorySearch}>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search memories..."
                  value={memorySearchQuery}
                  onChange={(e) => setMemorySearchQuery(e.target.value)}
                  onKeyPress={handleMemorySearchKeyPress}
                  className={styles.searchInput}
                />
                {memorySearchQuery && (
                  <button
                    onClick={clearMemorySearch}
                    className={styles.clearSearchButton}
                    title="Clear search"
                  >
                    <FaTimesCircle />
                  </button>
                )}
                <button
                  onClick={handleMemorySearch}
                  className={styles.searchButton}
                  title="Search"
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className={styles.memoryActions}>
              <button
                onClick={handleMemoryExport}
                className={styles.exportButton}
                title="Export Memory"
              >
                <FaDownload /> Export
              </button>
              <label className={styles.importButton}>
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
                className={styles.clearMemoryButton}
                title="Clear All Memory"
              >
                <FaTrash /> Clear All
              </button>
            </div>

            <div className={styles.memoryList}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            >
              {memory.entries.length > 0 ? (
                memory.entries.map((entry) => (
                  <div key={entry.id} className={styles.memoryEntry}>
                    <div className={styles.memoryHeader}>
                      <span className={styles.memoryType}>{entry.type}</span>
                      <span className={styles.memoryTime}>
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className={styles.memoryContent}>
                      {entry.content.length > 150
                        ? `${entry.content.substring(0, 150)}...`
                        : entry.content}
                    </div>
                    {entry.tags.length > 0 && (
                      <div className={styles.memoryTags}>
                        {entry.tags.map((tag, index) => (
                          <span key={index} className={styles.memoryTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.noMemories}>
                  <p>No memories found. Start chatting to build your memory!</p>
                </div>
              )}
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
              <p>
                I'm here to help you understand this article better. Ask me
                anything!
              </p>
              <div className={styles.suggestions}>
                <button
                  className={styles.suggestionBtn}
                  onClick={() =>
                    setInput("Explain the key concepts in this article")
                  }
                >
                  Explain concepts
                </button>
                <button
                  className={styles.suggestionBtn}
                  onClick={() =>
                    setInput("Provide practical examples from this content")
                  }
                >
                  Provide examples
                </button>
                <button
                  className={styles.suggestionBtn}
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
              className={`${styles.message} ${styles[message.type]} ${
                message.isStreaming ? styles.streaming : ""
              }`}
            >
              <div className={styles.avatar}>
                {message.type === "user" ? (
                  <FaUserCircle className={styles.userAvatar} />
                ) : (
                  <div className={styles.aiAvatar}>
                    <FaRobot className={styles.aiAvatarIcon} />
                  </div>
                )}
              </div>
              <div className={styles.messageContent}>
                {message.imageUrl && (
                  <img
                    src={message.imageUrl}
                    alt="Uploaded"
                    className={styles.messageImage}
                  />
                )}
                {message.type === "user" &&
                  message.content.includes("**Context:**") && (
                    <div className={styles.contextBadge}>
                      Context from article
                    </div>
                  )}
                <div className={styles.messageText}>
                  <ReactMarkdown
                    components={{
                      code: ({ inline, className, children }: any) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const language = match ? match[1] : "";

                        if (!inline && language) {
                          return (
                            <div className={styles.codeBlockContainer}>
                              <div className={styles.codeBlockHeader}>
                                <span>{language}</span>
                                <button
                                  className={styles.copyButton}
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
                              <div className={styles.codeBlockContent}>
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
                    <span className={styles.cursor}>|</span>
                  )}
                </div>
              </div>
              <div className={styles.messageActions}>
                <span className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
                {message.type === "ai" && settings.ttsEnabled && (
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
                className={`${styles.voiceButton} ${isRecording ? styles.recording : ""}`}
                title={isRecording ? "Stop recording" : "Start voice input"}
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
            className={styles.messageInput}
          />

          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim() || remainingRequests <= 0}
            className={styles.sendButton}
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
            className={styles.fileInput}
          />
        </div>
      </div>
    </div>
  );
}
