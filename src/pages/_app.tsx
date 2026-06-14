import "./globals.css";
import type { AppProps } from "next/app";
import { Loading } from "../presentation/features/loading.feature"
import { Navbar } from "../presentation/features/navbar.feature";
import { Footer } from "../presentation/features/footer.feature";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "sonner";
import dynamic from 'next/dynamic';
import { ChatProvider, TableOfContentsProvider, useTableOfContents } from "../presentation/features/contexts.feature";
import { GlobalTableOfContents } from "../presentation/features/path.feature";

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
    <>
      <Loading /> 
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
