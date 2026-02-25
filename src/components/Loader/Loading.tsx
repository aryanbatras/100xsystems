import React from 'react';
import styles from "./Loader.module.css";
import Image from "next/image";
import LoaderAnimation from "./LoaderAnimation";
import { useLoadingScreen } from "../../hooks/useLoadingScreen";
import { LOADER_CONFIG } from "./constants";

export function Loading(): React.ReactElement | null {
  const { isLoading } = useLoadingScreen();
  if (!isLoading) return null;
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.contentContainer}>
        <LoaderAnimation />
        <Image
          src={LOADER_CONFIG.LOGO.SRC}
          alt={LOADER_CONFIG.LOGO.ALT}
          width={LOADER_CONFIG.LOGO.WIDTH}
          height={LOADER_CONFIG.LOGO.HEIGHT}
          className={styles.logo}
          priority
        />
      </div>
    </div>
  );
}
