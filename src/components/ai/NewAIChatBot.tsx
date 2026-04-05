import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  FaUserCircle,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPaperclip,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaSearch,
  FaWaveSquare,
  FaCog,
  FaPlus,
  FaVolumeUp,
  FaCopy,
  FaTrash,
  FaBars,
  FaTimes,
  FaComment,
  FaSync,
  FaQuoteLeft,
  FaShare,
  FaThumbsUp,
  FaThumbsDown,
  FaEllipsisH,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from '../../styles/components/ai/NewAIChatBot.module.css';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  imageUrl?: string;
  images?: string[]; // Add images array for base64 images
}

interface ChatSettings {
  voiceEnabled: boolean;
  selectedModel: string;
  ttsEnabled: boolean;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
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

export default function NewAIChatBot() {
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
  
  const [settings, setSettings] = useState<ChatSettings>({
    voiceEnabled: true,
    selectedModel: "meta-llama/llama-4-scout-17b-16e-instruct",
    ttsEnabled: false,
  });

  const [requestTimes, setRequestTimes] = useState<number[]>([]);
  const [feedbackData, setFeedbackData] = useState<Map<string, { liked: boolean; disliked: boolean; replied: boolean }>>(new Map());
  const [feedbackModal, setFeedbackModal] = useState<{ isOpen: boolean; messageId: string; type: 'like' | 'dislike' }>({ isOpen: false, messageId: '', type: 'like' });
  const [feedbackInput, setFeedbackInput] = useState('');
  const RATE_LIMIT = 5;
  const RATE_WINDOW = 60000;

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
        question: messageContent,
        model: modelToUse,
        stream: true,
        memoryContext: memoryContext || undefined,
        images: images || undefined,
        feedbackData: currentFeedback, // Send message feedback
        responseFeedbackData: responseFeedbackData // Send response feedback
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
    <div className={styles.chatContainer}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.sidebarHeader}>
          {/* <div className={styles.sidebarLogo}>100X</div> */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className={styles.closeSidebarButton}
          >
            {sidebarOpen ? <FaChevronLeft /> : <></>}
          </button>
        </div>

        {/* Navigation */}
        <div className={styles.navSection}>
          <div className={`${styles.navItem} ${styles.active}`}>
            <FaSearch className={styles.navIcon} />
            <span className={styles.navText}>Search</span>
          </div>
          <div className={styles.navItem}>
            <FaComment className={styles.navIcon} />
            <span className={styles.navText}>Chat</span>
          </div>
          <div className={styles.navItem}>
            <FaMicrophone className={styles.navIcon} />
            <span className={styles.navText}>Voice</span>
          </div>
          <div className={styles.navItem}>
            <FaWaveSquare className={styles.navIcon} />
            <span className={styles.navText}>Imagine</span>
          </div>
        </div>

        {/* History Section */}
        <div className={styles.historySection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>History</div>
            {/* <button className={styles.navDropdown}>
              {sidebarOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button> */}
          </div>
          {showAllHistory ? (
            conversations.map((conv) => (
              <div key={conv.id} className={styles.historyItem} onClick={() => selectConversation(conv.id)}>
                {/* <FaComment className={styles.historyIcon} /> */}
                <span>{conv.title}</span>
                <button
                  onClick={(e) => deleteConversation(conv.id, e)}
                  className={styles.deleteButton}
                  title="Delete conversation"
                >
                  <FaTimes />
                </button>
              </div>
            ))
          ) : (
            conversations.slice(0, 3).map((conv) => (
              <div key={conv.id} className={styles.historyItem} onClick={() => selectConversation(conv.id)}>
                {/* <FaComment className={styles.historyIcon} /> */}
                <span>{conv.title}</span>
                <button
                  onClick={(e) => deleteConversation(conv.id, e)}
                  className={styles.deleteButton}
                  title="Delete conversation"
                >
                  <FaTimes />
                </button>
              </div>
            ))
          )}
          <button 
            className={styles.seeAllButton}
            onClick={() => setShowAllHistory(!showAllHistory)}
          >
            {showAllHistory ? 'Show less' : 'See all'}
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={styles.mainArea}>
        {/* Header */}
        <div className={styles.chatHeader}>
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)} 
              className={styles.menuButton}
            >
              <FaBars />
            </button>
          )}
          <div className={styles.headerCenter}>
            <img src="/100xsystems.webp" alt="100x AI" className={styles.headerLogo} />
            <span>100x AI</span>
          </div>
          {/* <button onClick={clearChat} className={styles.clearButton}>
            <FaTrash />
          </button> */}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className={styles.settingsPanel}>
            <div className={styles.settingsHeader}>
              <h3>Settings</h3>
              <button onClick={() => setShowSettings(false)}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.settingsContent}>
              <div className={styles.settingGroup}>
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
              <label className={styles.settingToggle}>
                <input
                  type="checkbox"
                  checked={settings.voiceEnabled}
                  onChange={(e) => setSettings({ ...settings, voiceEnabled: e.target.checked })}
                />
                <span>Enable voice input</span>
              </label>
              <label className={styles.settingToggle}>
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

        {/* Messages */}
    <div 
          className={styles.messagesContainer}
          onWheel={(e) => e.stopPropagation()}
        >
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <img src="/100xsystems.webp" alt="100x AI" className={styles.emptyLogo} />
              <h2>How can I help you today?</h2>
              <p>Ask me anything about systems, design, or becoming a 100xEngineer.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${styles[message.type]}`}
              >
                {message.type === "ai" && (
                  <div className={styles.messageAvatar}>
                    <img src="/100xsystems.webp" alt="AI" className={styles.aiAvatar} />
                  </div>
                )}
                <div className={styles.messageContent}>
                  {message.type === "user" ? (
                    <div>
                      {message.images && message.images.length > 0 && (
                        <div className={styles.messageImages}>
                          {message.images.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Uploaded image ${index + 1}`}
                              className={styles.messageImage}
                            />
                          ))}
                        </div>
                      )}
                      <div className={styles.messageBubble}>{message.content.replace(/<[^>]*>/g, '')}</div>
                    </div>
                  ) : (
                    <div className={styles.messageContentInner}>
                      {message.imageUrl && (
                        <img
                          src={message.imageUrl}
                          alt="Uploaded"
                          className={styles.messageImage}
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
                        <span className={styles.streamingIndicator}>▋</span>
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.messageActions}>
                  {message.type === "ai" && !message.isStreaming && (
                    <>
                      <button
                        onClick={() => regenerateResponse(message.id)}
                        className={styles.miniButton}
                        title="Regenerate"
                      >
                        <FaSync size={14} />
                      </button>
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className={styles.miniButton}
                        title="Copy"
                      >
                        <FaCopy size={14} />
                      </button>
                      <button
                        onClick={() => handleReply(message.id)}
                        className={`${styles.miniButton} ${feedbackData.get(message.id)?.replied ? styles.active : ''}`}
                        title="Reply"
                      >
                        <FaComment size={14} />
                      </button>
                      <button
                        onClick={() => handleLike(message.id)}
                        className={`${styles.miniButton} ${feedbackData.get(message.id)?.liked ? styles.active : ''}`}
                        title="Good response"
                      >
                        <FaThumbsUp size={14} />
                      </button>
                      <button
                        onClick={() => handleDislike(message.id)}
                        className={`${styles.miniButton} ${feedbackData.get(message.id)?.disliked ? styles.active : ''}`}
                        title="Helpful?"
                      >
                        <FaThumbsDown size={14} />
                      </button>
                    </>
                  )}
                  {message.type === "user" && (
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className={styles.miniButton}
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
        <div className={styles.inputArea}>
          <div className={styles.inputContainer}>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={styles.attachButton}
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
              className={styles.quillEditor}
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
            <button className={styles.modelSelector} title="Model speed">
              Fast <FaChevronDown size={10} />
            </button>
            {settings.voiceEnabled && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`${styles.voiceButton} ${isRecording ? styles.recording : ""}`}
                title={isRecording ? "Stop recording" : "Voice input"}
              >
                {isRecording ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
            )}
            <button className={styles.audioWaveButton} title="Audio mode">
              <FaWaveSquare />
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {feedbackModal.isOpen && (
        <div className={styles.feedbackModal}>
          <div className={styles.feedbackModalContent}>
            <h3 className={styles.feedbackModalTitle}>
              {feedbackModal.type === 'like' 
                ? '👍 What did you like about this response? (Helps us improve our AI)'
                : '👎 What did you dislike about this response? (Helps us understand what to improve)'
              }
            </h3>
            <textarea
              className={styles.feedbackModalInput}
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              placeholder={
                feedbackModal.type === 'like'
                  ? 'Tell us what you liked about this response...'
                  : 'Tell us what could be improved...'
              }
              autoFocus
            />
            <div className={styles.feedbackModalButtons}>
              <button
                className={`${styles.feedbackModalButton} ${styles.feedbackModalButton}`}
                onClick={handleFeedbackCancel}
              >
                Cancel
              </button>
              <button
                className={`${styles.feedbackModalButton} ${styles.feedbackModalButton}`}
                onClick={handleFeedbackSubmit}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
