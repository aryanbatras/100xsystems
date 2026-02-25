import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LOADER_CONFIG } from "../components/loader/constants";

export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const hideLoader = () => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADER_CONFIG.DURATION_MS);
    return timer;
  };

  const showLoader = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const timer = hideLoader();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', showLoader);
    router.events.on('routeChangeComplete', hideLoader);

    return () => {
      router.events.off('routeChangeStart', showLoader);
      router.events.off('routeChangeComplete', hideLoader);
    };
  }, [router.events]);

  return { isLoading, showLoader, hideLoader };
};
