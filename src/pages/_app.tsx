import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import { Loading } from "../components/loader/Loading";
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
