import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Loading } from "../components/loading/Loading"
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import ScrollSmootherProvider from "../components/scroll/ScrollSmootherProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
