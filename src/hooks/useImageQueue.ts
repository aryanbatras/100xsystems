import { useState, useEffect, useRef } from 'react';
import { extractImagesFromDelta } from '../features/publishing/useImageProcessing';
import Quill from 'quill';

export const useImageQueue = (mounted: boolean) => {
  const [imageQueue, setImageQueue] = useState<any[]>([]);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setTimeout(() => {
      const quill = quillRef.current;
      if (quill) {
        console.log('Quill editor found, setting up listener');

        const handleTextChange = async (delta: any, oldDelta: any, source: string) => {
          if (source === 'user') {
            console.log('Content changed by user!');
            
            const currentContent = quill.getContents();
            const allImages = await extractImagesFromDelta(currentContent);
            
            setImageQueue(allImages);
            console.log('Images in queue:', allImages.length);
          }
        };
        
        quill.on('text-change', handleTextChange);
        
        return () => {
          quill.off('text-change', handleTextChange);
        };
      } else {
        console.log('Quill editor not found');
      }
    }, 100); 
    
    return () => clearTimeout(timer);
  }, [mounted]);

  useEffect(() => {
    console.log('Queue updated - Total images:', imageQueue.length);
  }, [imageQueue]);

  return {
    imageQueue,
    quillRef
  };
};
