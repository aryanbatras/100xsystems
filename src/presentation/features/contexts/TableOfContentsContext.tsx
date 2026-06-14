import React, { createContext, useContext, useState, ReactNode } from 'react';

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
