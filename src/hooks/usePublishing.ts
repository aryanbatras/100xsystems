import { useState } from 'react';
import { extractImagesFromDelta, uploadImagesToGitHub } from './useImageProcessing';
import { generateSlug, generateMarkdown, publishMarkdownToGitHub } from '../utils/markdownGenerator';

export type PublishingState = 'draft' | 'uploading' | 'success' | 'failed';

export const usePublishing = (articleTitle: string) => {
  const [publishingState, setPublishingState] = useState<PublishingState>('draft');

  const handlePublish = async (quillRef: any) => {
    if (!quillRef.current) return;
    
    setPublishingState('uploading');
    
    try {
      console.log('🚀 Starting publish process...');
      
      const quill = quillRef.current.getEditor();
      const delta = quill.getContents();
      
      const slug = generateSlug(articleTitle) || `article-${Date.now()}`;
      console.log('📝 Article slug:', slug);
      
      const images = extractImagesFromDelta(delta);
      console.log('🔍 Found images to upload:', images.length);
      
      const uploadedImages = await uploadImagesToGitHub(images, slug);
      console.log('✅ Uploaded images:', uploadedImages.length);
      
      uploadedImages.forEach((img, index) => {
        console.log(`🖼️ Image ${index + 1}:`, img.publicUrl);
      });
      
      console.log('📄 Generating markdown content...');
      const markdown = generateMarkdown(delta, articleTitle, slug, uploadedImages);
      console.log('📝 Markdown preview:', markdown.substring(0, 200) + '...');
      
      await publishMarkdownToGitHub(slug, markdown);
      
      setPublishingState('success');
      console.log('🎉 Publish complete! Article published successfully.');
      console.log(`📂 Check your GitHub repo: articles/${slug}.md`);
      
    } catch (error) {
      console.error('❌ Publish failed:', error);
      setPublishingState('failed');
    }
  };

  return {
    publishingState,
    handlePublish,
    setPublishingState
  };
};
