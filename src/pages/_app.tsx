import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Loading } from "../components/loading/Loading"
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import ScrollSmootherProvider from "../components/scroll/ScrollSmootherProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "../contexts/AuthContext";
import { ChatProvider, useChat } from "../contexts/ChatContext";
import AdvancedChatBot from "../components/ai/AdvancedChatBot";
import ChatButton from "../components/ai/ChatButton";
import { TableOfContentsProvider, useTableOfContents } from "../contexts/TableOfContentsContext";
import { GlobalTableOfContents } from "../components/path/GlobalTableOfContents";

function ChatComponents() {
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

function GlobalTOCComponent() {
  const { tocItems, activeSection, onSectionClick, isGlobalTocVisible } = useTableOfContents();

  return (
    <GlobalTableOfContents
      tocItems={tocItems}
      activeSection={activeSection}
      onSectionClick={onSectionClick}
      isVisible={isGlobalTocVisible}
    />
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <AuthProvider>
      <ChatProvider>
        <TableOfContentsProvider>
          <ScrollSmootherProvider>
            <Loading /> 
              <Navbar />
              <div id="smooth-wrapper">
                <div id="smooth-content">
                  <Component {...pageProps} />
                  <Footer/>
                </div>
              </div>
              <ChatComponents />
              <GlobalTOCComponent />
            </ScrollSmootherProvider>
          </TableOfContentsProvider>
        </ChatProvider>
      </AuthProvider>
  );
}
