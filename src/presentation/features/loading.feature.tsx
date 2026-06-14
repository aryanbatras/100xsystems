'use client';

import { useLoadingScreen } from '../../application/hooks';
import loaderStyles from '../_styles/css/loading-loader.module.css';
import loaderAnimationStyles from '../_styles/css/loading-loaderanimation.module.css';

import Image from 'next/image';
import React from 'react';
/**
 * ## Loading
 *
 * Loading feature module.
 * Contains all components, types, and logic for the loading domain.
 *
 * @packageDocumentation
 * @module loading
 */

;



// ============================================================
// Source: LoaderAnimation.jsx
// ============================================================
const LoaderAnimation = () => {
  return (
    <div className={loaderAnimationStyles.spinner} />
  );
};

export { LoaderAnimation };


// ============================================================
// Source: Loading.tsx
// ============================================================
export function Loading(): React.ReactElement | null {
  const { isLoading } = useLoadingScreen();
  if (!isLoading) return null;
  return (
    <div className={loaderStyles.loadingScreen}>
      <div className={loaderStyles.contentContainer}>
        <LoaderAnimation />
        <img
          src="/100xsystemsonlytitle.webp"
          alt="100x Systems"
          width={800}
          height={800}
          className={loaderStyles.logo}
          loading="eager"
        />
      </div>
    </div>
  );
}
