import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalAuthModalContextType {
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const GlobalAuthModalContext = createContext<GlobalAuthModalContextType | undefined>(undefined);

export const useGlobalAuthModal = () => {
  const context = useContext(GlobalAuthModalContext);
  if (context === undefined) {
    throw new Error('useGlobalAuthModal must be used within a GlobalAuthModalProvider');
  }
  return context;
};

interface GlobalAuthModalProviderProps {
  children: ReactNode;
}

export const GlobalAuthModalProvider: React.FC<GlobalAuthModalProviderProps> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const value: GlobalAuthModalContextType = {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  };

  return (
    <GlobalAuthModalContext.Provider value={value}>
      {children}
    </GlobalAuthModalContext.Provider>
  );
};
