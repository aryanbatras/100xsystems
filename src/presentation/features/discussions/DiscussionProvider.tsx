import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DiscussionContextType {
  isEnabled: boolean;
  isLoading: boolean;
  error: string | null;
  commentCount: number;
  setCommentCount: (count: number) => void;
  setError: (error: string | null) => void;
}

const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined);

interface DiscussionProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

export function DiscussionProvider({ children, enabled = true }: DiscussionProviderProps) {
  const [isEnabled] = useState(enabled);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentCount, setCommentCount] = useState(0);

  const value: DiscussionContextType = {
    isEnabled,
    isLoading,
    error,
    commentCount,
    setCommentCount,
    setError,
  };

  return (
    <DiscussionContext.Provider value={value}>
      {children}
    </DiscussionContext.Provider>
  );
}

export function useDiscussion() {
  const context = useContext(DiscussionContext);
  if (context === undefined) {
    throw new Error('useDiscussion must be used within a DiscussionProvider');
  }
  return context;
}
