'use client';

import { useLoadingScreen } from '../../application/hooks';
import loaderStyles from '../_styles/css/loading-loader.module.css';
import loaderAnimationStyles from '../_styles/css/loading-loaderanimation.module.css';

const LoaderAnimation = () => {
  return (
    <div className={loaderAnimationStyles.spinner} />
  );
};

export { LoaderAnimation };

export function Loading(): React.ReactElement | null {
  const { isLoading } = useLoadingScreen();
  if (!isLoading) return null;
  return (
    <div className={loaderStyles.loadingScreen}>
      <img
        src="/assets/cubix/images/cubix-close-up-cute.png"
        alt="Cubix"
        className={loaderStyles.logo}
        loading="eager"
      />
      <LoaderAnimation />
    </div>
  );
}
