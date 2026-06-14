'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
/**
 * ## Contexts
 *
 * Contexts feature module.
 * Contains all components, types, and logic for the contexts domain.
 *
 * @packageDocumentation
 * @module contexts
 */

;



// ============================================================
// Source: ChatContext.tsx
// ============================================================
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


// ============================================================
// Source: TableOfContentsContext.tsx
// ============================================================
interface TocItem {
  id: string;
  title: string;
  level: number;
  children: TocItem[];
}

interface TableOfContentsContextType {
  tocItems: TocItem[];
  activeSection: string;
  setTocItems: (items: TocItem[]) => void;
  setActiveSection: (section: string) => void;
  onSectionClick: (id: string) => void;
  isGlobalTocVisible: boolean;
  setIsGlobalTocVisible: (visible: boolean) => void;
}

const TableOfContentsContext = createContext<TableOfContentsContextType | undefined>(undefined);

export const useTableOfContents = () => {
  const context = useContext(TableOfContentsContext);
  if (!context) {
    throw new Error('useTableOfContents must be used within a TableOfContentsProvider');
  }
  return context;
};

interface TableOfContentsProviderProps {
  children: ReactNode;
}

export const TableOfContentsProvider: React.FC<TableOfContentsProviderProps> = ({ children }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isGlobalTocVisible, setIsGlobalTocVisible] = useState<boolean>(false);

  const onSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Reduced offset for better positioning
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
        
      // Update active section immediately after scroll
      setTimeout(() => {
        setActiveSection(id);
      }, 1000);
    }
  };

  return (
    <TableOfContentsContext.Provider
      value={{
        tocItems,
        activeSection,
        setTocItems,
        setActiveSection,
        onSectionClick,
        isGlobalTocVisible,
        setIsGlobalTocVisible,
      }}
    >
      {children}
    </TableOfContentsContext.Provider>
  );
};
