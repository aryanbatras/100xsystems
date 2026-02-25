import React from 'react';
import styles from "./Loader.module.css";
import Image from "next/image";
import LoaderAnimation from "./LoaderAnimation";
import { useLoadingScreen } from "../../hooks/useLoadingScreen";

export function Loading(): React.ReactElement | null {
  const { isLoading } = useLoadingScreen();
  if (!isLoading) return null;
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.contentContainer}>
        <LoaderAnimation />
        <Image
          src="/100xsystemsonlytitle.png"
          alt="100x Systems"
          width={800}
          height={800}
          className={styles.logo}
          priority
        />
      </div>
    </div>
  );
}
