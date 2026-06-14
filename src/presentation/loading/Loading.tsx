import React from 'react';
import styles from '../_styles/components/loading/Loader.module.css';;
import Image from "next/image";
import LoaderAnimation from "./LoaderAnimation";
import { useLoadingScreen } from "../../application/hooks";

export function Loading(): React.ReactElement | null {
  const { isLoading } = useLoadingScreen();
  if (!isLoading) return null;
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.contentContainer}>
        <LoaderAnimation />
        <img
          src="/100xsystemsonlytitle.webp"
          alt="100x Systems"
          width={800}
          height={800}
          className={styles.logo}
          loading="eager"
        />
      </div>
    </div>
  );
}
