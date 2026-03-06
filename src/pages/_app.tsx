import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Loading } from "../components/loading/Loading"
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import ScrollSmootherProvider from "../components/scroll/ScrollSmootherProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "../contexts/AuthContext";

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
      <ScrollSmootherProvider>
        <Loading /> 
          <Navbar />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <Component {...pageProps} />
              <Footer/>
            </div>
          </div>
        </ScrollSmootherProvider>
    </AuthProvider>
  );
}
