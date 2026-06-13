/**
 * ## Image Queue Domain: React Hooks
 *
 * Hook for tracking images in the Quill editor for publishing.
 *
 * @packageDocumentation
 */

import { useState, useEffect, useRef } from 'react';
import { extractImagesFromDelta } from '../../application/publishing/imageProcessing';
import Quill from 'quill';

/**
 * Hook for monitoring image content in the Quill editor.
 *
 * @remarks
 * Tracks images as they are added to the editor content, providing
 * a queue of images that need to be processed during publishing.
 *
 * @param mounted - Whether the editor component is mounted
 * @returns Image queue and Quill ref
 *
 * @public
 */
export const useImageQueue = (mounted: boolean) => {
  const [imageQueue, setImageQueue] = useState<any[]>([]);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      const quill = quillRef.current;
      if (quill) {
        const handleTextChange = async (delta: any, oldDelta: any, source: string) => {
          if (source === 'user') {
            const currentContent = quill.getContents();
            const allImages = await extractImagesFromDelta(currentContent);
            setImageQueue(allImages);
          }
        };

        quill.on('text-change', handleTextChange);
        return () => {
          quill.off('text-change', handleTextChange);
        };
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [mounted]);

  return {
    imageQueue,
    quillRef,
  };
};
