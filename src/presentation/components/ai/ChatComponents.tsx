'use client';

import { useChat } from '../../../presentation/contexts/ChatContext';
import AdvancedChatBot from './AdvancedChatBot';
import ChatButton from './ChatButton';

export default function ChatComponents() {
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
