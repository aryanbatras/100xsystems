import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Loader from "../components/loader/Loader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Loader />
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}
