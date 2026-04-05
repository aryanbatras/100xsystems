import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Loading } from "../components/loading/Loading"
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import ScrollSmootherProvider from "../components/scroll/ScrollSmootherProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "../contexts/AuthContext";
import { GlobalAuthModalProvider, useGlobalAuthModal } from "../contexts/GlobalAuthModalContext";
import { AuthModal } from "../components/auth/AuthModal";
import dynamic from 'next/dynamic';
import { TableOfContentsProvider, useTableOfContents } from "../contexts/TableOfContentsContext";
import { GlobalTableOfContents } from "../components/path/GlobalTableOfContents";

// Dynamically import chat components to disable SSR
const ChatComponents = dynamic(
  () => import("../components/ai/ChatComponents"),
  { ssr: false }
);

const ChatProvider = dynamic(
  () => import("../contexts/ChatContext").then(mod => ({ default: mod.ChatProvider })),
  { ssr: false }
);

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

function GlobalAuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useGlobalAuthModal();
  
  return (
    <AuthModal 
      isOpen={isAuthModalOpen} 
      onClose={closeAuthModal} 
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
      <GlobalAuthModalProvider>
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
              <GlobalAuthModal />
            </ScrollSmootherProvider>
          </TableOfContentsProvider>
        </ChatProvider>
      </GlobalAuthModalProvider>
    </AuthProvider>
  );
}
