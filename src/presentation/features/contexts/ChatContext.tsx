import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  isChatOpen: boolean;
  selectedText: string;
  articleSlug: string;
  articleContent: string;
  openChat: (slug: string, content: string, selectedText?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  updateSelectedText: (text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [articleSlug, setArticleSlug] = useState('');
  const [articleContent, setArticleContent] = useState('');

  const openChat = (slug: string, content: string, selectedTextValue?: string) => {
    setArticleSlug(slug);
    setArticleContent(content);
    setSelectedText(selectedTextValue || '');
    // Don't auto-open, just set the data
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const updateSelectedText = (text: string) => {
    setSelectedText(text);
  };

  return (
    <ChatContext.Provider value={{
      isChatOpen,
      selectedText,
      articleSlug,
      articleContent,
      openChat,
      closeChat,
      toggleChat,
      updateSelectedText
    }}>
      {children}
    </ChatContext.Provider>
  );
};
