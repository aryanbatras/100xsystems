import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Loading } from "../components/loading/Loading"
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Loading /> 
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}
