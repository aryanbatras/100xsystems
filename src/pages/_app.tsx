import "../presentation/_styles/globals.css";
import type { AppProps } from "next/app";
import { Loading } from "../presentation/loading/Loading"
import { Navbar } from "../presentation/navbar/Navbar";
import { Footer } from "../presentation/footer/Footer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import { TableOfContentsProvider, useTableOfContents } from "../presentation/contexts/TableOfContentsContext";
import { GlobalTableOfContents } from "../presentation/path/GlobalTableOfContents";

// Dynamically import chat components to disable SSR
const ChatComponents = dynamic(
  () => import("../presentation/ai/ChatComponents"),
  { ssr: false }
);

const ChatProvider = dynamic(
  () => import("../presentation/contexts/ChatContext").then(mod => ({ default: mod.ChatProvider })),
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
    <ChatProvider>
      <TableOfContentsProvider>
        <Loading /> 
        <Navbar />
        <Component {...pageProps} />
        <Footer/>
        <ChatComponents />
        <GlobalTOCComponent />
      </TableOfContentsProvider>
    </ChatProvider>
  );
}
