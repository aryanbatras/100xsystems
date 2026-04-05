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
      } else {
      }
    }, 100); 
    
    return () => clearTimeout(timer);
  }, [mounted]);

  useEffect(() => {
  }, [imageQueue]);

  return {
    imageQueue,
    quillRef
  };
};
